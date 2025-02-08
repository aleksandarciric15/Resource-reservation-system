package dev.department_service.models.entities;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "company")
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "Name", unique = true, nullable = false)
    private String name;

    @Basic
    @Column(name = "Description", nullable = false)
    private String description;

    @Basic
    @Column(name = "WorkTimeStart", nullable = false)
    private String workTimeStart;

    @Basic
    @Column(name = "WorkTimeEnd", nullable = false)
    private String workTimeEnd;
}
