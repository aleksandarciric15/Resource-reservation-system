package dev.reservation_service.services.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import dev.reservation_service.models.dtos.ReservationReport;
import dev.reservation_service.models.dtos.ReservationReportData;
import dev.reservation_service.models.requests.ReservationReportRequest;
import dev.reservation_service.respositories.ReservationRepository;
import dev.reservation_service.services.ReportService;
import dev.reservation_service.utils.DateTimeUtils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReservationRepository reservationRepository;

    @Override
    public ReservationReport getReservationSummary(ReservationReportRequest request) {
        LocalDate formatedStartDate = LocalDate.parse(request.getStartDate(), DateTimeUtils.dateFormatter);
        LocalDate formatedEndDate = LocalDate.parse(request.getEndDate(), DateTimeUtils.dateFormatter);

        List<ReservationReportData> reservationData = reservationRepository.findReservationSummary(
                formatedStartDate, formatedEndDate,
                request.getUserId() == null ? null : request.getUserId(),
                request.isDenied(),
                request.getResourceId() == null ? null : request.getResourceId());

        int total = reservationData.stream().mapToInt(data -> data.getCount().intValue()).sum();
        double average = total > 0 ? (double) total / reservationData.size() : 0.0;

        return new ReservationReport(reservationData, total, average);
    }

}
