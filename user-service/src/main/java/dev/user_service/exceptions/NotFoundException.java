package dev.user_service.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends HttpException {
    private static final HttpStatus status = HttpStatus.NOT_FOUND;

    public NotFoundException() {
        super(status, null);
    }

    public NotFoundException(Object data) {
        super(status, data);
    }
}
