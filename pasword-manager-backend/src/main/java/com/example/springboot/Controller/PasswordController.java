package com.example.springboot.Controller;

import com.example.springboot.Model.Password;
import com.example.springboot.Model.PasswordRequestBody;
import com.example.springboot.Service.PasswordServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/password")
@CrossOrigin
public class PasswordController {
    @Autowired
    PasswordServiceInterface passwordService;

    @GetMapping("/all")
    public List<Password> getAllPasswords() {
        return passwordService.getAllPassword();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPassword(@RequestBody PasswordRequestBody passwordRequestBody) {

        try {
            boolean isCreated = passwordService.addPassword(passwordRequestBody);

            if (isCreated) {
                return new ResponseEntity<>("Password created successfully.", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Unable to create password.", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Password> getPasswordById(@PathVariable String id) {
        Password password = passwordService.getPasswordById(id);
        if (password != null) {
            return ResponseEntity.ok(password);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<String> editPassword(@RequestParam String id, @RequestParam String password) {

        try {
            boolean isEdited = passwordService.updatePassword(id,password);

            if (isEdited) {
                return new ResponseEntity<>("Password edited successfully.", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Unable to edit password.", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePasswordById(@PathVariable String id) {
        try {
            boolean isDeleted = passwordService.deletePassword(id);

            if (isDeleted) {
                return new ResponseEntity<>("Password deleted successfully.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Unable to delete password.", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/filter")
//    public List<Airplane> getFilteredAirplanes(
//            @RequestParam(required = false) String status,
//            @RequestParam(required = false) String location) {
//        if ((status != null && !status.isBlank()) || (location != null && !location.isBlank())) {
//            return airplaneService.getfilteredAirplaneList(status, location);
//        } else {
//            return airplaneService.getAllAirplanes();
//        }
//    }



}
