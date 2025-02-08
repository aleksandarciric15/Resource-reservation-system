package dev.user_service.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.user_service.models.requests.SetDepartmentRequest;
import dev.user_service.models.response.UserResponse;
import dev.user_service.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("${userservice.base-url}/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("employees")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getEmployees() {
        List<UserResponse> users = userService.getEmployees();

        if (users != null && users.size() > 0) {
            return ResponseEntity.ok().body(users);
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("{employeeId}/employee")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getEmployee(@PathVariable String employeeId) {
        UserResponse user = userService.getUserByUserId(employeeId);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("set-department")
    public ResponseEntity<?> setDepartment(@RequestBody SetDepartmentRequest request) {
        return ResponseEntity.ok().body(userService.setDepartment(request));
    }

}
