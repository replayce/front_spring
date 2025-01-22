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

    @GetMapping
    public String getAllBoards(Model model) {
        System.out.println("확인");
        try {
            CommonResponse<List<BoardResponse>> response = boardClient.getAllBoards();
            model.addAttribute("boards", response.getResult());
        } catch (Exception e) {
            System.err.println("Error fetching boards: " + e.getMessage());
            model.addAttribute("boards", List.of());
            model.addAttribute("error", "Failed to fetch boards from backend.");
        }
        return "main/board";
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<CommonResponse<BoardResponse>> getBoardById(@PathVariable Long boardId) {
        CommonResponse<BoardResponse> response = boardClient.getBoardById(boardId);
        return ResponseEntity.ok(response);
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
