package dev.resource_service.models.requests;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ResourceAvailability {
    private Integer resourceId;
    private LocalDateTime reservationTime;
}
