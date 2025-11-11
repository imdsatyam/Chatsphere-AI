# ChatSphere AI
Welcome to **ChatSphere AI** — an intelligent, real-time chat and automation platform built to streamline communication, enhance collaboration, and integrate AI-powered assistance for teams and individuals.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

## About the Project
**ChatSphere AI** is a modern chat and collaboration platform integrated with AI capabilities to assist users in managing conversations, automating replies, and improving productivity.
It provides a secure, scalable, and responsive environment for both team and personal communication — powered by real-time data sync and intelligent AI features.

### Key Objectives:
- Simplify and accelerate real-time communication.
- Enhance user productivity using AI-driven smart suggestions and automation.
- Provide an intuitive and responsive user experience across devices.
- Deliver a scalable solution for both individual and enterprise needs.

## Features
- 💬 **Real-time Chat System** – Send and receive messages instantly with live updates.
- 🤖 **AI-Powered Assistance** – Get smart suggestions, summaries, and auto-replies powered by AI.
- 🧑‍🤝‍🧑 **User Management** – Secure login, registration, and profile management.
- 📂 **Conversation History** – Store and retrieve previous chat sessions easily.
- 🔐 **Authentication & Security** – Secure user data with JWT and bcrypt encryption.
- ⚙️ **Admin Panel** – Manage users, monitor activity, and configure system settings.
- 📱 **Responsive Design** – Optimized for all screen sizes and devices.

## Folder Structure
- **frontend/** – Contains the React-based user interface for ChatSphere AI.
- **backend/** – Node.js + Express backend handling API requests, authentication, and database operations.
- **config/** – Environment setup and configuration files.
- **models/** – Database schemas and data models.
- **controllers/** – API logic and request handlers.
- **routes/** – API endpoint definitions.

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Context API / Redux

### Backend
- Node.js with Express.js
- MongoDB (via Mongoose ORM)
- JWT for authentication
- bcrypt for password encryption

### AI Integration
- OpenAI API / Custom NLP Model (depending on setup)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database running locally or on cloud (e.g., MongoDB Atlas)

### Steps

#### 1️⃣ Clone the Repository
git clone https://github.com/imdsatyam/chatsphere-AI.git
cd chatsphere-AI

#### 2️⃣ Setup Backend
cd backend
npm install
npm run dev

Your backend server will start on http://localhost:5000 by default.

#### 3️⃣ Setup Frontend
cd ../frontend
npm install
npm start

Your frontend will start on http://localhost:3000.

## Environment Variables

Create a .env file in both frontend and backend directories.

### Example for Backend
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatsphereAI
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-api-key

### Example for Frontend
REACT_APP_API_URL=http://localhost:5000

## Usage
1. Open the frontend at http://localhost:3000.
2. Register or log in to your ChatSphere AI account.
3. Start chatting, explore AI assistance, and manage conversations.
4. Access admin controls (if enabled) for user and chat management.

## License
This project is licensed under the **MIT License** — free to use, modify, and distribute.
