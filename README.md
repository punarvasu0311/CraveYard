# 🪦🍔 CraveYard – Microservices Based Food Delivery System

CraveYard is a robust, full-stack, event-driven microservices food ordering and delivery system. Built for scalability, it handles everything from user authentication and restaurant menus to real-time rider tracking and secure payment processing.

---

## ✨ Key Features (Microservices)

- **🔐 Auth Service**: Handles secure, JWT-based login and role-based authorization for Users, Admins, Riders, and Restaurant owners.
- **🏪 Restaurant Service**: Allows restaurants to manage their storefront, upload menu items, and process incoming food orders.
- **🛵 Rider Service**: Manages automated rider assignment based on location and availability using asynchronous message queues.
- **📍 Realtime Service**: Utilizes live WebSockets (Socket.io) to allow users to track their order status and rider location in real time.
- **🛠️ Utils Service (Payments & Media)**: Integrates Stripe and Razorpay for a seamless multi-gateway checkout experience, and handles uploading images (menus, logos) to Cloudinary.
- **📊 Admin Service**: Provides a centralized administrative dashboard for platform oversight and metrics.

---

## 🛠️ Technology Stack & 3rd Party Integrations

### Core Services
- **Backend Framework:** [Express.js](https://expressjs.com/) (v5.x) – Powers all microservices.
- **Database ORM:** [Mongoose](https://mongoosejs.com/) – Models and interacts with the MongoDB database.
- **Message Broker:** [RabbitMQ](https://www.rabbitmq.com/) – Facilitates asynchronous event-driven architecture between services.
- **Containerization:** [Docker & Docker Compose](https://www.docker.com/) – For consistent local development and orchestration.

### 3rd Party APIs & Libraries
- **[Stripe](https://stripe.com/) & [Razorpay](https://razorpay.com/)**: Used in the `utils` service for handling secure payment transactions globally and in India.
- **[Cloudinary](https://cloudinary.com/)**: Used for high-performance image upload, storage, and optimization.
- **[Socket.io](https://socket.io/)**: Implemented in the `realtime` service to push live order updates and tracking data to clients instantly.

---

## 🗂️ Project Structure

CraveYard is divided into several focused domains:

```
CraveYard/
├── docker-compose.yml           # Docker Compose orchestration file
├── README.md                    # This file
├── backend/                     # Backend microservices
│   ├── admin/                   # Platform administration
│   ├── auth/                    # User authentication & authorization
│   ├── realtime/                # Live tracking functionality (WebSockets)
│   ├── restaurant/              # Restaurant and menu management
│   ├── rider/                   # Rider logic and delivery queues
│   └── utils/                   # Payment events, Cloudinary, system helpers
└── frontend/                    # Frontend unified user interface
```

---

## 🚀 Getting Started (For Beginners)

Even with zero prior knowledge, you can get CraveYard running locally by following these steps.

### 1️⃣ Clone the Repository

Open your terminal and clone the repository:

```bash
git clone <your-repository-url>
cd CraveYard
```

### 2️⃣ Configure Environment Variables (`.env`)

For security reasons, secret keys (like payment API keys and database passwords) are never pushed to GitHub. Instead, they are stored in a `.env` file on your local machine.

1. Navigate to the backend services (e.g., `backend/utils`).
2. You will see a file named `.env.example`. This is a template.
3. Duplicate this file and rename the copy to strictly `.env`.
4. Open the new `.env` file and fill in the dummy values with your actual keys. 

**Example of `.env` configuration:**
```env
PORT=5003
CLOUD_NAME=your_cloudinary_name_here
CLOUD_API_KEY=your_cloudinary_api_key_here
CLOUD_SECRET_KEY=your_cloudinary_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_here
RESTAURANT_SERVICE=http://localhost:5002
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672
PAYMENT_QUEUE=payment_event
FRONTEND_URL=http://localhost:5173
```
*(Note: You will need to create free accounts on Cloudinary, Stripe, and Razorpay to get your developer keys).*

### 3️⃣ Build & Start All Containers

Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running. From the root `CraveYard` folder, run:

```bash
docker-compose up -d
```

This command will:
- Pull and build the Docker images for every microservice.
- Setup a shared Docker network so services can talk to each other.
- Start all the services mapped to their respective ports.

Once it finishes, visit **[http://localhost:5173](http://localhost:5173)** to access the frontend application!

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

- **RabbitMQ Management UI:** Accessible at `http://localhost:15672` (Username: `admin`, Password: `admin123`).

---

## 📨 Event-Driven Communication (Message Queues)

CraveYard heavily relies on asynchronous message passing using RabbitMQ to ensure decoupled and reliable communication between services:

1. **`PAYMENT_QUEUE`**: 
   - **Producer:** `utils` service (when a payment is successfully processed via Stripe/Razorpay).
   - **Consumer:** `restaurant` service.
   - *Ensures the kitchen only starts preparing food once the payment is confirmed.*

2. **`ORDER_READY_QUEUE`**:
   - **Producer:** `restaurant` service (triggered when food is ready).
   - **Consumer:** `rider` service (to dispatch an available nearby rider).

3. **`RIDER_QUEUE`**:
   - Managed by both `restaurant` and `rider` services to handle rider location updates and availability statuses asynchronously.

---

## 🚧 Managing the Cluster

To stop all containers and remove the network gracefully:
```bash
docker-compose down
```

To entirely reset your database and wipe volumes (use with caution):
```bash
docker-compose down -v
```

---

## 👨‍💻 Author

Developed with ❤️ by Harshith.
