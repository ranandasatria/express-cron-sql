# Express Cron SQL

A backend project demonstrating a RESTful API, scheduled data collection, and SQL data processing. It consists of three components:

1. **Product API**: A Node.js/Express-based API with in-memory storage for managing products, secured with JWT authentication and documented with Swagger.
2. **Scheduled Data Collection**: Cron jobs to collect weather data and perform automated file cleanup.
3. **SQL Data Processing**: SQL scripts for managing and querying employee data


# 1. Product API

## System Design
This backend is a simple layered Express app:

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
cd .\express-cron-sql\
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

# 2. Scheduled Data Collection
Collects weather data from Open-Meteo API and saves it to ./home/cron/cron_DDMMYYYY_HH.MM.csv (relative path for cross-platform compatibility, e.g., Windows/Linux/Mac). Deletes files older than 1 month.

## Prerequisites

- Node.js
- npm


### How to Clone and Use

#### 1. Clone the repository
```
git clone https://github.com/ranandasatria/express-cron-sql.git
cd .\express-cron-sql\automation\
```
#### 2. Install depedencies
```
npm install
```
#### 3. Run data collection
Collects weather data at 08:00, 12:00, 15:00 WIB and saves to ./home/cron/cron_DDMMYYYY_HH.MM.csv
```
node cron_collect.js
```
**Details:**
- Fetches hourly temperature data from https://api.open-meteo.com/v1/forecast?latitude=-6.1818&longitude=106.8223&hourly=temperature_2m&timezone=Asia%2FBangkok.
- CSV format: Columns Time and Temperature_2m.
- File name example: cron_23082025_08.00.csv.
- Schedule: 0 8,12,15 * * * (runs at 08:00, 12:00, 15:00 WIB daily).

#### 4. Run data cleansing
Deletes CSV files older than 1 month in ./home/cron, runs daily at 00:00 WIB
```
node cron_cleanup.js
```
**Details:**
- Scans ./home/cron for files starting with cron_ and ending with .csv.
- Uses file modification time (mtime) to check age.
- Schedule: 0 0 * * * (midnight daily).

#### 5. Testing
- For quick testing, temporarily change the schedule in cron_collect.js to * * * * * (every minute), run the script, and check for new CSV files in ./home/cron.
- For cleansing, change subtract(1, 'month') to subtract(1, 'minute') temporarily.
- Revert changes after testing.

#### Notes
- Paths are relative (../home/cron from automation/ folder) for cross-platform use (Windows, Mac, Linux).



## 📄 License

This project is licensed under the **MIT License**.  

## ©️ Copyright

&copy; 2025 Rananda Satria