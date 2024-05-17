package com.example.springboot.Service;

import java.util.Random;
import java.util.UUID;

public class IDGenerator {
    private static Random random = new Random();
    private static final int OTP_LENGTH = 6;

    public static String generateUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

    public static String generateOTP() {
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            int digit = random.nextInt(10);
            otp.append(digit);
        }
        return otp.toString();
    }
}
