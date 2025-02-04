package com.replayce.front.controller;

import com.replayce.front.client.api.BoardClient;
import com.replayce.front.client.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/main/board")
public class BoardController {

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
        return "main/board";
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<CommonResponse<BoardResponse>> getBoard(@PathVariable Long boardId) {
        CommonResponse<BoardResponse> boards = boardClient.getBoard(boardId);
        return ResponseEntity.ok(boards);
    }

    // 내 글 검색
    @GetMapping("/search")
    public String searchMyBoards(
            @RequestParam String writer,
            @RequestParam String writerNumber,
            @RequestParam String writerPassword,
            Model model
    ) {
        List<BoardResponse> myBoards = boardClient.searchMyBoards(writer, writerNumber, writerPassword);
        model.addAttribute("boards", myBoards);
        return "main/board";
    }

    @PostMapping
    public ResponseEntity<CommonResponse<BoardResponse>> createBoard(@RequestBody Board board) {
        CommonResponse<BoardResponse> response = boardClient.createBoard(board);
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
