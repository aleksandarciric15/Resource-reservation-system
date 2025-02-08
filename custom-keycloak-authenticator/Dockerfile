FROM quay.io/keycloak/keycloak:26.0.7

# Copy the custom authenticator JAR into the Keycloak providers directory
COPY target/custom-keycloak-authenticator-1.0-SNAPSHOT.jar /opt/keycloak/providers/

# Optionally, run any additional configuration commands