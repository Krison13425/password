package com.example.springboot.Access;


import com.example.springboot.Model.User;
import com.example.springboot.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Logger;

@Repository
public class UserAccess {

    private static final String SEARCH_USER_USERNAME = "SELECT * FROM tbl_user WHERE name = ?";
    private static final String INSERT_USER = "INSERT INTO tbl_user (id, name, password) VALUES (?, ?, ?) ";
    private static final String INSERT_VERIFICATION_CODE = "UPDATE tbl_user SET verification_code = ? WHERE name = ?";
    private static final String COUNT_USER ="SELECT COUNT(*) FROM tbl_user";
    private static int rowsAffected = 0;
    private static final Logger LOGGER = Logger.getLogger(UserService.class.getName());
    @Autowired
    JdbcTemplate jdbcTemplate;

    public User findUserByName(String username) {
        try {
            User user  = jdbcTemplate.queryForObject(SEARCH_USER_USERNAME, new Object[]{username}, new UserRowMapper());
            return jdbcTemplate.queryForObject(SEARCH_USER_USERNAME, new Object[]{username}, new UserRowMapper());

        } catch (EmptyResultDataAccessException e) {
            LOGGER.severe("Error occurred while finding user: " + e.getMessage());
            return null;
        }
    }

    public int createUser(User user) {

        if (user != null) {
            try {
                rowsAffected = jdbcTemplate.update(INSERT_USER, user.getUserId(), user.getUsername(), user.getPassword());
                return rowsAffected;
            } catch (EmptyResultDataAccessException e) {
                return rowsAffected;
            }
        } else {
            return rowsAffected;
        }

    }

    public int createVerificationCode(String username, int verificationCode) {

        if (username != null && verificationCode > 0) {
            try {
                rowsAffected = jdbcTemplate.update(INSERT_VERIFICATION_CODE, verificationCode,username);
                return rowsAffected;
            } catch (EmptyResultDataAccessException e) {
                return rowsAffected;
            }
        } else {
            return rowsAffected;
        }

    }

    public int deleteVerificationCode(String username) {

        if (username != null) {
            try {
                rowsAffected = jdbcTemplate.update(INSERT_VERIFICATION_CODE, 0,username);
                return rowsAffected;
            } catch (EmptyResultDataAccessException e) {
                return rowsAffected;
            }
        } else {
            return rowsAffected;
        }

    }

    public boolean isTableEmpty() {
        try {
            Integer rowCount = jdbcTemplate.queryForObject(COUNT_USER, Integer.class);
            return rowCount != null && rowCount > 0;
        } catch (DataAccessException e) {
            LOGGER.severe("Error occurred while checking if table is empty: " + e.getMessage());
            return false;
        }
    }




    private static class UserRowMapper implements RowMapper<User> {

        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setUserId(rs.getString("id"));
            user.setUserName(rs.getString("name"));
            user.setPassword(rs.getString("password"));
            user.setVerification_code(rs.getInt("verification_code"));
            return user;
        }
    }
}
