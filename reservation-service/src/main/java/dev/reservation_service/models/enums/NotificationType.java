package dev.reservation_service.models.enums;

public enum NotificationType {
    ADMIN_MAKE_DENY_RESERVATION("ADMIN_MAKE_DENY_RESERVATION");

    private final String value;

    NotificationType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}