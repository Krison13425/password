package com.example.springboot.Service;


import com.example.springboot.Access.UserAccess;
import com.example.springboot.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {
    @Autowired
    private UserAccess userAccess;

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
    public boolean getUser() {
        return userAccess.isTableEmpty();
    }


}
