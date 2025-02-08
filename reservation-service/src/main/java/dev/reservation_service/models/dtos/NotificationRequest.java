package dev.reservation_service.models.dtos;

import java.time.LocalDate;
import java.util.Date;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class NotificationRequest {
    private Integer id;
    private String userId; // for this notification is
    private String message;
    private Integer reservationId; // so we could redirect user to see reservation details
    private LocalDate reservationDate;
    private Date createdAt;
    private boolean isRead;
    private String title;
    private String type;
}
