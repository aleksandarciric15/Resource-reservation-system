package dev.reservation_service.models.requests;

import lombok.Data;

@Data
public class ReservationDate {
    private String date;
    private String startTime;
    private String endTime;
}
