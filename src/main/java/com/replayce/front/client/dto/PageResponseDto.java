package com.replayce.front.client.dto;

import java.util.List;

public class PageResponseDto<T> {
    private List<T> content;
    private int totalPages;

    public PageResponseDto(List<T> content, int totalPages) {
        this.content = content;
        this.totalPages = totalPages;
    }

    public List<T> getContent() {
        return content;
    }

    public int getTotalPages() {
        return totalPages;
    }
}
