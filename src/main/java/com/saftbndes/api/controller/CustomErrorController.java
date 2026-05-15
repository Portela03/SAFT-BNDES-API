package com.saftbndes.api.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<Map<String, Object>> handleError(HttpServletRequest request) {
        Object statusAttr = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        int status = statusAttr != null ? Integer.parseInt(statusAttr.toString()) : 500;

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", status);
        body.put("app", "SAFT-BNDES API");
        body.put("docs", "https://saft-bndes-api.onrender.com/api/swagger-ui.html");
        body.put("health", "https://saft-bndes-api.onrender.com/api/health");

        return ResponseEntity.status(status).body(body);
    }
}
