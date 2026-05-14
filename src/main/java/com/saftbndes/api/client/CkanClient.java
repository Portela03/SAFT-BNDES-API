package com.saftbndes.api.client;

import java.io.InputStream;

public interface CkanClient {
    String getCsvDownloadUrl(String resourceId);

    InputStream downloadCsv(String url);
}
