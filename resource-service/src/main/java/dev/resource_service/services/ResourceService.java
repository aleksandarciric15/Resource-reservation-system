package dev.resource_service.services;

import java.util.Date;
import java.util.List;

import dev.resource_service.models.requests.AvailableResourcesRequest;
import dev.resource_service.models.requests.ResourceRequest;
import dev.resource_service.models.responses.ResourceResponse;
import dev.resource_service.models.responses.ResourceTypeResponse;
import dev.resource_service.models.responses.TableResource;

public interface ResourceService {

    List<TableResource> getTableResourcesForDate(Date date);

    List<ResourceTypeResponse> getAvailableResources(AvailableResourcesRequest request);

    List<ResourceResponse> getAll();

    ResourceResponse createResource(ResourceRequest request);

    ResourceResponse editResource(ResourceRequest request);

    boolean deleteResource(Integer id);
}
