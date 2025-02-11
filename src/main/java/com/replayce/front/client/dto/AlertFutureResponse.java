package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AlertFutureResponse {
    private String jelly;          // 해파리 이름
    private String beach;          // 해변 이름
    private String time;           // 발생 시간
    private Double appearPred;     // 출현 예측 값
    private Double densityPred;    // 밀도 예측 값
    private Double percentLoc;     // 위치 예측 퍼센트
    private Long beachId;   // 오션 ID
}
