#!/bin/sh

echo "Authenticating with AWS ECR"
aws ecr get-login-password --region eu-west-2 \
    | docker login --username AWS \
    --password-stdin 471776097205.dkr.ecr.eu-west-2.amazonaws.com

echo "Build image"
docker build -t 471776097205.dkr.ecr.eu-west-2.amazonaws.com/clouddevops:latest .

echo "Push image"
docker push 471776097205.dkr.ecr.eu-west-2.amazonaws.com/clouddevops:latest

echo "update image"
aws ecs update-service --cluster angular-cluster --service http-service --force-new-deployment --no-cli-pager