package dev.user_service.models.rabbitmq_dtos;

import lombok.Data;
import lombok.ToString;

/** DTO object we get from keycloak when admin creats/edits user */
@Data
@ToString
public class AdminKeycloakUser {
    private String id; // userId
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private boolean enabled;
}
