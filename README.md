# Employee Management System

Simple CRUD web application for managing employee records.

## Tech Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- JSON file storage

## Features

- View employee list
- Add employee
- Edit employee
- Delete employee
- Employee No is auto-generated
- Data is saved in `Server/employees.json`

## How to Run

Start the backend:

```bash
cd Server
npm install
npm run dev
```

Start the frontend in another terminal:

```bash
cd Client
npm install
npm run dev
```

Frontend URL is usually:

```bash
http://localhost:5173
```

Backend URL:

```bash
http://localhost:5000
```

## API Routes

- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

## Build

```bash
cd Client
npm run build
cd ../Server
npm start
```
