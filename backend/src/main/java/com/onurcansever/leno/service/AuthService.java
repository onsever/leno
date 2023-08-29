package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.LoginDto;
import com.onurcansever.leno.payload.RegisterDto;

public interface AuthService {

    String login(LoginDto loginDto);

    String register(RegisterDto registerDto);

}
