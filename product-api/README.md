# Kubernetes-demo

Spring Boot CRUD Application

### Process
- kubectl apply -f mysql-secret.yaml
- kubectl apply -f mysql-deployment.yaml
- kubectl apply -f product-deployment.yaml
- minikube service product --url