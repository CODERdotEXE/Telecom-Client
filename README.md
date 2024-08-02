![Repo Banner](assets/evolv%20banner.png)

# Telecom Services Application [Internship Project]

## About the Project

The Telecom Services Application is a full-stack web application that allows users to sign up, log in, manage their profiles, and browse available telecom plans. The project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application features a user authentication system, profile management, and a catalog of telecom plans that users can explore.

## How to Run the Project in a Local Environment

### Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/) (You can use MongoDB Atlas for a cloud-based solution)
- A package manager (like npm or yarn)

### Clone the Repository

```bash
git clone https://github.com/your-username/telecom-services-app.git
cd telecom-services-app
```

### Set Up the Backend

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your MongoDB connection string and any other environment variables:

   ```plaintext
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

### Set Up the Frontend

1. Navigate to the `client` directory:

   ```bash
   cd ../client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

### Running the Application

With both the frontend and backend servers running, open your browser and go to `http://localhost:3000`. You should be able to interact with the application as described in the project functionality.


## File Structure

Here is the file structure for the project:

```
telecom-services-app/
│
├── client/                          # Frontend React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.css
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Navbar.js
│   │   │   ├── PlanList.js
│   │   │   ├── Signup.js
│   │   │   └── UserProfile.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── App.js
│   ├── package.json
│   └── README.md
│
├── server/                          # Backend Express application
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   ├── models/
│   │   └── User.js                  # Mongoose model for users
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── profile.js               # Profile routes
│   │   └── plans.js                 # Telecom plans routes
│   ├── .env                         # Environment variables
│   ├── server.js                    # Main entry point for the server
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── README.md
└── package.json
```

