package com.onurcansever.leno.security;

import com.onurcansever.leno.payload.CustomerDto;
import com.onurcansever.leno.service.CustomerService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * The JwtTokenProvider class is used to generate a JWT after a user logs in successfully, and to validate the JWT sent in the Authorization header of the requests.
 */
@Component
public final class JwtTokenProvider {

    @Value(value = "${app.jwt-secret}")
    private String jwtSecret;

    @Value(value = "${app.jwt-expiration-milliseconds}")
    private Long jwtExpirationDate;

    private final CustomerService customerService;

    @Autowired
    public JwtTokenProvider(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Generate JWT Token
    public String generateToken(Authentication authentication) {
        String email = authentication.getName();
        Long id = ((CustomUserDetails) authentication.getPrincipal()).getCustomerId();

        CustomerDto customerDto = this.customerService.getCustomerById(id);

        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

        // Create JWT Token
        String jwtToken = Jwts.builder()
                .claim("customerId", id)
                .claim("firstName", customerDto.getFirstName())
                .claim("lastName", customerDto.getLastName())
                .claim("username", customerDto.getUsername())
                .claim("email", customerDto.getEmail())
                .claim("phoneNumber", customerDto.getPhoneNumber())
                .claim("profilePicture", customerDto.getProfilePicture())
                .claim("role", customerDto.getRole())
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(this.key())
                .compact();

        return jwtToken;
    }

    // Decoding Encrypted Secret Key
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    // Get Email From JWT Token
    public String getEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(this.key())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String email = claims.getSubject();

        return email;
    }

    // Validate JWT Token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(this.key())
                    .build()
                    .parse(token);

            return true;
        } catch (MalformedJwtException ex) {
            throw new MalformedJwtException("Invalid JWT Token");
        } catch (ExpiredJwtException ex) {
            throw new ExpiredJwtException(null, null, "JWT Token has expired");
        } catch (UnsupportedJwtException ex) {
            throw new UnsupportedJwtException("JWT Token is unsupported");
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("JWT claims string is empty");
        }
    }

}
