package com.oceanview.resort;

import com.oceanview.resort.entity.User;
import com.oceanview.resort.repository.UserRepository;
import com.oceanview.resort.security.JwtUtils;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AuthServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private AuthenticationManager authenticationManager;

  @Mock
  private JwtUtils jwtUtils;

  @Test
  public void testUserExistsByUsername() {
    when(userRepository.existsByUsername("staff1")).thenReturn(true);
    assertTrue(userRepository.existsByUsername("staff1"));
  }

  @Test
  public void testUserRegistrationPersistence() {
    User user = new User();
    user.setUsername("newstaff");
    user.setPassword("encodedPassword");

    when(userRepository.save(any(User.class))).thenReturn(user);

    User savedUser = userRepository.save(user);
    assertEquals("newstaff", savedUser.getUsername());
    verify(userRepository, times(1)).save(user);
  }
}
