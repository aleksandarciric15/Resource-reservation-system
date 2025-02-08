package dev.resource_service.models.responses;

import java.util.Date;

import lombok.Data;

@Data
public class Reservation {
    private Integer id;
    private String employeeId;
    private Date reservationDate;
    private String reason;
    private Date createdAt;
    private Integer resourceId;
}
