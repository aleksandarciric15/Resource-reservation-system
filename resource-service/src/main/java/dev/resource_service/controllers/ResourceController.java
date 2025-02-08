package dev.resource_service.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import dev.resource_service.models.requests.AvailableResourcesRequest;
import dev.resource_service.models.requests.ResourceAvailability;
import dev.resource_service.models.requests.ResourceRequest;
import dev.resource_service.models.responses.ResourceTypeResponse;
import dev.resource_service.models.responses.TableResource;
import dev.resource_service.services.ResourceService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${resource_service.base-url}/resources")
@RequiredArgsConstructor
public class ResourceController {

    String url = "http://localhost:8083/api/v1/reservations/availability";

    private final ResourceService resourceService;
    private final RestTemplate restTemplate;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(resourceService.getAll());
    }

    @PostMapping("availability")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> isResourceAvailable(@RequestBody ResourceAvailability request) {
        return restTemplate.postForEntity(url, request, Boolean.class);
    }

    @PostMapping("create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createResource(@RequestBody ResourceRequest request) {
        return ResponseEntity.ok().body(resourceService.createResource(request));
    }

    @PutMapping("edit")
    public ResponseEntity<?> editResource(@RequestBody ResourceRequest request) {
        return ResponseEntity.ok().body(resourceService.editResource(request));
    }

    @DeleteMapping("{id}/delete")
    public ResponseEntity<?> deleteResource(@PathVariable Integer id) {
        return ResponseEntity.ok().body(resourceService.deleteResource(id));
    }

    @GetMapping("table-resources")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getTableResourcesForDate(@RequestParam(name = "date") Date date) {
        List<TableResource> tableResources = resourceService.getTableResourcesForDate(date);

        if (tableResources != null && tableResources.size() > 0) {
            return ResponseEntity.ok().body(tableResources);
        }

        return ResponseEntity.status(404).build();
    }

    @PostMapping("avilable-resources")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAvailableResources(@RequestBody AvailableResourcesRequest request) {
        List<ResourceTypeResponse> resourceTypes = resourceService.getAvailableResources(request);

        if (resourceTypes != null && resourceTypes.size() > 0) {
            return ResponseEntity.ok().body(resourceTypes);
        }

        return ResponseEntity.badRequest().build();
    }

}