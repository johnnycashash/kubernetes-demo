# Kubernetes-demo

Spring Boot CRUD Application

### Build and Publish Process
- mvn clean package
- mvn docker:build
- mvn docker:push

### Local Run H2
- mvn spring-boot:run -Dspring-boot.run.profiles=dev