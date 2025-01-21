package com.replayce.front.client.api;

import com.replayce.front.client.dto.Alert;
import com.replayce.front.client.dto.AlertResponse;
import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "alertClient", url = "http://localhost:8081/api")
public interface AlertClient {

    @GetMapping("/alert")
    CommonResponse<List<AlertResponse>> getAllAlerts();

    @GetMapping("/alert/{alertId}")
    CommonResponse<AlertResponse> getAlertById(@PathVariable Long alertId);

    @PostMapping("/alert")
    CommonResponse<AlertResponse> createAlert(@RequestBody Alert alert);

    @PatchMapping("/alert/{alertId}")
    CommonResponse<AlertResponse> updateAlert(
            @PathVariable Long alertId,
            @RequestBody Alert alertDetails
    );

    @DeleteMapping("/alert/{alertId}")
    ResponseEntity<BaseResponse> deleteAlert(@PathVariable Long alertId);
}
