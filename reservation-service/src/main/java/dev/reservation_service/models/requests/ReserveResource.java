package dev.reservation_service.models.requests;

import java.util.Date;

import lombok.Data;

@Data
public class ReserveResource {
    private String employeeId;
    private String reason;
    private Integer resourceId;
    private Date reservationDate;
}
