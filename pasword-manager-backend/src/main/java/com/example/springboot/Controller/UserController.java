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


    @GetMapping("/exist")
    public ResponseEntity<String> getUser() {

        try {
            boolean doesUserExist = userService.getUser();

            if (doesUserExist) {
                return new ResponseEntity<>("User Exists.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No Exists.", HttpStatus.NOT_FOUND);
            }

        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
