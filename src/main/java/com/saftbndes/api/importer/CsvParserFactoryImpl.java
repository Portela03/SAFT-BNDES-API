package com.saftbndes.api.importer;

import org.springframework.stereotype.Component;

@Component
public class CsvParserFactoryImpl implements CsvParserFactory {
    private final BndesCsvParser parser;

    public CsvParserFactoryImpl(BndesCsvParser parser) {
        this.parser = parser;
    }

    @Override
    public CsvParser getParser() {
        return parser;
    }
}
