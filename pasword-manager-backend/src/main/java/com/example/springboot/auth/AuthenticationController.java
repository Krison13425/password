package com.example.springboot.auth;

import com.example.springboot.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        authenticationService.authenticate(request);
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthenticationRequest request) {
        try {
            boolean registrationSuccess = authenticationService.registerUser(request);
            if (registrationSuccess) {
                return ResponseEntity.ok("User registered successfully.");
            } else {
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "Failed to register user."
                );
            }
        } catch (ResponseStatusException ex) {
            return ResponseEntity.status((HttpStatus) ex.getStatusCode()).body(ex.getReason());
        }
    }

    @PostMapping("/verifyToken")
    public ResponseEntity<String> verifyUser(@RequestParam String token, @RequestParam String email) {


        boolean isUserVerified = authenticationService.verifyToken(token,email);

        if (isUserVerified) {
            return ResponseEntity.ok("User Verified successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User Verified Unsuccessfully.");
        }
    }

    @PostMapping("/verifyUser")
    public ResponseEntity<String> createVerificationCode(@RequestParam String email) {
        try {
            boolean isCreated = authenticationService.createVerificationCode(email);
            if (isCreated) {
                return ResponseEntity.ok("Verification code created and email sent successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create verification code.");
            }
        } catch (ResponseStatusException ex) {
            return ResponseEntity.status((HttpStatus) ex.getStatusCode()).body(ex.getReason());
        }
    }
}
