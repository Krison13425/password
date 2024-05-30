package com.example.springboot.Service;

import com.example.springboot.Model.Password;
import com.example.springboot.Model.PasswordRequestBody;
import com.example.springboot.Model.UpdatePasswordRequestBody;

import java.util.List;

public interface PasswordServiceInterface {


    public boolean addPassword(PasswordRequestBody passwordRequestBody);

    public boolean updatePassword(UpdatePasswordRequestBody updatePasswordRequestBody);

    public boolean deletePassword(String id);

    List<Password> getAllPassword();

    Password getPasswordById(String id);

    Password getPasswordByEmail(String email);



}
