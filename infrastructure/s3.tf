variable "bucket_name" {
  default = "team-popo-violation-images"
}

resource "aws_s3_bucket" "violation_images" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_cors_configuration" "violation_images" {
  bucket = var.bucket_name
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = ["*"]
    max_age_seconds = 30000
  }

}
