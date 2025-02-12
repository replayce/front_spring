package com.replayce.front.controller;

import com.replayce.front.client.api.AdminClient;
import com.replayce.front.client.api.AlertClient;
import com.replayce.front.client.api.AuthClient;
import com.replayce.front.client.api.ReportClient;
import com.replayce.front.client.dto.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.replayce.front.dto.LoginRequest;
import com.replayce.front.dto.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
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
//    private final RestTemplate restTemplate = new RestTemplate();
    private final AlertClient alertClient;
    private final ReportClient reportClient;
    //    private final String BACKEND_URL = "http://localhost:8081";
    private final AdminClient adminClient;
    private final AuthClient authClient;

    private final ObjectMapper objectMapper;


    // 관리자 메인 페이지

    @GetMapping("/admin")
    public String main(HttpServletRequest request, Model model) {
        try {
            // 알림 데이터
            CommonResponse<List<AlertResponse>> response = alertClient.getAllAlerts(0);
            List<AlertResponse> alerts = response.getResult();
            model.addAttribute("alerts", alerts);
            String alertsJson = objectMapper.writeValueAsString(alerts);
            model.addAttribute("alertsJson", alertsJson);

            // 제보 데이터
            CommonResponse<PageResponseDto<ReportResponse>> reportResponse = reportClient.getBoards(); // List<ReportResponse> -> <PageResponseDto<ReportResponse>
            PageResponseDto<ReportResponse> reports = reportResponse.getResult(); // List<ReportResponse> -> <PageResponseDto<ReportResponse>
            model.addAttribute("reports", reports);
            String reportsJson = objectMapper.writeValueAsString(reports);
            model.addAttribute("reportsJson", reportsJson);
        } catch (Exception e) {
            log.error("Error fetching data: {}", e.getMessage());
            model.addAttribute("alerts", List.of());
            model.addAttribute("reports", List.of());
            model.addAttribute("error", "Failed to fetch data from backend.");
            model.addAttribute("alertsJson", "[]");
            model.addAttribute("reportsJson", "[]");
        }

        model.addAttribute("username", request.getAttribute("username"));
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
            CommonResponse<AuthResponse> response = authClient.login(
                    loginRequest.getUsername(), loginRequest.getPassword()
            );
            if (response.getResult() != null) {
                String token = response.getResult().getToken();
                session.setAttribute("token", token);
                // 이후 정보 수정 위해서 유저네임 저장
                session.setAttribute("username",loginRequest.getUsername());
                return "redirect:/admin";
            }
            else {
                model.addAttribute("error_msg", response.getDetails());
            }
        } catch (Exception e) {
            log.error("로그인 실패: {}", e.getMessage());
            model.addAttribute("error_msg", "아이디 또는 비밀번호가 잘못되었습니다.");
        }

        // 로그인 실패 시 다시 로그인 페이지로
        return "admin/admin_login";
    }


    // 회원가입 페이지

    @GetMapping("/admin_signup")
    public String registerPage() {
        return "admin/admin_signup";
    }


    @PostMapping("/admin_signup")
    public String register(@ModelAttribute RegisterRequest registerRequest, Model model) {
        try {
            CommonResponse<String> response = authClient.register(
                    registerRequest.getUsername(),
                    registerRequest.getEmail(),
                    registerRequest.getPhoneNumber(),
                    registerRequest.getPassword()
            );
            if (response.getMessage().contains("회원가입 성공")) {
                model.addAttribute("message", "회원가입이 완료되었습니다. 관리자 승인을 대기해주세요.");
                return "admin/admin_login";
            }
        } catch (Exception e) {
            log.error("회원가입 실패: {}", e.getMessage());
            model.addAttribute("error", "회원가입 실패. 다시 시도해 주세요.");
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
    public String alerts(HttpServletRequest request, Model model) {

        try {
            // FeignClient 호출
            CommonResponse<List<AlertResponse>> response = alertClient.getAllAlerts(2);
            model.addAttribute("alerts", response.getResult());
        } catch (Exception e) {
            System.err.println("Error fetching alerts: " + e.getMessage());
            model.addAttribute("alerts", List.of());
            model.addAttribute("error", "Failed to fetch alerts from backend.");
        }

        model.addAttribute("username", request.getAttribute("username"));
        return "admin/admin_alerts";
    }

    // 제보 관리

    @GetMapping("/admin/admin_reports")
    public String reports(HttpServletRequest request, Model model) {
        try {
            // FeignClient 호출
            CommonResponse<PageResponseDto<ReportResponse>> response = reportClient.getBoards(); // List<ReportResponse> -> <PageResponseDto<ReportResponse>
            model.addAttribute("reports", response.getResult());
        } catch (Exception e) {
            System.err.println("Error fetching reports: " + e.getMessage());
            model.addAttribute("reports", List.of());
            model.addAttribute("error", "Failed to fetch alerts from backend.");
        }
        model.addAttribute("username", request.getAttribute("username"));
        return "admin/admin_reports";
    }


    // 관리자 승인 여부 페이지
    @GetMapping("/admin/admin_setting")
    public String setting(HttpServletRequest request, Model model, HttpSession session) {
        try {
            CommonResponse<List<AdminResponse>> response = adminClient.getPendingAdmins();
            if (response.getResult() != null) {
                model.addAttribute("pendingAdmins", response.getResult());
            }
        } catch (Exception e) {
            log.error("승인 대기 중인 관리자 목록 조회 실패: {}", e.getMessage());
            model.addAttribute("error", "승인 대기 중인 관리자 목록을 가져오는데 실패했습니다.");
        }
        model.addAttribute("username", request.getAttribute("username"));
        return "admin/admin_setting";
    }


    // 보고서 수정 페이지

    @GetMapping("/admin/admin_edit_reports")
    public String editReports(HttpServletRequest request, Model model) {
        model.addAttribute("username", request.getAttribute("username"));
        return "admin/admin_edit_reports";
    }


    // 계정 페이지

    @GetMapping("/admin/admin_account")
    public String account(HttpServletRequest request, Model model) {
        model.addAttribute("username", request.getAttribute("username"));
        return "admin/admin_account";
    }

    @PostMapping("/admin/admin_account_update")
    public String updateAccount(
            @RequestParam String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String newPassword,
            Model model,
            HttpSession session) {
        try {
            CommonResponse<String> response = authClient.updateAccount(username, email, phoneNumber, newPassword);
            if (response.getMessage().contains("업데이트 성공")) {
                model.addAttribute("message", "계정 정보가 성공적으로 업데이트 되었습니다.");
            } else {
                model.addAttribute("error", response.getMessage());
            }
        } catch (Exception e) {
            log.error("계정 업데이트 실패: {}", e.getMessage());
            model.addAttribute("error", "계정 정보 업데이트 중 오류가 발생했습니다.");
        }

        // 업데이트 후, 계정 정보 조회 (현재 로그인한 사용자의 정보를 authClient를 통해 조회)
        try {
            CommonResponse<List<AdminResponse>> accountResponse = authClient.getAdminsDetails(username);
            List<AdminResponse> adminList = accountResponse.getResult();
            if (adminList != null && !adminList.isEmpty()) {
                model.addAttribute("account", adminList.get(0));
            } else {
                model.addAttribute("error", "업데이트 후 계정 정보를 가져오는데 실패했습니다.");
            }
        } catch (Exception e) {
            log.error("업데이트 후 계정 정보 조회 실패: {}", e.getMessage());
            model.addAttribute("error", "업데이트 후 계정 정보를 가져오는데 오류가 발생했습니다.");
        }

        return "admin/admin_account_update";
    }
    //            @RequestParam String username,
//                                @RequestParam(required = false) String email,
//                                @RequestParam(required = false) String phoneNumber,
//                                @RequestParam(required = false) String newPassword,
//                                Model model,
//                                HttpSession session) {
//        try {
//            // 예: 백엔드 Auth API의 updateAccount 엔드포인트 호출 (FeignClient 또는 다른 방법 사용)
//            CommonResponse<String> response = authClient.updateAccount(
//                    username, email, phoneNumber, newPassword
//            );
//
//            // 백엔드 응답에 따른 메시지 처리
//            if (response.getMessage().contains("업데이트 성공")) {
//                model.addAttribute("message", "계정 정보가 성공적으로 업데이트되었습니다.");
//            } else {
//                model.addAttribute("error", response.getMessage());
//            }
//        } catch (Exception e) {
//            log.error("계정 업데이트 실패: {}", e.getMessage());
//            model.addAttribute("error", "계정 정보 업데이트 중 오류가 발생했습니다.");
//        }
//
//        return "admin/admin_account";
//    }
//
//}



    // 계정 정보 수정 POST 요청 처리
    @PostMapping("/admin/admin_account")
    public String confirmAccount(Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        log.info("confirmAccount: username from session = '{}'", username);
        if (username == null || username.trim().isEmpty()) {
            // username이 없다면 로그인 페이지로 리다이렉트
            return "redirect:/admin_login";
        }
        try {
            CommonResponse<List<AdminResponse>> response = authClient.getAdminsDetails(username);
            List<AdminResponse> adminList = response.getResult();
            if (adminList != null && !adminList.isEmpty()) {
                // 리스트의 첫 번째 요소를 account로 전달
                model.addAttribute("account", adminList.get(0));
                model.addAttribute("username", username);
            } else {
                model.addAttribute("error", "계정 정보를 가져오는데 실패했습니다.");
            }
        } catch (Exception e) {
            log.error("계정 정보 조회 실패: {}", e.getMessage());
            model.addAttribute("error", "계정 정보를 가져오는데 오류가 발생했습니다.");
        }
        return "admin/admin_account_update";
    }
}


