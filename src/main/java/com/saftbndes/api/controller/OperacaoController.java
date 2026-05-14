package com.saftbndes.api.controller;

import java.math.BigDecimal;

import com.saftbndes.api.dto.OperacaoCreateRequest;
import com.saftbndes.api.dto.OperacaoResponse;
import com.saftbndes.api.service.OperacaoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/operacoes")
public class OperacaoController {
    private final OperacaoService operacaoService;

    public OperacaoController(OperacaoService operacaoService) {
        this.operacaoService = operacaoService;
    }

    @GetMapping
    public ResponseEntity<Page<OperacaoResponse>> list(
            @RequestParam(required = false) String uf,
            @RequestParam(required = false) String setor,
            @RequestParam(required = false) BigDecimal valorMin,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(operacaoService.findAll(uf, setor, valorMin, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OperacaoResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(operacaoService.getById(id));
    }

    @PostMapping
    public ResponseEntity<OperacaoResponse> create(@Valid @RequestBody OperacaoCreateRequest request) {
        OperacaoResponse response = operacaoService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OperacaoResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody OperacaoCreateRequest request) {
        OperacaoResponse response = operacaoService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        operacaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
