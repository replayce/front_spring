package com.replayce.front.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "*")
public class ConfigController {

    @Value("${java-client.api.host}") // ✅ application.yaml에서 API 주소 가져오기
    private String apiHost;

    @GetMapping("/backend-host") // ✅ 프론트엔드에서 사용할 API 주소 제공
    public ResponseEntity<Map<String, String>> getBackendHost() {
        return ResponseEntity.ok(Map.of("apiHost", apiHost));
    }

    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }
}

