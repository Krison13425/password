package com.example.springboot.Service;

import com.example.springboot.Model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    JavaMailSender emailSender;

    public void sendVerificationEmail(User user) throws Exception {
        String to = user.getUsername();
        String from = "passwordManager@gmail.com";

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject("Important: Verify Your Login for Password Manager");

        String emailText = "Dear " + user.getUsername() +",<br><br>" +
                "We recently detected a sign-in attempt from an unrecognized device for your Password Manager account. " +
                "To ensure the security of your account, we require verification before completing the login process.<br><br>" +
                "Please use the following verification code to complete your login on the unrecognized device:<br><br>" +
                "Verification Code: " + user.getVerificationCode() + "<br><br>" +
                "This code will expire in 5 minutes. If you did not attempt to sign in from a new device, " +
                "you can safely disregard this email.<br><br>" +
                "For your security, we recommend you never share your verification code with anyone.<br><br>" +
                "Sincerely,<br><br>" +
                "The Password Manager Team";

        helper.setText(emailText, true);

        emailSender.send(message);
    }


    public void resendVerificationEmail(User user) throws Exception {
        String to = user.getUsername();
        String from = "passwordManager@gmail.com";

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(from);
        helper.setTo(to);

        helper.setSubject("New Verification Code for Your Login");

        String emailText = "Hey " + user.getUserName() + "!<br><br>" +
                "We recently received a request to resend your verification code. " +
                "If you requested this, please use the code below to complete your login.<br><br>" +
                "New Verification Code: " + user.getVerificationCode() + "<br><br>" +
                "This code will expire in 5 minutes. " +
                "If you didn't request a new code, you can safely ignore this email.<br><br>";

        helper.setText(emailText, true);

        emailSender.send(message);
    }
//
//
//    public void sendPasswordResetEmail(User user) throws Exception {
//        String to = user.getUserEmail();
//        String from = "skywingsairline2023@gmail.com";
//
//        MimeMessage message = emailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//        helper.setFrom(from);
//        helper.setTo(to);
//        helper.setSubject("Password reset request");
//
//        String linkText = "Click here to reset your password";
//        String resetURL = "http://localhost:3000/ResetPassword?token=" + user.getVerificationToken();
//
//        String emailText = "Dear " + user.getUserName() + ",<br>" +
//                "<br>" +
//                "We received a request to reset your password. Please <a href=\"" + resetURL + "\">" + linkText + "</a> to complete the process.<br>" +
//                "<br>" +
//                "If you didn't make this request, please ignore this email.<br>" +
//                "<br>" +
//                "Best Regards,<br>" +
//                "The SkyWings Team";
//
//        helper.setText(emailText, true);
//
//        emailSender.send(message);
//    }
//
//
//    public void sendDelayedFlightEmail(Booking booking, String newDepartureTime) throws Exception {
//        String to = booking.getEmail();
//        String from = "skywingsairline2023@gmail.com";
//
//        MimeMessage message = emailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//        String customerName = booking.getTitle() + ". " + booking.getFirstName() + " " + booking.getLastName();
//        helper.setFrom(from);
//        helper.setTo(to);
//        helper.setSubject("Important: Your Flight Has Been Delayed");
//
//        helper.setText("Dear " + customerName + ",\n" +
//                "\n" +
//                "We regret to inform you that your flight has been delayed. The new departure time is: " + newDepartureTime + "\n" +
//                "\n" +
//                "We apologize for any inconvenience this may cause and appreciate your understanding. If you have any questions or need further assistance, please don't hesitate to contact us.\n" +
//                "\n" +
//                "Safe travels,\n" +
//                "The SkyWings Team");
//
//        emailSender.send(message);
//    }
//
//
//    public void sendPasswordResetConfirmationEmail(User user) throws Exception {
//        String to = user.getUserEmail();
//        String from = "skywingsairline2023@gmail.com";
//
//        MimeMessage message = emailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//        helper.setFrom(from);
//        helper.setTo(to);
//        helper.setSubject("Password Reset Confirmation");
//
//        String emailText = "Dear " + user.getUserName() + ",\n" +
//                "\n" +
//                "Your password has been successfully reset. If you did not request this change, please contact our support team immediately.\n" +
//                "\n" +
//                "Best Regards,\n" +
//                "The SkyWings Team";
//
//        helper.setText(emailText);
//
//        emailSender.send(message);
//    }
}
