package com.example.springboot.Access;


import com.example.springboot.Model.User;
import com.example.springboot.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Logger;

@Repository
public class UserAccess {

    private static final String SEARCH_USER_USERNAME = "SELECT * FROM tbl_user WHERE user_name = ?";

    private static final Logger LOGGER = Logger.getLogger(UserService.class.getName());
    @Autowired
    JdbcTemplate jdbcTemplate;

    public User findUserByName(String username) {
        try {
            return jdbcTemplate.queryForObject(SEARCH_USER_USERNAME, new Object[]{username}, new UserRowMapper());

        } catch (EmptyResultDataAccessException e) {
            LOGGER.severe("Error occurred while finding user: " + e.getMessage());
            return null;
        }
    }


    private static class UserRowMapper implements RowMapper<User> {

        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setUserId(rs.getString("id"));
            user.setUserName(rs.getString("user_name"));
            user.setPassword(rs.getString("password"));
            return user;
        }
    }
}
