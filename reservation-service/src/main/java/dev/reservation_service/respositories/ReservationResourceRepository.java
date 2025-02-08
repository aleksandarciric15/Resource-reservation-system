package dev.reservation_service.respositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.reservation_service.models.entities.ReservationResource;

@Repository
public interface ReservationResourceRepository extends JpaRepository<ReservationResource, Integer> {

    @Query(value = "SELECT rr.resourceId FROM reservation_resource rr " +
            "JOIN reservation r ON r.id = rr.reservationId " +
            "WHERE r.date = :date " +
            "AND ((:startTime < r.endTime AND :endTime > r.startTime) " +
            "     AND NOT (:startTime = r.endTime OR :endTime = r.startTime)) " +
            "AND r.denied = FALSE", nativeQuery = true)
    List<Integer> findReservedResourcesByDateAndTimeRange(@Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime);

}
