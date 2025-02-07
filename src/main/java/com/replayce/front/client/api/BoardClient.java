package com.replayce.front.client.api;

import com.replayce.front.client.dto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "boardClient", url = "${java-client.api.host}/api")
public interface BoardClient {

    @GetMapping("/board")
    CommonResponse<List<BoardResponse>> getAllBoards();

    @GetMapping("/board/page")
    CommonResponse<PageResponseDto<BoardResponse>> getBoardPage(
            @RequestParam int page,
            @RequestParam int size
    );

    //내 글 검색
    @GetMapping("/board/search")
    List<BoardResponse> searchMyBoards(
            @RequestParam String writerNumber,
            @RequestParam String writerPassword
    );

    @GetMapping("/board/statistics")
    CommonResponse<List<BoardStatisticsDto>> getStatistics();

    //query 키워드 통한 검색
    @GetMapping("/board/search/query")
    List<BoardResponse> searchBoards(@RequestParam String query);

    //해파리 아이콘 필터링
    @GetMapping("/board/filter")
    CommonResponse<List<BoardResponse>> filterBoardsByJelly(
            @RequestParam List<String> jellies,
            @RequestParam int page,
            @RequestParam int size);

    @GetMapping("/board/{boardId}")
    CommonResponse<BoardResponse> getBoard(@PathVariable Long boardId);

    @PostMapping(value = "/board", consumes = "application/json", produces = "application/json")
    CommonResponse<BoardResponse> createBoard(@RequestBody BoardRequestDto requestDto);

    @PatchMapping("/board/{boardId}")
    CommonResponse<BoardResponse> updateBoard(
            @PathVariable Long boardId,
            @RequestBody Board boardDetails
    );

    @DeleteMapping("/board/{boardId}")
    ResponseEntity<BaseResponse> deleteBoard(@PathVariable Long boardId);
}
