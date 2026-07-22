# CraveYard - Food Delivery Microservices

## 🚧 Project Status

The project is actively being developed. Some endpoints and configurations are subject to change.

---

This repository demonstrates a robust food delivery application built using a microservices architecture. The backend services are built to be event-driven and scalable. The services and databases are fully containerized using Docker and orchestrated using Docker Compose, providing a realistic example of a modern, production-grade microservices system.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Services](#services)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Deployment](#setup--deployment)
- [Configuration](#configuration)
- [Testing & Verification](#testing--verification)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CraveYard implements a food delivery application using a distributed microservices architecture. Each microservice focuses on a distinct domain (such as authentication, restaurant management, rider operations, etc.) and runs independently inside its own Docker container. 

A central **MongoDB** database is utilized to store domain data, while **RabbitMQ** is integrated as a message broker to facilitate asynchronous, event-driven communication (e.g., handling orders, payments, and delivery assignments) across the services. A single unified **Frontend** is provided to interact with the backend ecosystems.

---

## Architecture

- **Microservices**:
  - **Auth Service** – Handles user registration, login, and secure authentication.
  - **Restaurant Service** – Manages restaurant data, menus, and processes incoming orders.
  - **Rider Service** – Oversees rider assignments, statuses, and delivery tracking.
  - **Realtime Service** – Manages WebSocket connections for real-time updates (e.g., live order tracking).
  - **Utils Service** – Handles shared utilities, potentially including payment processing events.
  - **Admin Service** – Provides administrative control over the platform data.
- **Infrastructure Services**:
  - **MongoDB** – A shared database service used by the microservices (utilizing the `CraveYard_DB` database).
  - **RabbitMQ** – An event broker allowing services to publish and consume events decoupling the architecture.
- **Frontend**:
  - Exposes the user interface running on port 80 internally (mapped to port 5173).
- **Deployment & Orchestration**: 
  - All applications are bundled into images and pushed to Docker Hub under the `punarvasu1154` namespace.
  - Orchestration is handled via `docker-compose`.

---

## Services

| Service Name | Image | Port | Description |
|---|---|---|---|
| **mongodb** | `mongo:latest` | 27017 | NoSQL Database for all microservices |
| **rabbitmq** | `rabbitmq:3-management` | 5672, 15672 | Message Broker for async tasks |
| **auth** | `punarvasu1154/craveyard-auth` | 5001 | User authentication & authorization |
| **restaurant** | `punarvasu1154/craveyard-restaurant` | 5002 | Restaurant, menu, and order readiness |
| **utils** | `punarvasu1154/craveyard-utils` | 5003 | Payment events, system-wide helpers |
| **rider** | `punarvasu1154/craveyard-rider` | 5004 | Rider logic and delivery queues |
| **realtime** | `punarvasu1154/craveyard-realtime` | 5005 | Live tracking functionality |
| **admin** | `punarvasu1154/craveyard-admin` | 5006 | Platform administration |
| **frontend** | `punarvasu1154/craveyard-frontend` | 5173 | Unified user interface |

---

## Project Structure

```
CraveYard/
├── backend/
│   ├── admin/
│   ├── auth/
│   ├── realtime/
│   ├── restaurant/
│   ├── rider/
│   └── utils/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## Prerequisites

- **Docker** installed on your machine.
- **Docker Compose** installed (usually comes with Docker Desktop).

---

## Setup & Deployment

### Local Deployment with Docker Compose

Running the entire stack locally is straightforward using the provided `docker-compose.yml` file. This is the recommended method for development and local testing.

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd CraveYard
   ```

2. **Configure Environment Variables:**
   Ensure you have a `.env` file at the root of the project (or appropriately inside the directories) as defined by the services. A `.env.example` file is provided in the backend directories (e.g., `backend/utils/.env.example`) to guide you.

3. **Start the applications:**
   ```bash
   docker-compose up -d
   ```
   *This command will pull the required images from Docker Hub, create the networks, and start the containers in the background.*

4. **Verify the services:**
   You can check the status of your running containers:
   ```bash
   docker-compose ps
   ```

5. **Access the application:**
   - Frontend UI: `http://localhost:5173`
   - RabbitMQ Management Console: `http://localhost:15672` (Username: `admin`, Password: `admin123`)

---

## Configuration

- **Environment Variables**:  
  The `docker-compose.yml` loads shared configuration from the `.env` file. Important variables explicitly passed in include:
  - `MONGO_URI`: `mongodb://mongodb:27017/CraveYard_DB`
  - `RABBITMQ_URL`: `amqp://admin:admin123@rabbitmq:5672`
  - Internal Service URLs (e.g., `UTILS_SERVICE`, `REALTIME_SERVICE`, `RESTAURANT_SERVICE`).
  - Queue Topics (e.g., `PAYMENT_QUEUE`, `RIDER_QUEUE`, `ORDER_READY_QUEUE`).

- **Database Volumes**:  
  A Docker volume (`mongodb_data`) is used to persist MongoDB data, ensuring data survives container restarts.

- **Image Tagging**:  
  Services pull their respective latest images from Docker Hub (e.g., `punarvasu1154/craveyard-auth:latest`). If you are developing locally, you can modify `docker-compose.yml` to build from source using the `build: ./backend/...` context.

---

## Testing & Verification

- **Check Container Logs**:
  If a specific service isn't working as expected, inspect its logs:
  ```bash
  docker logs craveyard-restaurant -f
  ```

- **Database Connectivity**:  
  Ensure MongoDB is accepting connections locally (if port forwarded) or from other containers.
  
- **Message Broker Check**:  
  Log in to the RabbitMQ Management UI at `http://localhost:15672` to verify that queues (`rider_queue`, `payment_event`, etc.) are created and messages are flowing.

---

## Troubleshooting

- **RabbitMQ Connection Issues (ECONNREFUSED)**:  
  Ensure that `rabbitmq` has fully initialized before other services try to connect. Although `depends_on` ensures container startup order, it does not wait for the application inside to be ready. 
  
- **Port Conflicts**:  
  Ensure ports 5001-5006, 5173, 27017, and 15672 are available on your host machine before running docker-compose.

---

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
