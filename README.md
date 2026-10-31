# nextjs-auth-app

![CI](https://github.com/aayxshkumar/nextjs-auth-app/actions/workflows/ci.yml/badge.svg)

> Learning project from January 2024.

An email and password auth flow built with Next.js route handlers, MongoDB and JWT cookies.

## What it does

- Sign up (`/signup`): hashes the password with bcryptjs, saves the user with Mongoose and sends a verification email through Mailtrap's sandbox SMTP server.
- Verify email (`/verifyemail?token=...`): marks the user as verified if the token matches and has not expired (1 hour).
- Log in (`/login`): checks the password and sets a signed JWT (valid for 1 hour) in an httpOnly `token` cookie.
- Profile (`/profile`): reads the current user from `/api/users/me` and can log out, which clears the cookie.
- `src/middleware.ts` redirects signed-out visitors away from `/` and `/profile`, and signed-in visitors away from `/login`, `/signup` and `/verifyemail`.

## Known issues

This was written while learning, and some parts do not work as intended. Visible in the code:

- The user schema has no `email` field, but signup and login look users up by `email`.
- The signup route does not `await` `newUser.save()`, and the login route never calls `connect()`.
- `src/models/userModel.js` checks `mongoose.model.users` instead of `mongoose.models.users`.
- The home page (`/`) is still the create-next-app starter page.

## Tech stack

- Next.js 15 (App Router), React 18, TypeScript
- Tailwind CSS
- MongoDB with Mongoose
- bcryptjs, jsonwebtoken, Nodemailer, axios, react-hot-toast

## Getting started

Requires Node.js 22 (the version used in CI) and a MongoDB instance.

```bash
git clone https://github.com/aayxshkumar/nextjs-auth-app.git
cd nextjs-auth-app
npm ci
cp .env.example .env.local   # then fill in your values
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run lint
npm run build
npm start
```

### Environment variables

| Name | Used for |
| --- | --- |
| `MONGO_URL` | MongoDB connection string |
| `TOKEN_SECRET` | Secret used to sign and verify the JWT |
| `DOMAIN` | Base URL used in verification email links |
| `MAILTRAP_USER` | Mailtrap sandbox SMTP username |
| `MAILTRAP_PASS` | Mailtrap sandbox SMTP password |

`npm run build` does not need a database. CI builds with placeholder values; see `.github/workflows/ci.yml`.
