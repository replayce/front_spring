package com.replayce.front.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.Client;
import okhttp3.OkHttpClient;

@Configuration
public class FeignConfig {

    @Bean
    public Client feignClient() {
        return new feign.okhttp.OkHttpClient(new OkHttpClient());
    }
}
