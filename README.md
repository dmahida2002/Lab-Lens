# Lab Lens

Lab Lens is a full-stack laboratory workflow dashboard that allows analysts to select a team member and view assigned work from a configured monday.com board. The application uses a React frontend, a layered Spring Boot backend, PostgreSQL through Spring Data JPA, REST endpoints, and a containerized multi-stage build.

> **Portfolio safety notice:** This repository is a generalized portfolio edition. It contains no production credentials, employer branding, employee records, client information, sample data, board identifiers, or organization-specific configuration. Run it only with synthetic data and a dedicated demo monday.com board.

## Technology stack

- Java 25 and Spring Boot
- Spring Web MVC and Spring Data JPA
- React and Vite
- PostgreSQL
- monday.com GraphQL API
- Docker and Docker Compose

## Application flow

1. The React client requests active application users from `GET /api/users`.
2. The selected database record provides the corresponding monday.com person identifier.
3. The backend queries the configured demo board through the monday.com GraphQL API.
4. The backend maps configured board columns into a stable `WorkItemResponse` returned by `GET /api/work/{appUserId}`.
5. The frontend displays each assignment in a responsive card layout.

## Local configuration

Copy the example environment file and replace every placeholder with values from a dedicated demo environment:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Start PostgreSQL:

```bash
docker compose up -d postgres
```

The application expects active demo users in the `app_user` table. For example:

```sql
INSERT INTO app_user (display_name, monday_person_id, active)
VALUES ('Demo Analyst', 'replace-with-demo-person-id', true);
```

Run the backend from the `backend` directory with Maven, then run the frontend from the `frontend` directory:

```bash
mvn spring-boot:run
```

```bash
npm ci
npm run dev
```

The Vite development server proxies `/api` requests to `http://localhost:8080`.

## Container build

Build the complete application from the repository root:

```bash
docker build -t lab-lens .
```

The Dockerfile builds the React assets, copies them into the Spring Boot application, packages the backend, and runs the final image as a non-root user.

## Data and credential policy

- Do not commit `.env` files.
- Do not use an employer's production board, API token, employee names, sample names, client information, or internal identifiers.
- Use fictional records in screenshots, demos, fixtures, and tests.
- Rotate any credential immediately if it is accidentally committed.
