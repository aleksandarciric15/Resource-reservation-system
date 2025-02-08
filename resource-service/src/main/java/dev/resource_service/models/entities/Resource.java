package dev.resource_service.models.entities;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "resource")
@Entity
@Data
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "Name", nullable = false)
    private String name;

    @Basic
    @Column(name = "Description", nullable = false)
    private String description;

    @Basic
    @Column(name = "Removed", nullable = false)
    private boolean removed;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ResourceTypeId", nullable = false)
    private ResourceType resourceType;
}
