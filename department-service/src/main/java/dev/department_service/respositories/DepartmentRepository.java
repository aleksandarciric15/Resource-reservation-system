package dev.department_service.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.department_service.models.entities.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}
