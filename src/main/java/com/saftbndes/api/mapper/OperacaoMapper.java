package com.saftbndes.api.mapper;

import com.saftbndes.api.domain.OperacaoBNDES;
import com.saftbndes.api.dto.OperacaoCreateRequest;
import com.saftbndes.api.dto.OperacaoResponse;
import org.springframework.stereotype.Component;

@Component
public class OperacaoMapper {
    public OperacaoResponse toResponse(OperacaoBNDES entity) {
        if (entity == null) {
            return null;
        }

        return new OperacaoResponse(
                entity.getId(),
                entity.getBndesId(),
                entity.getCliente(),
                entity.getCnpj(),
                entity.getUf(),
                entity.getDataDaContratacao(),
                entity.getValorContratadoReais(),
                entity.getValorDesembolsadoReais(),
                entity.getSetorBndes(),
                entity.getSubsetorBndes(),
                entity.getPorteDoCliente(),
                entity.getNumeroDoContrato(),
                entity.getSituacaoDoContrato()
        );
    }

    public OperacaoBNDES toEntity(OperacaoCreateRequest request) {
        OperacaoBNDES entity = new OperacaoBNDES();
        apply(request, entity);
        return entity;
    }

    public void apply(OperacaoCreateRequest request, OperacaoBNDES entity) {
        entity.setCliente(request.getCliente());
        entity.setCnpj(request.getCnpj());
        entity.setUf(request.getUf());
        entity.setDataDaContratacao(request.getDataDaContratacao());
        entity.setValorContratadoReais(request.getValorContratadoReais());
        entity.setValorDesembolsadoReais(request.getValorDesembolsadoReais());
        entity.setSetorBndes(request.getSetorBndes());
        entity.setSubsetorBndes(request.getSubsetorBndes());
        entity.setNumeroDoContrato(request.getNumeroDoContrato());
        entity.setPorteDoCliente(request.getPorteDoCliente());
        entity.setSituacaoDoContrato(request.getSituacaoDoContrato());
        entity.setNaturezaDoCliente(request.getNaturezaDoCliente());
        entity.setFormaDeApoio(request.getFormaDeApoio());
        entity.setProduto(request.getProduto());
        entity.setInstrumentoFinanceiro(request.getInstrumentoFinanceiro());
        entity.setInovacao(request.getInovacao());
    }
}
