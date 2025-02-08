package dev.api_composition.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dev.api_composition.clients.ReservationClient;
import dev.api_composition.clients.ResourceClient;
import dev.api_composition.clients.UserClient;
import dev.api_composition.models.responses.Reservation;
import dev.api_composition.models.responses.ReservationResponse;
import dev.api_composition.models.responses.ResourceResponse;
import dev.api_composition.models.responses.UserResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationsService {

    private final ReservationClient reservationClient;
    private final ResourceClient resourceClient;
    private final UserClient userClient;

    public List<Reservation> getAll() {
        List<ReservationResponse> reservationResponses = reservationClient.getAll();
        return processReservations(reservationResponses);
    }

    public List<Reservation> getAllByReservationDate(String date) {
        List<ReservationResponse> reservationResponses = reservationClient.getAllByReservationDate(date);
        return processReservations(reservationResponses);
    }

    private List<Reservation> processReservations(List<ReservationResponse> reservationResponses) {
        List<ResourceResponse> resources = resourceClient.getAll();
        List<UserResponse> employees = userClient.getEmployees();

        // Create a map of employeeId to UserResponse
        Map<String, UserResponse> employeeMap = employees.stream()
                .collect(Collectors.toMap(UserResponse::getUserId, employee -> employee));

        // Create a map of resourceId to ResourceResponse
        Map<Integer, ResourceResponse> resourceMap = resources.stream()
                .collect(Collectors.toMap(ResourceResponse::getId, resource -> resource));

        return reservationResponses.stream().map(reservation -> mapToReservation(reservation, resourceMap, employeeMap))
                .collect(Collectors.toList());
    }

    private Reservation mapToReservation(ReservationResponse reservation,
            Map<Integer, ResourceResponse> resourceMap,
            Map<String, UserResponse> employeeMap) {
        Reservation response = new Reservation();
        response.setId(reservation.getId());
        response.setCreatedAt(reservation.getCreatedAt());
        response.setReason(reservation.getReason());
        response.setDate(reservation.getDate());
        response.setStartTime(reservation.getStartTime());
        response.setEndTime(reservation.getEndTime());
        response.setDenied(reservation.isDenied());

        // Map resourceIds to ResourceResponse
        List<ResourceResponse> resourcesForReservation = reservation.getResourceIds().stream()
                .map(resourceMap::get)
                .collect(Collectors.toList());

        response.setResources(resourcesForReservation);

        // Map employeeId to UserResponse
        UserResponse employee = employeeMap.get(reservation.getEmployeeId());
        response.setEmployee(employee);

        return response;
    }
}
