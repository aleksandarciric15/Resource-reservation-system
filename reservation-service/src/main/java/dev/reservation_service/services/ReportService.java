package dev.reservation_service.services;

import dev.reservation_service.models.dtos.ReservationReport;
import dev.reservation_service.models.requests.ReservationReportRequest;

public interface ReportService {

    ReservationReport getReservationSummary(ReservationReportRequest request);
}
