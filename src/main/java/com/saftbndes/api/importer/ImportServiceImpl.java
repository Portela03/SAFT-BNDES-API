package com.saftbndes.api.importer;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

import com.saftbndes.api.client.CkanClient;
import com.saftbndes.api.config.CkanProperties;
import com.saftbndes.api.domain.OperacaoBNDES;
import com.saftbndes.api.repository.OperacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ImportServiceImpl implements ImportService {
    private static final int BATCH_SIZE = 500;

    private final CkanClient ckanClient;
    private final CsvParserFactory csvParserFactory;
    private final OperacaoRepository operacaoRepository;
    private final CkanProperties ckanProperties;

    public ImportServiceImpl(CkanClient ckanClient,
                             CsvParserFactory csvParserFactory,
                             OperacaoRepository operacaoRepository,
                             CkanProperties ckanProperties) {
        this.ckanClient = ckanClient;
        this.csvParserFactory = csvParserFactory;
        this.operacaoRepository = operacaoRepository;
        this.ckanProperties = ckanProperties;
    }

    @Override
    @Transactional
    public ImportResult importFromCkan(String resourceIdOverride) {
        String resourceId = (resourceIdOverride == null || resourceIdOverride.isBlank())
                ? ckanProperties.getResourceId()
                : resourceIdOverride;
        String downloadUrl = ckanClient.getCsvDownloadUrl(resourceId);

        try (InputStream inputStream = ckanClient.downloadCsv(downloadUrl)) {
            return importFromCsv(inputStream);
        } catch (IOException ex) {
            throw new IllegalStateException("CSV download failed", ex);
        }
    }

    @Override
    @Transactional
    public ImportResult importFromCsv(InputStream inputStream) {
        Set<Long> existingIds = new HashSet<>(operacaoRepository.findAllBndesIds());
        AtomicInteger total = new AtomicInteger();
        AtomicInteger imported = new AtomicInteger();
        AtomicInteger skipped = new AtomicInteger();

        List<OperacaoBNDES> batch = new ArrayList<>();
        CsvParser parser = csvParserFactory.getParser();

        try {
            parser.parse(inputStream, operacao -> {
                total.incrementAndGet();
                if (operacao.getBndesId() != null && existingIds.contains(operacao.getBndesId())) {
                    skipped.incrementAndGet();
                    return;
                }

                batch.add(operacao);
                if (batch.size() >= BATCH_SIZE) {
                    saveBatch(batch, existingIds, imported);
                }
            });
        } catch (IOException ex) {
            throw new IllegalStateException("CSV parsing failed", ex);
        }

        if (!batch.isEmpty()) {
            saveBatch(batch, existingIds, imported);
        }

        return new ImportResult(total.get(), imported.get(), skipped.get());
    }

    private void saveBatch(List<OperacaoBNDES> batch, Set<Long> existingIds, AtomicInteger imported) {
        operacaoRepository.saveAll(batch);
        imported.addAndGet(batch.size());
        for (OperacaoBNDES operacao : batch) {
            if (operacao.getBndesId() != null) {
                existingIds.add(operacao.getBndesId());
            }
        }
        batch.clear();
    }
}
