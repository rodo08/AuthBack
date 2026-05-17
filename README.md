# MERN Auth — Backend

REST API for the MERN authentication system. Handles user registration, login, email verification, and password reset using JWT stored in HTTP-only cookies.

## Stack

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose** — user persistence
- **bcryptjs** — password hashing
- **jsonwebtoken** — JWT generation and verification
- **Mailgun** — transactional email (verification + password reset)
- **cookie-parser** — HTTP-only cookie handling
- **dotenv** — environment variable management

## Features

- Signup with hashed password and 7-digit email verification token
- Email verification via OTP (expires in 24 hours)
- Login with JWT issued as HTTP-only cookie (1 day expiry)
- Logout by clearing the cookie
- Forgot password — sends reset link via Mailgun
- Reset password via signed token (expires in 1 hour)
- Protected route middleware (`verifyToken`)
- CORS whitelist for local and production frontend URLs

## Project Structure

```
backend/
├── controllers/
│   └── auth.controller.js    # Signup, login, logout, verify, reset
├── db/
│   └── connectDB.js          # Mongoose connection
├── email/
│   ├── email.service.js      # Mailgun send wrapper
│   ├── emails.js             # Email dispatch functions
│   ├── emailTemplates.js     # HTML email templates
│   └── mailgun.client.js     # Mailgun client init
├── middlewares/
│   └── verifyToken.js        # JWT cookie middleware
├── models/
│   └── user.model.js         # User schema
├── routes/
│   └── auth.route.js         # Auth routes
├── utils/
│   └── generateTokenAndSetCookie.js
└── index.js                  # Entry point
```

## Environment Variables

Create a `.env` file in this directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
MAILGUN_FROM=Your App <noreply@yourdomain.com>
```

## Getting Started

```bash
bun install
bun run dev
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/signup` | No | Register new user |
| `POST` | `/api/auth/login` | No | Login |
| `POST` | `/api/auth/logout` | No | Logout |
| `POST` | `/api/auth/verify-email` | No | Verify OTP code |
| `POST` | `/api/auth/forgot-password` | No | Request reset link |
| `POST` | `/api/auth/reset-password/:token` | No | Set new password |
| `GET` | `/api/auth/check-auth` | Yes | Verify active session |
