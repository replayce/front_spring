package com.replayce.front.service;

import com.replayce.front.client.api.JavaClient;
import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.JavaResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainService {

    private final JavaClient javaClient;

    public BaseResponse<JavaResponse> getJava(Long id, String query) {
        return javaClient.getJava(id, query);
    }
}
