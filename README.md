# Password Manager Application

## Overview
This project is a password manager application built using Spring Boot, ReactJS, and Electron to create a cross-platform desktop application. It features user-friendly styling with Material-UI (MUI), secure OTP verification via SMTP email service, JWT authentication with Spring Security, SSL encryption for HTTP communication, and cryptographic encryption for storing passwords. The application also includes SwiperJS for enhanced interactive UI elements.

## Features
- **Cross-Platform Desktop Application**: Built with Electron for compatibility across Windows, macOS, and Linux.
- **Frontend**: Developed with ReactJS and styled using Material-UI (MUI) for a modern and responsive user interface.
- **Backend**: Powered by Spring Boot to handle server-side operations.
- **Email OTP Verification**: Implements SMTP email service for sending OTP (One-Time Password) for user verification.
- **JWT Authentication**: Utilizes Spring Security for managing JSON Web Tokens (JWT) to handle secure user authentication.
- **SSL Encryption**: Ensures secure HTTP communication through SSL encryption.
- **Password Encryption**: Employs cryptographic techniques to securely store user passwords.
- **Interactive UI Elements**: Uses SwiperJS for creating responsive and touch-friendly carousels and sliders.

## Technologies Used
- **Frontend**: ReactJS, Material-UI (MUI), Electron, SwiperJS
- **Backend**: Spring Boot, Spring Security
- **Email Service**: SMTP
- **Authentication**: JSON Web Tokens (JWT)
- **Encryption**: SSL, Cryptographic Encryption


### Usage
1. Register a new account by providing an email address.
2. Verify your email address using the OTP sent via email.
3. Log in using your credentials.
4. Securely store and manage your passwords.
5. Use the app's features to add, edit, delete, and view saved passwords.

### Security Features
1. OTP Verification: Adds an extra layer of security during the registration process.
2. JWT Authentication: Ensures secure and stateless user sessions.
3. SSL Encryption: Protects data in transit between the client and server.
4. Cryptographic Encryption: Safeguards stored passwords against unauthorized access.

