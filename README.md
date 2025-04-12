#EventsOn – University Event Management System

EventsOn is a full-stack web application designed to streamline event planning and coordination within a university setting. 
The platform empowers students and administrators to efficiently schedule, manage, and track events, enhancing campus engagement and organizational transparency.

#Live Demo

- Frontend: [https://events-on.vercel.app](https://events-on.vercel.app)  
- Backend: [https://eventson-backend.onrender.com](https://eventson-backend.onrender.com)

---

#Key Features

- Role-Based Access  
  - Club Heads: Schedule events, view ongoing and upcoming events.  
  - Admins: Approve or reject event requests, manage event timelines, and view reports.

- Event Scheduling & Tracking  
  Submit events with essential details like name, type, venue, date, time, and expected attendees.

- Automatic Event Categorization 
  Events are organized as **Ongoing**, **Upcoming**, or **Past** based on current time.

- Admin Dashboard
  Manage event requests with filtering options and status updates (Pending, Approved, Rejected).

- Navigation & Responsive UI
  A dynamic and user-friendly interface with carousel banners, modals, and smooth routing.

- Authentication
  Secure login using token-based authentication and persistent sessions with `localStorage`.

---

#Tech Stack

Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Render (deployment)

Frontend
- React.js
- React Router
- Bootstrap
- Vercel (deployment)

---

#Folder Structure

```
EventsOn/
│
├── backend/              # Node.js + Express backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── index.js
│
├── eventson/             # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
├── vercel.json
└── README.md
```

---

#Setup Locally

1. Clone the repository:
```bash
git clone https://github.com/pranavsambidi/EventsOn.git
cd EventsOn
```

2. Setup Backend:
```bash
cd backend
npm install
npm start
```

3. Setup Frontend:
```bash
cd ../eventson
npm install
npm start
```

---

#Environment Variables

Create a `.env` file in the **backend** directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

In Vercel (frontend) and Render (backend), add these environment variables in the project settings.

---

#Deployment

Frontend on Vercel
- Push the `eventson/` directory to GitHub
- Connect to Vercel, set root directory to `eventson`
- Set environment variables if needed

Backend on Render
- Push the `backend/` directory to GitHub
- Create a new Render Web Service from the repo
- Set environment variables in the Render dashboard

---
#Outcome:

Built and deployed a collaborative platform that streamlines event management, minimizes administrative tasks, and boosts student participation.



