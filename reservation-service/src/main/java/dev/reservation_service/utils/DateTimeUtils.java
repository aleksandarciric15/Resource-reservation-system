package dev.reservation_service.utils;

import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class DateTimeUtils {

    public static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

}
