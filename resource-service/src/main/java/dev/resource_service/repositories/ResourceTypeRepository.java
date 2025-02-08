package dev.resource_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.resource_service.models.entities.ResourceType;

@Repository
public interface ResourceTypeRepository extends JpaRepository<ResourceType, Integer> {

}
