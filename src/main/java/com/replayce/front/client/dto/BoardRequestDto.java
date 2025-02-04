package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRequestDto {
    private String content;
    private String writer;
    private String writerNumber;
    private String writerPassword;
    private String imageUrl;
    private String date;
    private int hour;
    private int minute;
    private String location;
    private String jelly;
    private String toxicity;
    private String description;
}
