package com.replayce.front.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/proxy")
@RequiredArgsConstructor
public class ProxyController {

    private static final Logger log = LoggerFactory.getLogger(ProxyController.class);
    private final RestTemplate restTemplate; // 또는 직접 new RestTemplate()

    // ✅ application.yaml에서 Python API URL 가져오기
    @Value("${python-client.api.host}")
    private String pythonApiHost;

    @GetMapping("/image/predict")
    public ResponseEntity<String> proxyImagePredict(@RequestParam String imageUrl) {
        // 1) 요청 파라미터 확인
        log.info("[Proxy] Received request: /api/proxy/image/predict?imageUrl={}", imageUrl);
        log.info("[Proxy] Python API Host: {}", pythonApiHost); // ✅ 확인용 로그 추가

        try {
            // 2) 실제 Python 서버 URL (application.yaml에서 가져오기)
            String pythonUrl = pythonApiHost + "/image/predict?imageUrl=" + imageUrl;

            log.info("[Proxy] Forwarding request to Python server: {}", pythonUrl);

            // 3) Python 서버로 GET 요청
            ResponseEntity<String> pythonResponse = restTemplate.getForEntity(pythonUrl, String.class);

            // 4) 응답 상태코드, 바디 등 로그
            log.info("[Proxy] Response from Python - status: {}, body: {}",
                    pythonResponse.getStatusCode(),
                    pythonResponse.getBody());

            // 5) 그대로 반환
            return ResponseEntity
                    .status(pythonResponse.getStatusCode())
                    .body(pythonResponse.getBody());

        } catch (Exception e) {
            log.error("[Proxy] Error while forwarding request: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Proxy request failed: " + e.getMessage());
        }
    }
}
