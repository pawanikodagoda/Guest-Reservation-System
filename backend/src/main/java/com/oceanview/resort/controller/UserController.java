package com.oceanview.resort.controller;

import com.oceanview.resort.dto.SignupRequest;
import com.oceanview.resort.dto.UserDTO;
import com.oceanview.resort.entity.User;
import com.oceanview.resort.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder encoder;

  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<UserDTO>> getAllUsers() {
    List<UserDTO> users = userRepository.findAll().stream()
        .map(user -> UserDTO.builder()
            .id(user.getId())
            .username(user.getUsername())
            .role(user.getRole())
            .createdAt(user.getCreatedAt())
            .build())
        .collect(Collectors.toList());
    return ResponseEntity.ok(users);
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> createUser(@RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      Map<String, String> response = new HashMap<>();
      response.put("message", "Error: Username is already taken!");
      return ResponseEntity.badRequest().body(response);
    }

    User user = User.builder()
        .username(signUpRequest.getUsername())
        .password(encoder.encode(signUpRequest.getPassword()))
        .role(signUpRequest.getRole() != null ? signUpRequest.getRole() : "ROLE_STAFF")
        .build();

    userRepository.save(user);

    Map<String, String> response = new HashMap<>();
    response.put("message", "User created successfully!");
    return ResponseEntity.ok(response);
  }

  @PutMapping("/{id}/role")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> roleMap) {
    return userRepository.findById(id)
        .map(user -> {
          user.setRole(roleMap.get("role"));
          userRepository.save(user);
          Map<String, String> response = new HashMap<>();
          response.put("message", "User role updated successfully!");
          return ResponseEntity.ok(response);
        })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    if (!userRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }
    userRepository.deleteById(id);
    Map<String, String> response = new HashMap<>();
    response.put("message", "User deleted successfully!");
    return ResponseEntity.ok(response);
  }
}
