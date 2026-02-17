package com.kaveesha.student_management.service;

import com.kaveesha.student_management.dto.LoginDto;
import com.kaveesha.student_management.dto.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}