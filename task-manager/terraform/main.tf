# provider "aws" {
#   region = "us-west-2"
# }

# resource "aws_instance" "example" {
#   ami           = "ami-0c55b159cbfafe1f0"
#   instance_type = "t2.micro"
#   key_name      = "example_key"
#   user_data     = <<-EOF
#                     #!/bin/bash
#                     sudo apt-get update
#                     sudo apt-get install -y git
#                     git clone https://github.com/chetanguptaa/task-manager.git
#                     cd task-manager/task-manager
#                     sudo npm install
#                     sudo npm start
#                   EOF
# }
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.1"
    }
  }
}


# Pulls the image
resource "docker_image" "task-manager" {
  name = "chetanguptaa/task-manager:1.0"
}
resource "docker_image" "mongo" {
  name = "mongo"
}
resource "docker_image" "mongo-express" {
  name = "mongo-express"
}

resource "docker_network" "private_network" {
  name = "mongo-network"
}
# Create a container
resource "docker_container" "mongo" {
  image = docker_image.mongo.image_id
  name  = "mongo"
}
resource "docker_container" "mongo-express" {
  image = docker_image.mongo-express.image_id
  name  = "mongo-express"
}

