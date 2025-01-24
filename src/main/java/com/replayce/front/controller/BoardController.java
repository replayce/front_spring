package com.replayce.front.controller;

import com.replayce.front.client.api.BoardClient;
import com.replayce.front.client.dto.Board;
import com.replayce.front.client.dto.BoardResponse;
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
@RequestMapping("/main/board")
public class BoardController {

    private final BoardClient boardClient;

    // 게시글 조회
    @GetMapping
    public String getAllBoards(@RequestParam(value = "content", required = false) String content, Model model) {
        List<BoardResponse> boards = content != null ?
                boardClient.getBoardsByContent(content) : boardClient.getAllBoards();
        model.addAttribute("boards", boards);
        return "main/board";
    }

    // 내 글 검색
    @GetMapping("/search")
    public String searchMyBoards(
            @RequestParam String writer,
            @RequestParam Long writerNumber,
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
