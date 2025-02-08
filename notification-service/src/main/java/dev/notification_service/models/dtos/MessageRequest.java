package dev.notification_service.models.dtos;

import lombok.Data;

@Data
public class MessageRequest {
    private String senderId;
    private String receiverId;
    private String message;
    private Integer resourceId;
    private String senderName;
    private String senderUsername;
    private String resourceName;
    private String resourceTypeName;
    private String reservationDateTime;
}
