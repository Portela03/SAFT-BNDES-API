package com.saftbndes.api.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

@Entity
@Table(
        name = "operacoes_bndes",
        indexes = {
                @Index(name = "idx_operacao_uf", columnList = "uf"),
                @Index(name = "idx_operacao_setor_bndes", columnList = "setor_bndes"),
                @Index(name = "idx_operacao_valor", columnList = "valor_contratado_reais")
        }
)
public class OperacaoBNDES {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bndes_id", unique = true)
    private Long bndesId;

    @Column(length = 255)
    private String cliente;

    @Column(length = 32)
    private String cnpj;

    @Column(name = "descricao_do_projeto", length = 2000)
    private String descricaoDoProjeto;

    @Column(length = 2)
    private String uf;

    @Column(length = 255)
    private String municipio;

    @Column(name = "municipio_codigo")
    private Long municipioCodigo;

    @Column(name = "numero_do_contrato", length = 40)
    private String numeroDoContrato;

    @Column(name = "data_da_contratacao")
    private LocalDate dataDaContratacao;

    @Column(name = "valor_contratado_reais", precision = 19, scale = 2)
    private BigDecimal valorContratadoReais;

    @Column(name = "valor_desembolsado_reais", precision = 19, scale = 2)
    private BigDecimal valorDesembolsadoReais;

    @Column(name = "fonte_de_recurso_desembolsos", length = 255)
    private String fonteDeRecursoDesembolsos;

    @Column(name = "custo_financeiro", length = 120)
    private String custoFinanceiro;

    @Column(precision = 10, scale = 4)
    private BigDecimal juros;

    @Column(name = "prazo_carencia_meses")
    private Integer prazoCarenciaMeses;

    @Column(name = "prazo_amortizacao_meses")
    private Integer prazoAmortizacaoMeses;

    @Column(name = "modalidade_de_apoio", length = 120)
    private String modalidadeDeApoio;

    @Column(name = "forma_de_apoio", length = 120)
    private String formaDeApoio;

    @Column(length = 120)
    private String produto;

    @Column(name = "instrumento_financeiro", length = 255)
    private String instrumentoFinanceiro;

    @Column(length = 10)
    private String inovacao;

    @Column(name = "area_operacional", length = 255)
    private String areaOperacional;

    @Column(name = "setor_cnae", length = 255)
    private String setorCnae;

    @Column(name = "subsetor_cnae_agrupado", length = 255)
    private String subsetorCnaeAgrupado;

    @Column(name = "subsetor_cnae_codigo", length = 32)
    private String subsetorCnaeCodigo;

    @Column(name = "subsetor_cnae_nome", length = 255)
    private String subsetorCnaeNome;

    @Column(name = "setor_bndes", length = 255)
    private String setorBndes;

    @Column(name = "subsetor_bndes", length = 255)
    private String subsetorBndes;

    @Column(name = "porte_do_cliente", length = 60)
    private String porteDoCliente;

    @Column(name = "natureza_do_cliente", length = 255)
    private String naturezaDoCliente;

    @Column(name = "instituicao_financeira_credenciada", length = 255)
    private String instituicaoFinanceiraCredenciada;

    @Column(name = "cnpj_da_instituicao_financeira_credenciada", length = 32)
    private String cnpjInstituicaoFinanceiraCredenciada;

    @Column(name = "tipo_de_garantia", length = 255)
    private String tipoDeGarantia;

    @Column(name = "tipo_de_excepcionalidade", length = 255)
    private String tipoDeExcepcionalidade;

    @Column(name = "situacao_do_contrato", length = 80)
    private String situacaoDoContrato;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBndesId() {
        return bndesId;
    }

    public void setBndesId(Long bndesId) {
        this.bndesId = bndesId;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getDescricaoDoProjeto() {
        return descricaoDoProjeto;
    }

    public void setDescricaoDoProjeto(String descricaoDoProjeto) {
        this.descricaoDoProjeto = descricaoDoProjeto;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public Long getMunicipioCodigo() {
        return municipioCodigo;
    }

    public void setMunicipioCodigo(Long municipioCodigo) {
        this.municipioCodigo = municipioCodigo;
    }

    public String getNumeroDoContrato() {
        return numeroDoContrato;
    }

    public void setNumeroDoContrato(String numeroDoContrato) {
        this.numeroDoContrato = numeroDoContrato;
    }

    public LocalDate getDataDaContratacao() {
        return dataDaContratacao;
    }

    public void setDataDaContratacao(LocalDate dataDaContratacao) {
        this.dataDaContratacao = dataDaContratacao;
    }

    public BigDecimal getValorContratadoReais() {
        return valorContratadoReais;
    }

    public void setValorContratadoReais(BigDecimal valorContratadoReais) {
        this.valorContratadoReais = valorContratadoReais;
    }

    public BigDecimal getValorDesembolsadoReais() {
        return valorDesembolsadoReais;
    }

    public void setValorDesembolsadoReais(BigDecimal valorDesembolsadoReais) {
        this.valorDesembolsadoReais = valorDesembolsadoReais;
    }

    public String getFonteDeRecursoDesembolsos() {
        return fonteDeRecursoDesembolsos;
    }

    public void setFonteDeRecursoDesembolsos(String fonteDeRecursoDesembolsos) {
        this.fonteDeRecursoDesembolsos = fonteDeRecursoDesembolsos;
    }

    public String getCustoFinanceiro() {
        return custoFinanceiro;
    }

    public void setCustoFinanceiro(String custoFinanceiro) {
        this.custoFinanceiro = custoFinanceiro;
    }

    public BigDecimal getJuros() {
        return juros;
    }

    public void setJuros(BigDecimal juros) {
        this.juros = juros;
    }

    public Integer getPrazoCarenciaMeses() {
        return prazoCarenciaMeses;
    }

    public void setPrazoCarenciaMeses(Integer prazoCarenciaMeses) {
        this.prazoCarenciaMeses = prazoCarenciaMeses;
    }

    public Integer getPrazoAmortizacaoMeses() {
        return prazoAmortizacaoMeses;
    }

    public void setPrazoAmortizacaoMeses(Integer prazoAmortizacaoMeses) {
        this.prazoAmortizacaoMeses = prazoAmortizacaoMeses;
    }

    public String getModalidadeDeApoio() {
        return modalidadeDeApoio;
    }

    public void setModalidadeDeApoio(String modalidadeDeApoio) {
        this.modalidadeDeApoio = modalidadeDeApoio;
    }

    public String getFormaDeApoio() {
        return formaDeApoio;
    }

    public void setFormaDeApoio(String formaDeApoio) {
        this.formaDeApoio = formaDeApoio;
    }

    public String getProduto() {
        return produto;
    }

    public void setProduto(String produto) {
        this.produto = produto;
    }

    public String getInstrumentoFinanceiro() {
        return instrumentoFinanceiro;
    }

    public void setInstrumentoFinanceiro(String instrumentoFinanceiro) {
        this.instrumentoFinanceiro = instrumentoFinanceiro;
    }

    public String getInovacao() {
        return inovacao;
    }

    public void setInovacao(String inovacao) {
        this.inovacao = inovacao;
    }

    public String getAreaOperacional() {
        return areaOperacional;
    }

    public void setAreaOperacional(String areaOperacional) {
        this.areaOperacional = areaOperacional;
    }

    public String getSetorCnae() {
        return setorCnae;
    }

    public void setSetorCnae(String setorCnae) {
        this.setorCnae = setorCnae;
    }

    public String getSubsetorCnaeAgrupado() {
        return subsetorCnaeAgrupado;
    }

    public void setSubsetorCnaeAgrupado(String subsetorCnaeAgrupado) {
        this.subsetorCnaeAgrupado = subsetorCnaeAgrupado;
    }

    public String getSubsetorCnaeCodigo() {
        return subsetorCnaeCodigo;
    }

    public void setSubsetorCnaeCodigo(String subsetorCnaeCodigo) {
        this.subsetorCnaeCodigo = subsetorCnaeCodigo;
    }

    public String getSubsetorCnaeNome() {
        return subsetorCnaeNome;
    }

    public void setSubsetorCnaeNome(String subsetorCnaeNome) {
        this.subsetorCnaeNome = subsetorCnaeNome;
    }

    public String getSetorBndes() {
        return setorBndes;
    }

    public void setSetorBndes(String setorBndes) {
        this.setorBndes = setorBndes;
    }

    public String getSubsetorBndes() {
        return subsetorBndes;
    }

    public void setSubsetorBndes(String subsetorBndes) {
        this.subsetorBndes = subsetorBndes;
    }

    public String getPorteDoCliente() {
        return porteDoCliente;
    }

    public void setPorteDoCliente(String porteDoCliente) {
        this.porteDoCliente = porteDoCliente;
    }

    public String getNaturezaDoCliente() {
        return naturezaDoCliente;
    }

    public void setNaturezaDoCliente(String naturezaDoCliente) {
        this.naturezaDoCliente = naturezaDoCliente;
    }

    public String getInstituicaoFinanceiraCredenciada() {
        return instituicaoFinanceiraCredenciada;
    }

    public void setInstituicaoFinanceiraCredenciada(String instituicaoFinanceiraCredenciada) {
        this.instituicaoFinanceiraCredenciada = instituicaoFinanceiraCredenciada;
    }

    public String getCnpjInstituicaoFinanceiraCredenciada() {
        return cnpjInstituicaoFinanceiraCredenciada;
    }

    public void setCnpjInstituicaoFinanceiraCredenciada(String cnpjInstituicaoFinanceiraCredenciada) {
        this.cnpjInstituicaoFinanceiraCredenciada = cnpjInstituicaoFinanceiraCredenciada;
    }

    public String getTipoDeGarantia() {
        return tipoDeGarantia;
    }

    public void setTipoDeGarantia(String tipoDeGarantia) {
        this.tipoDeGarantia = tipoDeGarantia;
    }

    public String getTipoDeExcepcionalidade() {
        return tipoDeExcepcionalidade;
    }

    public void setTipoDeExcepcionalidade(String tipoDeExcepcionalidade) {
        this.tipoDeExcepcionalidade = tipoDeExcepcionalidade;
    }

    public String getSituacaoDoContrato() {
        return situacaoDoContrato;
    }

    public void setSituacaoDoContrato(String situacaoDoContrato) {
        this.situacaoDoContrato = situacaoDoContrato;
    }
}
