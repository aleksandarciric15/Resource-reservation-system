package dev.api_composition.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import dev.api_composition.models.responses.UserResponse;

@FeignClient(name = "user-service", url = "${users-url}")
public interface UserClient {
    @GetMapping("employees")
    List<UserResponse> getEmployees();
}