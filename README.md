# JobPortal — Full-Stack Job Portal Website

A full-stack MERN application where companies can post jobs and users can browse, search, and apply for them.

## Project Overview

JobPortal is a complete job portal platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows registered users to create job listings, apply to jobs, track their applications, and manage their profile — all through a modern, responsive interface.

## Features

- User Registration & Login (JWT Authentication)
- Browse and search jobs with category & type filters
- View detailed job information
- Apply to jobs with duplicate-prevention
- Track application status
- Post, edit, and delete job listings (Job Management)
- User Dashboard with profile management
- Fully responsive design (mobile, tablet, desktop)

## Technologies Used

**Frontend:**
- React.js (Vite)
- Redux Toolkit
- React Router
- Axios
- Raw CSS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js

## Installation Guide

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder with:


```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```


Run the server:
```bash
node server.js
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Live Demo Link

- Frontend: (will be added after deployment)
- Backend API: (will be added after deployment)

## Author

MD Saidul Islam Ratin
