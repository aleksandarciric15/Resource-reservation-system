package dev.resource_service.services.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import dev.resource_service.clients.ReservationClient;
import dev.resource_service.exceptions.NotFoundException;
import dev.resource_service.exceptions.ResourceException;
import dev.resource_service.models.dtos.ReservationDate;
import dev.resource_service.models.entities.Resource;
import dev.resource_service.models.entities.ResourceType;
import dev.resource_service.models.requests.AvailableResourcesRequest;
import dev.resource_service.models.requests.ResourceRequest;
import dev.resource_service.models.responses.ResourceResponse;
import dev.resource_service.models.responses.ResourceTypeResponse;
import dev.resource_service.models.responses.TableResource;
import dev.resource_service.repositories.ResourceRepository;
import dev.resource_service.repositories.ResourceTypeRepository;
import dev.resource_service.services.ResourceService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;
    private final ReservationClient reservationClient;
    private final ResourceTypeRepository resourceTypeRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<ResourceResponse> getAll() {
        List<Resource> resources = resourceRepository.findByRemovedFalse();

        if (resources.isEmpty()) {
            throw new ResourceException("There is no reservations");
        }

        return resources.stream()
                .map(this::convertToResourceResponse)
                .collect(Collectors.toList());
    }

    private ResourceResponse convertToResourceResponse(Resource resource) {
        return new ResourceResponse(
                resource.getId(),
                resource.getName(),
                resource.getDescription(),
                resource.getResourceType().getId(),
                resource.getResourceType().getName());
    }

    @Override
    public List<TableResource> getTableResourcesForDate(Date date) {
        return new ArrayList<>();
    }

    @Override
    public List<ResourceTypeResponse> getAvailableResources(AvailableResourcesRequest request) {
        List<ResourceType> resourceTypes = resourceTypeRepository.findAll();

        List<Integer> reservedResourceIds = reservationClient
                .getReservedResourceIds(
                        new ReservationDate(request.getDate(), request.getStartTime(), request.getEndTime()));

        List<ResourceTypeResponse> resourceTypeResponses = new ArrayList<>();

        for (ResourceType resourceType : resourceTypes) {
            ResourceTypeResponse resourceTypeResponse = new ResourceTypeResponse();
            resourceTypeResponse.setId(resourceType.getId());
            resourceTypeResponse.setName(resourceType.getName());

            List<ResourceResponse> availableResources = resourceType.getReservationResources().stream()
                    .filter(resource -> !reservedResourceIds.contains(resource.getId())).map(resource -> {
                        ResourceResponse resourceResponse = new ResourceResponse();
                        modelMapper.map(resource, resourceResponse);
                        return resourceResponse;
                    }).collect(Collectors.toList());

            resourceTypeResponse.setResources(availableResources);

            if (!availableResources.isEmpty()) {
                resourceTypeResponses.add(resourceTypeResponse);
            }
        }

        return resourceTypeResponses;

    }

    @Override
    public ResourceResponse createResource(ResourceRequest request) {
        Resource resource = new Resource();

        resource.setName(request.getName());
        resource.setDescription(request.getDescription());
        resource.setRemoved(false);
        ResourceType resourceType = resourceTypeRepository.findById(request.getResourceTypeId())
                .orElseThrow(NotFoundException::new);
        resource.setResourceType(resourceType);

        resourceRepository.saveAndFlush(resource);

        return convertToResourceResponse(resource);
    }

    @Override
    public ResourceResponse editResource(ResourceRequest request) {
        Resource resource = resourceRepository.findById(request.getId()).orElseThrow(NotFoundException::new);

        resource.setName(request.getName());
        resource.setDescription(request.getDescription());
        ResourceType resourceType = resourceTypeRepository.findById(request.getResourceTypeId())
                .orElseThrow(NotFoundException::new);
        resource.setResourceType(resourceType);

        resourceRepository.saveAndFlush(resource);

        return convertToResourceResponse(resource);
    }

    @Override
    public boolean deleteResource(Integer id) {
        Resource resource = resourceRepository.findById(id).orElseThrow(NotFoundException::new);

        if (resource.isRemoved()) {
            throw new ResourceException("Can't remove already removed resource!");
        }

        resource.setRemoved(true);
        resourceRepository.saveAndFlush(resource);
        return true;
    }

}
