package dev.reservation_service.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.reservation_service.models.requests.CreateReservation;
import dev.reservation_service.models.requests.DenyReservationRequest;
import dev.reservation_service.models.requests.ReservationDate;
import dev.reservation_service.models.requests.ResourceAvailability;
import dev.reservation_service.models.responses.ReservationResponse;
import dev.reservation_service.services.ReservationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${reservation_service.base-url}/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping()
    public ResponseEntity<?> getAll() {
        List<ReservationResponse> reservationResponses = reservationService.getAll();
        return ResponseEntity.ok().body(reservationResponses);
    }

    @GetMapping("date")
    public ResponseEntity<?> getAllByReservationDate(@RequestParam String date) {
        return ResponseEntity.ok().body(reservationService.getAllByReservationDate(date));
    }

    @GetMapping("{reservationId}")
    public ResponseEntity<?> getReservationById(@PathVariable Integer reservationId) {
        // TODO endpoint for fetching details about one reservation
        return ResponseEntity.ok().body(null);
    }

    @PutMapping("deny")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> denyReservation(@RequestBody DenyReservationRequest request) {
        var result = reservationService.denyReservation(request);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("availability")
    public boolean isResourceAvailable(@RequestBody ResourceAvailability request) {
        return reservationService.isResourceAvailable(request);
    }

    @PostMapping("reserve")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> makeReservation(@RequestBody CreateReservation request) {
        reservationService.makeReservation(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("reserved-ids")
    public ResponseEntity<?> getReservedResourceIds(@RequestBody ReservationDate request) {
        List<Integer> ids = reservationService
                .getReservedResourceIds(request);
        return ResponseEntity.ok().body(ids);
    }

}
