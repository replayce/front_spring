package com.replayce.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main/file")
public class fileController {
    @GetMapping
    public String getFile(Model model) {
        return "main/file";
    }
}