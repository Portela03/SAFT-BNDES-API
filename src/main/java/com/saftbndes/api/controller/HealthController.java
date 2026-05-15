package com.saftbndes.api.controller;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "UP");
        body.put("app", "SAFT-BNDES API");
        body.put("timestamp", Instant.now().toString());
        body.put("docs", "/api/swagger-ui.html");
        return ResponseEntity.ok(body);
    }
}
