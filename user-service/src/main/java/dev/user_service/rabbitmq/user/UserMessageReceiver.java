package dev.user_service.rabbitmq.user;

import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.user_service.models.rabbitmq_dtos.AdminKeycloakUser;
import dev.user_service.models.rabbitmq_dtos.KeycloakUser;
import dev.user_service.models.rabbitmq_dtos.KeycloakUserRole;
import dev.user_service.services.UserService;
import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class UserMessageReceiver {

    @Autowired
    private UserService userService;

    @RabbitListener(queues = "user_register_update")
    public void receiveMessage(KeycloakUser user) {
        System.out.println("Received: " + user);

        if (user != null) {
            userService.register(user);
        }
    }

    @RabbitListener(queues = { "admin_assign_role_to_user",
            "admin_remove_role_from_user" })
    public void receiveMessage(List<KeycloakUserRole> userRoles) {
        System.out.println("Received: " + userRoles);

        if (userRoles != null && userRoles.size() > 0) {
            userService.updateUserRoles(userRoles);
        }
    }

    @RabbitListener(queues = "admin_create_update_user")
    public void receiveMessage(AdminKeycloakUser user) {
        System.out.println("Received: " + user);

        if (user != null) {
            userService.updateOrCreateUserByAdmin(user);
        }
    }
}
