package com.example.springboot.Access;


import com.example.springboot.Model.Password;
import com.example.springboot.Model.User;
import com.example.springboot.Service.PasswordService;
import com.example.springboot.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

@Repository
public class PasswordAccess {

    private static final String SEARCH_PASSWORD_BY_EMAIL = "SELECT * FROM tbl_password WHERE email = ?";
    private static final String SEARCH_PASSWORD_BY_ID = "SELECT * FROM tbl_password WHERE id = ?";
    private static final String SEARCH_ALL_PASSWORD = "SELECT * FROM tbl_password";
    private static final String INSERT_PASSWORD = "INSERT INTO tbl_password (id, email, password, account_name) VALUES (?, ?, ?, ?) ";
    private static final String UPDATE_PASSWORD = "UPDATE tbl_password SET password = ? WHERE id = ?";
    private static final String DELETE_PASSWORD_BY_ID = "DELETE FROM tbl_password WHERE id = ?";
    private static int rowsAffected = 0;
    private static final Logger LOGGER = Logger.getLogger(PasswordService.class.getName());
    @Autowired
    JdbcTemplate jdbcTemplate;

    public Password getPasswordByEmail(String email) {
        try {
            return jdbcTemplate.queryForObject(SEARCH_PASSWORD_BY_EMAIL, new Object[]{email}, new PasswordRowMapper());

        } catch (EmptyResultDataAccessException e) {
            LOGGER.severe("Error occurred while finding user: " + e.getMessage());
            return null;
        }
    }

    public Password getPasswordById(String id) {
        try {
            return jdbcTemplate.queryForObject(SEARCH_PASSWORD_BY_ID, new Object[]{id}, new PasswordRowMapper());

        } catch (EmptyResultDataAccessException e) {
            LOGGER.severe("Error occurred while finding user: " + e.getMessage());
            return null;
        }
    }

    public List<Password> getAllPassword() {
        return jdbcTemplate.query(SEARCH_ALL_PASSWORD, new PasswordRowMapper());
    }

    public int createPassword(Password password) {

        if (password != null) {
            try {
                rowsAffected = jdbcTemplate.update(INSERT_PASSWORD, password.getId(), password.getEmail(), password.getPassword(), password.getAccountName());
                return rowsAffected;
            } catch (EmptyResultDataAccessException e) {
                return rowsAffected;
            }
        } else {
            return rowsAffected;
        }

    }

    public int updatePassword(String id, String password) {

        if (password != null) {
            try {
                rowsAffected = jdbcTemplate.update(UPDATE_PASSWORD, password, id);
                return rowsAffected;
            } catch (EmptyResultDataAccessException e) {
                return rowsAffected;
            }
        } else {
            return rowsAffected;
        }
    }

    public int deletePassword(String id) {
        try {
            rowsAffected = jdbcTemplate.update(DELETE_PASSWORD_BY_ID, id);
            return rowsAffected;
        } catch (EmptyResultDataAccessException e) {
            return rowsAffected;
        }
    }


    private static class PasswordRowMapper implements RowMapper<Password> {

        public Password mapRow(ResultSet rs, int rowNum) throws SQLException {
            Password password = new Password();
            password.setId(rs.getString("id"));
            password.setEmail(rs.getString("email"));
            password.setPassword(rs.getString("password"));
            password.setAccountName(rs.getString("account_name"));
            return password;
        }
    }
}
