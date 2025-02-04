package com.replayce.front.client.python.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PyBaseResponse {
    private String path;
    private String message;
    private String details;

}
