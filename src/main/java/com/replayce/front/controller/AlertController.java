package com.replayce.front.controller;

import com.replayce.front.client.api.AlertClient;
import com.replayce.front.client.dto.Alert;
import com.replayce.front.client.dto.AlertResponse;
import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/main/alert") // 공통 경로
public class AlertController {

    private final AlertClient alertClient;

    // 모든 Alert 조회 및 화면에 렌더링
    @GetMapping
    public String getAllAlerts(Model model) {
        try {
            // Feign Client 호출
            CommonResponse<List<AlertResponse>> response = alertClient.getAllAlerts(0);
            model.addAttribute("alerts", response.getResult());
        } catch (Exception e) {
            System.err.println("Error fetching alerts: " + e.getMessage());
            model.addAttribute("alerts", List.of());
            model.addAttribute("error", "Failed to fetch alerts from backend.");
        }
        return "main/alert"; // alert.mustache 파일로 렌더링
    }

    // 특정 Alert 조회
    @GetMapping("/{alertId}")
    public ResponseEntity<CommonResponse<AlertResponse>> getAlertById(@PathVariable Long alertId) {
        CommonResponse<AlertResponse> response = alertClient.getAlertById(alertId);
        return ResponseEntity.ok(response);
    }

    // Alert 생성
    @PostMapping
    public ResponseEntity<CommonResponse<AlertResponse>> createAlert(
            @RequestBody Alert alert,
            @RequestParam Long beachId // beachId를 요청 매개변수로 처리
    ) {
        CommonResponse<AlertResponse> response = alertClient.createAlert(alert, beachId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Alert 업데이트
    @PatchMapping("/{alertId}")
    public ResponseEntity<CommonResponse<AlertResponse>> updateAlert(
            @PathVariable Long alertId,
            @RequestBody Alert alertDetails,
            @RequestParam(required = false) Long beachId // beachId를 요청 매개변수로 처리
    ) {
        CommonResponse<AlertResponse> response = alertClient.updateAlert(alertId, alertDetails, beachId);
        return ResponseEntity.ok(response);
    }

    // Alert 삭제
    @DeleteMapping("/{alertId}")
    public ResponseEntity<BaseResponse> deleteAlert(@PathVariable Long alertId) {
        ResponseEntity<BaseResponse> response = alertClient.deleteAlert(alertId);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
