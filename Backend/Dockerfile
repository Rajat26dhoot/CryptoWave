# Use an official OpenJDK 21 image as a base
FROM eclipse-temurin:21-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file into the container

COPY build/libs/Backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port on which the app will run
EXPOSE 8080

# Start the application
CMD ["java", "-jar", "app.jar"]

