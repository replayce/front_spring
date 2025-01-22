package com.replayce.front.client.api;

import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.CommonResponse;
import com.replayce.front.client.dto.JavaResponse;
import feign.Headers;
import feign.RequestLine;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "javaClient", url = "${java-client.api.host}")
public interface JavaClient {

    @GetMapping("/api/python/{id}")
    public CommonResponse<JavaResponse> getJava(@PathVariable("id") Long id, @RequestParam("query") String query);

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CommonResponse<String> uploadFile(@RequestPart("file") MultipartFile file);
}
