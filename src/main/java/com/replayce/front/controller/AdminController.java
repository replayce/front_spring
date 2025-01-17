package com.replayce.front.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    @GetMapping
    public String mainPage(Model model) {
//        model.addAttribute("sample", "Replayce");
        return "admin/admin_login";
    }
    @GetMapping("/admin_login")
    public String index() {
        return "admin/admin_login";
    }
}
