package com.replayce.front.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AlertResponse {
    private String jelly;        // 해파리 이름
    private String beach;        // 해변 이름
    private String time;         // 발생 시간
    private String level;        // 경고 레벨
    private String imageUrl;     // 이미지 URL
    private Double appearPred;   // 출현 예측 값
    private Double densityPred;  // 밀도 예측 값
    private Double percentLoc;   // 위치 예측 퍼센트

    private String appearanceStatus;
    private String densityLabel; // ✅ 관리자(admin) 전용 필드 추가
    private String percentFormatted; // ✅ 관리자(admin) 전용 필드 추가

    @JsonIgnore
    private LocalDateTime createDate;
    @JsonIgnore
    private LocalDateTime updateDate;

    private Long beachId;
}
