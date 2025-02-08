package dev.notification_service.models.enums;

public enum MessageType {
    RESOURCE_MESSAGE("RESOURCE_MESSAGE");

    private final String value;

    MessageType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}