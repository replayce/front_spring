package com.replayce.front.controller;

import com.replayce.front.client.api.BoardClient;
import com.replayce.front.client.dto.*;
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

    // 게시글 조회
    @GetMapping
    public String getAllBoards(Model model) {
        try {
            CommonResponse<List<BoardResponse>> response = boardClient.getAllBoards();
            List<BoardResponse> boards = response.getResult();
            model.addAttribute("boards", boards);
        } catch (Exception e) {
            model.addAttribute("error", "게시글을 불러오는 중 오류가 발생했습니다.");
        }

        model.addAttribute("backend_addr", env.getProperty("java-client.api.host"));

        return "main/board";
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<CommonResponse<BoardResponse>> getBoard(@PathVariable Long boardId) {
        CommonResponse<BoardResponse> boards = boardClient.getBoard(boardId);
        return ResponseEntity.ok(boards);
    }

    //상세보기
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
            Model model
    ) {
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
        if (requestDto.getToxicity() == null || requestDto.getToxicity().isEmpty()) {
            if ("노무라입깃 해파리".equals(requestDto.getJelly())) {
                requestDto.setToxicity("강독성");
            } else if ("보름달물 해파리".equals(requestDto.getJelly())) {
                requestDto.setToxicity("약독성");
            }
        }

        if (requestDto.getContent() == null) {
            requestDto.setContent("");
        }

        CommonResponse<BoardResponse> response = boardClient.createBoard(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }



    @PatchMapping("/{boardId}")
    public ResponseEntity<CommonResponse<BoardResponse>> updateBoard(
            @PathVariable Long boardId,
            @RequestBody Board boardDetails
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
