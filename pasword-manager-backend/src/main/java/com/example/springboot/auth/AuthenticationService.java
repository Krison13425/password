package com.example.springboot.auth;

import com.example.springboot.Access.UserAccess;
import com.example.springboot.Model.User;
import com.example.springboot.Service.EmailService;
import com.example.springboot.Service.IDGenerator;
import com.example.springboot.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthenticationService {

    private static final String CLIENT_ID = "738533525256-jorjtsdk4jnjp7dla79a1umkn4svma97.apps.googleusercontent.com";
    private final String GOOGLE_USER_INFO_ENDPOINT = "https://www.googleapis.com/oauth2/v3/tokeninfo";
    @Autowired
    UserAccess userAccess;
    @Autowired
    EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid username or password"
            );
        }

        User user = userAccess.findUserByName(request.getUsername());
        var jwtToken = jwtService.generateToken(user);

        AuthenticationResponse response = new AuthenticationResponse();
        response.setToken(jwtToken);;
        return response;
    }

    public Boolean registerUser(AuthenticationRequest request) {
        User existingUser = userAccess.findUserByName(request.getUsername());

        if (existingUser != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User with this email already exists."
            );
        }

        User newUser = new User();
        newUser.setUserId(IDGenerator.generateUUID());
        newUser.setUserName(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        int rowsAffected =  userAccess.createUser(newUser);

        if (rowsAffected > 0) {
            return true;
        }

        return false;

    }

//    public boolean verifyToken(String token) {
//        User user = userAccess.findUserByToken(token);
//        if (user != null) {
//            user.setEmailVerified(true);
//            boolean success = userAccess.updateEmailVerificationStatus(user);
//            if (!success) {
//                throw new ResponseStatusException(
//                        HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update email verification status."
//                );
//            }
//            return true;
//        } else {
//            throw new ResponseStatusException(
//                    HttpStatus.NOT_FOUND, "Invalid token."
//            );
//        }
//    }
//
//
//    public void createPasswordResetToken(String email) {
//        User user = userAccess.findUserByName(email);
//        if (user == null) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
//        }
//
//        if (user.getPassword() == null) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid User");
//        }
//
//        String resetToken = UUID.randomUUID().toString();
//        user.setVerificationToken(resetToken);
//        user.setVerificationTokenTime(LocalDateTime.now());
//
//        userAccess.updateChangePassword(user);
//        try {
//            emailService.sendPasswordResetEmail(user);
//        } catch (Exception e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error sending password reset email");
//        }
//    }
//
//    public void resetPassword(String email, String newPassword, String token) {
//        User user = userAccess.findUserByResetTokenAndEmail(token, email);
//        if (user == null) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token or email");
//        }
//
//
//        String encodedPassword = passwordEncoder.encode(newPassword);
//        user.setPassword(encodedPassword);
//        user.setVerificationToken(null);
//        userAccess.updatePassword(user);
//    }
}
