package com.onurcansever.leno.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * The purpose of this class is to return a 401 unauthorized error to clients that try to access a protected resource without proper authentication.
 * It implements Spring Security’s AuthenticationEntryPoint interface.
 */
@Component
public final class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // commence method will be called whenever an exception is thrown due to unauthorized user trying to access a resource that requires an authentication.
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
    }
}
