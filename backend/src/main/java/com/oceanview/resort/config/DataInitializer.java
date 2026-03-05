package com.oceanview.resort.config;

import com.oceanview.resort.entity.User;
import com.oceanview.resort.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Remove all existing ROLE_ADMIN users
        List<User> existingAdmins = userRepository.findAll()
                .stream()
                .filter(u -> "ROLE_ADMIN".equals(u.getRole()))
                .toList();
        userRepository.deleteAll(existingAdmins);

        // Create fresh admin user with properly encoded password
        User admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin123"))
                .role("ROLE_ADMIN")
                .build();

        userRepository.save(admin);
        System.out.println("=================================================");
        System.out.println("  Admin user created successfully!");
        System.out.println("  Username : admin");
        System.out.println("  Password : admin123");
        System.out.println("=================================================");
    }
}
