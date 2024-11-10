# Document Collaboration App - Frontend

This project is a collaborative document editor built with **ReactJS**. It allows multiple users to collaborate on a document in real-time, leveraging technologies like **Socket.IO** for real-time communication and **Axios** for API requests. Users can edit and share documents, and all changes are reflected instantly across all users.

---

## Features

- **Real-Time Collaboration**: Multiple users can collaborate on the same document at the same time.
- **Document Creation**: Users can create new documents and share them with collaborators.
- **User registration**: Just type their name and join.
- **User Roles**: Supports document owner and collaborators, with distinct permissions.
- **Auto-Save**: Changes to the document are saved in real-time to the server.

---

## Technologies Used

- **ReactJS**: A JavaScript library for building user interfaces.
- **Socket.IO**: Real-time web socket communication to handle live document editing.
- **Axios**: Promise-based HTTP client for making API requests to the backend.
- **MongoDB**: Database used for storing user information and document data.
- **Material UI**: React UI framework for building a modern and responsive design.

---

## Installation

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (>= v14.x.x)
- **npm** or **Yarn**

### Steps to Set Up the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/document-collaboration-app.git
   cd collab-doc-client
   ```

2. **Install dependencies:**:
   ```
   npm install
   ```

3. **Start the development server::**:
   ```
   npm start
   ```
---

## Usage

### Add User
- A user can enter their name to start collaboration.

### Create New Document
- Users can click on "Add new document" to create a new document, and they will become the owner of the document.

### Add Collaborator
- Any user can click on another user's document, and they will be automatically added as a collaborator.

### Real-Time Editing
- As a user types or edits the document, all changes are immediately reflected on the screen for other collaborators.

### Auto-Save
- The document is automatically saved to the server in real-time to Redis, and at periodic intervals, it is written to MongoDB.