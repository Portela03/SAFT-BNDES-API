package com.saftbndes.api.dto;

import java.math.BigDecimal;

public record TopSetorResponse(
        String setor,
        BigDecimal total
) {
}
