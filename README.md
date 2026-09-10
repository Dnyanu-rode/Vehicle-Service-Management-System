# 🚗 Vehicle Service Management System

A full-stack web application for managing customers, vehicles, and vehicle service bookings. The application is developed using **React.js**, **Spring Boot**, **MySQL**, and **REST APIs**.

---

## 📌 Project Overview

The **Vehicle Service Management System** helps manage vehicle service-related information through a simple web interface.

The system allows the admin to manage:

* Customers
* Vehicles
* Service bookings
* Booking status
* Service costs

The React frontend communicates with the Spring Boot backend using **Axios and REST APIs**, while Spring Data JPA is used to interact with the MySQL database.

---

## ✨ Features

### 🔐 Admin Login

* Simple admin login interface
* Login page with username and password

### 👤 Customer Management

* Add customer
* View all customers
* Search customers
* Update customer details
* Delete customer
* View customer by ID

### 🚗 Vehicle Management

* Add vehicle
* View all vehicles
* Search vehicles
* Filter vehicles by type
* Update vehicle details
* Delete vehicle
* Find vehicles by customer

### 🔧 Service Booking Management

* Add service booking
* View all bookings
* Search bookings
* Filter bookings by status
* Update booking details
* Delete booking
* Find bookings by vehicle
* Find bookings by status

### 📊 Dashboard

* Total customers
* Total vehicles
* Total bookings
* Pending bookings
* In-progress bookings
* Completed bookings
* Completed service revenue
* Recent service bookings

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Axios
* React Router
* Font Awesome

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* REST APIs

### Database

* MySQL

### Tools

* Eclipse
* Visual Studio Code
* MySQL Workbench
* Postman
* GitHub Desktop

---

## 🏗️ Project Architecture

```text
React Frontend
      ↓
    Axios
      ↓
Spring Boot REST API
      ↓
  Controller
      ↓
   Service
      ↓
 Service Implementation
      ↓
  Repository
      ↓
 MySQL Database
```

---

## 📂 Project Structure

```text
Vehicle-Service-Management-System
│
├── backend
│   └── VehicleServiceManagement
│       ├── src
│       │   └── main
│       │       ├── java
│       │       │   └── com.app
│       │       │       ├── controller
│       │       │       ├── model
│       │       │       ├── repositary
│       │       │       ├── service
│       │       │       └── serviceImpl
│       │       │
│       │       └── resources
│       │           └── application.properties
│       │
│       └── pom.xml
│
├── frontend
│   └── vehicle-service-frontend
│       ├── src
│       │   ├── components
│       │   ├── pages
│       │   ├── App.jsx
│       │   └── main.jsx
│       │
│       ├── package.json
│       ├── package-lock.json
│       ├── vite.config.js
│       └── index.html
│
├── .gitignore
└── README.md
```

---

## 🔗 REST API Endpoints

### Customer APIs

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | `/customers`      | Add customer       |
| GET    | `/customers`      | Get all customers  |
| GET    | `/customers/{id}` | Get customer by ID |
| PUT    | `/customers/{id}` | Update customer    |
| DELETE | `/customers/{id}` | Delete customer    |

### Vehicle APIs

| Method | Endpoint                          | Description              |
| ------ | --------------------------------- | ------------------------ |
| POST   | `/vehicles`                       | Add vehicle              |
| GET    | `/vehicles`                       | Get all vehicles         |
| GET    | `/vehicles/{id}`                  | Get vehicle by ID        |
| PUT    | `/vehicles/{id}`                  | Update vehicle           |
| DELETE | `/vehicles/{id}`                  | Delete vehicle           |
| GET    | `/vehicles/customer/{customerId}` | Get vehicles by customer |

### Service Booking APIs

| Method | Endpoint                        | Description             |
| ------ | ------------------------------- | ----------------------- |
| POST   | `/bookings`                     | Add booking             |
| GET    | `/bookings`                     | Get all bookings        |
| GET    | `/bookings/{id}`                | Get booking by ID       |
| PUT    | `/bookings/{id}`                | Update booking          |
| DELETE | `/bookings/{id}`                | Delete booking          |
| GET    | `/bookings/vehicle/{vehicleId}` | Get bookings by vehicle |
| GET    | `/bookings/status/{status}`     | Get bookings by status  |

---

## 🗄️ Database

The project uses **MySQL** with the database:

```text
vehicle_service_db
```

The application uses **Spring Data JPA and Hibernate** to create and update the required database tables automatically.

The database does not include a separate SQL script in this repository.

---

## ⚙️ How to Run the Project

### 1. Start MySQL

Make sure your MySQL server is running.

Create the database:

```sql
CREATE DATABASE vehicle_service_db;
```

---

### 2. Configure Backend

Open:

```text
backend/VehicleServiceManagement/src/main/resources/application.properties
```

Configure your MySQL connection:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vehicle_service_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

Replace `YOUR_MYSQL_PASSWORD` with your local MySQL password.

**Do not upload your actual password to GitHub.**

---

### 3. Run Spring Boot Backend

Open the backend project in **Eclipse** and run:

```text
VehicleServiceManagementApplication.java
```

The backend will run on:

```text
http://localhost:8080
```

---

### 4. Run React Frontend

Open the frontend folder in **Visual Studio Code**:

```text
frontend/vehicle-service-frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🔑 Login

The current frontend contains a simple admin login for demonstration.

```text
Username: admin
Password: admin123
```

This is a frontend demonstration login and is not connected to backend authentication.

---

## 🔄 Application Flow

```text
Admin
  ↓
Login
  ↓
Dashboard
  ↓
Customers / Vehicles / Bookings
  ↓
React Frontend
  ↓
Axios
  ↓
Spring Boot REST API
  ↓
Service Layer
  ↓
Repository Layer
  ↓
MySQL
```

---

## 📸 Screenshots

### Login

*Add your login page screenshot here.*

### Dashboard

*Add your dashboard screenshot here.*

### Customers

*Add your customers page screenshot here.*

### Vehicles

*Add your vehicles page screenshot here.*

### Service Bookings

*Add your bookings page screenshot here.*

---

## 🎯 Project Objectives

* To understand full-stack web application development.
* To practice React.js frontend development.
* To develop REST APIs using Spring Boot.
* To implement CRUD operations using Spring Data JPA.
* To connect a Spring Boot application with MySQL.
* To understand communication between frontend and backend using Axios.
* To practice service and repository layer architecture.

---

## 🚀 Future Improvements

* Backend authentication and authorization
* JWT-based security
* Customer service history
* Service center management
* Email notifications
* Online payment integration
* Cloud deployment

---

## 👩‍💻 Developer

**Dnyaneshwari Rode**

**Project:** Vehicle Service Management System

**Technologies:** React.js | Spring Boot | MySQL | REST API
