# 🚀 SaaS Boilerplate Microservice

![GitHub stars](https://img.shields.io/github/stars/Meghahegde-dev/microservice-boilerplate?style=social)
![GitHub forks](https://img.shields.io/github/forks/Meghahegde-dev/microservice-boilerplate?style=social)
![GitHub issues](https://img.shields.io/github/issues/Meghahegde-dev/microservice-boilerplate)
![Docker pulls](https://img.shields.io/docker/pulls/your-docker-image)

**A production-ready SaaS backend foundation built with Node.js, Express, MongoDB, Docker, and a full Observability stack.**

This project provides a scalable foundation to quickly bootstrap backend services for SaaS applications using modern, production-grade architecture patterns.

---

## 🏗️ Architecture & Features

- Microservices Architecture – Independent services (Auth, API Gateway, etc.)
- API Gateway – Central entry point for routing and request proxying
- JWT Authentication – Access & Refresh tokens for secure identity management
- Observability Stack – Grafana, Loki, and Promtail for centralized logging
- Dockerized Environment – Fully containerized workflow for local development
- MongoDB 7.0 – Pre-configured with authentication and persistent volumes
- NGINX Reverse Proxy – Optional, for load balancing or API request routing

---

## 💡 Why Use This Boilerplate?

- 🚀 Launch microservices quickly with a ready-to-run stack  
- 🔐 Built-in authentication & JWT management  
- 🛠️ Fully dockerized: MongoDB, RabbitMQ, API Gateway  
- 📊 Observability ready with Grafana + Loki + Promtail  
- ⚡ Extensible: easily add new microservices or services  

---

## 📁 Project Structure

saas-boilerplate-microservice/
├─ api-gateway/           # Central routing & proxy logic
├─ auth-service/          # Identity management & JWT logic
├─ logger/                # Shared winston logging utilities
├─ platform/observability/ # Grafana/Loki/Promtail configurations
├─ docker-compose.yml     # Master orchestration file
└─ README.md              # Documentation

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js v20 or higher
- Docker + Docker Compose
- Git

### 2. Installation & Run

Step 1: Clone the repository
> git clone github.com
> cd saas-boilerplate-microservice

Step 2: Install dependencies
> npm install

Step 3: Start with Docker
(Note: We use -v to clear stale volumes and apply fresh DB credentials)
> docker compose down -v
> docker compose up --build

### 3. Access Services
- API Gateway: http://localhost:4000
- Auth Service: http://localhost:5001
- Grafana (Logs): http://localhost:3000 (Login: admin / admin)

---

## 📊 Observability (Logging)

This boilerplate uses Winston to ship logs to Grafana Loki. To view your logs:

1. Open Grafana (http://localhost:3000).
2. Go to Explore (Compass icon) and select Loki as the data source.
3. Use the query: {service="auth-service"}
4. Click Live to watch logs stream in real-time (including your logger.error calls).

---

## 🔐 Authentication

The project includes a JWT-based auth service out of the box:
- Registration & Login: Handles user persistence in MongoDB.
- Token Validation: Secure JWT signing for session management.
- Protected Routes: Middleware included to verify tokens at the Gateway level.

---

## 🧩 Adding New Services

1. Create a new service folder (e.g., users-service/).
2. Build an Express app and add a Dockerfile.
3. Add the service to docker-compose.yml.
4. Update the API Gateway proxy rules to route traffic to your new service.

---

## 📦 Environment Variables

Each service requires its own .env file. Please refer to the **.env.example** files located inside each service directory for the full list of required variables.

Key configuration for 2025:
- PORT: 5001
- MONGO_URI: mongodb://root:rootpass@mongo:27017/authdb?authSource=admin
- JWT_ACCESS_SECRET: your_access_secret
- JWT_REFRESH_SECRET: your_refresh_secret

---

## 📚 Useful Tools & Integrations

- Logging: Grafana Loki
- API Testing: Postman or Insomnia
- Documentation: Swagger / OpenAPI
- CI/CD: GitHub Actions workflows

---

## ⭐ Contributing
Feel free to fork this repo and submit Pull Requests. For major changes, please open an issue first to discuss what you would like to change.

License: MIT
