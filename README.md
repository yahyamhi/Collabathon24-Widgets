# Commerzbank Widget Project

This project implements a widget for the Commerzbank website, built using **React** for the frontend and **Node.js** for the backend. The widget is integrated into either the Landing Page or Customer Cockpit page as specified.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Folder Structure

```
commerzbank-widget/
│
├── backend/                 # Node.js backend
│   ├── app.js               # Main server file
│   ├── config/              # Database and config
│   ├── routes/              # API routes
│   ├── database.sqlite      # SQLite database
│   ├── .env                 # Environment variables
│   └── package.json         # Node.js dependencies
│
├── frontend/                # React frontend
│   ├── public/              # Public assets
│   ├── src/                 # Frontend source code
│   └── package.json         # React dependencies
│
└── README.md                # This README file
```

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Node.js**: Backend runtime for executing JavaScript on the server.
- **Express**: Web framework for Node.js.
- **SQLite**: Lightweight database for the backend.
- **dotenv**: Module to load environment variables.
- **cors**: Middleware for handling cross-origin requests.

## Prerequisites

Make sure you have the following installed:

- **Node.js**: v14.x or later
- **npm**: v6.x or later
- **SQLite**: Pre-installed on most systems (used for a lightweight database)

## Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone git@github.com:yahyamhi/Collabathon24-Widgets.git
cd Collabathon24-Widgets
```

### 2. Setup Backend

Navigate to the `backend/` folder and install the required dependencies:

```bash
cd backend
npm install
```

### 3. Setup Frontend

Navigate to the `frontend/` folder and install the required dependencies:

```bash
cd ../frontend
npm install
```

## Running the Project

You need to run both the **backend** and **frontend** servers.

### 1. Running the Backend

Navigate to the `backend/` folder and start the server:

```bash
cd backend
npm run dev
```

This will start the backend on `http://localhost:5000`.

### 2. Running the Frontend

Navigate to the `frontend/` folder and start the React development server:

```bash
cd ../frontend
npm start
```

The frontend will run on `http://localhost:3000`.

### 3. Accessing the Widget

After both servers are running, visit `http://localhost:3000` to view the widget on the Commerzbank page.

## Environment Variables

The project uses environment variables to store configuration data. To use these, create a `.env` file in the `backend/` folder and define your variables:

```
PORT=5000
DATABASE_URL=sqlite://database.sqlite
```
For now copy paste .envSample and rename it to .env

## API Endpoints

Here is a summary of the API endpoints available in this project:

- `GET /widget-data`: Fetches data for the widget to display on the frontend.

## Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request with any improvements, bug fixes, or new features.

## License

This project is licensed under the MIT License. Feel free to use it as needed.