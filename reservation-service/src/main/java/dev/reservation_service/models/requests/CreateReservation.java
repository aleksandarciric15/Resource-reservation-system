package dev.reservation_service.models.requests;

import java.util.List;

import lombok.Data;

@Data
public class CreateReservation {
    private String employeeId;
    private String date;
    private String startTime;
    private String endTime;
    private String reason;
    private List<Resource> resources;
    private boolean admin;
}
