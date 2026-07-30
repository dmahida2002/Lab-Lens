# syntax=docker/dockerfile:1

# ------------------------------------------------------
# Stage 1: Build the React frontend
# ------------------------------------------------------
FROM node:24-alpine AS frontend-build

WORKDIR /workspace/frontend

COPY frontend/package.json frontend/package-lock.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build


# ------------------------------------------------------
# Stage 2: Build the Spring Boot application
# ------------------------------------------------------
FROM maven:3.9-eclipse-temurin-25 AS backend-build

WORKDIR /workspace/backend

COPY backend/pom.xml ./

RUN mvn -B dependency:go-offline

COPY backend/src ./src

COPY --from=frontend-build \
    /workspace/frontend/dist \
    ./src/main/resources/static

RUN mvn -B clean package -DskipTests


# ------------------------------------------------------
# Stage 3: Run the packaged application
# ------------------------------------------------------
FROM eclipse-temurin:25 AS runtime

WORKDIR /app

COPY --from=backend-build \
    /workspace/backend/target/lablens-backend-0.0.1-SNAPSHOT.jar \
    app.jar

EXPOSE 8080

USER 10001:10001

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
