# Authentication Backend

A robust Node.js and Express backend service implementing secure user authentication and authorization. This project handles user registration, login, email verification, password management, and session handling using JWT (JSON Web Tokens).

## Features

*   **User Registration**: Secure sign-up with password hashing (bcryptjs).
*   **Email Verification**: Code-based email verification using Mailtrap.
*   **Authentication**: Login with secure HTTP-only cookies and JWT.
*   **Password Management**: Forgot password and reset password functionality via email.
*   **Session Management**: Secure sign-out and session verification.
*   **Security**: Implements security best practices including input validation and secure cookie handling.

## Tech Stack

*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
*   **Authentication**: [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken), [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
*   **Email Service**: [Mailtrap](https://mailtrap.io/)
*   **Validation**: Custom validation middleware.

## Prerequisites

Before getting started, ensure you have the following installed:

*   **Node.js** (v14 or higher recommended)
*   **npm** (Node Package Manager)
*   **MongoDB** (Local instance or Atlas cluster)
*   **Mailtrap Account** (For email testing)

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
jwtSecret=your_jwt_secret_key
NODE_DEV=development
MAILTRAP_API=your_mailtrap_api_token
```

> [!WARNING]
> Keep your `.env` file secure and never commit it to version control.

## Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000` (or your configured PORT).

4.  **Start for production:**
    ```bash
    npm start
    ```

## API Documentation

### Authentication Endpoints

Base URL: `/api/v1/auth`

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/sign-up` | Register a new user | `email`, `password`, `name` |
| `POST` | `/sign-in` | Login user | `email`, `password` |
| `POST` | `/sign-out` | Logout user | None |
| `POST` | `/verify-email` | Verify email with code | `code` |
| `POST` | `/forgot-password` | Request password reset | `email` |
| `POST` | `/reset-password/:token` | Reset password | `password` |
| `GET` | `/check-auth` | Check current session | None (Requires Cookie) |

## Project Structure

```
backend/
├── config/             # Configuration files (env, etc.)
├── controllers/        # Request handlers (auth logic)
├── DB/                 # Database connection logic
├── EmailTemplates/     # HTML templates for emails
├── MailTrap/           # Mailtrap client configuration
├── middlewares/        # Middleware (auth check, validation)
├── Models/             # Mongoose schemas/models
├── Routers/            # API Route definitions
├── utils/              # Utility functions
├── ValidationSchemas/  # Input validation schemas
├── app.js              # Express app setup
└── server.js           # Entry point (if applicable)
```

## Security Note

This project uses `dotenv` to manage secrets. Ensure `.env` is added to your `.gitignore` file to prevent accidental exposure of credentials.
