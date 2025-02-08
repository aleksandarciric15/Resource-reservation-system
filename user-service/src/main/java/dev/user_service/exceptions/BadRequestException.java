package dev.user_service.exceptions;

import org.springframework.http.HttpStatus;

public class BadRequestException extends HttpException {
    private static final HttpStatus status = HttpStatus.BAD_REQUEST;

    public BadRequestException() {
        super(status, null);
    }

    public BadRequestException(Object data) {
        super(status, data);
    }
}
