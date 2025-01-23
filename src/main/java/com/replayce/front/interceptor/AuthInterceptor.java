package com.replayce.front.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(AuthInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession(false);
        String token = (session != null) ? (String) session.getAttribute("token") : null;

        String uri = request.getRequestURI();
        logger.info("AuthInterceptor: Processing URI: {}", uri);
        logger.info("AuthInterceptor: Token present: {}", (token != null && !token.isEmpty()));

        // 로그인 및 회원가입 페이지에 접근할 때
        if (uri.equals("/admin_login") || uri.equals("/admin_signup")) {
            if (token != null && !token.isEmpty()) {
                // 이미 인증된 사용자는 관리자 메인 페이지로 리다이렉트
                logger.info("AuthInterceptor: Authenticated user accessing login/signup page. Redirecting to /admin");
                response.sendRedirect("/admin");
                return false;
            }
            // 인증되지 않은 사용자는 로그인/회원가입 페이지에 접근 허용
            logger.info("AuthInterceptor: Unauthenticated user accessing login/signup page.");
            return true;
        }

        // 기타 /admin/** 경로에 접근할 때
        if (uri.startsWith("/admin")) {
            if (token == null || token.isEmpty()) {
                // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
                logger.info("AuthInterceptor: Unauthenticated user accessing admin page. Redirecting to /admin_login");
                response.sendRedirect("/admin_login");
                return false;
            }
            // 인증된 사용자는 요청을 계속 진행
            logger.info("AuthInterceptor: Authenticated user accessing admin page.");
            return true;
        }

        // 그 외의 요청은 인증 검사 없이 통과
        logger.info("AuthInterceptor: Non-admin URI. Allowing access.");
        return true;
    }
}
