package com.replayce.front.client.api;


import com.replayce.front.client.dto.AdminResponse;
import com.replayce.front.client.dto.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "adminClient", url = "${java-client.api.host}")
public interface AdminClient {

    @GetMapping("/api/admin/admin_setting")
    CommonResponse<List<AdminResponse>> getPendingAdmins();

    @PostMapping("/api/admin/admin_setting/{adminId}")
    CommonResponse<String> setAgreeAdmin(@PathVariable Long adminId);
}