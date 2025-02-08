package dev.department_service.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.department_service.models.requests.CompanyRequest;
import dev.department_service.models.responses.CompanyResponse;
import dev.department_service.services.CompanyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${department_service.base-url}/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/get-data")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getCompanyData() {
        CompanyResponse companyResponse = companyService.getCompanyData();
        if (companyResponse != null) {
            return ResponseEntity.ok().body(companyResponse);
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("set-company")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> setCompanyData(@RequestBody CompanyRequest request) {
        companyService.setCompanyData(request);

        return ResponseEntity.ok().build();
    }

}
