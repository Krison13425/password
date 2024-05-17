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
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
                    HttpStatus.UNAUTHORIZED, "Invalid username or password"
            );
        }

        User user = userAccess.findUserByName(request.getUsername());
        var jwtToken = jwtService.generateToken(user);


        AuthenticationResponse response = new AuthenticationResponse();
        response.setToken(jwtToken);;
        response.setEmail(user.getUserName());
        response.setId(user.getUserId());
        response.setMessage("Login Successfully");
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

    public boolean verifyToken(String token, String email) {

        User user = userAccess.findUserByName(email);

        if (user == null || !token.equals(String.valueOf(user.getVerificationCode()))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid token or email.");
        }

        Timestamp verificationCodeTimestamp = user.getVerificationCodeTime();
        if (verificationCodeTimestamp == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Verification time not set.");
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime verificationCodeTime = verificationCodeTimestamp.toLocalDateTime();
        if (ChronoUnit.MINUTES.between(verificationCodeTime, now) > 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token Has Expired.");
        }

        int rowsAffected = userAccess.deleteVerificationCode(email);
        if (rowsAffected <= 0) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update verification.");
        }

        return true;
    }



    public boolean createVerificationCode(String email) {
        User user = userAccess.findUserByName(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        if (user.getPassword() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid User");
        }

        String verificationCode = IDGenerator.generateOTP();
        user.setVerificationCode(Integer.valueOf(verificationCode));
        user.setVerificationCodeTime(Timestamp.valueOf(LocalDateTime.now()));

        int rowsAffected = userAccess.createVerificationCode(user.getUserName(), user.getVerificationCode(), user.getVerificationCodeTime());


        if (rowsAffected > 0) {
            try {
                emailService.sendVerificationEmail(user);
                return true;
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error sending verification email");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create verification code in the database");
        }
    }

}
