
# E-Cars Backend

Backend API for the E-Cars E-commerce System, structured using Clean Architecture principles and Dependency Injection. This project is built using Node.js, Express, and Prisma, with Inversify to manage dependencies and TypeScript for enhanced type safety.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [License](#license)

## Getting Started

### Prerequisites

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **Docker** (optional, for running the database using `docker-compose`)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd e-cars-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables. Create a `.env` file in the root directory and add necessary variables (see [Environment Variables](#environment-variables)).

4. If you’re using Docker, you can start the database with:

   ```bash
   docker-compose up -d
   ```

5. Run Prisma migrations:

   ```bash
   npm run migrate
   ```

6. Build and start the application:

   ```bash
   npm run build
   npm start
   ```

### Development

To start the server in development mode with hot reloading, use:

```bash
npm run dev
```

## Project Structure

The project follows a **Clean Architecture** pattern with organized folders to separate concerns:

- **src/config**: Configuration and environment setup.
- **src/controllers**: Handles HTTP requests and orchestrates responses.
- **src/middlewares**: Middleware functions for request processing.
- **src/repositories**: Data persistence layer and database access using Prisma.
- **src/DTOs**: Data Transfer Objects for managing input and output formats.
- **src/events**: Event definitions and handlers.
- **src/interactors**: Core business logic and application workflows.
- **src/entities**: Core domain entities representing data structures.
- **src/interfaces**: Interface definitions for dependency abstraction.
- **src/third-party**: External services and integrations (e.g., Prisma).
- **src/routers**: API route definitions.

### Dependency Injection

This project uses **Inversify** for Dependency Injection, allowing for modular, testable code by injecting dependencies at runtime. Dependencies are managed centrally, making it easy to swap implementations as needed.

## Environment Variables

Create a `.env` file in the root directory and add the following keys to configure the application:

```plaintext
DATABASE_URL=postgresql://user:password@localhost:5432/e_cars_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

## Technologies Used

- **Node.js & Express**: The server framework and RESTful API design.
- **TypeScript**: Ensures type safety and improved developer experience.
- **Prisma**: ORM for database management and schema migrations.
- **Inversify**: Dependency Injection to enable clean, modular code.
- **Jest**: Testing framework for unit and integration tests.
- **Docker**: Containerization for consistent deployment and database setup.

## License

This project is licensed under the ISC License.
