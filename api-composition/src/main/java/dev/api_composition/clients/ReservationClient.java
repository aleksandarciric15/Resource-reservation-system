package dev.api_composition.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import dev.api_composition.models.responses.ReservationResponse;

@FeignClient(name = "reservation-service", url = "${reservations-url}")
public interface ReservationClient {
    @GetMapping
    List<ReservationResponse> getAll();

    @GetMapping("date")
    List<ReservationResponse> getAllByReservationDate(@RequestParam String date);
}
