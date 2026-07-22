# 🪦🍔 CraveYard – Microservices Based Food Delivery System

CraveYard is a full-stack microservices-based food ordering and delivery system. This project includes:

- A unified **Frontend** to interact with the backend ecosystems.
- Backend services, each handling a different domain:
  - **auth** – User authentication & authorization
  - **restaurant** – Restaurant, menu, and order readiness
  - **rider** – Rider logic and delivery queues
  - **realtime** – Live tracking functionality
  - **utils** – Payment events, system-wide helpers
  - **admin** – Platform administration
- Infrastructure:
  - **mongodb** – NoSQL Database for all microservices
  - **rabbitmq** – Message Broker for async tasks

All services are containerized with Docker and orchestrated using Docker Compose.

---

## 🗂️ Directory Structure
Below is the directory structure for the project:

```
CraveYard/
├── docker-compose.yml           # Docker Compose orchestration file
├── README.md                    # This file
├── backend/                     # Backend microservices
│   ├── admin/
│   ├── auth/
│   ├── realtime/
│   ├── restaurant/
│   ├── rider/
│   └── utils/
└── frontend/                    # Frontend user interface
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

Clone the repository and change to the project directory:

```bash
git clone <your-repository-url>
cd CraveYard
```

### 2️⃣ Configure Environment Variables

Ensure you have a `.env` file at the root of the project (or appropriately inside the directories) as defined by the services. A `.env.example` file is provided in the backend directories (e.g., `backend/utils/.env.example`) to guide you.

### 3️⃣ Build & Start All Containers

Use Docker Compose to build and run all services. From the project root, run:

```bash
docker-compose up -d
```

This command will:
- Pull/Build the Docker images for each microservice.
- Create a shared Docker network for inter-container communication.
- Start all the services mapped to their respective ports.

After the containers are up, visit [http://localhost:5173](http://localhost:5173) to access the frontend application.

---

## 📌 Service Ports & Information

| Service             | External Port | Description |
|---------------------|---------------|-------------|
| **Frontend**        | 5173          | Unified user interface |
| **Auth Service**    | 5001          | User authentication & authorization |
| **Restaurant Service** | 5002       | Restaurant and menu management |
| **Utils Service**   | 5003          | Payment events, system-wide helpers |
| **Rider Service**   | 5004          | Rider logic and delivery queues |
| **Realtime Service**| 5005          | Live tracking functionality |
| **Admin Service**   | 5006          | Platform administration |
| **MongoDB**         | 27017         | Main database (`CraveYard_DB`) |
| **RabbitMQ**        | 5672, 15672   | Message broker (Management UI on 15672) |

- **Container Communication:** The services communicate internally using Docker networking, and utilize RabbitMQ for asynchronous event-driven tasks (like `rider_queue`, `payment_event`, etc.).
- **RabbitMQ Management UI:** Accessible at `http://localhost:15672` (Username: `admin`, Password: `admin123`).

---

## 🚧 Managing the Cluster

### Stopping the Cluster

To stop all containers and remove the network:

```bash
docker-compose down
```

To also remove volumes (such as `mongodb_data` to reset your database):

```bash
docker-compose down -v
```

---

## 🛠️ Troubleshooting

- **Check Container Logs**:
  If a specific service isn't working as expected, inspect its logs:
  ```bash
  docker logs craveyard-restaurant -f
  ```

- **RabbitMQ Connection Issues (ECONNREFUSED)**:  
  Ensure that `rabbitmq` has fully initialized before other services try to connect. Log in to the RabbitMQ Management UI to verify queues are created and messages are flowing.

- **Port Conflicts**:  
  Ensure ports `5001-5006`, `5173`, `27017`, and `15672` are available on your host machine before running `docker-compose up`.

---

## 👨‍💻 Author

Developed with ❤️ by Harshith.
