package com.example.springboot.Service;

import java.util.Random;
import java.util.UUID;

public class IDGenerator {
    private static final String CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int ID_LENGTH = 7;
    private static Random random = new Random();

    public static String generateUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

}
