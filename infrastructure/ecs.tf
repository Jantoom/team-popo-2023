variable "monolithic" {
  type    = bool
  default = true
}

resource "aws_ecs_cluster" "popo" {
  name = "popo"
}

resource "aws_ecs_service" "monolithic" {
  name            = "monolithic"
  cluster         = aws_ecs_cluster.popo.id
  task_definition = aws_ecs_task_definition.monolithic.arn
  desired_count   = var.monolithic ? 1 : 0
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.private.ids
    security_groups  = [aws_security_group.monolithic.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.monolithic.arn
    container_name   = "monolithic"
    container_port   = 6400
  }
}

resource "aws_ecs_service" "admin" {
  name            = "admin"
  cluster         = aws_ecs_cluster.popo.id
  task_definition = aws_ecs_task_definition.admin.arn
  desired_count   = var.monolithic ? 0 : 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.private.ids
    security_groups  = [aws_security_group.admin.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.admin.arn
    container_name   = "admin"
    container_port   = 6400
  }
}

resource "aws_ecs_service" "auth" {
  name            = "auth"
  cluster         = aws_ecs_cluster.popo.id
  task_definition = aws_ecs_task_definition.auth.arn
  desired_count   = var.monolithic ? 0 : 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.private.ids
    security_groups  = [aws_security_group.auth.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.auth.arn
    container_name   = "auth"
    container_port   = 6400
  }
}

resource "aws_ecs_service" "violations" {
  name            = "violations"
  cluster         = aws_ecs_cluster.popo.id
  task_definition = aws_ecs_task_definition.violations.arn
  desired_count   = var.monolithic ? 0 : 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.private.ids
    security_groups  = [aws_security_group.violations.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.violations.arn
    container_name   = "violations"
    container_port   = 6400
  }
}

resource "aws_ecs_service" "model" { 
    name            = "model" 
    cluster         = aws_ecs_cluster.popo.id 
    task_definition = aws_ecs_task_definition.model.arn 
    desired_count   = 1 
    launch_type     = "FARGATE" 
    
    network_configuration { 
        subnets          = data.aws_subnets.private.ids 
        security_groups  = [aws_security_group.model.id] 
        assign_public_ip = true 
    } 
}

resource "aws_ecs_task_definition" "monolithic" {
  family                   = "monolithic"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = data.aws_iam_role.lab.arn
  task_role_arn            = data.aws_iam_role.lab.arn
  depends_on               = [ aws_s3_bucket.violation_images ]

  container_definitions = <<DEFINITION
  [
    { 
      "name": "monolithic",
      "image": "${docker_registry_image.monolithic.name}",
      "cpu": 1024,
      "memory": 2048,
      "networkMode": "awsvpc",
      "portMappings": [
        { "containerPort": 6400, "hostPort": 6400 }
      ],
      "environment": [
        { "name": "SQLALCHEMY_DATABASE_URI", "value": "postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "SECRET_KEY", "value": "${local.secret_key}" },
        { "name": "S3_BUCKET", "value": "${aws_s3_bucket.violation_images.bucket}" },
        { "name": "CELERY_BROKER_URL", "value": "sqs://" },
        { "name": "CELERY_RESULT_BACKEND", "value": "db+postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "CELERY_DEFAULT_QUEUE", "value": "popo-model" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/popo/monolithic",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_ecs_task_definition" "admin" {
  family                   = "admin"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = data.aws_iam_role.lab.arn
  task_role_arn            = data.aws_iam_role.lab.arn
  depends_on               = [ aws_s3_bucket.violation_images ]

  container_definitions = <<DEFINITION
  [
    { 
      "name": "admin",
      "image": "${docker_registry_image.admin.name}",
      "cpu": 1024,
      "memory": 2048,
      "networkMode": "awsvpc",
      "portMappings": [
        { "containerPort": 6400, "hostPort": 6400 }
      ],
      "environment": [
        { "name": "SQLALCHEMY_DATABASE_URI", "value": "postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "SECRET_KEY", "value": "${local.secret_key}" },
        { "name": "S3_BUCKET", "value": "${aws_s3_bucket.violation_images.bucket}" },
        { "name": "CELERY_BROKER_URL", "value": "sqs://" },
        { "name": "CELERY_RESULT_BACKEND", "value": "db+postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "CELERY_DEFAULT_QUEUE", "value": "popo-model" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/popo/admin",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_ecs_task_definition" "auth" {
  family                   = "auth"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = data.aws_iam_role.lab.arn
  task_role_arn            = data.aws_iam_role.lab.arn
  depends_on               = [ aws_s3_bucket.violation_images ]

  container_definitions = <<DEFINITION
  [
    { 
      "name": "auth",
      "image": "${docker_registry_image.auth.name}",
      "cpu": 1024,
      "memory": 2048,
      "networkMode": "awsvpc",
      "portMappings": [
        { "containerPort": 6400, "hostPort": 6400 }
      ],
      "environment": [
        { "name": "SQLALCHEMY_DATABASE_URI", "value": "postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "SECRET_KEY", "value": "${local.secret_key}" },
        { "name": "S3_BUCKET", "value": "${aws_s3_bucket.violation_images.bucket}" },
        { "name": "CELERY_BROKER_URL", "value": "sqs://" },
        { "name": "CELERY_RESULT_BACKEND", "value": "db+postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "CELERY_DEFAULT_QUEUE", "value": "popo-model" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/popo/auth",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_ecs_task_definition" "violations" {
  family                   = "violations"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = data.aws_iam_role.lab.arn
  task_role_arn            = data.aws_iam_role.lab.arn
  depends_on               = [ aws_s3_bucket.violation_images ]

  container_definitions = <<DEFINITION
  [
    { 
      "name": "violations",
      "image": "${docker_registry_image.violations.name}",
      "cpu": 1024,
      "memory": 2048,
      "networkMode": "awsvpc",
      "portMappings": [
        { "containerPort": 6400, "hostPort": 6400 }
      ],
      "environment": [
        { "name": "SQLALCHEMY_DATABASE_URI", "value": "postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "SECRET_KEY", "value": "${local.secret_key}" },
        { "name": "S3_BUCKET", "value": "${aws_s3_bucket.violation_images.bucket}" },
        { "name": "CELERY_BROKER_URL", "value": "sqs://" },
        { "name": "CELERY_RESULT_BACKEND", "value": "db+postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "CELERY_DEFAULT_QUEUE", "value": "popo-model" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/popo/violations",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_ecs_task_definition" "model" { 
  family                   = "model"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = data.aws_iam_role.lab.arn
  task_role_arn            = data.aws_iam_role.lab.arn
  depends_on               = [ aws_s3_bucket.violation_images ]

  container_definitions = <<DEFINITION
  [
    { 
      "name": "model",
      "image": "${docker_registry_image.model.name}",
      "cpu": 1024,
      "memory": 2048,
      "networkMode": "awsvpc",
      "portMappings": [
        { "containerPort": 6379, "hostPort": 6379 }
      ],
      "environment": [
        { "name": "SQLALCHEMY_DATABASE_URI", "value": "postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "SECRET_KEY", "value": "${local.secret_key}" },
        { "name": "S3_BUCKET", "value": "${aws_s3_bucket.violation_images.bucket}" },
        { "name": "CELERY_BROKER_URL", "value": "sqs://" },
        { "name": "CELERY_RESULT_BACKEND", "value": "db+postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}" },
        { "name": "CELERY_DEFAULT_QUEUE", "value": "popo-model" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/popo/model",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      }
    }
  ]
  DEFINITION
}

resource "aws_security_group" "monolithic" {
  name        = "monolithic"
  description = "Popo Monolithic Security Group"

  ingress {
    from_port   = 6400
    to_port     = 6400
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "admin" {
  name        = "admin"
  description = "Popo Admin Security Group"

  ingress {
    from_port   = 6400
    to_port     = 6400
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "auth" {
  name        = "auth"
  description = "Popo Auth Security Group"

  ingress {
    from_port   = 6400
    to_port     = 6400
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "violations" {
  name        = "violations"
  description = "Popo Violations Security Group"

  ingress {
    from_port   = 6400
    to_port     = 6400
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "model" { 
    name        = "model" 
    description = "Team Popo Model Security Group" 
    
    ingress { 
        from_port   = 6379 
        to_port     = 6379 
        protocol    = "tcp" 
        cidr_blocks = ["0.0.0.0/0"] 
    } 
    
    ingress { 
        from_port   = 22 
        to_port     = 22 
        protocol    = "tcp" 
        cidr_blocks = ["0.0.0.0/0"] 
    } 
    
    egress { 
        from_port   = 0 
        to_port     = 0 
        protocol    = "-1" 
        cidr_blocks = ["0.0.0.0/0"] 
    } 
}
