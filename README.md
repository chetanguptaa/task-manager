#### TASK MANAGER THAT CAN PERFORM CRUD OPERATIONS USING MONGODB DATABASE AND MONGODB IS USED WITH THE HELP OF DOCKER  

To Run this application run docker-compose up or docker-compose up -d to run it in detached mode and the app can be accessed at localhost:3000

Building of the image from the Dockerfile can be done by running docker build -t imagename .

#### if you want to run the same app with the help of kubernetes 

first run mongo-task-configmap.yaml and mongo-task-secret.yaml with kubectl apply -f mongo-task-configmap.yaml and kubectl apply -f mongo-task-secret.yaml

then run mongo-task-deploy.yaml and then run mongo-express-task-deploy.yaml with kubectl apply command

finally run task-manager-deploy.yaml 
