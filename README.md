# TechTinder Backend

TechTinder is a platform inspired by the functionality of Tinder, tailored specifically for developers seeking to connect, collaborate, and foster valuable tech partnerships. This README offers a detailed guide on setting up the project and provides comprehensive documentation of the available API routes.

---

## Table of Contents
- [Features](#features)
- [API Routes](#api-routes)
  - [Auth Routes](#auth-routes)
  - [Profile Routes](#profile-routes)
  - [Connection Request Routes](#connection-request-routes)
  - [User Routes](#user-routes)
- [Project Setup](#project-setup)

---

## Features
- User Authentication (Signup, Login, Logout)
- Profile Management (View, Edit, Change Password)
- Sending and Managing Connection Requests
- Viewing User Connections and Feed

---

## API Routes

### Auth Routes (`authRouter`)
- **POST /signup** - Register a new user
- **POST /login** - Log in an existing user
- **POST /logout** - Log out the currently logged-in user

### Profile Routes (`profileRouter`)
- **GET /profile/view** - View the current user's profile
- **PATCH /profile/edit** - Edit the current user's profile
- **PATCH /profile/password** - Forgot Password API to update user password

### Connection Request Routes (`connectionRequestRouter`)
- **POST /request/send/:status/:userId** - Send a connection request with a specific status (`ignored`, `interested`, etc.) to another user
- **POST /request/send/interested/:userId** - Mark another user as "interested"
- **POST /request/send/ignored/:userId** - Mark another user as "ignored"
- **POST /request/review/accepted/:requestId** - Accept a connection request
- **POST /request/review/rejected/:requestId** - Reject a connection request

### User Routes (`userRouter`)
- **GET /user/requests/received** - Get all received connection requests
- **GET /user/connections** - Get all established connections
- **GET /user/feed** - Get profiles of other users on the platform

**Status Types:**
- `ignored`
- `interested`
- `accepted`
- `rejected`

---

## Project Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- npm or yarn

### Steps to Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/TechTinder.git
   cd TechTinder/backend

2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables :**
    Create a .env file in the root directory and add the following variables :
    ```bash
    PORT=3000
    MONGO_URI=YOUR_MONGODB_URI
    JWT_SECRET=your_jwt_secret_key
4. **Start the server**
   ```bash
   npm run start
5. **Test the APIs**
   Use a tool like Postman or cURL to test the available API endpoints.
