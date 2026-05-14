package com.saftbndes.api.controller;

import java.io.IOException;

import com.saftbndes.api.importer.ImportResult;
import com.saftbndes.api.importer.ImportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImportController {
    private final ImportService importService;

    public ImportController(ImportService importService) {
        this.importService = importService;
    }

    @PostMapping(value = "/carga", consumes = {"multipart/form-data", "application/octet-stream", "application/x-www-form-urlencoded", "*/*"})
    public ResponseEntity<ImportResult> importData(
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) String resourceId) throws IOException {
        ImportResult result;
        if (file != null && !file.isEmpty()) {
            result = importService.importFromCsv(file.getInputStream());
        } else {
            result = importService.importFromCkan(resourceId);
        }
        return ResponseEntity.ok(result);
    }
}
