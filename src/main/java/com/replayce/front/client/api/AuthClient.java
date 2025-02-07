package com.replayce.front.client.api;

import com.replayce.front.client.dto.AdminResponse;
import com.replayce.front.client.dto.AuthResponse;
import com.replayce.front.client.dto.CommonResponse;
import lombok.Getter;
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


    @PostMapping("/api/auth/updateAccount")
    CommonResponse<String> updateAccount(
            @RequestParam("username") String username,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "newPassword", required = false) String newPassword
    );

    // 관리자 계정 수정하기 - 상세 정보 조회
    @GetMapping("/api/auth/getAdminsDetails")
    CommonResponse<List<AdminResponse>> getAdminsDetails(@RequestParam("username") String username);
}
