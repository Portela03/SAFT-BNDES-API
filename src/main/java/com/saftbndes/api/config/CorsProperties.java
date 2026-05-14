package com.saftbndes.api.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {
    private String allowedOrigins = "*";

    public String getAllowedOrigins() {
        return allowedOrigins;
    }

    public void setAllowedOrigins(String allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    public List<String> allowedOriginsList() {
        if (allowedOrigins == null || allowedOrigins.isBlank()) {
            return List.of("*");
        }

        String trimmed = allowedOrigins.trim();
        if ("*".equals(trimmed)) {
            return List.of("*");
        }

        return Arrays.stream(trimmed.split(","))
                .map(String::trim)
                .filter(value -> !value.isEmpty())
                .toList();
    }
}
