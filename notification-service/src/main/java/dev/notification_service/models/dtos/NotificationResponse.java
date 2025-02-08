package dev.notification_service.models.dtos;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {
    private Integer id;
    private String userId;
    private String message;
    private Integer reservationId;
    private LocalDate reservationDate;
    private Date createdAt;
    private boolean isRead;
    private String title;
    private String type;
}