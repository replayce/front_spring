package com.replayce.front.client.api;

import com.replayce.front.client.dto.PageResponseDto;
import com.replayce.front.client.dto.ReportResponse;
import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "reportClient", url = "${java-client.api.host}/api")
public interface ReportClient {
    @GetMapping("/board")
    CommonResponse<PageResponseDto<ReportResponse>> getBoards(); // List<ReportResponse> -> PageResponseDto<ReportResponse> 수정

}
