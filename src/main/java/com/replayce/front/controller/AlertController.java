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
@RequestMapping("/main/alert")
public class AlertController {

    private final AlertClient alertClient;

    @GetMapping
    public String getAllAlerts(Model model) {
        try {
            // FeignClient 호출
            CommonResponse<List<AlertResponse>> response = alertClient.getAllAlerts();
            model.addAttribute("alerts", response.getResult());
        } catch (Exception e) {
            System.err.println("Error fetching alerts: " + e.getMessage());
            model.addAttribute("alerts", List.of());
            model.addAttribute("error", "Failed to fetch alerts from backend.");
        }
        return "main/alert";
    }

//    @GetMapping
//    public ResponseEntity<CommonResponse<List<AlertResponse>>> getAllAlerts() {
//        CommonResponse<List<AlertResponse>> response = alertClient.getAllAlerts();
//        return ResponseEntity.ok(response);
//    }

    @GetMapping("/{alertId}")
    public ResponseEntity<CommonResponse<AlertResponse>> getAlertById(@PathVariable Long alertId) {
        CommonResponse<AlertResponse> response = alertClient.getAlertById(alertId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<CommonResponse<AlertResponse>> createAlert(@RequestBody Alert alert) {
        CommonResponse<AlertResponse> response = alertClient.createAlert(alert);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{alertId}")
    public ResponseEntity<CommonResponse<AlertResponse>> updateAlert(
            @PathVariable Long alertId,
            @RequestBody Alert alertDetails
    ) {
        CommonResponse<AlertResponse> response = alertClient.updateAlert(alertId, alertDetails);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{alertId}")
    public ResponseEntity<BaseResponse> deleteAlert(@PathVariable Long alertId) {
        ResponseEntity<BaseResponse> response = alertClient.deleteAlert(alertId);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
