package dev.user_service.models.requests;

import lombok.Data;

@Data
public class LoginUserRequest {
    private String username;
    private String password;
}
