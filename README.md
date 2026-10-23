# Bachat Backend

This folder contains the API used by the Bachat frontend. It stores
transactions and savings goals in MongoDB and provides dashboard and report
data.

## Features

- Create, view, edit, and delete transactions.
- Filter transactions by month, year, type, or category.
- Create, view, edit, and delete savings goals.
- Add money to a savings goal and calculate goal progress.
- Return monthly dashboard summaries and spending by category.
- Return report totals and monthly income, expense, and savings information.

## Technology

- Node.js and Express 5
- MongoDB with Mongoose
- dotenv for local environment configuration
- CORS middleware for frontend API requests

## Requirements

- Node.js and npm
- A running MongoDB instance or MongoDB connection string

## Configure and run locally

1. Install the backend dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in this folder and add your MongoDB connection string:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/moneyhiste
   ```

   Replace the example value if your MongoDB server uses a different address.
   Keep `.env` private; it is excluded by `.gitignore`.

3. Start the API:

   ```bash
   node server.js
   ```

The server listens on `http://localhost:3000`. The current package does not
define a start script, so use `node server.js` to launch it.

## API routes

All routes use the `http://localhost:3000` base URL.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/` | Basic server response |
| `GET` | `/api/transaction` | List transactions; optional `month`, `year`, `type`, and `category` query filters |
| `GET` | `/api/transaction/:id` | Get one transaction |
| `POST` | `/api/transaction` | Create a transaction |
| `PUT` | `/api/transaction/:id` | Update a transaction |
| `DELETE` | `/api/transaction/:id` | Delete a transaction |
| `GET` | `/api/goal` | List goals with calculated progress and status |
| `GET` | `/api/goal/:id` | Get one goal |
| `POST` | `/api/goal` | Create a goal |
| `PUT` | `/api/goal/:id` | Update a goal |
| `DELETE` | `/api/goal/:id` | Delete a goal |
| `POST` | `/api/goal/:id/add-money` | Add money to a goal |
| `GET` | `/api/dashboard` | Get monthly dashboard data; optional `month` and `year` query values |
| `GET` | `/api/reports` | Get reports; optional `startMonth`, `startYear`, `endMonth`, and `endYear` query values |

The `/api/auth` route currently only returns a basic status message; it does not
provide login or account registration.
