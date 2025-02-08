package dev.reservation_service.models.requests;

import lombok.Data;

@Data
public class Resource {
    private Integer id;
    private String description;
    private String name;
    private Integer resourceTypeId;
}
