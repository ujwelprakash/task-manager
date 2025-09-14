"# task-manager" 
Task Manager App (MERN Stack)

A full-stack Task Management Application built using the MERN stack.
Users can register, log in, create tasks, update their status (Pending, In Progress, Completed), and export tasks as PDF.

🚀 Tech Stack

Frontend: React.js, Context API, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Auth: JWT Authentication, bcrypt password hashing

Deployment:

Backend → Render

Frontend → Vercel
task-manager/
│── backend/           # Node.js + Express backend
│   ├── config/        # DB connection
│   ├── controllers/   # Auth & Task logic
│   ├── middleware/    # Auth middleware
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── server.js      # App entry point
│
│── frontend/          # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Auth & Task pages
│   │   ├── api.js      # Axios API config
│   │   └── context/    # Context API for state
│
│── .gitignore
│── README.md
│── package.json
🔑 API Endpoints
Auth

POST /api/auth/register → Register new user

POST /api/auth/login → Login user

Tasks

GET /api/tasks → Fetch all tasks

POST /api/tasks → Create task

PUT /api/tasks/:id → Update task

DELETE /api/tasks/:id → Delete task
