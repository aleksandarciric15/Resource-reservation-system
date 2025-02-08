package dev.department_service.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.department_service.models.entities.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

}
