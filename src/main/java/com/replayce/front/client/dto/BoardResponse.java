package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//API 응답 데이터 DTO //서버->클라이언트
public class BoardResponse {
    private String imageUrl;
    private String date;
    private int hour;
    private int minute;
    private String location;
    private String jelly;
    private String toxicity;
    private String describe;
    private String content;
}
