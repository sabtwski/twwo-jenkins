FROM openjdk:11.0.3-jdk-stretch

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN apt-get update && apt-get install -y dos2unix

RUN dos2unix mvnw
RUN chmod +x ./mvnw
RUN ./mvnw clean install

EXPOSE 8080

ENTRYPOINT ["./mvnw", "spring-boot:run"]