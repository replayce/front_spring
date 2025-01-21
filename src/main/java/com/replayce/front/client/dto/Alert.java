package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Alert {
    private Long alertId;       // Alert ID
    private String jelly;       // 해파리 이름
    private String beach;       // 해변 이름 (해변 ID와 관련된 정보로 출력 시 사용)
    private String time;        // 발생 시간
    private String level;       // 경고 레벨
    private String imageUrl;    // 이미지 URL
    private Double appearPred;  // 출현 예측 값
    private Double densityPred; // 밀도 예측 값
    private Double percentLoc;  // 위치 예측 퍼센트
}
