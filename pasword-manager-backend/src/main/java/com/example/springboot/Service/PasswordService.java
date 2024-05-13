package com.example.springboot.Service;


import com.example.springboot.Access.PasswordAccess;
import com.example.springboot.Model.Password;
import com.example.springboot.Model.PasswordRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordService implements PasswordServiceInterface {
    @Autowired
    private PasswordAccess passwordAccess;

    private static String encodePassword(String password) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(password);
        return encodedPassword;
    }

    private static boolean matchPassword(String rawPassword, String encodedPassword) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }


    @Override
    public boolean addPassword(PasswordRequestBody passwordRequestBody) {

        if(passwordRequestBody != null){

            Password password = new Password();

            password.setId(IDGenerator.generateUUID());
            password.setEmail(passwordRequestBody.getEmail());
            password.setPassword(passwordRequestBody.getPassword());
            password.setAccountName(passwordRequestBody.getAccountName());


            int rowsAffected =  passwordAccess.createPassword(password);

            if (rowsAffected > 0) {
                return true;
            } else {
                return false;
            }

        }
        return false;
    }

    @Override
    public boolean updatePassword(String id, String password) {

        Password originPassword = passwordAccess.getPasswordById(id);

        if(originPassword != null){

            if(!matchPassword(password,originPassword.getPassword())){

                int rowsAffected =  passwordAccess.updatePassword(id,password);

                if (rowsAffected > 0) {
                    return true;
                } else {
                    return false;
                }

            }else{
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean deletePassword(String id) {

        Password originPassword = passwordAccess.getPasswordById(id);

        if(originPassword != null){

            int rowsAffected =  passwordAccess.deletePassword(id);

            if (rowsAffected > 0) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public List<Password> getAllPassword() {
        return passwordAccess.getAllPassword();
    }

    @Override
    public Password getPasswordById(String id) {
        return passwordAccess.getPasswordById(id);
    }

    @Override
    public Password getPasswordByEmail(String email) {
        return passwordAccess.getPasswordByEmail(email);
    }
}
