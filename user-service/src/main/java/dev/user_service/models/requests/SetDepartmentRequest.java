package dev.user_service.models.requests;

import lombok.Data;

@Data
public class SetDepartmentRequest {
    private String userId;
    private Integer departmentId;
}
