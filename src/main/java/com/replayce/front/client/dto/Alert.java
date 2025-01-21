package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Alert {
    private Long alertId;
    private String jelly;
    private String beach;
    private String time;
    private String level;
    private String imageUrl;
}
