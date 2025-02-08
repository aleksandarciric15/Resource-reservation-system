package dev.user_service.models.enums;

public enum UserRole {
    CLIENT_ADMIN("client_admin"),
    CLIENT_EMPLOYEE("client_employee");

    private final String value;

    UserRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}