package dev.user_service.models.rabbitmq_dtos;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class KeycloakUser {
    private String userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private boolean enabled;
}
