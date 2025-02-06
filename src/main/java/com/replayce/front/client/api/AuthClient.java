package com.replayce.front.client.api;

import com.replayce.front.client.dto.AuthResponse;
import com.replayce.front.client.dto.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name="authClient", url="${java-client.api.host}")
public interface AuthClient {

    @PostMapping("/api/auth/login")
    CommonResponse<AuthResponse> login(@RequestParam("username") String username,
                                          @RequestParam("password") String password);

    @PostMapping("/api/auth/register")
    CommonResponse<String> register(@RequestParam("username") String username,
                                    @RequestParam("email") String email,
                                    @RequestParam("phoneNumber") String phoneNumber,
                                    @RequestParam("password") String password);
}
