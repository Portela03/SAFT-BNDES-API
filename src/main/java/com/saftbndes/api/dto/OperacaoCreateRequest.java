package com.saftbndes.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class OperacaoCreateRequest {
    @NotBlank
    private String cliente;

    private String cnpj;

    @NotBlank
    private String uf;

    private LocalDate dataDaContratacao;

    @NotNull
    @PositiveOrZero
    private BigDecimal valorContratadoReais;

    private BigDecimal valorDesembolsadoReais;

    private String setorBndes;

    private String subsetorBndes;

    private Long numeroDoContrato;

    private String porteDoCliente;

    private String situacaoDoContrato;

    private String naturezaDoCliente;

    private String formaDeApoio;

    private String produto;

    private String instrumentoFinanceiro;

    private String inovacao;

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

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
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

    public Long getNumeroDoContrato() {
        return numeroDoContrato;
    }

    public void setNumeroDoContrato(Long numeroDoContrato) {
        this.numeroDoContrato = numeroDoContrato;
    }

    public String getPorteDoCliente() {
        return porteDoCliente;
    }

    public void setPorteDoCliente(String porteDoCliente) {
        this.porteDoCliente = porteDoCliente;
    }

    public String getSituacaoDoContrato() {
        return situacaoDoContrato;
    }

    public void setSituacaoDoContrato(String situacaoDoContrato) {
        this.situacaoDoContrato = situacaoDoContrato;
    }

    public String getNaturezaDoCliente() {
        return naturezaDoCliente;
    }

    public void setNaturezaDoCliente(String naturezaDoCliente) {
        this.naturezaDoCliente = naturezaDoCliente;
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
}
