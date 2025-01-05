package com.replayce.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class MainController {

    @GetMapping
    public String mainPage(Model model) {
        model.addAttribute("sample", "Replayce");
        return "main/main";
    }
}
