#!/usr/bin/env bash

# Pass no parameters for both service-based & monolithic resources
# Pass 0 as a parameter for just service-based resources
# Pass 1 as a parameter for just monolithic resources

# Set variables
dns="431489075929.dkr.ecr.us-east-1.amazonaws.com"
images="admin, auth, violations"

# Make sure user credentials are up to date with credentials used in 
# repository for containers
cd ~/team-popo-2023/
cp credentials ~/.aws/

# Retrieve an authentication token and authenticate your Docker client to your registry.
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $dns

# Build/tag/push images to AWS, and force redeployment of services

# Service-based
if [ $# -eq 0 ] || [ "$1" -eq "0" ]; then
    for image in ${images//, / }
    do
        docker build -t $image -f backend/src/$image/Dockerfile .
        docker tag $image:latest $dns/$image:latest
        docker push $dns/$image:latest
        aws ecs update-service --cluster popo --service $image --force-new-deployment --region us-east-1 --no-cli-pager
    done

    printf "\nFinished pushing images and redeploying services [$images] to AWS.\n\n"
fi

# Monolithic
if [ $# -eq 0 ] && [ "$1" -eq "1" ]; then
    docker build -t monolithic -f backend/src/monolithic/Dockerfile .
    docker tag monolithic:latest $dns/monolithic:latest
    docker push $dns/monolithic:latest
    aws ecs update-service --cluster popo --service monolithic --force-new-deployment --region us-east-1 --no-cli-pager

    printf "\nFinished pushing monolithic image and redeploying service to AWS.\n\n"
fi
