# Resource Reservation System

The Resource Reservation System is a microservice-based application designed to facilitate resource reservations for employees of a hypothetical company and provides an administration system. The system supports reservation management, user notifications, department services, and resource analytics, ensuring an efficient and user-friendly experience.

## Table of Contents
- [Features](#features)
- [Microservices Architecture](#microservices-architecture)
- [Setup and Installation](#setup-and-installation)
- [Docker Setup](#docker-setup)
- [Usage](#usage)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Contributing](#contributing)

## Features
- Employee resource reservation system
  - Reserve workplaces and other resources (computers, projectors, etc.)
  - Ensure reservations are made at least 12 hours in advance
  - Prevent double or retroactive reservations
- Graphical view of available and reserved places by day
- Message communication between users with reservations
- Administrative features
  - Manage all reservations and cancellations
  - Make reservations or cancellations on behalf of other users with notification support
- Reporting service for reservation and cancellation analysis
- Authentication and authorization
  - Integration with Keycloak for identity and access management (IAM)
  - Support for local user database login
  - OAuth2 login with email interceptor to enforce the `*.etf.unibl.org` domain requirement
- Notification service for reservation updates
- Department service for managing employee groups
- API Composition for seamless communication between services

## Microservices Architecture
The system consists of the following microservices:
1. **User Service:** Handles user management and authentication.
2. **Notification Service:** Manages notifications for reservation changes and administrative updates.
3. **API Composition Service:** Coordinates communication between microservices.
4. **Resource Service:** Manages resource information such as workstations, computers, and projectors.
5. **Reservation Service:** Handles resource reservations and cancellations.
6. **Department Service:** Manages organizational departments and user groups.

## Setup and Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/AleksandarCiric1/resource-reservation-system.git
   ```

2. Navigate to the project directory:
   ```shell
   cd resource-reservation-system
   ```

3. Configure the Database
   Update the `application.properties` or `application.yml` file in each microservice's `src/main/resources` directory:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

4. Configure Keycloak
   - Set up a Keycloak server and create a realm with clients and roles.
   - Update Keycloak configurations in the `application.properties` files.

5. Start the services:
   ```shell
   mvn clean install
   mvn spring-boot:run
   ```
   Run each microservice separately.

## Docker Setup
If you don't want to set you local configuration. You can use docker-compose.yml file in deploy folder.
But before that you need to have necessary images that are defined in docker-compose file:
- mysql server
- custom-keycloak created with Dockerfile in keycloak-configuration folder
- rabbitmq
- and other services in spring boot ...

## Usage

- The application is designed to be used alongside the `resource-reservation-frontend` application.
- By default, services run on different ports (e.g., `http://localhost:8080`, `http://localhost:8081`, etc.).
- Access the API endpoints for resource management, reservations, and reporting through the frontend.

## Technologies
- Spring Boot
- Spring Cloud
- Spring Data JPA
- Keycloak
- OAuth2
- MySQL
- Maven
- Docker (optional for containerized deployment)

## Prerequisites
Before running the application, ensure the following are installed:

1. **Java 21** or later
2. **Maven 3.6+**
3. **MySQL**
4. **Keycloak Server**
5. **Docker** (optional)

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

We look forward to your contributions!

