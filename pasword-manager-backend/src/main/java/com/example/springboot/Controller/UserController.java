package com.example.springboot.Controller;

import com.example.springboot.Model.UserRequestBody;
import com.example.springboot.Service.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {
    @Autowired
    UserServiceInterface userService;

    @PostMapping("/login")
    public ResponseEntity<String> createPlane(@RequestBody UserRequestBody userRequestBody) {

        try {
            boolean validationSuccessful = userService.validateUser(userRequestBody);

            if (validationSuccessful) {
                return new ResponseEntity<>("Login successfully.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Unable to Login.", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
