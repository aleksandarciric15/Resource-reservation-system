package dev.department_service.services;

import java.util.List;

import dev.department_service.models.requests.DepartmentRequest;
import dev.department_service.models.responses.DepartmentResponse;

public interface DepartmentService {

    List<DepartmentResponse> getAll();

    DepartmentResponse createDepartment(DepartmentRequest request);

    DepartmentResponse editDepartment(DepartmentRequest request);
}
