package com.replayce.front.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.replayce.front.client.dto.*;
import com.replayce.front.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class MainController {

    private final Environment env;
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

        List<BoardStatisticsDto> boardList = mainService.getRecentBoard();
        model.addAttribute("boardList", boardList);

        List<AlertFutureResponse> alertFutureList = mainService.getAlertFuture();
        try {
            String json = new ObjectMapper().writeValueAsString(alertFutureList);
            model.addAttribute("alertFutureJson", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        model.addAttribute("backend_addr", env.getProperty("java-client.api.host"));

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

        List<OceanInfoResponse> oceanInfoList = mainService.getAllOceanInfo();
        model.addAttribute("oceanInfoList", oceanInfoList);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(oceanInfoList);
            model.addAttribute("oceanInfoJson", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        model.addAttribute("is_edit", false);

        String pythonApiHost = env.getProperty("python-client.api.host");

        if (pythonApiHost == null || pythonApiHost.isEmpty()) {
            System.out.println("❌ pythonApiHost 값이 없습니다! application.yaml을 확인하세요.");
        }

        model.addAttribute("pythonApiHost", pythonApiHost);
        return "main/report";
    }

    @GetMapping("/about")
    public String about(Model model) {
        return "main/about";
    }

    //내 글 수정하기
    @GetMapping("/report/{boardId}")
    public String report(Model model, @PathVariable Long boardId) {

        List<OceanInfoResponse> oceanInfoList = mainService.getAllOceanInfo();
        model.addAttribute("oceanInfoList", oceanInfoList);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(oceanInfoList);
            model.addAttribute("oceanInfoJson", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        CommonResponse<BoardResponse> response = mainService.getBoard(boardId);
        BoardResponse board = response.getResult();
        model.addAttribute("board", board);
        model.addAttribute("is_edit", true);

        String pythonApiHost = env.getProperty("python-client.api.host");

        if (pythonApiHost == null || pythonApiHost.isEmpty()) {
            System.out.println("❌ pythonApiHost 값이 없습니다! application.yaml을 확인하세요.");
        }

        model.addAttribute("pythonApiHost", pythonApiHost);

        return "main/report";
    }

    @GetMapping("/terms")
    public String terms(Model model) {
        return "main/terms";
    }

    @GetMapping("/privacy")
    public String privacy(Model model) {
        return "main/privacy";
    }

}


