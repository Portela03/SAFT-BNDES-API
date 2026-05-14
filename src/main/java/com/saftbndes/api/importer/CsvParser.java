package com.saftbndes.api.importer;

import java.io.IOException;
import java.io.InputStream;
import java.util.function.Consumer;

import com.saftbndes.api.domain.OperacaoBNDES;

public interface CsvParser {
    void parse(InputStream inputStream, Consumer<OperacaoBNDES> consumer) throws IOException;
}
