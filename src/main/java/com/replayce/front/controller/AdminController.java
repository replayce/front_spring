package com.replayce.front.controller;

import com.replayce.front.client.api.AlertClient;
import com.replayce.front.client.dto.AlertResponse;
import com.replayce.front.client.dto.CommonResponse;
import com.replayce.front.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
//@RequestMapping("/admin")
@Slf4j
public class AdminController {

    // 백엔드 연결 추가 코드
    private final RestTemplate restTemplate;
    private final AlertClient alertClient;
    private final String BACKEND_URL = "http://localhost:8081";




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
    public String login(LoginRequest loginRequest, Model model) {
        return "admin/admin_login";
    }

    @PostMapping("/login")
    public String login(String username, String password, Model model) {
        try {
            String url = BACKEND_URL + "/api/auth/login";

            // 요청 데이터 생성
            Map<String, String> loginRequest = Map.of(
                    "username", username,
                    "password", password
            );

            // HttpEntity 생성 및 Content-Type 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(loginRequest, headers);

            // API 요청
            ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            // 성공 여부 확인
            if (responseEntity.getStatusCode() == HttpStatus.OK) { // 응답 200이면
                Map<String, Object> body = responseEntity.getBody();
                if (body != null && body.containsKey("message")) { // 메시지가 있으면 성공
                    String message = body.get("message").toString();
                    log.info("Login successful: " + message);
                    return "redirect:/admin"; // 성공 -> 메인 페이지
                } else { // 메시지가 없으면 실패 처리
                    model.addAttribute("error", "Unexpected error: 'message' key not found.");
                    return "admin/admin_login"; // 실패 -> 로그인 페이지
                }
            } else { // 응답 200이 아닌 경우
                Map<String, Object> body = responseEntity.getBody();
                String error = (body != null && body.containsKey("details")) ? body.get("details").toString() : "Unknown error occurred.";
                model.addAttribute("error", "Login failed: " + error);
                return "admin/admin_login"; // 실패 -> 로그인 페이지
            }
        } catch (Exception e) { // 그 외의 에러 처리
            log.error("Login request failed", e);
            model.addAttribute("error", e.getMessage());
            return "admin/admin_login"; // 실패 -> 로그인 페이지
        }
    }

    @GetMapping("/admin_signup")
    public String signup() {
        return "admin/admin_signup";
    }

    @PostMapping("/admin_signup")
    public String signup(String username, String email, String phoneNumber, String password, Model model) {
        try {
            String url = BACKEND_URL + "/api/admins/register";

            // 요청 데이터
            MultiValueMap<String, String> requestMap = new LinkedMultiValueMap<>();
            requestMap.add("username", username);
            requestMap.add("email", email);
            requestMap.add("phoneNumber", phoneNumber);
            requestMap.add("password", password);

            // HttpEntity 생성 및 Content-Type 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestMap, headers);


            // API 요청
            ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            // 성공 여부 확인
            if (responseEntity.getStatusCode() == HttpStatus.OK) { // 응답 200이면
                Map<String, Object> body = responseEntity.getBody();
                if (body != null && body.containsKey("message")) { // null아닐 때 메세지 받음
                    String message = body.get("message").toString();
                    log.info("Registration successful: " + message);
                    return "redirect:/admin_login"; // 성공 -> 로그인 페이지
                } else { // null일 때
                    model.addAttribute("error", "Unexpected error: 'message' key not found.");
                    return "admin/admin_signup"; // 실패 -> 회원가입 페이지
                }
            } else { // 응답 200 아니면
                Map<String, Object> body = responseEntity.getBody();
                String error = (body != null && body.containsKey("error")) ? body.get("error").toString() : "Unknown error occurred.";
                model.addAttribute("error", "Registration failed: " + error);
                return "admin/admin_signup"; // 실패 -> 회원가입 페이지
            }
        } catch (Exception e) { // 그 외에 모든 에러
            log.error("Login request failed", e);
            model.addAttribute("error", e.getMessage());
            return "admin/admin_signup"; // 실패 -> 회원가입 페이지
        }
    }

    @GetMapping("/admin_reports")
    public String reports() {
        return "admin/admin_reports";
    }
    @GetMapping("/admin_alerts")
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
    @GetMapping("/admin_setting")
    public String setting() {
        return "admin/admin_setting";
    }
    @GetMapping("/admin_edit_reports")
    public String editReports() {return "admin/admin_edit_reports"; }

    @GetMapping("/admin_account")
    public String account() {return "admin/admin_account"; }


}
