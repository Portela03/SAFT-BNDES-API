package com.saftbndes.api.client;

public record CkanResourceShowResponse(
        boolean success,
        CkanResource result
) {
}
