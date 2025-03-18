# Training Consultancy Server

This is the backend server for the Training Consultancy application, responsible for handling user authentication, visa application processing, and database management.

## Features
- User authentication with Firebase
- Visa application management
- MongoDB database integration
- CORS enabled for secure API access

## Technologies Used
- Node.js
- Express.js
- MongoDB
- dotenv
- cors

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/training-consultancy-server.git
   cd training-consultancy-server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and configure your database credentials:
   ```env
   DB_USER=Training-Consultancy
   DB_PASS=PlDX6XRIwhxF0RXS
   ```

4. Start the server:
   ```sh
   npm start
   ```

## Database Connection
The server connects to MongoDB using the following URI:
```js
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.16q5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
```
Ensure that the credentials in `.env` match your MongoDB Atlas setup.

## API Endpoints

### Base URL
```
https://training-consultancy-server.vercel.app
```

### Endpoints
- **GET /visas** - Fetch all visa offers
- **POST /apply** - Apply for a visa
- **POST /login** - User authentication

## Deployment on Vercel

1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```

2. Login to Vercel:
   ```sh
   vercel login
   ```

3. Deploy the project:
   ```sh
   vercel
   ```
   Follow the prompts and select the necessary configuration.

## .gitignore
Ensure the following files and directories are ignored in Git:
```
node_modules
.env
.vercel
```

