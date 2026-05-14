package com.saftbndes.api.importer;

public record ImportResult(
        int total,
        int imported,
        int skipped
) {
}
