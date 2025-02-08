package dev.department_service.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.department_service.models.requests.DepartmentRequest;
import dev.department_service.services.DepartmentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${department_service.base-url}/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(departmentService.getAll());
    }

    @PostMapping("create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createResourceType(@RequestBody DepartmentRequest request) {
        return ResponseEntity.ok().body(departmentService.createDepartment(request));
    }

    @PutMapping("edit")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> editResourceType(@RequestBody DepartmentRequest request) {
        return ResponseEntity.ok().body(departmentService.editDepartment(request));
    }

}
