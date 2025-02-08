package dev.reservation_service.services;

import java.util.List;

import dev.reservation_service.models.requests.CreateReservation;
import dev.reservation_service.models.requests.DenyReservationRequest;
import dev.reservation_service.models.requests.ReservationDate;
import dev.reservation_service.models.requests.ResourceAvailability;
import dev.reservation_service.models.responses.ReservationResponse;

public interface ReservationService {

    boolean isResourceAvailable(ResourceAvailability request);

    void makeReservation(CreateReservation request);

    List<Integer> getReservedResourceIds(ReservationDate request);

    List<ReservationResponse> getAll();

    List<ReservationResponse> getAllByReservationDate(String date);

    boolean denyReservation(DenyReservationRequest request);
}
