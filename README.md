# 📷 MERN Instagram Clone

A full-stack social media application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). This app includes authentication, posting photos or video, upload Reels, like/comment, real-time notifications, and **private messaging** between users.

---

## 🔗 Demo

🌐https://mern-instagram-liard.vercel.app/

---

## 🚀 Features

-   🔐 JWT-based Authentication (Login/Register)
-   👤 View Profiles & Follow/Unfollow Users
-   📷 Post Images (with Cloudinary)
-   ❤️ Like & 💬 Comment on Posts or Reels
-   📷 Stories are automatically deleted 24 hours after being posted,
-   🛎 Real-time Notifications (Socket.IO)
-   ✉️ **Real-time Chat & Messaging**
-   🔍 Suggested Users
-   🎨 Tailwind CSS for UI
-   🖥️ Fully Responsive (Mobile/Desktop)

---

## 🧱 Tech Stack

### 🔙 Backend

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   Socket.IO
-   JWT + bcryptjs
-   Cloudinary (image hosting)
-   Multer (file uploads)
-   Nodemailer (email service)
-   dotenv
-   cookie-parser
-   CORS

### 🔜 Frontend

-   React 19 + Vite
-   React Router DOM v7
-   Redux Toolkit + React Redux
-   Axios
-   Tailwind CSS
-   Socket.IO Client
-   React Icons
-   React Spinners
-   ESLint + TypeScript types (optional)

---

## 📁 Folder Structure

```
MERN-instagram/
|-- backend/
| |--config/
| |--controllers/
| |--middlewares/
| |--models/
| |--public/
| |--routes/
| |--.env
| |--index.js
| |--package.json
| |--socket.js
|--frontend/
| |--public/
| |--src/
| |--.env
| |--index.html
| |--package.json
| |--vite.config.js
|--README.md
```

---

## ⚙️ Installation

1. Clone repo
   git clone https://github.com/truong93540/MERN-Instagram.git
   cd MERN-instagram

2. Backend Setup
   cd backend
   npm install

Create .env in backend/ folder:

```
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL=your_email_address
EMAIL_PASS=your_email_app_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```
npm run dev
```

3. Setup Frontend

Create .env in frontend/ folder:

```
VITE_SERVER_URL='http://localhost:8000'
```

Start the frontend

```
   cd ../frontend
   npm install
   npm run dev
```

Visit: http://localhost:5173

---

📦 Dependencies Overview

Backend
| Package | Purpose |
| ------------- | ---------------------------- |
| express | Web server framework |
| mongoose | MongoDB ORM |
| bcryptjs | Password hashing |
| jsonwebtoken | Auth with JWT |
| multer | File upload (images) |
| cloudinary | Cloud image, video storage |
| nodemailer | Send email |
| dotenv | Environment variables |
| cors | CORS config |
| cookie-parser | Handle cookies |
| socket.io | Real-time notifications/chat |
| nodemon | Dev server auto-reload |

Frontend
| Package | Purpose |
| ---------------- | ------------------- |
| react | UI library |
| react-router-dom | Routing |
| redux-toolkit | State management |
| axios | API calls |
| tailwindcss | Styling |
| socket.io-client | Real-time messaging |
| react-icons | UI Icons |
| react-spinners | Loading UI |
| vite | Build tool |
| eslint | Linting |

## 🔐 API Endpoints

| Endpoint       | Description                 |
| -------------- | --------------------------- |
| `/api/auth`    | User authentication         |
| `/api/user`    | User profile & settings     |
| `/api/post`    | Create, like, comment posts |
| `/api/loop`    | Follow/unfollow, like logic |
| `/api/story`   | Story feature               |
| `/api/message` | Chat system (real-time)     |

---

🚀 Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
Cloudinary: For image, video uploads

---

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

📄 License
This project is licensed under the MIT License.

📧 Contact
Nguyễn Văn Trường
📬 Email: truong93540@gmail.com
