package com.replayce.front.advice;

import com.replayce.front.client.dto.BaseResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {ResponseStatusException.class})
    public String handleResponseStatusException(ResponseStatusException ex, Model model, HttpServletRequest request) {
        String currentPath = request.getRequestURI();
        model.addAttribute("path", currentPath);
        model.addAttribute("status", ex.getStatusCode().value());
        model.addAttribute("message", ex.getReason());
        return "error/error";
    }

    @ExceptionHandler(value = {Exception.class})
    @ResponseStatus
    public String handleAllOtherExceptions(Exception ex, Model model, HttpServletRequest request) {
        String currentPath = request.getRequestURI();
        model.addAttribute("path", currentPath);
        model.addAttribute("status", 404);
        model.addAttribute("message", "페이지를 찾을 수 없습니다.");
        return "error/error";
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<BaseResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String errorMessage = String.format("Invalid parameter: '%s'. Expected a valid number.", ex.getValue());
        BaseResponse response = new BaseResponse(
                "",
                "Type Mismatch Error",
                errorMessage
        );
        return ResponseEntity.badRequest().body(response);
    }

}
