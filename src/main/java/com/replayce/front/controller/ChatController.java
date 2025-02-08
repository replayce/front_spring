package com.replayce.front.controller;

import com.replayce.front.client.api.ChatClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatClient chatClient;

    @Value("${java-client.api.host}")
    private String apiHost;

    @GetMapping("/chat") // Mustache 뷰 렌더링
    public String chatPage(Model model) {
        model.addAttribute("apiHost", apiHost);
        return "main/chat"; // main/chat.mustache 렌더링
    }

    @GetMapping("/api/chat") // 백엔드 API 호출
    public ResponseEntity<String> chatApi(@RequestParam String question) {
        String response = chatClient.getChatResponse(question);
        return ResponseEntity.ok(response);
    }
}

