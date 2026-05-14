package com.saftbndes.api.dto;

import java.math.BigDecimal;

public record InsightUfTotalResponse(
        String uf,
        BigDecimal total
) {
}
