# 💅 Nail Studio Web Application

🎉 **Nail Studio** is a web application that allows users to easily book appointments, select appointment types, and add notes.  
This application is built using **React**, **Node.js**, **Redux**, and **MongoDB**.

---

## ✨ **Features**
- 🔐 **User Authentication**: Secure JWT-based login and registration.
- 📅 **Appointment Booking**:
  - 💇‍♀️ Select appointment type and time.
  - 📝 Add custom notes for the appointment.
- 🖥️ **User Dashboard**:
  - 📆 View and manage upcoming appointments.
  - ✏️ Edit or add notes to your bookings.

---

## 🛠️ **Tech Stack**

### **Frontend**
- **React.js**: Building the user interface.
- **Redux**: For state management.
- **HTML/CSS**: For layout and styling.

### **Backend**
- **Node.js**: Server-side runtime environment.
- **Express.js**: API routes and middleware.

### **Database**
- **MongoDB**: NoSQL database to store user and appointment data.

---

## 📥 **Installation**

Follow these steps to set up the project locally:

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running locally or use a cloud service like MongoDB Atlas)

## 🏗️ Setup & Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/selenkarakaya/nailstudio.git
    cd nailstudio
    ```
2. **Install dependencies** for both frontend and backend:
    ```bash
    # Install frontend dependencies
    cd frontend
    npm install

    # Install backend dependencies
    cd backend
    npm install
    ```

3. **Environment Variables**:
   Set up a `.env` file in the root directory.

   ```plaintext
   NODE_ENV = development
   PORT = 8000
   MONGO_URI = your mongodb uri
   JWT_SECRET=your_jwt_secret
   ```
4. **Start the application**: To run both frontend and backend concurrently, navigate to the root folder and run:
   ```
   npm run dev
   ```
5. Run Tests: To run tests for the project, make sure Jest or your chosen test framework is installed:
   - Frontend Testing: Navigate to the frontend folder and run the frontend tests:
    ```
    cd frontend
    npm test
    ```


📝 **API Endpoints**
--------------------

### **Authentication**

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login with email and password.

### **Appointments**

- `GET /api/appointments`: Fetch all user appointments.
- `POST /api/appointments`: Book a new appointment.
- `PUT /api/appointments/:id`: Update an appointment note.
- `DELETE /api/appointments/:id`: Cancel an appointment.


## 📄 License

This project is open-source and available for personal or educational use.

---

## 📬 Contact

If you have any questions or feedback, feel free to reach out via [LinkedIn](https://www.linkedin.com/in/selenkarakaya/) or [GitHub](https://github.com/selenkarakaya).


## Happy coding! 👩‍💻👨‍💻
