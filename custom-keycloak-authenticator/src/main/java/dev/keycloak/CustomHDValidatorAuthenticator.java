package dev.keycloak;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.ws.rs.core.Response;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.authentication.Authenticator;
import org.keycloak.broker.provider.BrokeredIdentityContext;
import org.keycloak.forms.login.LoginFormsProvider;
import org.keycloak.models.IdentityProviderModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.keycloak.provider.Provider;
import org.keycloak.sessions.AuthenticationSessionModel;
import org.keycloak.sessions.RootAuthenticationSessionModel;

import java.util.HashMap;
import java.util.Map;

public class CustomHDValidatorAuthenticator implements Authenticator {


    @Override
    public void authenticate(AuthenticationFlowContext context) {
        UserModel user = context.getUser();
        String email = user.getEmail();

        if (email != null && email.endsWith(".etf.unibl.org")) {
            context.success();
        } else {

            KeycloakSession session = context.getSession();
            RealmModel realm = context.getRealm();

            session.users().removeUser(realm, user);

            LoginFormsProvider form = context.form();
            form.setError("Couldn't authenticate user!!");

            if (context.getHttpRequest().getDecodedFormParameters() != null) {
                form.setAttribute("login", context.getHttpRequest().getDecodedFormParameters());
            }

            Response challenge = form.createForm("login.ftl");
            context.failureChallenge(AuthenticationFlowError.INVALID_USER, challenge);
        }
    }


    @Override
    public void action(AuthenticationFlowContext context) {
        // No action needed
    }

    @Override
    public boolean requiresUser() {
        return true;
    }

    @Override
    public boolean configuredFor(KeycloakSession session, RealmModel realm, UserModel user) {
        return true;
    }

    @Override
    public void setRequiredActions(KeycloakSession session, RealmModel realm, UserModel user) {
        // No required actions
    }

    @Override
    public void close() {
        // No cleanup needed
    }
}
