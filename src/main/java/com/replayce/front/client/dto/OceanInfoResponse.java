package com.replayce.front.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OceanInfoResponse {
    Long id;
    String oceanTitle;
    String obsCode;
    Double oceanLat;
    Double oceanLon;
    String isUse;
}
