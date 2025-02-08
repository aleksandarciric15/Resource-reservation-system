package dev.resource_service.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import dev.resource_service.exceptions.NotFoundException;
import dev.resource_service.models.entities.ResourceType;
import dev.resource_service.models.requests.ResourceTypeRequest;
import dev.resource_service.models.responses.SingleResourceType;
import dev.resource_service.repositories.ResourceTypeRepository;
import dev.resource_service.services.ResourceTypeService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResourceTypeServiceImpl implements ResourceTypeService {

    private final ResourceTypeRepository resourceTypeRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<SingleResourceType> getAll() {
        List<ResourceType> resourceTypes = resourceTypeRepository.findAll();

        return resourceTypes.stream().map(resourceType -> modelMapper.map(resourceType, SingleResourceType.class))
                .collect(Collectors.toList());
    }

    @Override
    public SingleResourceType createResourceType(ResourceTypeRequest request) {
        ResourceType resourceType = new ResourceType();

        resourceType.setName(request.getName());

        resourceType = resourceTypeRepository.saveAndFlush(resourceType);

        return modelMapper.map(resourceType, SingleResourceType.class);
    }

    @Override
    public SingleResourceType editResourceType(ResourceTypeRequest request) {
        ResourceType resourceType = resourceTypeRepository.findById(request.getId())
                .orElseThrow(NotFoundException::new);

        resourceType.setName(request.getName());

        resourceType = resourceTypeRepository.saveAndFlush(resourceType);

        return modelMapper.map(resourceType, SingleResourceType.class);
    }

}
