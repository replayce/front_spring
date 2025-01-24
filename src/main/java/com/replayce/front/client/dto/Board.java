package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//API 요청 데이터 DTO //클라이언트->서버
public class Board {
    private Long boardId;
    private String imageUrl;
    private String date;
    private int hour;
    private int minute;
    private String location;
    private String writer;
    private Long writerNumber;
    private String writerPassword;
    private String content;
}
