# Project Management App

A full-stack Project Management App designed to facilitate project and payment management, with real-time updates, and a clean, intuitive UI.

## Table of Contents

- [Features](#features)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Full-Stack Integration](#full-stack-integration)
- [Installation](#installation)
- [Usage](#usage)
  - [Dashboard UI](#dashboard-ui)
  - [Projects](#projects)
- [Technologies Used](#technologies-used)

---

## Features

### Frontend
- **Dashboard UI**: Displays project cards with key information (name, status).
- **Project & Task Management**: Add, update, and delete projects with an intuitive form interface.

### Backend
- **User Authentication**: JWT-based authentication for secure access.
- **Project & Payment Management APIs**: CRUD endpoints for managing projects and payments.
- **Bulk Data Handling**: Export projects to CSV and import projects via CSV file upload.

### Full-Stack Integration
- **Dashboard Data Integration**: Real-time project and payment status fetched from the backend.
- **Payment Simulation Integration**: Payment status updates with real-time feedback.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hardikrathod777/project-management-app.git

2. **Navigate to Project Directory:**:
   ```bash
   cd project-management-app

3. **Install Dependencies:**
   Backend:
   ```bash
   cd backend
   npm install
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm install

4. **Environment Variables:** Create .env files in both backend and frontend directories with the required environment variables, such as MongoDB URI and JWT secret.

5. **Start the Application:**
   Backend:
   ```bash
   cd backend
   npm start
   ```

   Frontend:
   ```bash
   cd backend
   npm run dev
   ```
   
## Usage

### Dashboard UI
- View and manage projects with a simple, clean dashboard UI featuring:
- **Project Cards:** Display project name and status.

### Projects 
- **Project Management:** Add, update, and delete projects directly from the dashboard.

## Technologies Used

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, JWT
- **Styling:** Tailwind CSS / Bootstrap
- **Testing:** Jest, React Testing Library





