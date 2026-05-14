package com.saftbndes.api.service;

import java.math.BigDecimal;

import com.saftbndes.api.domain.OperacaoBNDES;
import com.saftbndes.api.dto.OperacaoCreateRequest;
import com.saftbndes.api.dto.OperacaoResponse;
import com.saftbndes.api.exception.ResourceNotFoundException;
import com.saftbndes.api.mapper.OperacaoMapper;
import com.saftbndes.api.repository.OperacaoRepository;
import com.saftbndes.api.specification.OperacaoSpecifications;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class OperacaoService {
    private final OperacaoRepository operacaoRepository;
    private final OperacaoMapper operacaoMapper;

    public OperacaoService(OperacaoRepository operacaoRepository, OperacaoMapper operacaoMapper) {
        this.operacaoRepository = operacaoRepository;
        this.operacaoMapper = operacaoMapper;
    }

    public Page<OperacaoResponse> findAll(String uf, String setor, BigDecimal valorMin, Pageable pageable) {
        Specification<OperacaoBNDES> spec = Specification.where(null);

        if (uf != null && !uf.isBlank()) {
            spec = spec.and(OperacaoSpecifications.ufEquals(uf));
        }
        if (setor != null && !setor.isBlank()) {
            spec = spec.and(OperacaoSpecifications.setorBndesEquals(setor));
        }
        if (valorMin != null) {
            spec = spec.and(OperacaoSpecifications.valorContratadoGreaterThan(valorMin));
        }

        return operacaoRepository.findAll(spec, pageable)
                .map(operacaoMapper::toResponse);
    }

    public OperacaoResponse getById(Long id) {
        OperacaoBNDES operacao = operacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Operacao not found: " + id));
        return operacaoMapper.toResponse(operacao);
    }

    public OperacaoResponse create(OperacaoCreateRequest request) {
        OperacaoBNDES entity = operacaoMapper.toEntity(request);
        OperacaoBNDES saved = operacaoRepository.save(entity);
        return operacaoMapper.toResponse(saved);
    }

    public OperacaoResponse update(Long id, OperacaoCreateRequest request) {
        OperacaoBNDES entity = operacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Operacao not found: " + id));
        operacaoMapper.apply(request, entity);
        OperacaoBNDES saved = operacaoRepository.save(entity);
        return operacaoMapper.toResponse(saved);
    }

    public void delete(Long id) {
        if (!operacaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Operacao not found: " + id);
        }
        operacaoRepository.deleteById(id);
    }
}
