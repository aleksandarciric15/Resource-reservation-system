# Stage 1: Build the application
FROM eclipse-temurin:23-jdk-alpine AS build
# Copy the built JAR from the previous stage
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8085

# Start the application
CMD ["java", "-jar", "app.jar"]