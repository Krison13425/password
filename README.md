Password Manager Application
Overview
This project is a password manager application built using Spring Boot, ReactJS, and Electron to create a cross-platform desktop application. It features user-friendly styling with Material-UI (MUI), secure OTP verification via SMTP email service, JWT authentication with Spring Security, SSL encryption for HTTP communication, and cryptographic encryption for storing passwords.

Features
Cross-Platform Desktop Application: Built with Electron for compatibility across Windows, macOS, and Linux.
Frontend: Developed with ReactJS and styled using Material-UI (MUI) for a modern and responsive user interface.
Backend: Powered by Spring Boot to handle server-side operations.
Email OTP Verification: Implements SMTP email service for sending OTP (One-Time Password) for user verification.
JWT Authentication: Utilizes Spring Security for managing JSON Web Tokens (JWT) to handle secure user authentication.
SSL Encryption: Ensures secure HTTP communication through SSL encryption.
Password Encryption: Employs cryptographic techniques to securely store user passwords.
Technologies Used
Frontend: ReactJS, Material-UI (MUI), Electron
Backend: Spring Boot, Spring Security
Email Service: SMTP
Authentication: JSON Web Tokens (JWT)
Encryption: SSL, Cryptographic Encryption
Installation
Prerequisites
Node.js
npm (Node Package Manager)
Java Development Kit (JDK)
Maven
Spring Boot
Electron
Steps
Clone the Repository:

bash
Copy code
git clone https://github.com/your-repo/password-manager-app.git
cd password-manager-app
Install Backend Dependencies:

bash
Copy code
cd backend
mvn install
Run the Backend Server:

bash
Copy code
mvn spring-boot:run
Install Frontend Dependencies:

bash
Copy code
cd ../frontend
npm install
Build and Start the Frontend:

bash
Copy code
npm start
Package the Electron App:

bash
Copy code
npm run electron-pack
Usage
Register a new account by providing an email address.
Verify your email address using the OTP sent via email.
Log in using your credentials.
Securely store and manage your passwords.
Use the app's features to add, edit, delete, and view saved passwords.
Security Features
OTP Verification: Adds an extra layer of security during the registration process.
JWT Authentication: Ensures secure and stateless user sessions.
SSL Encryption: Protects data in transit between the client and server.
Cryptographic Encryption: Safeguards stored passwords against unauthorized access.
