<img src="https://github.com/ThayTriacca/Groupomania/blob/master/frontend/src/assets/icon-left-font-monochrome-white.svg" alt="Image" width="300" height="300">

# Groupomania
#### Build a Full-Stack Solution
<br>
<br>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![NodeJs](https://camo.githubusercontent.com/f3dc139d1f72935e63051e92a842c47c4b040004e3c4edf5430fbf8b3e1a6dd4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732532302d2532333333393933332e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)
![Sequelize](https://camo.githubusercontent.com/d8f400e17c6a74e8bb34d050085c602e6a67c2ffb2ab47de05bceed59e4f61cb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53657175656c697a652d3532423045373f7374796c653d666f722d7468652d6261646765266c6f676f3d73657175656c697a65266c6f676f436f6c6f723d7768697465)
![MySql](https://camo.githubusercontent.com/4f0ff472f9fea9762377350c39a7bcce2bad261e839bbd20cb835c608392111c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d5953514c2d3345364539333f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465)

<br>
# About the project

The Groupomania Internal Social Network is designed to enhance communication and interaction among colleagues within the organization. It provides a simple and user-friendly platform where employees can share content, engage in discussions, and stay updated on the latest news and updates.


## Features

- Simple and intuitive interface for easy navigation and feature discovery.
- Mobile-friendly account creation process to ensure accessibility from any device.
- Minimal user profile information requirement to expedite the profile setup process.
- Account deletion functionality for users to easily remove their accounts if needed.
- Open forum for employees to publish multimedia content.
- Open forum for employees to publish written content, such as articles and posts.
- Unread post indicator to allow users to quickly identify new posts by their colleagues.

## Project Documentation

Please refer to the User Requirement Specifications document [here](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Digital+Project+Manager/Group+Project/New+Version+-+Expression+of+Needs/Groupomania_Expression_Needs.pdf) for detailed information on the initial requirements and functionalities.

# Project Setup

## Backend Setup

1. Clone the project repository from GitHub:
``
gh repo clone ThayTriacca/Groupomania
``
2. Navigate to the backend directory:
``
cd backend
``
3. Install the required dependencies:
``
npm install
``
4. Create a MySQL database for the project.
5. Update the database configuration in the .env file located in the backend directory:
```
DB_HOST=localhost  
DB_USER=your-username  
DB_PASSWORD=your-password  
DB_NAME=your-databasename  
```
6. Run the database migrations to create the necessary tables:
``
npx sequelize-cli db:migrate
``
7. Start the backend server:
``
npm start
``

The backend server should now be running on http://localhost:9000.

## Frontend Setup
1. Open a new terminal window.
2. Navigate to the frontend directory:
``
cd frontend
``
3. Install the required dependencies:
``
npm install
``
4. Start the frontend development server:
``
npm start
``

The frontend server should now be running on http://localhost:3000, and you can access the Groupomania Internal Social Network application in your web browser.
