package com.replayce.front.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.replayce.front.client.dto.*;
import com.replayce.front.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class MainController {

    private final MainService mainService;
    private final RestTemplate restTemplate;

    @GetMapping
    public String mainPage(Model model) {
        List<OceanInfoResponse> oceanInfoList = mainService.getAllOceanInfo();
        model.addAttribute("oceanInfoList", oceanInfoList);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(oceanInfoList);
            model.addAttribute("oceanInfoJson", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        List<AlertResponse> alertList = mainService.getAlerts();
        try {
            String json = new ObjectMapper().writeValueAsString(alertList);
            model.addAttribute("alertListJson", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        List<BoardResponse> boardList = mainService.getRecentBoard();
        model.addAttribute("boardList", boardList.subList(0, Math.min(6, boardList.size())));

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

    @GetMapping("/detail")
    public String getDetail(Model model) {
        model.addAttribute("sample", "Replayce");
        return "main/detail";
    }

    @GetMapping("/report")
    public String report(Model model) {
        model.addAttribute("sample", "Replayce");
        return "main/report";
    }

}


