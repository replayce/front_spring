package com.replayce.front.service;

import com.replayce.front.client.api.AlertClient;
import com.replayce.front.client.api.BoardClient;
import com.replayce.front.client.api.JavaClient;
import com.replayce.front.client.api.OceanInfoClient;
import com.replayce.front.client.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final JavaClient javaClient;
    private final AlertClient alertClient;
    private final OceanInfoClient oceanInfoClient;
    private final BoardClient boardClient;

    public JavaResponse getJava(Long id, String query) {
        // 에러코드 처리 진행해야 한다.
        // if ( res.getStatus() != 200 ) { return "error"; }

        return javaClient.getJava(id, query).getResult();
    }

    public List<AlertResponse> getAlerts() {
        return alertClient.getAllAlerts(1).getResult();
    }

    public List<OceanInfoResponse> getAllOceanInfo() {
        return oceanInfoClient.getAllOceanInfo("Y").getResult();
    }

    public List<BoardStatisticsDto> getRecentBoard() {
        return boardClient.getStatistics().getResult();
    }
}
