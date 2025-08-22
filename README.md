# Express Cron SQL

Simple backend project with three parts:

1. Product API using Express.js with in-memory storage.

2. Scheduled data collection using cron jobs.

3. SQL scripts for data processing.

## System Design for Part 1
This service is a simple layered Express app:

- Routes call controllers
- Controllers validate and shape input and output
- Services hold in-memory data and implement CRUD
- JWT middleware guards protected routes
- Swagger exposes documentation at runtime

📄 [View detailed System Design](./docs/system_design_backend.pdf)

## Prerequisites

- Node.js
- npm


### How to Clone and Use

#### 1. Clone the repository
```
git clone https://github.com/ranandasatria/express-cron-sql.git
```
#### 2. Install depedencies
```
npm install
```
#### 3. Environment Variables
Create a .env file. You can copy from .env_example provided.
```
PORT=
APP_SECRET=
```
#### 4. Run the server
```
node index.js
```

***Server will run at PORT you setup or at http://localhost:8080.***

### Health Check
```
GET http://localhost:8080/health
```

### API Documentation
```
http://localhost:8080/api-docs
```

### Authentication
- Register to create a user.
- Login to receive a JWT token.
- Send the token on protected routes using:
```
Authorization: Bearer <token>
```
Public routes:
- POST /auth/register
- POST /auth/login
- GET /products
- GET /products/:id

Protected routes:

- POST /products
- PATCH /products/:id
- DELETE /products/:id


## API Endpoints
| Method | Endpoint           | Description                                | Auth Required |
|--------|------------------|--------------------------------------------|---------------|
| POST   | /auth/register    | Register a new user                        | No            |
| POST   | /auth/login       | Login and receive JWT token                | No            |

#### Register request body
```
{
  "email": "user@example.com",
  "password": "secret123"
}
```

#### Login request body
```
{
  "email": "user@example.com",
  "password": "secret123"
}
```

#### Login response
```
{
  "success": true,
  "message": "Login success",
  "token": "<jwt>"
}
```

| Method | Endpoint           | Description                                | Auth Required |
|--------|------------------|-------------------------------------------- |---------------|
| GET    | /products         | List all products                          | No            |
| GET    | /products/:id     | Get product details by ID                  | No            |
| POST   | /products         | Create a new product                       | Yes           |
| PATCH  | /products/:id     | Update product details                     | Yes           |
| DELETE | /products/:id     | Delete a product                           | Yes           |

#### Product attributes
```
{
   "id": UUID
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 1500,
  "stock": 10
}
```



## 📄 License

This project is licensed under the **MIT License**.  

## ©️ Copyright

&copy; 2025 Rananda Satria