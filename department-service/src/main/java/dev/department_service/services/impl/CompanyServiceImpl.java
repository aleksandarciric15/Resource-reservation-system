package dev.department_service.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import dev.department_service.models.entities.Company;
import dev.department_service.models.requests.CompanyRequest;
import dev.department_service.models.responses.CompanyResponse;
import dev.department_service.respositories.CompanyRepository;
import dev.department_service.services.CompanyService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    @Value("${company-id}")
    private Integer companyId;
    private final CompanyRepository companyRepository;
    private final ModelMapper modelMapper;

    @Override
    public void setCompanyData(CompanyRequest request) {
        Company company = new Company();

        company.setId(companyId);
        company.setDescription(request.getDescription());
        company.setName(request.getName());
        company.setWorkTimeEnd(request.getWorkTimeEnd());
        company.setWorkTimeStart(request.getWorkTimeStart());

        companyRepository.saveAndFlush(company);
    }

    @Override
    public CompanyResponse getCompanyData() {
        Company company = companyRepository.findById(companyId).orElseThrow();
        return modelMapper.map(company, CompanyResponse.class);
    }

}
