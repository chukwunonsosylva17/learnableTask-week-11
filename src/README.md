# Note-Taking API
 
 A RESTful API for a simple note-taking application built with Node.js, Express, TypeScript, and MongoDB.
 
 ## Overview
 
 This API provides core functionality for managing notes including creating, retrieving, and deleting notes. Each note consists of a title, content, and automatically tracked timestamps.
 
 ## Features
 
 - **TypeScript Implementation**: Fully typed application with interfaces and type-safety
 - **MongoDB Integration**: Persistent storage using Mongoose ODM
 - **RESTful API Design**: Clean, consistent endpoint structure
 - **Error Handling**: Custom error classes with appropriate HTTP status codes
 - **API Documentation**: Interactive Swagger UI documentation
 - **Input Validation**: Data validation for creating and updating notes
 - **Scalable Architecture**: Organized codebase with separation of concerns
 
 ## API Documentation
 
 The API includes interactive documentation using Swagger UI.
 
 - **Access URL**: `http://localhost:5000/api-docs`
 - **Features**:
   - Browse all available endpoints
   - See request/response schemas
   - Test API calls directly from your browser
   - View detailed parameter information
 
 To access the documentation:
 1. Start the application
 2. Open your browser
 3. Navigate to `http://localhost:5000/api-docs`
 
 ## API Endpoints
 
 | Method | Endpoint | Description |
 |--------|----------|-------------|
 | GET | `/api/notes` | Retrieve all notes (sorted by last updated) |
 | GET | `/api/notes/:id` | Retrieve a specific note by ID |
 | POST | `/api/notes` | Create a new note |
 | DELETE | `/api/notes/:id` | Delete a note by ID |
 
 ## Note Model
 
 Each note contains:
 
 - `_id`: Unique identifier (auto-generated)
 - `title`: Note title (required, max 100 characters)
 - `content`: Note content (required)
 - `createdAt`: Timestamp of creation (auto-generated)
 - `updatedAt`: Timestamp of last update (auto-generated)
 
 ## Prerequisites
 
 - Node.js (v14 or higher)
 - MongoDB (local instance or MongoDB Atlas)
 - npm or yarn
 
 ## Installation
 
 1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/note-taking-api.git
    cd note-taking-api
    ```
 
 2. Install dependencies:
    ```bash
    npm install
    ```
 
 3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/note-taking-app
    ```
    *Note: Update the MONGO_URI as needed for your environment*
 
 ## Running the Application
 
 ### Development Mode
 
 ```bash
 npm run dev
 ```
 
 This will start the server with hot-reloading enabled.
 
 ### Production Mode
 
 ```bash
 npm run build
 npm start
 ```