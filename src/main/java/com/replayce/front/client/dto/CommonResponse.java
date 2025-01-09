package com.replayce.front.client.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommonResponse<T> extends BaseResponse {
    private T result;

    public CommonResponse(String path, String message, String details, T result) {
        super(path, message, details);
        this.result = result;
    }
}
