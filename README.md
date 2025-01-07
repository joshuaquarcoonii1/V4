# OptiWaste


## Prerequisites
- **Node.js** and **npm** installed.
- **React Native CLI** or **Expo CLI** (depending on your setup).
- MongoDB for the database.

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/your-username/optiwaste.git
cd optiwaste
```

### Install Dependencies
Run the following command to install required dependencies:
```bash
npm install
```

### Environment Variables
You must provide your own JWT secret and MongoDB connection string for the application to work.

1. Create a `.env` file in the root of the project.
2. Add the following variables to the `.env` file:
   ```env
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

### Running the App
To start the app in development mode:
```bash
npm start
```
Follow the prompts to run the app on your preferred device or emulator.

## Backend Setup
The backend API is included in this repository under the `backend` folder. Ensure you:

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The server should run on `http://localhost:9000` by default.

## Frontend Setup
The frontend is located in the `frontend` folder. Ensure you:

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm start
   ```

## Contributions
Contributions are welcome! Feel free to fork this repository, create a branch, and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Important Notes
- Ensure you use your own JWT secret and MongoDB connection string to maintain security.
- Do not expose sensitive information in the public repository or commits.
- Use `.env` files for storing secrets and add `.env` to your `.gitignore` file.

## Contact
For questions or support, please reach out via joshuaquarcoonii1@gmail.com or open an issue in the repository.

