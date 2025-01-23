package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReportResponse {
    private int id;
    private String title;
    private String writer;
    private LocalDateTime createdDate;
}
