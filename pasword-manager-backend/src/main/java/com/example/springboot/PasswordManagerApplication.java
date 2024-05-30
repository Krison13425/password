package com.example.springboot;

import com.example.springboot.database.DatabaseService;
import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import com.zaxxer.hikari.HikariDataSource;
import org.komamitsu.spring.data.sqlite.SqliteDialect;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.core.dialect.JdbcDialect;

import javax.sql.DataSource;
import java.sql.SQLException;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableEncryptableProperties
public class PasswordManagerApplication {
	public static void main(String[] args) {
		SpringApplication.run(PasswordManagerApplication.class, args);
	}

	@Configuration
	public class DatabaseConfig {

		@Bean
		public DataSource dataSource() {
			HikariDataSource dataSource = new HikariDataSource();
			dataSource.setDriverClassName("org.sqlite.JDBC");
			dataSource.setJdbcUrl("jdbc:sqlite:./database/password.db");
			return dataSource;
		}

		@Bean
		public JdbcDialect jdbcDialect(DataSource dataSource) {
			return (JdbcDialect) new SqliteDialect();
		}

	}


}
