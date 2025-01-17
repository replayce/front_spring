package com.replayce.front.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
//@RequestMapping("/admin")
@Slf4j
public class AdminController {
    @GetMapping
    public String mainPage(Model model) {
//        model.addAttribute("sample", "Replayce");
        return "admin/admin_login";
    }
    @GetMapping("/admin")
    public String main() {
        return "admin/admin_main";
    }
    @GetMapping("/admin_login")
    public String login() {
        return "admin/admin_login";
    }
    @GetMapping("/admin_signup")
    public String signup() {
        return "admin/admin_signup";
    }
    @GetMapping("/admin_reports")
    public String reports() {
        return "admin/admin_reports";
    }
    @GetMapping("/admin_alerts")
    public String alerts() {
        return "admin/admin_alerts";
    }
    @GetMapping("/admin_setting")
    public String setting() {
        return "admin/admin_setting";
    }


}
