package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Role;
import com.onurcansever.leno.exception.InvalidCredentialsException;
import com.onurcansever.leno.payload.LoginDto;
import com.onurcansever.leno.payload.RegisterDto;
import com.onurcansever.leno.repository.CustomerRepository;
import com.onurcansever.leno.repository.RoleRepository;
import com.onurcansever.leno.security.JwtTokenProvider;
import com.onurcansever.leno.service.AuthService;
import com.onurcansever.leno.utility.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final CustomerRepository customerRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, CustomerRepository customerRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.customerRepository = customerRepository;
        this.roleRepository = roleRepository;
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
        customer.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        customer.setFirstName(registerDto.getFirstName());
        customer.setLastName(registerDto.getLastName());
        customer.setPhoneNumber(registerDto.getPhoneNumber());

        Set<Role> roles = new HashSet<>();
        Role customerRole = this.roleRepository.getRoleByName(RoleType.ROLE_CUSTOMER).orElseThrow();
        roles.add(customerRole);

        customer.setRoles(roles);
        customer.setRole(RoleType.ROLE_CUSTOMER.toString());

        // Set default profile picture for the customer
        customer.setProfilePicture("https://res.cloudinary.com/dwyokq1dc/image/upload/v1693341827/v0oxrihai8hyjq62mwlq.jpg");

        this.customerRepository.save(customer);

        return String.format("User %s registered successfully", registerDto.getUsername());
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN')")
    public String registerAdminAccount(RegisterDto registerDto) {
        if (this.customerRepository.existsByEmail(registerDto.getEmail())) {
            throw new InvalidCredentialsException("Email address is already in use.");
        }

        Customer customer = new Customer();
        customer.setUsername(registerDto.getUsername());
        customer.setEmail(registerDto.getEmail());
        customer.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        customer.setFirstName(registerDto.getFirstName());
        customer.setLastName(registerDto.getLastName());
        customer.setPhoneNumber(registerDto.getPhoneNumber());

        Set<Role> roles = new HashSet<>();
        Role customerRole = this.roleRepository.getRoleByName(RoleType.ROLE_ADMIN).orElseThrow();
        roles.add(customerRole);

        customer.setRoles(roles);
        customer.setRole(RoleType.ROLE_ADMIN.toString());

        // Set default profile picture for the customer
        customer.setProfilePicture("https://res.cloudinary.com/dwyokq1dc/image/upload/v1693341827/v0oxrihai8hyjq62mwlq.jpg");

        this.customerRepository.save(customer);

        return String.format("User %s registered successfully", registerDto.getUsername());
    }

}
