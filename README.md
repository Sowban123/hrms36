#  HRMS – Human Resource Management System  
**Full Stack Application | Django REST + React**

A production-style Human Resource Management System designed to automate and centralize employee operations such as attendance tracking, leave handling, payroll generation, and role-based administration.

This project demonstrates real-world architecture using a Django REST backend and a React frontend with a clean separation of concerns and role-based dashboards.

---

##  Screenshots




### Login Page

<p align="center">
  <img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/df26b4b2-ca34-48bc-8cd0-5158221771c9" />

</p>

###  Admin Dashboard

<p align="center">
  <img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/11f20c80-0717-4676-8e4e-3bc85b8141ff" />

</p>

### HR Dashboard

<p align="center">
 <img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/5e1d04a8-0ec6-48a3-92e5-8a27be2ab61a" />

</p>

###  Manager Dashboard

<p align="center">
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/31f26e71-b65f-4085-b581-a9b57d564384" />

</p>

###  Employee Dashboard

<p align="center">
 <img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/1991dc58-33b0-478a-a360-390892d3ef49" />

</p>



</p>

##  Why This Project?

Most “HRMS projects” are just CRUD demos. This one is not.  
It focuses on:

- Real-world role separation  
- Workflow-based approvals  
- Payroll automation  
- Dashboard-driven UI  
- REST API + SPA architecture  

It’s built like a company product, not a college assignment.

---

##  Core Features

##  Role-Based Access Control

| Role     | Capabilities |
|---------|--------------|
| Admin   | Full system control: users, departments, payroll, reports |
| HR      | Employee onboarding, profile approval, leave & payroll handling |
| Manager | Team attendance view, team leave approvals |
| Employee| Attendance marking, leave requests, profile access |

---

##  Modules Overview

###  Employee Management
- Create, update, delete employees  
- Department & role assignment  
- Profile approval workflow  

###  Attendance System
- Daily check-in / check-out  
- Monthly attendance reports  
- Manager-level visibility  

###  Leave Management
- Leave application  
- Approval / rejection workflow  
- Leave history tracking  

###  Payroll System
- Automated salary calculation  
- Payslip generation  
- Monthly payroll reports  

###  Dashboard
- Role-specific analytics  
- Clean and minimal UI  

---

##  Tech Stack

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

##  Project Architecture

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


 Authentication Notes
Session-based authentication

CSRF protected

CORS enabled for React frontend

Role-based authorization at API and UI level


---
 Media Handling
Employee photos are stored in:

media/employee_photos/


---
 What This Project Proves
This is not a “tutorial clone”. It demonstrates:

Real REST API design

Frontend + backend integration

Role-based architecture

Business workflow implementation

Professional project structuring

---





## ⚙️ Setup Instructions

### 1️ Backend (Django)

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
### 2️ Frontend (React)

```bash
cd hrms34/frontend
npm install
npm start
Frontend runs on:
http://localhost:3000
```

---
### API Structure
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







