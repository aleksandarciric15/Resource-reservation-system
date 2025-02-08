package dev.reservation_service.exceptions;

public class ReservationException extends RuntimeException {
    public ReservationException(String message) {
        super(message);
    }

    public ReservationException() {
        super();
    }
}
