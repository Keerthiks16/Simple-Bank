# Simple Bank Web Application 🏦

A full-stack web application that simulates basic banking operations with user authentication, account management, and transaction processing.

## 🚀 Features

### Customer Features
- **User Registration & Authentication** - Secure signup and login with JWT tokens
- **Account Management** - View account balance and profile information
- **Deposit Money** - Add funds to your account
- **Withdraw Money** - Withdraw funds with balance validation
- **Transfer Money** - Send money to other users by username
- **Transaction History** - View all your past transactions

### Banker Features
- **Admin Dashboard** - Special banker interface with elevated privileges
- **Customer Overview** - View all registered customers and their details
- **Transaction Monitoring** - Access to all system transactions
- **Customer Transaction History** - View specific customer's transaction records

### Security & Authentication
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt password encryption
- **Role-Based Access Control** - Different access levels for customers and bankers
- **HTTP-Only Cookies** - Secure token storage

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - State management for user authentication

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
simple-bank/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context for state management
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
└── server/                # Node.js backend
    ├── controllers/       # Business logic
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── middleware/       # Authentication middleware
    └── config/           # Database configuration
```


## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- Git

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=simple_bank
JWT_SECRET=your_jwt_secret_key
SALT_ROUNDS=12
NODE_ENV=development
PORT=5000
```

4. Set up MySQL database:
```sql
CREATE DATABASE simple_bank;
```

5. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - User email address
- `password` - Hashed password
- `age` - User age (optional)
- `gender` - User gender (optional)
- `typeofuser` - Role (customer/banker)
- `balance` - Account balance (default: 1000.0)

### Transactions Table
- `id` - Primary key
- `senderId` - Foreign key to users (nullable)
- `receiverId` - Foreign key to users (nullable)
- `amount` - Transaction amount
- `transactionType` - Type (deposit/withdrawal/transfer)
- `description` - Transaction description
- `timestamp` - Transaction timestamp

## 🔐 Security Features

- **Password Hashing** - All passwords are hashed using bcrypt
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access** - Different permissions for customers and bankers
- **Input Validation** - Server-side validation for all inputs
- **Database Transactions** - Atomic operations for money transfers
- **HTTP-Only Cookies** - Secure token storage to prevent XSS attacks



---

*This is a demonstration project for educational purposes. Not intended for production use without proper security auditing.*
