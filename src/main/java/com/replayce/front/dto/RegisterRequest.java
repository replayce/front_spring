package com.replayce.front.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterRequest {

    private String username;
    private String email;
    private String phoneNumber;
    private String password;
}
