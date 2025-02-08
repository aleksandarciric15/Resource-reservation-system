package dev.resource_service.models.responses;

import java.util.List;

import lombok.Data;

@Data
public class ResourceTypeResponse {
    private Integer id;
    private String name;
    private List<ResourceResponse> resources;
}
