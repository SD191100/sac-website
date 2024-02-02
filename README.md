Todo-App
- Website for my Department's community with React, Node.js, and MongoDB.
## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
## Introduction
It is created to make a organised place to set information about SAC, Events, Newsletters, and Team members. It has an Admin section as well to add, remove and edit all the data.

![todo-app](https://github.com/SD191100/images/blob/main/todo-app-image.png?raw=true)

## Features
- Show Team, Events, Photos, Newsletters.
- Delete Team, Events, Photos, Newsletters.
- Edit Team, Events, Photos, Newsletters.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
  
## Getting Started
1. Clone the repository:

```bash
git clone https://github.com/SD191100/react-todo-app.git
```

2. Navigate to the server directory and install dependencies:

```bash
cd backend
npm i
```
3. Create a .env file in root directory
```
DB_HOST=<cluster_name>.<link>.mongodb.net
DB_USER=<username>
DB_PASSWORD=<password>
SECRET_KEY=s3cr3tK3y
PORT=3000
```
4. Start the server:

```bash
node index.js
```
5. Navigate to the client directory and install dependencies:

```bash
cd ../frontend
npm i
```
6. Start the React app:

```bash
npm run dev
```

Project Structure
```bash
.
├── backend
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── db
│       │   └── index.js
│       ├── middleware
│       │   └── auth.js
│       ├── routes
│       │   ├── admin.js
│       │   └── user.js
│       └── testing
│           └── SAC App.postman_collection.json
└── frontend
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── public
    │   └── images
    │       ├── background.jpg
    │       ├── logo.png
    │       ├── sac1.png
    │       └── sac.png
    ├── README.md
    ├── src
    │   ├── App.jsx
    │   ├── components
    │   │   ├── admin
    │   │   │   ├── Add.jsx
    │   │   │   ├── Admin.jsx
    │   │   │   ├── Edit.jsx
    │   │   │   ├── Login.jsx
    │   │   │   └── Show.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Events.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Gallery.jsx
    │   │   ├── Home.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Newsletter.jsx
    │   │   └── Team.jsx
    │   └── main.jsx
    └── vite.config.js
```

Technologies Used
- React
- Node.js
- MongoDB
