package dev.api_composition.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDate {
    private String date;
    private String startTime;
    private String endTime;
}
