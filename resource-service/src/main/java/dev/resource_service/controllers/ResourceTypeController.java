package dev.resource_service.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.resource_service.models.requests.ResourceTypeRequest;
import dev.resource_service.services.ResourceTypeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${resource_service.base-url}/resource-types")
@RequiredArgsConstructor
public class ResourceTypeController {

    private final ResourceTypeService resourceTypeService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(resourceTypeService.getAll());
    }

    @PostMapping("create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createResourceType(@RequestBody ResourceTypeRequest request) {
        return ResponseEntity.ok().body(resourceTypeService.createResourceType(request));
    }

    @PutMapping("edit")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> editResourceType(@RequestBody ResourceTypeRequest request) {
        return ResponseEntity.ok().body(resourceTypeService.editResourceType(request));
    }

}
