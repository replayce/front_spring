package com.replayce.front.client.python.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PythonResponse {
    private Long id;
    private String query;
}
