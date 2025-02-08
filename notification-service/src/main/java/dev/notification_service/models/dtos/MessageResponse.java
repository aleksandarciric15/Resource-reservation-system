package dev.notification_service.models.dtos;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MessageResponse {
    private Integer id;
    private String senderId;
    private String receiverId;
    private Integer resourceId;
    private String message;
    private String senderName;
    private String senderUsername;
    private String resourceName;
    private String resourceTypeName;
    private String reservationDateTime;
    private LocalDateTime createdAt;
    private boolean isRead;
}
