package dev.resource_service.models.responses;

import lombok.Data;

@Data
public class TableResource {
    private Integer id;
    private String name;
    private String description;
    private boolean isAvailable;
}
