package dev.department_service.models.requests;

import lombok.Data;

@Data
public class CompanyRequest {
    private Integer id;
    private String name;
    private String description;
    private String workTimeStart;
    private String workTimeEnd;
}
