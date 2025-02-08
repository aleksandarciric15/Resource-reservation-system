package dev.department_service.services;

import dev.department_service.models.requests.CompanyRequest;
import dev.department_service.models.responses.CompanyResponse;

public interface CompanyService {

    void setCompanyData(CompanyRequest request);

    CompanyResponse getCompanyData();
}
