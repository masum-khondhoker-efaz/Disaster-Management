Disaster Management System
Overview
The Disaster Management System is a web application designed to assist in managing crises such as natural disasters. The platform allows users to report crises, register as volunteers, and view crisis information such as severity, location, and the type of help needed. Admin users can verify and assign volunteers to crises and manage the flow of donations and inventory.

Features
Volunteer Registration: Allows volunteers to sign up and provide personal details.
Login: Supports both volunteers and admin users.
Crisis Reporting: Allows users to report crises which can be approved by admins.
Crisis List & Filter: Displays a list of approved crises with filters for severity, status, and location.
Donations Management: Manages donations and expenses for disaster relief.
Inventory Management: (Backend only) Track inventory for donated and purchased relief goods.
Admin Panel: Admins can approve, verify, and assign tasks to volunteers

Installation & Setup
Prerequisites
Node.js (v16.x or higher)
MongoDB (for database)
Backend Setup

URL for published Postman documentation
https://documenter.getpostman.com/view/36263256/2sAXqtc2Be

Clone the repository:
git clone https://github.commasum-khondhoker-efaz/Disaster-Management.git
cd disaster-management/server

Install dependencies:
npm install
npm start

Frontend Setup
Navigate to the client folder:
cd ../client

Install dependencies:
npm install

Start the frontend development server:
npm run dev


Technologies Used
Backend: Node.js, Express, MongoDB, Mongoose
Frontend: React, Vite
Security: Helmet, CORS, JWT Authentication
API Documentation: Postman
File Uploads: Multer


