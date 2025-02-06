package com.replayce.front.client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminResponse {
    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private boolean enabled;
}
