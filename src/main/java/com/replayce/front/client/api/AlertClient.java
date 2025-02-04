package com.replayce.front.client.api;

import com.replayce.front.client.dto.Alert;
import com.replayce.front.client.dto.AlertResponse;
import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "alertClient", url = "${java-client.api.host}/api")
public interface AlertClient {

    @GetMapping("/alert")
    CommonResponse<List<AlertResponse>> getAllAlerts(@RequestParam("is_recent") int is_recent);

    @GetMapping("/alert/{alertId}")
    CommonResponse<AlertResponse> getAlertById(@PathVariable Long alertId);

    @PostMapping("/alert")
    CommonResponse<AlertResponse> createAlert(
            @RequestBody Alert alert,
            @RequestParam("beachId") Long beachId
    );

    @PatchMapping("/alert/{alertId}")
    CommonResponse<AlertResponse> updateAlert(
            @PathVariable Long alertId,
            @RequestBody Alert alertDetails,
            @RequestParam(value = "beachId", required = false) Long beachId
    );

    @DeleteMapping("/alert/{alertId}")
    ResponseEntity<BaseResponse> deleteAlert(@PathVariable Long alertId);
}
