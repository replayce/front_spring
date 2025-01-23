package com.replayce.front.controller;

import com.replayce.front.client.api.AlertClient;
import com.replayce.front.client.api.ReportClient;
import com.replayce.front.client.dto.AlertResponse;
import com.replayce.front.client.dto.CommonResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.replayce.front.client.dto.ReportResponse;
import com.replayce.front.dto.LoginRequest;
import com.replayce.front.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import jakarta.servlet.http.HttpSession;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    // 백엔드 연결 추가 코드
    private final RestTemplate restTemplate;
    private final AlertClient alertClient;
    private final ReportClient reportClient;
    private final String BACKEND_URL = "http://localhost:8081";


     // 메인 페이지

    @GetMapping("/")
    public String mainPage() {
        return "admin/admin_main";
    }


     // 관리자 메인 페이지

    @GetMapping("/admin")
    public String main() {
        return "admin/admin_main";
    }


     // 로그인 페이지

    @GetMapping("/admin_login")
    public String loginPage() {
        return "admin/admin_login";
    }


     // 로그인 처리

    @PostMapping("/admin_login")
    public String login(@ModelAttribute LoginRequest loginRequest, HttpSession session, Model model) {
        try {
            // x-www-form-urlencoded 형식 데이터 생성
            String loginData = "username=" + loginRequest.getUsername() + "&password=" + loginRequest.getPassword();

            // HTTP 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            // HTTP 요청 엔티티 생성
            HttpEntity<String> entity = new HttpEntity<>(loginData, headers);

            // 백엔드 API 호출
            String url = "http://localhost:8081/api/auth/login";
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            // 로그인 성공 처리
            if (response.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> body = response.getBody();
                if (body != null && body.containsKey("result")) {
                    Map<String, String> result = (Map<String, String>) body.get("result");
                    String token = result.get("token");

                    // 세션에 토큰 저장
                    session.setAttribute("token", token);

                    // 성공 시 관리자 페이지로 리다이렉트
                    return "redirect:/admin";
                }
            }
        } catch (Exception e) {
            log.error("로그인 실패: {}", e.getMessage());
            model.addAttribute("error", "아이디 또는 비밀번호가 잘못되었습니다.");
        }

        // 로그인 실패 시 다시 로그인 페이지로
        return "admin/admin_login";
    }


     // 회원가입 페이지

    @GetMapping("/admin_signup")
    public String registerPage() {
        return "admin/admin_signup";
    }


     // 회원가입 처리


    @PostMapping("/admin_signup")
    public String register(@ModelAttribute RegisterRequest registerRequest, Model model) {
        try {
            // x-www-form-urlencoded 형식 데이터 생성
            String registerData = "username=" + registerRequest.getUsername() +
                    "&email=" + registerRequest.getEmail() +
                    "&phoneNumber=" + registerRequest.getPhoneNumber() +
                    "&password=" + registerRequest.getPassword();

            // HTTP 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            // HTTP 요청 엔티티 생성
            HttpEntity<String> entity = new HttpEntity<>(registerData, headers);

            // 백엔드 API 호출
            String url = "http://localhost:8081/api/auth/register";
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            // 회원가입 성공 처리
            if (response.getStatusCode() == HttpStatus.CREATED) {
                model.addAttribute("message", "회원가입이 완료되었습니다. 로그인 해주세요.");
                return "admin/admin_login";
            }
        } catch (Exception e) {
            log.error("회원가입 실패: {}", e.getMessage());
            model.addAttribute("error", e.getMessage());
        }

        // 회원가입 실패 시 다시 회원가입 페이지로
        return "admin/admin_signup";
    }



     // 로그아웃 기능

    @GetMapping("/admin/admin_logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/admin_login";
    }


     // 경보 관리

    @GetMapping("/admin/admin_alerts")
    public String alerts(Model model) {

        try {
            // FeignClient 호출
            CommonResponse<List<AlertResponse>> response = alertClient.getAllAlerts();
            model.addAttribute("alerts", response.getResult());
        } catch (Exception e) {
            System.err.println("Error fetching alerts: " + e.getMessage());
            model.addAttribute("alerts", List.of());
            model.addAttribute("error", "Failed to fetch alerts from backend.");
        }
        return "admin/admin_alerts";
    }

    // 제보 관리

    @GetMapping("/admin/admin_reports")
    public String reports(Model model) {
        try {
            // FeignClient 호출
            CommonResponse<List<ReportResponse>> response = reportClient.getBoards();
            model.addAttribute("reports", response.getResult());
        } catch (Exception e) {
            System.err.println("Error fetching reports: " + e.getMessage());
            model.addAttribute("reports", List.of());
            model.addAttribute("error", "Failed to fetch alerts from backend.");
        }

        return "admin/admin_reports";
    }


     // 내 계정 관리

    @GetMapping("/admin/admin_setting")
    public String setting() {
        return "admin/admin_setting";
    }


     // 보고서 수정 페이지

    @GetMapping("/admin/admin_edit_reports")
    public String editReports() {
        return "admin/admin_edit_reports";
    }


     // 계정 페이지

    @GetMapping("/admin/admin_account")
    public String account() {
        return "admin/admin_account";
    }
}
