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
                // Failed to register user
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "Failed to register user."
                );
            }
        } catch (ResponseStatusException ex) {
            return ResponseEntity.status((HttpStatus) ex.getStatusCode()).body(ex.getReason());
        }
    }

//    @GetMapping("/verify-email")
//    public RedirectView verifyEmail(@RequestParam String token) {
//        boolean isEmailVerified = authenticationService.verifyToken(token);
//
//        if (isEmailVerified) {
//            return new RedirectView("http://localhost:3000/UserLogin");
//        } else {
//            return new RedirectView("http://localhost:3000/VerificationFailed");
//        }
//    }
}
