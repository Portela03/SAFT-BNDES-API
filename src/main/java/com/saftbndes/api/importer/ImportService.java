package com.saftbndes.api.importer;

import java.io.InputStream;

public interface ImportService {
    ImportResult importFromCkan(String resourceIdOverride);
    ImportResult importFromCsv(InputStream inputStream);
}
