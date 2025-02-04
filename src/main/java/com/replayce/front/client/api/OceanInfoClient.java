package com.replayce.front.client.api;

import com.replayce.front.client.dto.CommonResponse;
import com.replayce.front.client.dto.OceanInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "oceanInfoClient", url = "${java-client.api.host}/api")
public interface OceanInfoClient {
    @GetMapping("/ocean-info")
    CommonResponse<List<OceanInfoResponse>> getAllOceanInfo(@RequestParam(required = false) String isUse);
}
