package dev.resource_service.services;

import java.util.List;

import dev.resource_service.models.requests.ResourceTypeRequest;
import dev.resource_service.models.responses.SingleResourceType;

public interface ResourceTypeService {
    List<SingleResourceType> getAll();

    SingleResourceType createResourceType(ResourceTypeRequest request);

    SingleResourceType editResourceType(ResourceTypeRequest request);
}
