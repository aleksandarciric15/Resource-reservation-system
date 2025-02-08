package dev.resource_service.exceptions;

public class ResourceException extends RuntimeException {
    public ResourceException(String message) {
        super(message);
    }

    public ResourceException() {
        super();
    }
}
