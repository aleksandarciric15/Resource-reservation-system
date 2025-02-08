package dev.api_composition.models.responses;

import lombok.Data;

@Data
public class UserResponse {
    private Integer id;
    private String userId;
    private String email;
    private String firstName;
    private String lastName;
    private String username;
}
