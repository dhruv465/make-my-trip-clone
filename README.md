### Cloning the Repository

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dhruv465/make-my-trip-clone.git
   ```

2. **Navigate to Cloned Repository**:
   ```bash
   cd make-my-trip-clone
   ```

### Installing Dependencies

1. **Install Dependencies**:
   ```bash
   npm install
   ```

### Setting Up Environment Variables

#### Frontend

1. **Navigate to Client Directory**:
   ```bash
   cd client
   ```

2. **Create and Configure `.env` file**:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=Your_Google_Client_ID
   REACT_APP_BACKEND_URL=Your_Backend_URL
   ```

#### Backend

1. **Navigate to Server Directory**:
   ```bash
   cd ../server
   ```

2. **Create and Configure `.env` file**:
   ```
   PORT=8080
   FRONTEND_URL=http://localhost:3000
   MONGO_URI=Your_MongoDB_URI
   REACT_APP_GOOGLE_CLIENT_ID=Your_Google_Client_ID
   JWT_SECRET=Your_JWT_Secret_Key
   ```

### Running the Project

1. **Start Development Server**:
   ```bash
   npm start
   ```

### Building the Project

1. **Build for Production**:
   ```bash
   npm run build
   ```

### Deployment

For deployment to a hosting platform, refer to the deployment documentation specific to your hosting provider. Ensure both frontend and backend configurations are correctly set for deployment.

This structure should help you get started, manage dependencies, configure environment variables, run, build, and eventually deploy your project. Adjust paths and configurations as per your project's specific structure and requirements.
