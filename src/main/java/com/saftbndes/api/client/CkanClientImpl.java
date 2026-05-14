package com.saftbndes.api.client;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saftbndes.api.config.CkanProperties;
import org.springframework.stereotype.Component;

@Component
public class CkanClientImpl implements CkanClient {
    private final ObjectMapper objectMapper;
    private final CkanProperties properties;
    private final HttpClient httpClient;

    public CkanClientImpl(ObjectMapper objectMapper, CkanProperties properties) {
        this.objectMapper = objectMapper;
        this.properties = properties;
        this.httpClient = HttpClient.newHttpClient();
    }

    @Override
    public String getCsvDownloadUrl(String resourceId) {
        String id = (resourceId == null || resourceId.isBlank()) ? properties.getResourceId() : resourceId;
        String url = properties.getBaseUrl() + "/api/3/action/resource_show?id=" + id;
        HttpRequest request = requestBuilder(URI.create(url)).GET().build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 300) {
                throw new IllegalStateException("CKAN resource_show failed with status " + response.statusCode());
            }

            CkanResourceShowResponse payload = objectMapper.readValue(response.body(), CkanResourceShowResponse.class);
            if (payload == null || !payload.success() || payload.result() == null || payload.result().url() == null) {
                throw new IllegalStateException("CKAN response missing download URL");
            }

            return payload.result().url();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to fetch CKAN resource metadata", ex);
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to fetch CKAN resource metadata", ex);
        }
    }

    @Override
    public InputStream downloadCsv(String url) {
        HttpRequest request = requestBuilder(URI.create(url)).GET().build();
        try {
            HttpResponse<InputStream> response = httpClient.send(request, HttpResponse.BodyHandlers.ofInputStream());
            if (response.statusCode() >= 300) {
                throw new IllegalStateException("CSV download failed with status " + response.statusCode());
            }
            return response.body();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to download CSV", ex);
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to download CSV", ex);
        }
    }

    private HttpRequest.Builder requestBuilder(URI uri) {
        HttpRequest.Builder builder = HttpRequest.newBuilder(uri);
        if (properties.getApiToken() != null && !properties.getApiToken().isBlank()) {
            builder.header("Authorization", properties.getApiToken());
        }
        return builder;
    }
}
