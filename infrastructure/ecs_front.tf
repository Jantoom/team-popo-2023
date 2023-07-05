# resource "aws_ecs_cluster" "popo_fr" {
#   name = "popo-front"
# }

# resource "aws_ecs_task_definition" "popo_fr" {
#   family                   = "popo-front"
#   network_mode             = "awsvpc"
#   requires_compatibilities = ["FARGATE"]
#   cpu                      = 256
#   memory                   = 512
#   execution_role_arn       = data.aws_iam_role.lab.arn
#   task_role_arn            = data.aws_iam_role.lab.arn
#   depends_on               = [ aws_lb.popo ]

#   container_definitions = <<DEFINITION
#   [ 
#     { 
#       "image": "${docker_registry_image.popo_fr.name}", 
#       "cpu": 256, 
#       "memory": 512, 
#       "name": "popo_fr", 
#       "networkMode": "awsvpc", 
#       "portMappings": [ 
#         { "containerPort": 80, "hostPort": 80 } 
#       ], 
#       "environment": [
#         { "name": "VITE_URI", "value": "http://${aws_lb.popo.dns_name}" }
#       ],
#       "logConfiguration": { 
#         "logDriver": "awslogs", 
#         "options": { 
#           "awslogs-group": "/popo/popo_fr", 
#           "awslogs-region": "us-east-1", 
#           "awslogs-stream-prefix": "ecs", 
#           "awslogs-create-group": "true" 
#         } 
#       } 
#     }
#   ] 
#   DEFINITION 
# }

# resource "aws_ecs_service" "popo_fr" {
#   name            = "popo-front"
#   cluster         = aws_ecs_cluster.popo_fr.id
#   task_definition = aws_ecs_task_definition.popo_fr.arn
#   desired_count   = 1
#   launch_type     = "FARGATE"

#   network_configuration {
#     subnets          = data.aws_subnets.private.ids
#     security_groups  = [aws_security_group.front.id]
#     assign_public_ip = true
#   }

#   load_balancer {
#     target_group_arn = aws_lb_target_group.front_target.arn
#     container_name   = "popo_fr"
#     container_port   = 80
#   }
# }

# resource "aws_security_group" "front" {
#   name        = "front"
#   description = "Popo front Security Group"

#   ingress {
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     from_port   = 443
#     to_port     = 443
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }
