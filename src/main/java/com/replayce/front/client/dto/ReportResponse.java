package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class ReportResponse {
    private int id;
    private String writer;
    private LocalDateTime createDate;
    private String writerNumber;
    private String date;
    private int hour;
    private int minute;
    private String location;
    private String jelly;

    // 작성일시 포맷 수정
    private String formattedCreateDate;

    public String getFormattedCreateDate() {
        if(createDate == null) {
            return "작성일시 없음";
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return createDate.format(formatter);
    }


}
