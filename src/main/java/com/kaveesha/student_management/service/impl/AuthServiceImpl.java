package com.kaveesha.student_management.service.impl;

import com.kaveesha.student_management.dto.LoginDto;
import com.kaveesha.student_management.dto.RegisterDto;
import com.kaveesha.student_management.entity.User;
import com.kaveesha.student_management.repository.UserRepository;
import com.kaveesha.student_management.security.JwtTokenProvider;
import com.kaveesha.student_management.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String login(LoginDto loginDto) {


        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));


        SecurityContextHolder.getContext().setAuthentication(authentication);


        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public String register(RegisterDto registerDto) {


        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new RuntimeException("Username already exists!");
        }


        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new RuntimeException("Email already exists!");
        }


        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully!.";
    }
}