provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  key_name      = "example_key"
  user_data     = <<-EOF
                    #!/bin/bash
                    sudo apt-get update
                    sudo apt-get install -y git
                    git clone https://github.com/chetanguptaa/task-manager.git
                    cd task-manager/task-manager
                    sudo npm install
                    sudo npm start
                  EOF
}