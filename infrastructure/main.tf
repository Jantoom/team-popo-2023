terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = ["../credentials"]
  default_tags {
    tags = {
      Course     = "CSSE6400"
      Name       = "Popo"
      Automation = "Terraform"
    }
  }
}

provider "docker" {
  registry_auth {
    address  = data.aws_ecr_authorization_token.ecr_token.proxy_endpoint
    username = data.aws_ecr_authorization_token.ecr_token.user_name
    password = data.aws_ecr_authorization_token.ecr_token.password
  }
}

locals { 
    database_username = "administrator" 
    database_password = "foobarbaz" # this is bad 
    secret_key = "abc123"
}

data "aws_ecr_authorization_token" "ecr_token" {}

data "aws_caller_identity" "current" {}

data "aws_iam_role" "lab" {
  name = "LabRole"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

output "database_uri" {
  value = "postgresql://${local.database_username}:${local.database_password}@${aws_db_instance.database.address}:${aws_db_instance.database.port}/${aws_db_instance.database.db_name}"
}

output "load_balancer_back_dns" { 
   value = "http://${aws_lb.popo.dns_name}/api/v1" 
}