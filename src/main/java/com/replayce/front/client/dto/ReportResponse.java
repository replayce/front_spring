package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReportResponse {
    private int id;
    private String writer;
    private String writerNumber;
    private String date;
    private int hour;
    private int minute;
    private String location;
    private String jelly;
}
