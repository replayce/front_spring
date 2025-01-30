package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//API 응답 데이터 DTO //서버->클라이언트
public class BoardResponse {
    private Long boardId;
    private String content;
    private String writer;
    private String writerNumber; // 추가: 전화번호
    private String writerPassword; // 추가: 비밀번호
    private String imageUrl; // 추가
    private String date; // 추가
    private int hour; // 추가
    private int minute; // 추가
    private String location; // 추가
    private String jelly; // 추가: 해파리 이름
    private String toxicity; // 추가: 독성
    private String description; // 추가: 설명
}
