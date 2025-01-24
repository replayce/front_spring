package com.replayce.front.controller;

import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.JavaResponse;
import com.replayce.front.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

@Controller
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

    private final MainService mainService;
    private final RestTemplate restTemplate;

    @GetMapping
    public String mainPage(Model model) {
        model.addAttribute("sample", "Replayce");
        return "main/main";
    }

    @GetMapping("/java")
    public String javaPage(Model model) {
        JavaResponse res = mainService.getJava(22L, "TempData");

        model.addAttribute("id", res.getId());
        model.addAttribute("query", res.getQuery());
        return "main/java";
    }

    @GetMapping("/map")
    public String mapPage(Model model){

        return "main/map";
    }

    @GetMapping("/file")
    public String getFile(Model model) {
        return "main/file";
    }

}
