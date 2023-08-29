package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.exception.InvalidCredentialsException;
import com.onurcansever.leno.payload.LoginDto;
import com.onurcansever.leno.payload.RegisterDto;
import com.onurcansever.leno.repository.CustomerRepository;
import com.onurcansever.leno.security.JwtTokenProvider;
import com.onurcansever.leno.service.AuthService;
import com.onurcansever.leno.utility.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public final class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, CustomerRepository customerRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = this.jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public String register(RegisterDto registerDto) {
        if (this.customerRepository.existsByEmail(registerDto.getEmail())) {
            throw new InvalidCredentialsException("Email address is already in use.");
        }

        Customer customer = new Customer();
        customer.setUsername(registerDto.getUsername());
        customer.setEmail(registerDto.getEmail());
        customer.setRole(Role.CUSTOMER);
        customer.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        customer.setFirstName(registerDto.getFirstName());
        customer.setLastName(registerDto.getLastName());
        customer.setPhoneNumber(registerDto.getPhoneNumber());

        // Set default profile picture for the customer
        customer.setProfilePicture("https://res.cloudinary.com/dwyokq1dc/image/upload/v1693341827/v0oxrihai8hyjq62mwlq.jpg");

        this.customerRepository.save(customer);

        return String.format("User %s registered successfully", registerDto.getUsername());
    }

}
