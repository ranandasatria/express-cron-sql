# Express Cron SQL

A backend project demonstrating a RESTful API, scheduled data collection, and SQL data processing for Huawei technical test. It consists of three components:

1.  **Backend API**: Node.js/Express server with in-memory storage for managing data.
    
2.  **Scheduled Data Collection**: Cron jobs for automated data collection and cleanup.
    
3.  **SQL Data Processing**: SQL scripts for employee data management.

For detailed implementation, system design, and advanced configuration, refer to [Project Documentation](./docs/project_documentation.pdf) and
[Backend System Design](./docs/system_design_backend.pdf).

## Prerequisites

*   **Node.js** 
    
*   **npm** 
    
*   **Docker** (for Part 3, PostgreSQL)


How to Clone and Use
--------------------

#### 1. Clone the repository
```
git clone https://github.com/ranandasatria/express-cron-sql.git
cd .\express-cron-sql\
```
#### 2. Install depedencies
```
npm install
```

1\. Backend API
--------------------
### Environment Variables

Create a .env file based on .env\_example:

```
PORT=8080
APP_SECRET=your_secret_key
```

### Run the server

```
node index.js
```
Server runs at http://localhost:8080 (or your PORT).

*   Health check: GET /health
    
*   API docs: http://localhost:8080/api-docs (Swagger)
    
*   For authentication and endpoints details, see [Project Documentation](./docs/project_documentation.pdf)

2\. Scheduled Data Collection
--------------------

Navigate to automation folder:

```
cd automation
```

### Run data collection

Collects weather data at 08:00, 12:00, 15:00 WIB and saves to ./home/cron/cron\_DDMMYYYY\_HH.MM.csv.

```
node cron_collect.js
```

### Run data cleansing

Deletes CSV files older than 1 month in ./home/cron, runs daily at 00:00 WIB.

```
node cron_cleanup.js
```

3\. Data Processing 
--------------------

### Setup Database

-   Install Docker.
    
-   Run PostgreSQL container:
    
```docker run -d --name postgres_db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123
-e POSTGRES_DB=employee_db -p 5432:5432 postgres:latest
```
### Run Queries

-   Connect to psql:
    
```
docker exec -it postgres_db psql -U admin -d employee_db
```

- Copy-paste queries from ./sql/employee\_queries.sql.

Alternatively, use VS Code with "Database Client JDBC" extension. Connect to localhost:5432, user=admin, password=admin123, db=employee\_db, then run the SQL file.

Notes
-----

*   No frontend is implemented as per task scope (focus on backend, automation, SQL). Assume frontend interacts via API endpoints.
    
*   Paths are relative for cross-platform compatibility.
    
*   Ensure port 5432 is free; adjust if needed (e.g., -p 5433:5432).
    
## 📄 License

This project is licensed under the **MIT License**.  

## ©️ Copyright

&copy; 2025 Rananda Satria

