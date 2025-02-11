package com.replayce.front.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.replayce.front.client.api.BoardClient;
import com.replayce.front.client.dto.*;
import com.replayce.front.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final Environment env;
    private final BoardClient boardClient;
    private final MainService mainService;

    // 📌 ✅ 기존 getAllBoards()를 수정하여 페이지네이션 지원
    @GetMapping
    public String getBoardPage(@RequestParam(defaultValue = "1") int page, Model model) {
        try {
            CommonResponse<PageResponseDto<BoardResponse>> response = boardClient.getBoardPage(page, 12);
            model.addAttribute("boards", response.getResult().getContent());
            model.addAttribute("totalPages", response.getResult().getTotalPages());  // ✅ totalPages 추가
        } catch (Exception e) {
            model.addAttribute("error", "게시글을 불러오는 중 오류가 발생했습니다.");
        }

        List<OceanInfoResponse> oceanInfoList = mainService.getAllOceanInfo();
        model.addAttribute("oceanInfoList", oceanInfoList);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(oceanInfoList);
            model.addAttribute("oceanInfoJson", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        model.addAttribute("backend_addr", env.getProperty("java-client.api.host"));

        return "main/board";
    }

    // 📌 ✅ BoardClient의 getBoardPage() 호출을 위한 API 추가
    @GetMapping("/page")
    public ResponseEntity<CommonResponse<PageResponseDto<BoardResponse>>> getBoardPageData(
            @RequestParam(defaultValue = "1") int page) {
        return ResponseEntity.ok(boardClient.getBoardPage(page, 12));
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<CommonResponse<BoardResponse>> getBoard(@PathVariable Long boardId) {
        CommonResponse<BoardResponse> boards = boardClient.getBoard(boardId);
        return ResponseEntity.ok(boards);
    }

    // 상세보기
    @GetMapping("/detail/{boardId}")
    public String getDetail(Model model, @PathVariable Long boardId) {
        CommonResponse<BoardResponse> response = boardClient.getBoard(boardId);
        BoardResponse board = response.getResult();
        model.addAttribute("board", board);
        return "main/board_detail";
    }

    // 내 글 검색
    @GetMapping("/search")
    public String searchMyBoards(
            @RequestParam String writerNumber,
            @RequestParam String writerPassword,
            Model model) {
        List<BoardResponse> myBoards = boardClient.searchMyBoards(writerNumber, writerPassword);
        model.addAttribute("boards", myBoards);
        return "main/board";
    }

    // 검색 기능 (내용, 위치, 해파리 종류, 독성을 모두 포함)
    @GetMapping("/search/query")
    public String searchBoards(@RequestParam String query, Model model) {
        List<BoardResponse> searchResults = boardClient.searchBoards(query);
        model.addAttribute("boards", searchResults);
        return "main/board";
    }

    @PostMapping
    public ResponseEntity<CommonResponse<BoardResponse>> createBoard(@RequestBody BoardRequestDto requestDto) {
        CommonResponse<BoardResponse> response = boardClient.createBoard(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity<CommonResponse<BoardResponse>> updateBoard(
            @PathVariable Long boardId,
            @RequestBody BoardRequestDto boardDetails
    ) {
        CommonResponse<BoardResponse> response = boardClient.updateBoard(boardId, boardDetails);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<BaseResponse> deleteBoard(@PathVariable Long boardId) {
        ResponseEntity<BaseResponse> response = boardClient.deleteBoard(boardId);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
