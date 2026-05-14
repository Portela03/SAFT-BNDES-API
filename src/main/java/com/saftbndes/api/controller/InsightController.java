package com.saftbndes.api.controller;

import java.util.List;

import com.saftbndes.api.dto.InsightUfTotalResponse;
import com.saftbndes.api.dto.TopSetorResponse;
import com.saftbndes.api.service.InsightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/insights")
public class InsightController {
    private final InsightService insightService;

    public InsightController(InsightService insightService) {
        this.insightService = insightService;
    }

    @GetMapping("/total-por-uf")
    public ResponseEntity<List<InsightUfTotalResponse>> totalPorUf() {
        return ResponseEntity.ok(insightService.totalPorUf());
    }

    @GetMapping("/top-setores")
    public ResponseEntity<List<TopSetorResponse>> topSetores(@RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(insightService.topSetores(limit));
    }
}
