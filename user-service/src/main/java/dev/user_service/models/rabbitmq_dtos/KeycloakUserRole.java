package dev.user_service.models.rabbitmq_dtos;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class KeycloakUserRole {
    private String userId;
    private String role;
}
