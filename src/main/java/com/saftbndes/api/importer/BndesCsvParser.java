package com.saftbndes.api.importer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.function.Consumer;

import com.saftbndes.api.config.CsvProperties;
import com.saftbndes.api.domain.OperacaoBNDES;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class BndesCsvParser implements CsvParser {
    private static final Logger log = LoggerFactory.getLogger(BndesCsvParser.class);

    private final CsvProperties csvProperties;

    public BndesCsvParser(CsvProperties csvProperties) {
        this.csvProperties = csvProperties;
    }

    @Override
    public void parse(InputStream inputStream, Consumer<OperacaoBNDES> consumer) throws IOException {
        char delimiter = csvProperties.getDelimiter().charAt(0);
        log.info("[CSV] Iniciando parse — encoding='{}', delimiter='{}', dateFormat='{}'",
                csvProperties.getEncoding(), delimiter, csvProperties.getDateFormat());

        CSVFormat format = CSVFormat.DEFAULT.builder()
                .setDelimiter(delimiter)
                .setHeader()
                .setSkipHeaderRecord(true)
                .setTrim(true)
                .build();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(csvProperties.getDateFormat());

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(inputStream, Charset.forName(csvProperties.getEncoding())));
             CSVParser parser = format.parse(reader)) {
            log.info("[CSV] Colunas detectadas no cabeçalho: {}", parser.getHeaderNames());
            for (CSVRecord record : parser) {
                OperacaoBNDES operacao = new OperacaoBNDES();
                operacao.setBndesId(getLong(record, "_id"));
                operacao.setCliente(getString(record, "cliente"));
                operacao.setCnpj(getString(record, "cnpj"));
                operacao.setDescricaoDoProjeto(getString(record, "descricao_do_projeto"));
                operacao.setUf(getString(record, "uf"));
                operacao.setMunicipio(getString(record, "municipio"));
                operacao.setMunicipioCodigo(getLong(record, "municipio_codigo"));
                operacao.setNumeroDoContrato(getString(record, "numero_do_contrato"));
                operacao.setDataDaContratacao(getLocalDate(record, "data_da_contratacao", formatter));
                operacao.setValorContratadoReais(getBigDecimal(record, "valor_contratado_reais"));
                operacao.setValorDesembolsadoReais(getBigDecimal(record, "valor_desembolsado_reais"));
                operacao.setFonteDeRecursoDesembolsos(getString(record, "fonte_de_recurso_desembolsos"));
                operacao.setCustoFinanceiro(getString(record, "custo_financeiro"));
                operacao.setJuros(getBigDecimal(record, "juros"));
                operacao.setPrazoCarenciaMeses(getInteger(record, "prazo_carencia_meses"));
                operacao.setPrazoAmortizacaoMeses(getInteger(record, "prazo_amortizacao_meses"));
                operacao.setModalidadeDeApoio(getString(record, "modalidade_de_apoio"));
                operacao.setFormaDeApoio(getString(record, "forma_de_apoio"));
                operacao.setProduto(getString(record, "produto"));
                operacao.setInstrumentoFinanceiro(getString(record, "instrumento_financeiro"));
                operacao.setInovacao(getString(record, "inovacao"));
                operacao.setAreaOperacional(getString(record, "area_operacional"));
                operacao.setSetorCnae(getString(record, "setor_cnae"));
                operacao.setSubsetorCnaeAgrupado(getString(record, "subsetor_cnae_agrupado"));
                operacao.setSubsetorCnaeCodigo(getString(record, "subsetor_cnae_codigo"));
                operacao.setSubsetorCnaeNome(getString(record, "subsetor_cnae_nome"));
                operacao.setSetorBndes(getString(record, "setor_bndes"));
                operacao.setSubsetorBndes(getString(record, "subsetor_bndes"));
                operacao.setPorteDoCliente(getString(record, "porte_do_cliente"));
                operacao.setNaturezaDoCliente(getString(record, "natureza_do_cliente"));
                operacao.setInstituicaoFinanceiraCredenciada(getString(record, "instituicao_financeira_credenciada"));
                operacao.setCnpjInstituicaoFinanceiraCredenciada(getString(record, "cnpj_da_instituicao_financeira_credenciada"));
                operacao.setTipoDeGarantia(getString(record, "tipo_de_garantia"));
                operacao.setTipoDeExcepcionalidade(getString(record, "tipo_de_excepcionalidade"));
                operacao.setSituacaoDoContrato(getString(record, "situacao_do_contrato"));

                consumer.accept(operacao);
            }
        }
    }

    private String getString(CSVRecord record, String name) {
        if (!record.isMapped(name)) {
            return null;
        }
        String value = record.get(name);
        return value == null ? null : value.trim();
    }

    private BigDecimal getBigDecimal(CSVRecord record, String name) {
        String raw = getString(record, name);
        if (raw == null || raw.isBlank()) {
            return null;
        }

        String normalized = raw.trim();
        if (",".equals(csvProperties.getDecimal())) {
            normalized = normalized.replace(".", "").replace(",", ".");
        } else if (".".equals(csvProperties.getDecimal())) {
            normalized = normalized.replace(",", "");
        }

        try {
            return new BigDecimal(normalized);
        } catch (NumberFormatException ex) {
            log.warn("[CSV] Não foi possível converter '{}' para BigDecimal no campo '{}': {}", raw, name, ex.getMessage());
            return null;
        }
    }

    private Long getLong(CSVRecord record, String name) {
        BigDecimal value = getBigDecimal(record, name);
        return value == null ? null : value.longValue();
    }

    private Integer getInteger(CSVRecord record, String name) {
        BigDecimal value = getBigDecimal(record, name);
        return value == null ? null : value.intValue();
    }

    private LocalDate getLocalDate(CSVRecord record, String name, DateTimeFormatter formatter) {
        String raw = getString(record, name);
        if (raw == null || raw.isBlank()) {
            return null;
        }

        try {
            return LocalDateTime.parse(raw, formatter).toLocalDate();
        } catch (DateTimeParseException ex) {
            try {
                return LocalDate.parse(raw);
            } catch (DateTimeParseException ex2) {
                log.warn("[CSV] Não foi possível converter '{}' para data no campo '{}': {}", raw, name, ex2.getMessage());
                return null;
            }
        }
    }
}
