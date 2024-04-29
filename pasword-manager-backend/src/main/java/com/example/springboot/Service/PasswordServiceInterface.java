package com.example.springboot.Service;

import com.example.springboot.Model.Password;
import com.example.springboot.Model.PasswordRequestBody;

import java.util.List;

public interface PasswordServiceInterface {


    public boolean addPassword(PasswordRequestBody passwordRequestBody);

    public boolean updatePassword(String id, String password);

    public boolean deletePassword(String id);

    List<Password> getAllPassword();

    Password getPasswordById(String id);

    Password getPasswordByEmail(String email);



}
