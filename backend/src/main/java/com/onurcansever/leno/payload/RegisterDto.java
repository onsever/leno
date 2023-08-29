package com.onurcansever.leno.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public final class RegisterDto {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
