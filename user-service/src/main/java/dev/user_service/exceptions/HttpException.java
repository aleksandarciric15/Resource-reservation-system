package dev.user_service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HttpException extends RuntimeException {
    private Object data;
    private HttpStatusCode status;

    public HttpException() {
        this(HttpStatus.INTERNAL_SERVER_ERROR, null);
    }

    public HttpException(Object data) {
        this(HttpStatus.INTERNAL_SERVER_ERROR, data);
    }

    public HttpException(HttpStatus httpStatus, Object data) {
        this.data = data;
        this.status = httpStatus;
    }
}
