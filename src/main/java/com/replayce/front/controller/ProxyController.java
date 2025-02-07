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
    private final RestTemplate restTemplate;

    // ✅ application.yaml 대신 환경 변수에서 Python API URL 가져오기
    @Value("${python-client.api.host:default_value_if_missing}")
    private String pythonApiHost;

    @GetMapping("/image/predict")
    public ResponseEntity<String> proxyImagePredict(@RequestParam String imageUrl) {
        // 1) 요청 파라미터 확인 (Python API Host는 로그에서 숨김)
        log.info("[Proxy] Received request: /api/proxy/image/predict?imageUrl={}", imageUrl);

        try {
            // 2) 실제 Python 서버 URL (로그에서는 숨김 처리)
            String pythonUrl = pythonApiHost + "/image/predict?imageUrl=" + imageUrl;
            log.info("[Proxy] Forwarding request to Python server: {}/image/predict", "********");

            // 3) Python 서버로 GET 요청
            ResponseEntity<String> pythonResponse = restTemplate.getForEntity(pythonUrl, String.class);

            // 4) 응답 상태코드만 로그
            log.info("[Proxy] Response from Python - status: {}", pythonResponse.getStatusCode());

            // 5) 그대로 반환
            return ResponseEntity
                    .status(pythonResponse.getStatusCode())
                    .body(pythonResponse.getBody());

        } catch (Exception e) {
            log.error("[Proxy] Error while forwarding request", e);
            return ResponseEntity.status(500).body("서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.");
        }
    }
}
