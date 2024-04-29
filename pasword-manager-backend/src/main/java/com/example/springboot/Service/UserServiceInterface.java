package com.example.springboot.Service;


import com.example.springboot.Model.User;
import com.example.springboot.Model.UserRequestBody;
import org.springframework.web.bind.annotation.RequestBody;

public interface UserServiceInterface {


    public boolean validateUser(UserRequestBody userRequestBody);

}
