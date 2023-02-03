FROM eclipse-temurin:11-alpine

ARG JAR_FILE=target/product-api-0.0.1-SNAPSHOT.jar

# cd /usr/local/runme
WORKDIR /usr/local/runme

# copy target/find-links.jar /usr/local/runme/app.jar
COPY ${JAR_FILE} app.jar

# java -jar /usr/local/runme/app.jar
ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=prod", "app.jar"]