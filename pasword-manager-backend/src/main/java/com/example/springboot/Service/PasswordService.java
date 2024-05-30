package com.example.springboot.Service;


import com.example.springboot.Access.PasswordAccess;
import com.example.springboot.Model.Password;
import com.example.springboot.Model.PasswordRequestBody;
import com.example.springboot.Model.UpdatePasswordRequestBody;
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

            Password existingPassword = passwordAccess.getPasswordByEmail(passwordRequestBody.getEmail());

            if (existingPassword != null) {
                throw new IllegalArgumentException("Email already exists");
            }

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
    public boolean updatePassword(UpdatePasswordRequestBody updatePasswordRequestBody) {

        Password originPassword = passwordAccess.getPasswordById(updatePasswordRequestBody.getId());

        if(originPassword != null){

            if(!matchPassword(updatePasswordRequestBody.getPassword(),originPassword.getPassword())){

                int rowsAffected =  passwordAccess.updatePassword(updatePasswordRequestBody.getId(),updatePasswordRequestBody.getPassword());

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
