package com.saftbndes.api.service;

import java.util.List;

import com.saftbndes.api.dto.InsightUfTotalResponse;
import com.saftbndes.api.dto.TopSetorResponse;
import com.saftbndes.api.repository.OperacaoRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class InsightService {
    private final OperacaoRepository operacaoRepository;

    public InsightService(OperacaoRepository operacaoRepository) {
        this.operacaoRepository = operacaoRepository;
    }

    public List<InsightUfTotalResponse> totalPorUf() {
        return operacaoRepository.sumValorContratadoByUf().stream()
                .map(item -> new InsightUfTotalResponse(item.getUf(), item.getTotal()))
                .toList();
    }

    public List<TopSetorResponse> topSetores(int limit) {
        int safeLimit = limit <= 0 ? 5 : limit;
        return operacaoRepository.sumValorContratadoBySetor(PageRequest.of(0, safeLimit)).stream()
                .map(item -> new TopSetorResponse(item.getSetor(), item.getTotal()))
                .toList();
    }
}
