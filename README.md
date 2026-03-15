# 🛡️ Secure Document Registry & Verification System

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Security](https://img.shields.io/badge/Security-SHA256-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A decentralized-style document integrity system built with the **MERN Stack**. This application allows users to register documents, generate unique cryptographic fingerprints (**SHA-256 hashes**), and verify the authenticity of files to detect tampering.

---

# 🏗️ Architecture

The system follows a **Client–Server Architecture** with a focus on **Security at the Edge (Frontend Hashing)**.

## 1️⃣ Frontend – Next.js 16

* **Local Hashing:** Uses `crypto-js` to generate a **SHA-256 hash** before the file leaves the user's device.
* **State Management:** Implemented with **React Context API** for global authentication and session handling.
* **UI & Animation:** Built using **Tailwind CSS** and **Framer Motion**.

## 2️⃣ Backend – Node.js & Express

* **Integrity Re-Verification:** The backend re-hashes uploaded files using the **Node.js `crypto` module** to ensure the file was not modified during transmission.
* **File Handling:** Managed with **Multer** for local or cloud storage.
* **Database Storage:** File metadata and hashes are stored in **MongoDB**.

## 3️⃣ Communication

* **REST APIs** are used for communication between frontend and backend.
* **JWT Authentication** secures all protected endpoints.

---

# 🔒 Security Decisions

To meet the high-security requirements of a document registry, the following measures were implemented:

### SHA-256 Hashing

Each document receives a unique cryptographic fingerprint. Even a **single-bit modification** changes the entire hash.

### Double-Layer Verification

Hashing occurs at two levels:

* **Frontend:** Ensures transparency for users.
* **Backend:** Ensures system-level verification and prevents tampering.

### HttpOnly Cookies

JWT tokens are stored in **HttpOnly & Secure cookies** to protect against **XSS (Cross-Site Scripting)** attacks.

### Protected Routes

Private pages such as the **Dashboard** and **Admin Panel** are protected using a **Higher-Order Component (HOC)** that verifies authentication before access.

### CORS Policy

API requests are restricted to trusted origins to prevent unauthorized third-party access.

---

# 🚀 Installation

Follow these steps to run the project locally.

## 1️⃣ Prerequisites

* Node.js **v18 or higher**
* MongoDB Atlas account **or** Local MongoDB instance

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the **backend directory** and add the following variables:

```env
# Server Configuration
PORT=2000

# Database
MONGO_URL=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_super_secret_key_123

# File Uploads
MAX_FILE_SIZE=5242880
```

**Note:**
Use a **long and complex `JWT_SECRET`** in production environments for better security.

---

## 📁 Project Structure

project-root
│

├── backend

│   ├── controllers

│   ├── models

│   ├── routes

│   ├── middleware

│   ├── uploads

│   └── server.js

│

├── frontend

│   ├── components

│   ├── context

│   ├── pages

│   └── utils

│

└── README.md

--- 

# 🛠️ Tech Stack

| Layer         | Technology                             |
| ------------- | -------------------------------------- |
| Frontend      | Next.js, Tailwind CSS, Framer Motion   |
| Backend       | Node.js, Express.js                    |
| Database      | MongoDB                                |
| Security      | SHA-256 Hashing, JWT, HttpOnly Cookies |
| File Handling | Multer                                 |
| Icons         | Lucide React                           |

---

# 📌 Features

* Secure document registration
* SHA-256 cryptographic fingerprint generation
* File authenticity verification
* Double-layer integrity validation
* JWT-based authentication
* Secure cookie storage
* Protected dashboard and admin routes
* MongoDB document metadata storage
* File upload and verification workflow

---

## 🔄 System Workflow

1. User uploads a document from the frontend.
2. The frontend generates a **SHA-256 hash** using `crypto-js`.
3. The file and hash are sent to the backend API.
4. The backend re-calculates the hash using the **Node.js crypto module**.
5. If hashes match, the document metadata and hash are stored in MongoDB.
6. Later, users can upload the same document again to verify authenticity.

### 👨‍💻 Developer
Asim Mir Full-Stack Web Developer with cyber-security.