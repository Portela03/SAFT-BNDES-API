package com.saftbndes.api.repository;

import java.math.BigDecimal;
import java.util.List;

import com.saftbndes.api.domain.OperacaoBNDES;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface OperacaoRepository extends JpaRepository<OperacaoBNDES, Long>, JpaSpecificationExecutor<OperacaoBNDES> {
    List<OperacaoBNDES> findBySetorBndesIgnoreCase(String setorBndes);

    List<OperacaoBNDES> findByUfIgnoreCase(String uf);

    List<OperacaoBNDES> findByValorContratadoReaisGreaterThan(BigDecimal valor);

    @Query("select o.bndesId from OperacaoBNDES o where o.bndesId is not null")
    List<Long> findAllBndesIds();

    @Query("select o.uf as uf, sum(o.valorContratadoReais) as total "
            + "from OperacaoBNDES o "
            + "where o.valorContratadoReais is not null "
            + "group by o.uf")
    List<UfTotalProjection> sumValorContratadoByUf();

    @Query("select o.setorBndes as setor, sum(o.valorContratadoReais) as total "
            + "from OperacaoBNDES o "
            + "where o.valorContratadoReais is not null "
            + "group by o.setorBndes "
            + "order by total desc")
    List<SetorTotalProjection> sumValorContratadoBySetor(Pageable pageable);
}
