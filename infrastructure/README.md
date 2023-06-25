# Team Popo's Cloud Infrastructure

## Things that belong here

* Definition of infrastructure resources in `infrastructure`

## Notes

* This is an extremely low-priority extension. All other functionality precedes this, even other low-priority extensions.
* If we somehow get to a stage where the MVP is sufficient, here are the benefits we could get from using AWS:
  * Store our customers' violation images in an S3 bucket for efficiency
  * Store data on our customers' captured violations in a hosted database
  * Host a self-restarting frontend distribution & backend API
  * Host an autoscaling API and model service

## Dependencies

* Terraform
