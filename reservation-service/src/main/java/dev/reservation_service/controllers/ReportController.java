package dev.reservation_service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.reservation_service.models.dtos.ReservationReport;
import dev.reservation_service.models.requests.ReservationReportRequest;
import dev.reservation_service.services.ReportService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${reservation_service.base-url}/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/reservations")
    public ResponseEntity<ReservationReport> getReservationReport(@RequestBody ReservationReportRequest request) {
        ReservationReport report = reportService.getReservationSummary(request);
        return ResponseEntity.ok(report);
    }
}
