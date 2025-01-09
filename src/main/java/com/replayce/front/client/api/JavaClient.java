package com.replayce.front.client.api;

import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.CommonResponse;
import com.replayce.front.client.dto.JavaResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "javaClient", url = "${java-client.api.host}")
public interface JavaClient {

    @GetMapping("/api/python/{id}")
    public CommonResponse<JavaResponse> getJava(@PathVariable("id") Long id, @RequestParam("query") String query);
}
