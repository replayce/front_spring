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

    public JavaResponse getJava(Long id, String query) {
        // 에러코드 처리 진행해야 한다.
        // if ( res.getStatus() != 200 ) { return "error"; }

        return javaClient.getJava(id, query).getResult();
    }
}
