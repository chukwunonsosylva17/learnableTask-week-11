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
 
 ## API Documentation
 
 The API includes interactive documentation using Postman UI.
 
 - **Access URL**: `https://documenter.getpostman.com/view/28027423/2sAYk8tNMp`
 - **Features**:
   - Browse all available endpoints
   - See request/response schemas
   - Test API calls directly from your browser
   - View detailed parameter information
 
 To access the documentation:
 1. Start the application
 2. Open your browser
 3. Navigate to `https://documenter.getpostman.com/view/28027423/2sAYk8tNMp`
 
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
 - `title`: Note title
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
    git clone https://github.com/chukwunonsosylva17/learnableTask-week-11.git
    cd note-taking-api
    ```
 
 2. Install dependencies:
    ```bash
    npm install
    ```
 
 3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=8080
    MONGO_URI= mongodb+srv://noscaro212gs:<_dbpassword>@cluster0.lco2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
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

 The application will be available at `http://localhost:8080/api/notes` ( the PORT specified in .env).
 The API documentation is available at `https://documenter.getpostman.com/view/28027423/2sAYk8tNMp`
 
 ## API Usage Examples
 
 ### Get All Notes
 
 ```
 GET /api/notes

 Response: 
 ``` json 
 {
    "status": "success",
    "results": 4,
    "data": {
        "notes": [
            {
                "_id": "67d033bcfda7d104e96bbb7d",
                "title": "Meeting Notes",
                "content": "Discuss project timeline and resource allocation",
                "createdAt": "2025-03-11T12:59:40.691Z",
                "updatedAt": "2025-03-11T12:59:40.691Z"
            },
            {
                "_id": "67d033b0fda7d104e96bbb7b",
                "title": "Weekly Tasks",
                "content": "API documentation, API testing, Unit testing",
                "createdAt": "2025-03-11T12:59:28.972Z",
                "updatedAt": "2025-03-11T12:59:28.972Z"
            },
            {
                "_id": "67d031cefda7d104e96bbb78",
                "title": "Groceries Shopping",
                "content": "Tomatoes, Apple, Bread, Vegetable oil",
                "createdAt": "2025-03-11T12:51:26.889Z",
                "updatedAt": "2025-03-11T12:51:26.889Z"
            },
            {
                "_id": "67d0253bfda7d104e96bbb69",
                "title": "First Note",
                "content": "This is my first note",
                "createdAt": "2025-03-11T11:57:47.212Z",
                "updatedAt": "2025-03-11T11:57:47.212Z"
            }
        ]
    }
}
```

### Get Note By ID

```
Get /api/notes/<note-id>

Response:
```json
{
    "status": "success",
    "data": {
        "note": {
            "_id": "67d0127ffda7d104e96bbb67",
            "title": "First Note",
            "content": "This is my first note",
            "createdAt": "2025-03-11T10:37:52.090Z",
            "updatedAt": "2025-03-11T10:37:52.090Z"
        }
    }
}
```


### PUT Update Note By ID

```
Put /api/notes/<note-id>

Response:
```json
{
    "status": "success",
    "data": {
        "note": {
            "_id": "67d0127ffda7d104e96bbb67",
            "title": "First Note",
            "content": "Tomatoes, Apple, Bread, Vegetable oil",
            "createdAt": "2025-03-11T10:37:52.090Z",
            "updatedAt": "2025-03-11T12:23:47.586Z"
        }
    }
}

 ### Delete Note
 
 ```
 DELETE /api/notes/67d0127ffda7d104e96bbb67 
 ```
 
 Response: Status 204 No Content
 
 ## Error Handling
 
 The API provides clear error messages with appropriate HTTP status codes:
 
 - `400 Bad Request`: Invalid input data
 - `404 Not Found`: Resource not found
 - `500 Internal Server Error`: Unexpected server errors
 
 Example error response:
 ```json
{
    "status": "fail",
    "message": "Note with ID 67d0127ffda7d104e96bbb67 not found"
}
 ```
 
 ## Project Structure
 
 ```
 note-api/
 ├── src/
 │   ├── config/
 │   │   ├── db.ts              // Database connection logics
 │   ├── controllers/
 │   │   └── noteController.ts  // Route handler functions
 │   ├── interfaces/
 │   │   └── noteInterface.ts   // TypeScript interfaces
 │   ├── middleware/
 │   │   └── errorMiddleware.ts // Error handling middleware
 │   ├── models/
 │   │   └── noteModel.ts       // Mongoose schema and model
 │   ├── routes/
 │   │   └── noteRoutes.ts      // API route definitions
 │   ├── utils/
 │   │   └── errorClasses.ts    // Custom error classes
 │   ├── app.ts                 // Express app setup
 │   └── server.ts              // Server entry point
 ├── .env                       // Environment variables
 ├── tsconfig.json              // TypeScript configuration
 └── package.json               // Project dependencies
 ```