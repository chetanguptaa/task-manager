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

resource "kubernetes_manifest" "example" {
  manifest_path = "../task-manager-deploy.yaml"
}

resource "kubernetes_deployment" "example" {
  metadata {
    name = "${resource.kubernetes_manifest.example.metadata[0].name}"
  }
  spec {
    replicas = "${resource.kubernetes_manifest.example.spec[0].replicas}"
    selector {
      match_labels = "${resource.kubernetes_manifest.example.spec[0].selector.match_labels}"
    }
    template {
      metadata {
        labels = "${resource.kubernetes_manifest.example.spec[0].template.metadata.labels}"
      }
      spec {
        container {
          image = "${resource.kubernetes_manifest.example.spec[0].template.spec[0].container[0].image}"
          name  = "${resource.kubernetes_manifest.example.spec[0].template.spec[0].container[0].name}"
        }
      }
    }
  }
}