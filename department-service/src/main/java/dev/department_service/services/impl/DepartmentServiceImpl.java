package dev.department_service.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import dev.department_service.exceptions.NotFoundException;
import dev.department_service.models.entities.Company;
import dev.department_service.models.entities.Department;
import dev.department_service.models.requests.DepartmentRequest;
import dev.department_service.models.responses.DepartmentResponse;
import dev.department_service.respositories.CompanyRepository;
import dev.department_service.respositories.DepartmentRepository;
import dev.department_service.services.DepartmentService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final CompanyRepository companyRepository;
    private final Integer COMPANY_ID = 1;
    private final ModelMapper modelMapper;

    @Override
    public List<DepartmentResponse> getAll() {
        List<Department> departments = departmentRepository.findAll();

        return departments.stream().map((elem) -> modelMapper.map(elem, DepartmentResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentResponse createDepartment(DepartmentRequest request) {
        Department department = new Department();
        Company company = companyRepository.findById(COMPANY_ID).orElseThrow(NotFoundException::new);

        department.setName(request.getName());
        department.setCompany(company);

        department = departmentRepository.saveAndFlush(department);

        return modelMapper.map(department, DepartmentResponse.class);
    }

    @Override
    public DepartmentResponse editDepartment(DepartmentRequest request) {
        Department department = departmentRepository.findById(request.getId())
                .orElseThrow(NotFoundException::new);

        department.setName(request.getName());

        department = departmentRepository.saveAndFlush(department);

        return modelMapper.map(department, DepartmentResponse.class);
    }
}
