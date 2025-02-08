package dev.user_service.models.entities;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "user")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "UserId", nullable = false)
    private String userId;

    @Basic
    @Column(name = "Username", nullable = false, unique = true)
    private String username;

    @Basic
    @Column(name = "Email", nullable = false)
    private String email;

    @Basic
    @Column(name = "FristName")
    private String firstName;

    @Basic
    @Column(name = "LastName")
    private String lastName;

    @Basic
    @Column(name = "Enabled")
    private boolean enabled;

    @Basic
    @Column(name = "DepartmentId")
    private Integer departmentId;

    @Basic
    @Column(name = "Role", nullable = false)
    private String role;
}
