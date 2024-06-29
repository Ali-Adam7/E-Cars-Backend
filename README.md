# E-Cars Backend

## Overview
The E-Cars Backend is a robust API built with TypeScript and Express.js, designed to support an electric car rental service. It features a modular architecture, implements Dependency Injection for better scalability and maintainability, and adheres to the principles of Clean Architecture to ensure the system is decoupled and easy to test.

## Features
- **Authentication**: Secure user authentication using JWT tokens.
- **Car Catalog**: Management of car listings with operations like add, remove, and update cars.
- **Shopping Cart**: Allows users to add cars to their cart and manage their bookings.

## Technologies Used
- TypeScript
- Node.js with Express.js
- InversifyJS for dependency injection
- Helmet for security headers
- Prisma as ORM
- JWT for secure authentication
- Docker for containerization

## Clean Architecture
This project is structured following the Clean Architecture guidelines, which helps in isolating the business rules (use cases) from the UI, database, and external interfaces. This design approach:
- Enhances maintainability and scalability
- Facilitates independent development and testing of business logic
- Organizes code into distinct layers with specific responsibilities:
  - **Entities**: Business objects of the application
  - **Use Cases**: Application-specific business rules
  - **Controllers**: Interface adapters that convert data for use cases and entities
  - **Frameworks and Drivers**: External interfaces like databases and web frameworks


## Getting Started

### Prerequisites
- Node.js
- TypeScript
- Prisma

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Ali-Adam7/E-Cars-Backend.git
```

2. Install dependencies:
```bash
cd E-Cars-Backend
npm install
```
3. Run:
```bash
npm run start
```
The server will be available at `http://localhost:8000`.

