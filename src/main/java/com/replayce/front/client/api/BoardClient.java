package com.replayce.front.client.api;

import com.replayce.front.client.dto.BaseResponse;
import com.replayce.front.client.dto.Board;
import com.replayce.front.client.dto.BoardResponse;
import com.replayce.front.client.dto.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "boardClient", url = "http://localhost:8081/api")
public interface BoardClient {

    @GetMapping("/board")
    CommonResponse<List<BoardResponse>> getAllBoards();

    @GetMapping("/board/search")
    List<BoardResponse> searchMyBoards(
            @RequestParam String writer,
            @RequestParam String writerNumber,
            @RequestParam String writerPassword
    );

    @GetMapping("/board/{boardId}")
    CommonResponse<BoardResponse> getBoard(@PathVariable Long boardId);

    @PostMapping("/board")
    CommonResponse<BoardResponse> createBoard(@RequestBody Board board);

    @PatchMapping("/board/{boardId}")
    CommonResponse<BoardResponse> updateBoard(
            @PathVariable Long boardId,
            @RequestBody Board boardDetails
    );

    @DeleteMapping("/board/{boardId}")
    ResponseEntity<BaseResponse> deleteBoard(@PathVariable Long boardId);
}
