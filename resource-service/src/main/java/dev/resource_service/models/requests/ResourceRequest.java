package dev.resource_service.models.requests;

import lombok.Data;

@Data
public class ResourceRequest {
    private Integer id;
    private String description;
    private String name;
    private Integer resourceTypeId;
}
