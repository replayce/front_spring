package com.replayce.front.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AlertResponse {
    private String jelly;          // 해파리 이름
    private String beach;          // 해변 이름
    private String time;           // 발생 시간
    private String level;          // 경고 레벨
    private String imageUrl;       // 이미지 URL
    private Double appearPred;     // 출현 예측 값
    private Double densityPred;    // 밀도 예측 값
    private Double percentLoc;     // 위치 예측 퍼센트
    @JsonIgnore
    private LocalDateTime createDate; // 생성 시간
    @JsonIgnore
    private LocalDateTime updateDate; // 수정 시간
    private Long beachId;
}
