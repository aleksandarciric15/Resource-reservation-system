package dev.api_composition.models.responses;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class ReservationResponse {
    private Integer id;
    private Date createdAt;
    private String employeeId;
    private String reason;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean denied;
    private List<Integer> resourceIds;
}
