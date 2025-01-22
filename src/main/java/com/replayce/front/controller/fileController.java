package com.replayce.front.controller;

import com.replayce.front.client.api.JavaClient;
import com.replayce.front.client.dto.CommonResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class fileController {

    private final JavaClient javaClient;

    @PostMapping
    public ResponseEntity<CommonResponse<String>> uploadFile(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        CommonResponse<String> res = javaClient.uploadFile(file);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}