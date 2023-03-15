resource "aws_vpc" "tm_vpc" {
  cidr_block = "10.169.0.0/24"
  enable_dns_hostnames = true
  enable_dns_support = true
  tags = {
    Name = "task-manager"
  }
}
resource "aws_subnet" "tm-public_subnet" {
  vpc_id = aws_vpc.tm_vpc.id
  cidr_block = "10.169.3.0/24"
  map_public_ip_on_launch = true
  availability_zone = "us-east-1"
  tags = {
    Name = "tm-public"
  }
}

resource "aws_internet_gateway" "tm-itw" {
  vpc_id = aws_vpc.tm_vpc.id
  tags = {
    Name = "tm-igw"
  }
}

resource "aws_route_table" "tm-rt" {
  vpc_id = aws_vpc.tm_vpc.id
  tags = {
    Name = "tm-rt"
  }
}

resource "aws_route" "default-route" {
  route_table_id = aws_route_table.tm-rt.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.tm-itw.id
}

resource "aws_route_table_association" "tm-rta" {
  subnet_id = aws_subnet.tm_public_subnet.id
  route_table_id = aws_route_table.tm-rt.id
}

resource "aws_security_group" "tm-sg" {
  name        = "tm-sg"
  description = "tm security group"
  vpc_id      = aws_vpc.tm_vpc.id
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["190.7.8.1/32"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "my_auth" {
  key_name   = "mtckey"
  public_key = file("~/.ssh/mtckey.pub")
}

resource "aws_instance" "node" {
  instance_type = "t2.micro"
  ami = data.aws_ami.server_ami.id
  key_name = aws_key_pair.my_auth.id
  vpc_security_group_ids = [aws_security_group.tm-sg.id]
  subnet_id = aws_subnet.tm-public_subnet.id
  user_data = file("userdate.tpl")
  root_block_device {
    volume_size = 10
  }
  tags =  {
    Name = "node"
  }
}