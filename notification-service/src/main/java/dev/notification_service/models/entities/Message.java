package dev.notification_service.models.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "message")
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "SenderId", nullable = false)
    private String senderId;

    @Basic
    @Column(name = "SenderName", nullable = false)
    private String senderName;

    @Basic
    @Column(name = "SenderUsername", nullable = false)
    private String senderUsername;

    @Basic
    @Column(name = "ReceiverId", nullable = false)
    private String receiverId;

    @Basic
    @Column(name = "ResourceId", nullable = false)
    private Integer resourceId;

    @Basic
    @Column(name = "Message", nullable = false)
    private String message;

    @Basic
    @Column(name = "CreatedAt", nullable = false)
    private LocalDateTime createdAt;

    @Basic
    @Column(name = "ResourceName", nullable = false)
    private String resourceName;

    @Basic
    @Column(name = "ResourceTypeName", nullable = false)
    private String resourceTypeName;

    @Basic
    @Column(name = "ReservationDateTime", nullable = false)
    private String reservationDateTime;

    @Basic
    @Column(name = "IsRead", nullable = false)
    private boolean isRead;
}
