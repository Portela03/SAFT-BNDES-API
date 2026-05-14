package com.saftbndes.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record OperacaoResponse(
        Long id,
        Long bndesId,
        String cliente,
        String cnpj,
        String uf,
        LocalDate dataDaContratacao,
        BigDecimal valorContratadoReais,
        BigDecimal valorDesembolsadoReais,
        String setorBndes,
        String subsetorBndes,
        String porteDoCliente,
        Long numeroDoContrato,
        String situacaoDoContrato
) {
}
