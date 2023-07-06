resource "aws_lb" "popo" {
  name               = "popo"
  internal           = false
  load_balancer_type = "application"
  subnets            = data.aws_subnets.private.ids
  security_groups    = [aws_security_group.popo.id]
}

resource "aws_lb_listener" "popo" {
  load_balancer_arn = aws_lb.popo.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "fixed-response"
    
    fixed_response {
      content_type = "text/plain"
      message_body = "Endpoint not registered LOL."
      status_code = 404
    }
  }
}

# Disable if not monolithic deployment !!!
resource "aws_lb_listener_rule" "monolithic_forward" {
  listener_arn = aws_lb_listener.popo.arn
  priority     = 99

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.monolithic.arn
  }

  condition {
    path_pattern {
      values = ["*/*"]
    }
  }
}

resource "aws_lb_listener_rule" "admin_forward" {
  listener_arn = aws_lb_listener.popo.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.admin.arn
  }

  condition {
    path_pattern {
      values = ["*/admin*"]
    }
  }
}

resource "aws_lb_listener_rule" "auth_forward" {
  listener_arn = aws_lb_listener.popo.arn
  priority     = 101

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.auth.arn
  }

  condition {
    path_pattern {
      values = ["*/auth*"]
    }
  }
}

resource "aws_lb_listener_rule" "violations_forward" {
  listener_arn = aws_lb_listener.popo.arn
  priority     = 102

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.violations.arn
  }

  condition {
    path_pattern {
      values = ["*/violations*"]
    }
  }
}

resource "aws_lb_target_group" "monolithic" {
  name        = "monolithic"
  port        = 6400
  protocol    = "HTTP"
  vpc_id      = aws_security_group.monolithic.vpc_id
  target_type = "ip"

  health_check {
    path                = "/api/v1/admin/health"
    port                = "6400"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 10
  }
}

resource "aws_lb_target_group" "admin" {
  name        = "admin"
  port        = 6400
  protocol    = "HTTP"
  vpc_id      = aws_security_group.admin.vpc_id
  target_type = "ip"

  health_check {
    path                = "/api/v1/admin/health"
    port                = "6400"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 10
  }
}

resource "aws_lb_target_group" "auth" {
  name        = "auth"
  port        = 6400
  protocol    = "HTTP"
  vpc_id      = aws_security_group.auth.vpc_id
  target_type = "ip"

  health_check {
    path                = "/api/v1/auth/health"
    port                = "6400"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 10
  }
}

resource "aws_lb_target_group" "violations" {
  name        = "violations"
  port        = 6400
  protocol    = "HTTP"
  vpc_id      = aws_security_group.violations.vpc_id
  target_type = "ip"

  health_check {
    path                = "/api/v1/violations/health"
    port                = "6400"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 10
  }
}

resource "aws_security_group" "popo" {
  name        = "popo"
  description = "Popo Security Group"

  ingress {
    from_port   = 80
    to_port     = 80
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