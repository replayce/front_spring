package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//API 응답 데이터 DTO //서버->클라이언트
public class BoardResponse {
    private String writer;
    private String writerNumber;
    private String writerPassword;
    private String content;
    private String imageUrl;
    private String date;
    private String hour;
    private String minute;
}
