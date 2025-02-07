package com.replayce.front.client.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "chatClient", url = "http://localhost:8081/api")  // ✅ 직접 URL 지정
public interface ChatClient {
    @GetMapping("/chat")
    String getChatResponse(@RequestParam("question") String question);
}
