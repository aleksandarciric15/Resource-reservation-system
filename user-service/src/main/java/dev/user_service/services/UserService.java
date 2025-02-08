package dev.user_service.services;

import java.util.List;

import dev.user_service.models.rabbitmq_dtos.AdminKeycloakUser;
import dev.user_service.models.rabbitmq_dtos.KeycloakUser;
import dev.user_service.models.rabbitmq_dtos.KeycloakUserRole;
import dev.user_service.models.requests.SetDepartmentRequest;
import dev.user_service.models.response.UserResponse;

public interface UserService {

    void register(KeycloakUser request);

    UserResponse getUserByUserId(String userId);

    List<UserResponse> getEmployees();

    void updateUserRoles(List<KeycloakUserRole> userRoles);

    void updateOrCreateUserByAdmin(AdminKeycloakUser user);

    boolean setDepartment(SetDepartmentRequest request);
}
