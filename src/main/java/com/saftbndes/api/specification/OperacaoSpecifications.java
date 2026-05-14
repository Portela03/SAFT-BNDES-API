package com.saftbndes.api.specification;

import java.math.BigDecimal;

import com.saftbndes.api.domain.OperacaoBNDES;
import org.springframework.data.jpa.domain.Specification;

public final class OperacaoSpecifications {
    private OperacaoSpecifications() {
    }

    public static Specification<OperacaoBNDES> ufEquals(String uf) {
        return (root, query, cb) -> cb.equal(cb.upper(root.get("uf")), uf.toUpperCase());
    }

    public static Specification<OperacaoBNDES> setorBndesEquals(String setor) {
        return (root, query, cb) -> cb.equal(cb.upper(root.get("setorBndes")), setor.toUpperCase());
    }

    public static Specification<OperacaoBNDES> valorContratadoGreaterThan(BigDecimal valor) {
        return (root, query, cb) -> cb.greaterThan(root.get("valorContratadoReais"), valor);
    }
}
