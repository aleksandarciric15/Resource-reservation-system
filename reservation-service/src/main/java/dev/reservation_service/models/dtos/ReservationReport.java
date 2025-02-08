package dev.reservation_service.models.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationReport {
    private List<ReservationReportData> data;
    private int total;
    private double average;
}
