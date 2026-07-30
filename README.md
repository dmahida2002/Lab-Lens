# Lab Lens

Lab Lens is a full stack laboratory workflow dashboard that allows chemists to access and view assigned work from a configured monday.com board. The application uses a React frontend, a layered Spring Boot backend, PostgreSQL through Spring Data JPA, custom REST endpoints, and a containerized deployment.

## Technology stack

- Java 25 and Spring Boot
- Spring Web MVC and Spring Data JPA
- React and Vite
- PostgreSQL
- monday.com GraphQL API
- Docker

## Application flow

1. The React client requests active application users from `GET /api/users`.
2. The selected database record provides the corresponding monday.com person identifier.
3. The backend queries the configured demo board through the monday.com GraphQL API.
4. The backend maps configured board columns into a stable `WorkItemResponse` returned by `GET /api/work/{appUserId}`.
5. The frontend displays each assignment in a responsive card layout.

## Important

Lab Lens is an internal product and is possible for public use. This repo can be used to show an implementation of the product.
