package dev.resource_service.models.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourceResponse {
    private Integer id;
    private String name;
    private String description;
    private Integer resourceTypeId;
    private String resourceTypeName;
}
