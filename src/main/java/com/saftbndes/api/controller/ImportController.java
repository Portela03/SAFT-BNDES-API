package com.saftbndes.api.controller;

import java.io.IOException;

import com.saftbndes.api.importer.ImportResult;
import com.saftbndes.api.importer.ImportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImportController {
    private static final Logger log = LoggerFactory.getLogger(ImportController.class);

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
            log.info("[CARGA] Upload recebido: nome='{}', tamanho={} bytes, contentType='{}'",
                    file.getOriginalFilename(), file.getSize(), file.getContentType());
            result = importService.importFromCsv(file.getInputStream());
        } else {
            log.info("[CARGA] Nenhum arquivo enviado — iniciando download via CKAN. resourceId='{}'", resourceId);
            result = importService.importFromCkan(resourceId);
        }
        log.info("[CARGA] Concluído: total={}, importados={}, ignorados={}",
                result.total(), result.imported(), result.skipped());
        return ResponseEntity.ok(result);
    }
}
