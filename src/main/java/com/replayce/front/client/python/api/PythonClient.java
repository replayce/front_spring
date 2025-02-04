package com.replayce.front.client.python.api;

import com.replayce.front.client.python.dto.PyCommonResponse;
import com.replayce.front.client.python.dto.PythonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

/*
AI 관련 Python Restful API를 호출하는 인터페이스
 */

@FeignClient(name = "pythonClient", url = "${python-client.api.host}")
public interface PythonClient {

    @GetMapping("/items/{id}")
    public PyCommonResponse<PythonResponse> getPython(@PathVariable("id") Long id, @RequestParam("query") String query);
}
