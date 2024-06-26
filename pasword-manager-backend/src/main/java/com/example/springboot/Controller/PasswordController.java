package com.example.springboot.Controller;

import com.example.springboot.Model.Password;
import com.example.springboot.Model.PasswordRequestBody;
import com.example.springboot.Model.UpdatePasswordRequestBody;
import com.example.springboot.Service.PasswordServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

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

    @PutMapping("/edit")
    public ResponseEntity<String> editPassword(@RequestBody UpdatePasswordRequestBody updatePasswordRequestBody) {
        try {
            boolean isEdited = passwordService.updatePassword(updatePasswordRequestBody);

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

}
