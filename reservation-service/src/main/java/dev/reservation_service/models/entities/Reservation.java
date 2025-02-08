package dev.reservation_service.models.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Basic;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "reservation")
@Entity
@Data
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "EmployeeId", nullable = false)
    private String employeeId;

    @Basic
    @Column(name = "Date", nullable = false)
    private LocalDate date;

    @Basic
    @Column(name = "StartTime", nullable = false)
    private LocalTime startTime;

    @Basic
    @Column(name = "EndTime", nullable = false)
    private LocalTime endTime;

    @Basic
    @Column(name = "Reason", nullable = false)
    private String reason;

    @Basic
    @Column(name = "CreatedAt", nullable = false)
    private Date createdAt;

    @Basic
    @Column(name = "Denied", nullable = false)
    private boolean denied;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationResource> reservationResources;
}
