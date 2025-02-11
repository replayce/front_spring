package com.replayce.front.client.api;

import com.replayce.front.client.dto.AlertFutureResponse;
import com.replayce.front.client.dto.AlertResponse;
import com.replayce.front.client.dto.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "alertFutureClient", url = "${java-client.api.host}/api")
public interface AlertFutureClient {

    @GetMapping("/alertfuture")
    CommonResponse<List<AlertFutureResponse>> getAlertFuture();
}
