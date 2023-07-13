resource "aws_ecr_repository" "monolithic" {
  name = "monolithic"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "admin" {
  name = "admin"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "auth" {
  name = "auth"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "violations" {
  name = "violations"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "model" {
  name = "model"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "docker_image" "monolithic" {
  name = "${aws_ecr_repository.monolithic.repository_url}:latest"
  
  build {
    context    = ".."
    dockerfile = "backend/src/monolithic/Dockerfile"
  }
}

resource "docker_image" "admin" {
  name = "${aws_ecr_repository.admin.repository_url}:latest"
  
  build {
    context    = ".."
    dockerfile = "backend/src/admin/Dockerfile"
  }
}

resource "docker_image" "auth" {
  name = "${aws_ecr_repository.auth.repository_url}:latest"
  
  build {
    context    = ".."
    dockerfile = "backend/src/auth/Dockerfile"
  }
}

resource "docker_image" "violations" {
  name = "${aws_ecr_repository.violations.repository_url}:latest"

  build {
    context    = ".."
    dockerfile = "backend/src/violations/Dockerfile"
  }
}

resource "docker_image" "model" {
  name = "${aws_ecr_repository.model.repository_url}:latest"

  build {
    context    = ".."
    dockerfile = "backend/src/model/Dockerfile"
  }
}

resource "docker_registry_image" "monolithic" {
  name = docker_image.monolithic.name
}

resource "docker_registry_image" "admin" {
  name = docker_image.admin.name
}

resource "docker_registry_image" "auth" {
  name = docker_image.auth.name
}

resource "docker_registry_image" "violations" {
  name = docker_image.violations.name
}

resource "docker_registry_image" "model" {
  name = docker_image.model.name
}