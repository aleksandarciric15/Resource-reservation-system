package dev.notification_service.models.entities;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "notification")
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "UserId", nullable = false)
    private String userId;

    @Basic
    @Column(name = "Message", nullable = false)
    private String message;

    @Basic
    @Column(name = "ReservationId", nullable = false)
    private Integer reservationId;

    @Basic
    @Column(name = "ReservationDate", nullable = false)
    private LocalDate reservationDate;

    @Basic
    @Column(name = "CreatedAt", nullable = false)
    private Date createdAt;

    @Basic
    @Column(name = "IsRead", nullable = false)
    private boolean isRead;

    @Basic
    @Column(name = "Title", nullable = false)
    private String title;

    @Basic
    @Column(name = "Type", nullable = false)
    private String type;
}
