# 🚀 HRMS – Human Resource Management System  
**Full Stack Application | Django REST + React**

A production-style Human Resource Management System designed to automate and centralize employee operations such as attendance tracking, leave handling, payroll generation, and role-based administration.

This project demonstrates real-world architecture using a Django REST backend and a React frontend with a clean separation of concerns and role-based dashboards.

---

## 📸 Screenshots



/screenshots
├── login.png
├── admin-dashboard.png
├── hr-dashboard.png
├── employee-dashboard.png
├── attendance.png
├── leave-management.png
├── payroll.png


## 📸 Screenshots

| Login Page | Admin Dashboard |
|-----------|----------------|
| ![Login](https://github.com/user-attachments/assets/60cf17f6-ea4f-40f6-8fba-557530273e18) | ![Admin](https://github.com/user-attachments/assets/52b5df7c-4f22-4b2c-a103-9ac02378a6f6) |

| Attendance | Leave Management |
|-----------|----------------|
| ![Attendance](<img width="2255" height="967" alt="Screenshot 2026-01-19 195444" src="https://github.com/user-attachments/assets/6f54b98d-01c1-481d-8d41-8f924c044708" />
) | ![Leave](https://github.com/user-attachments/assets/ff97b290-b15d-4030-9616-86c9a6ca51e6) |


## 🎯 Why This Project?

Most “HRMS projects” are just CRUD demos. This one is not.  
It focuses on:

- Real-world role separation  
- Workflow-based approvals  
- Payroll automation  
- Dashboard-driven UI  
- REST API + SPA architecture  

It’s built like a company product, not a college assignment.

---

## 🧩 Core Features

## 🔐 Role-Based Access Control

| Role     | Capabilities |
|---------|--------------|
| Admin   | Full system control: users, departments, payroll, reports |
| HR      | Employee onboarding, profile approval, leave & payroll handling |
| Manager | Team attendance view, team leave approvals |
| Employee| Attendance marking, leave requests, profile access |

---

## 📂 Modules Overview

### 👥 Employee Management
- Create, update, delete employees  
- Department & role assignment  
- Profile approval workflow  

### ⏰ Attendance System
- Daily check-in / check-out  
- Monthly attendance reports  
- Manager-level visibility  

### 📝 Leave Management
- Leave application  
- Approval / rejection workflow  
- Leave history tracking  

### 💰 Payroll System
- Automated salary calculation  
- Payslip generation  
- Monthly payroll reports  

### 📊 Dashboard
- Role-specific analytics  
- Clean and minimal UI  

---

## 🛠 Tech Stack

### Backend
- Django 5.1.6  
- Django REST Framework  
- SQLite (can be switched to PostgreSQL)  
- Session Authentication + CSRF  
- django-cors-headers  

### Frontend
- React 19  
- Material UI (MUI)  
- React Router  

---

## 🗂 Project Architecture

```text
hrms34/
├── backend/
│   ├── accounts/
│   ├── employees/
│   ├── attendance/
│   ├── leaves/
│   ├── payroll/
│   ├── dashboard/
│   └── reports/
│
└── frontend/
    └── src/
        ├── components/
        ├── services/
        ├── context/
        └── pages/
```


---


🔐 Authentication Notes
Session-based authentication

CSRF protected

CORS enabled for React frontend

Role-based authorization at API and UI level


---
📁 Media Handling
Employee photos are stored in:

media/employee_photos/


---
🧠 What This Project Proves
This is not a “tutorial clone”. It demonstrates:

Real REST API design

Frontend + backend integration

Role-based architecture

Business workflow implementation

Professional project structuring

---





## ⚙️ Setup Instructions

### 1️⃣ Backend (Django)

```bash
cd hrms34
.\env\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
Backend runs on:



http://localhost:8000

```
---
### 2️⃣ Frontend (React)

```bash
cd hrms34/frontend
npm install
npm start
Frontend runs on:
http://localhost:3000
```

---
### 🔗 API Structure
Base URL:

```bash
http://localhost:8000/api/
Endpoint	Purpose
/accounts/	Authentication
/employees/	Employee Management
/attendance/	Attendance Tracking
/leaves/	Leave Handling
/payroll/	Payroll System
/dashboard/	Dashboard Data

```
---







