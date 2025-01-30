package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
//API 요청 데이터 DTO //클라이언트->서버
public class Board {
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
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public String getFormattedTime() {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(createDate, now);

        long seconds = duration.getSeconds();
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;

        if (seconds < 60) {
            return seconds + "초 전";
        } else if (minutes < 60) {
            return minutes + "분 전";
        } else if (hours < 24) {
            return hours + "시간 전";
        } else {
            return createDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        }
    }
}
