package dev.api_composition.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import dev.api_composition.models.responses.ResourceResponse;

@FeignClient(name = "resource-service", url = "${resources-url}")
public interface ResourceClient {
    @GetMapping
    List<ResourceResponse> getAll();
}
