package dev.resource_service.models.requests;

import lombok.Data;

@Data
public class AvailableResourcesRequest {
    private String date;
    private String startTime;
    private String endTime;
}
