package com.replayce.front.client.python.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PyCommonResponse<T> extends PyBaseResponse {
    private T result;

    public PyCommonResponse(String path, String message, String details, T result) {
        super(path, message, details);
        this.result = result;
    }
}
