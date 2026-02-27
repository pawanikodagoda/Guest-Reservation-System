package com.oceanview.resort.controller;

import com.oceanview.resort.dto.AuthResponse;
import com.oceanview.resort.dto.LoginRequest;
import com.oceanview.resort.dto.SignupRequest;
import com.oceanview.resort.entity.User;
import com.oceanview.resort.repository.UserRepository;
import com.oceanview.resort.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder encoder;

  @Autowired
  private JwtUtils jwtUtils;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String role = userDetails.getAuthorities().stream()
        .findFirst()
        .map(item -> item.getAuthority())
        .orElse("ROLE_USER");

    return ResponseEntity.ok(new AuthResponse(jwt, userDetails.getUsername(), role));
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
    if (userRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
      Map<String, String> response = new HashMap<>();
      response.put("message", "Error: Username is already taken!");
      return ResponseEntity.badRequest().body(response);
    }

    // Create new user's account
    User user = User.builder()
        .username(signUpRequest.getUsername())
        .password(encoder.encode(signUpRequest.getPassword()))
        .role("ROLE_USER")
        .build();

    userRepository.save(user);

    Map<String, String> response = new HashMap<>();
    response.put("message", "User registered successfully!");
    return ResponseEntity.ok(response);
  }
}
