package com.replayce.front.client.api;

import com.replayce.front.client.dto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "reportClient", url = "${java-client.api.host}/api")
public interface ReportClient {
    @GetMapping("/board")
    CommonResponse<PageResponseDto<ReportResponse>> getBoards(); // List<ReportResponse> -> PageResponseDto<ReportResponse> 수정

    // 어드민 게시 관리 페이지 모든 게시글 조회 (페이지네이션 없음)
    @GetMapping("/board/all")
    CommonResponse<List<ReportResponse>> getAllBoardsNoPaging();

}
