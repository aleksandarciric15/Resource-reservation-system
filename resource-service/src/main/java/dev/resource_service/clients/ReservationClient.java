package dev.resource_service.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import dev.resource_service.models.dtos.ReservationDate;

@FeignClient(name = "reservation-service", url = "${reservations-url}")
public interface ReservationClient {
    @PostMapping("/reserved-ids")
    List<Integer> getReservedResourceIds(@RequestBody ReservationDate request);

}