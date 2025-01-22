package com.replayce.front.controller;

import com.replayce.front.client.api.JavaClient;
import com.replayce.front.client.dto.CommonResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class FileController {

    private final JavaClient javaClient;

    @PostMapping
    public ResponseEntity<CommonResponse<String>> uploadFile(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        try {
            CommonResponse<String> res = javaClient.uploadFile(file);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            String errMsg = e.getMessage();
            if (errMsg.contains("400")) {
                return new ResponseEntity<>(new CommonResponse<String>(request.getRequestURI(),
                        "Only image files can be uploaded.",
                        "",
                        null), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}