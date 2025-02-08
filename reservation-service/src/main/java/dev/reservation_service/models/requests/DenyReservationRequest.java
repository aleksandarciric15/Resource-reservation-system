package dev.reservation_service.models.requests;

import lombok.Data;

@Data
public class DenyReservationRequest {
    private Integer reservationId;
    private boolean admin;
}
