package com.example.springboot.database;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Service
public class DatabaseService {

    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void createTables() throws SQLException {
        Connection conn = dataSource.getConnection();

        String sqlCreateTableUser = "CREATE TABLE IF NOT EXISTS tbl_user (  " +
                "id TEXT PRIMARY KEY, " +
                "name TEXT, " +
                "password TEXT, " +
                "verification_code INTEGER, " +
                "verification_code_time DATETIME DEFAULT CURRENT_TIMESTAMP);";

        String sqlCreateTablePassword = "CREATE TABLE IF NOT EXISTS tbl_password (  " +
                "id TEXT PRIMARY KEY, " +
                "email TEXT, " +
                "password TEXT, " +
                "account_name TEXT, " +
                "created_date_time DATETIME DEFAULT CURRENT_TIMESTAMP, " +
                "updated_date_time DATETIME DEFAULT CURRENT_TIMESTAMP);";

        Statement stmt = conn.createStatement();
        stmt.execute(sqlCreateTableUser);
        stmt.execute(sqlCreateTablePassword);
        conn.close();
    }
}
