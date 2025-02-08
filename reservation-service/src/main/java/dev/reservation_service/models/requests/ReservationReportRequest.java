package dev.reservation_service.models.requests;

import lombok.Data;

@Data
public class ReservationReportRequest {
    private String startDate;
    private String endDate;
    private String userId;
    private boolean denied;
    private Integer resourceId;
}
