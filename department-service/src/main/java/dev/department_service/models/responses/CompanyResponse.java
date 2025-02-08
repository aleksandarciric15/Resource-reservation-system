package dev.department_service.models.responses;

import lombok.Data;

@Data
public class CompanyResponse {
    private Integer id;
    private String name;
    private String description;
    private String workTimeStart;
    private String workTimeEnd;
}
