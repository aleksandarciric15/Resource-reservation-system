package dev.reservation_service.models.requests;

import java.util.Date;

import lombok.Data;

@Data
public class ResourceAvailability {
    private Integer resourceId;
    private Date reservationDate;
}
