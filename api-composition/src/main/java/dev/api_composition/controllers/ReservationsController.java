package dev.api_composition.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.api_composition.services.ReservationsService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api-composition.base-url}/reservations")
@RequiredArgsConstructor
public class ReservationsController {

    private final ReservationsService reservationsService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(reservationsService.getAll());
    }

    @GetMapping("date")
    public ResponseEntity<?> getAllByReservationDate(@RequestParam String date) {
        return ResponseEntity.ok().body(reservationsService.getAllByReservationDate(date));
    }

}
