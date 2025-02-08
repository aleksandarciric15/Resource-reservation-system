package dev.user_service.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import dev.user_service.exceptions.BadRequestException;
import dev.user_service.exceptions.NotFoundException;
import dev.user_service.models.entities.User;
import dev.user_service.models.enums.UserRole;
import dev.user_service.models.rabbitmq_dtos.AdminKeycloakUser;
import dev.user_service.models.rabbitmq_dtos.KeycloakUser;
import dev.user_service.models.rabbitmq_dtos.KeycloakUserRole;
import dev.user_service.models.requests.SetDepartmentRequest;
import dev.user_service.models.response.UserResponse;
import dev.user_service.repositories.UserRepository;
import dev.user_service.services.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final String defaultRole = "client_employee";

    public void register(KeycloakUser request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new BadRequestException();
        }

        User user = new User();
        user.setUserId(request.getUserId());
        user.setUsername(request.getUsername());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setEnabled(request.isEnabled());
        user.setRole(defaultRole);
        // modelMapper.map(request, user);

        userRepository.saveAndFlush(user);
    }

    @Override
    public UserResponse getUserByUserId(String userId) {
        if (!userRepository.findByUserId(userId).isPresent()) {
            throw new NotFoundException();
        }

        User user = userRepository.findByUserId(userId).get();

        return modelMapper.map(user, UserResponse.class);
    }

    /** Get all employees from database */
    @Override
    public List<UserResponse> getEmployees() {
        List<User> users = userRepository.findAllByRole(UserRole.CLIENT_EMPLOYEE.getValue()).get();

        if (users == null || users.size() == 0)
            throw new RuntimeException("There is no employees!");

        return users.stream().map((user) -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
    }

    /**
     * Update user role. Currently only checks if there is client_admin role and
     * sets it!
     */
    @Override
    public void updateUserRoles(List<KeycloakUserRole> userRoles) {
        KeycloakUserRole clientAdminRole = userRoles.stream()
                .filter(role -> "client_admin".equals(role.getRole()))
                .findFirst().get();

        if (clientAdminRole != null) {
            User user = userRepository.findByUserId(clientAdminRole.getUserId()).get();

            if (user.getRole().equals(clientAdminRole.getRole()))
                user.setRole(defaultRole);
            else
                user.setRole(clientAdminRole.getRole());

            userRepository.saveAndFlush(user);
        }
    }

    /**
     * Create or edit a user. This functionality is performed by an administrator.
     */
    @Override
    public void updateOrCreateUserByAdmin(AdminKeycloakUser user) {
        User dbUser = null;
        if (!userRepository.findByUserId(user.getId()).isPresent()) {
            dbUser = new User();
        } else {
            dbUser = userRepository.findByUserId(user.getId()).get();
        }

        dbUser.setUserId(user.getId());
        dbUser.setUsername(user.getUsername());
        dbUser.setEmail(user.getEmail());
        dbUser.setFirstName(user.getFirstName());
        dbUser.setLastName(user.getLastName());
        dbUser.setEnabled(user.isEnabled());
        dbUser.setRole(defaultRole);

        userRepository.saveAndFlush(dbUser);

    }

    @Override
    public boolean setDepartment(SetDepartmentRequest request) {
        if (!userRepository.findByUserId(request.getUserId()).isPresent()) {
            throw new NotFoundException();
        }

        User user = userRepository.findByUserId(request.getUserId()).get();

        user.setDepartmentId(request.getDepartmentId());

        userRepository.saveAndFlush(user);

        return true;
    }

}
