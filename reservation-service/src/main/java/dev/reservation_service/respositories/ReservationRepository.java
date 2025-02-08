package dev.reservation_service.respositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.reservation_service.models.dtos.ReservationReportData;
import dev.reservation_service.models.entities.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
  List<Reservation> findAllByDeniedFalse();

  @Query("SELECT r FROM Reservation r WHERE r.date = :date AND r.denied = FALSE")
  List<Reservation> findAllByReservationDate(@Param("date") LocalDate date);

  @Query(value = """
          SELECT DATE_FORMAT(r.date, '%Y-%m-%d') AS date, COUNT(DISTINCT r.id) AS count
          FROM reservation_resource rr
          JOIN reservation r ON rr.reservationId = r.id
          WHERE r.date BETWEEN :startDate AND :endDate
            AND (:userId IS NULL OR r.employeeId = :userId)
            AND (:denied IS NULL OR r.denied = :denied)
            AND (:resourceId IS NULL OR rr.resourceId = :resourceId)
          GROUP BY r.date
          ORDER BY r.date
      """, nativeQuery = true)
  List<ReservationReportData> findReservationSummary(
      @Param("startDate") LocalDate startDate,
      @Param("endDate") LocalDate endDate,
      @Param("userId") String userId,
      @Param("denied") Boolean denied,
      @Param("resourceId") Integer resourceId);
}
