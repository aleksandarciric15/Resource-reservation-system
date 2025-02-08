import { setIsAuth } from "@/api/services/storage-service";
import Keycloak from "keycloak-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserProfile = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

type KeycloakContextType = {
  keycloak: Keycloak | null;
  authenticated: boolean;
  loading: boolean;
  userId: string | null;
  profile: UserProfile | null;
  roles: string[];
  login: () => Promise<void>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
};

const KeycloakContext = createContext<KeycloakContextType | undefined>(
  undefined
);

export const useKeycloak = (): KeycloakContextType => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error("useKeycloak must be used within a KeycloakProvider");
  }
  return context;
};

type KeycloakProviderProps = {
  children: ReactNode;
};

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
const keycloakRealm = import.meta.env.VITE_KEYCLOAK_REALM;
const keycloakClientId = import.meta.env.VITE_KEYCLOAK_CLIENTID;

if (!keycloakUrl || !keycloakRealm || !keycloakClientId) {
  throw new Error(
    "Missing required environment variables: KEYCLOAK_URL, KEYCLOAK_REALM, or KEYCLOAK_CLIENTID"
  );
}

const keycloakInstance = new Keycloak({
  url: keycloakUrl,
  realm: keycloakRealm,
  clientId: keycloakClientId,
});

export const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const initKeycloak = async () => {
      setLoading(true);
      if (!keycloakInstance?.didInitialize) {
        try {
          const isAuthenticated = await keycloakInstance.init({
            onLoad: "check-sso",
          });
          setKeycloak(keycloakInstance);
          setAuthenticated(isAuthenticated);
          if (isAuthenticated && keycloakInstance.tokenParsed?.sub) {
            setIsAuth(isAuthenticated);
            if (keycloakInstance.tokenParsed?.sub) {
              setUserId(keycloakInstance.tokenParsed.sub);
            }
          }
        } catch (error) {
          console.error("Keycloak initialization failed: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    initKeycloak();
  }, []);

  useEffect(() => {
    if (keycloak && authenticated) {
      setLoading(true);
      fetchUserProfile();
      fetchRoles();
      setLoading(false);
    }
  }, [keycloak, authenticated]);

  const fetchRoles = () => {
    if (keycloak) {
      const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];
      setRoles(userRoles);
    }
  };

  const fetchUserProfile = async () => {
    if (keycloak) {
      try {
        const userProfile = await keycloak.loadUserProfile();
        setProfile({
          username: userProfile.username ?? "",
          firstName: userProfile.firstName ?? "",
          lastName: userProfile.lastName ?? "",
          email: userProfile.email ?? "",
        });
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    }
  };

  const login = async () => {
    if (keycloak) {
      setLoading(true);
      try {
        await keycloak.login({
          redirectUri: `${window.location.origin}`,
        });

        setAuthenticated(true);
        if (keycloak.tokenParsed?.sub) {
          setUserId(keycloak.tokenParsed.sub);
        }
      } catch (error) {
        console.log("Login failed: " + error);
      } finally {
        setLoading(false);
      }
    }
  };

  const logout = async () => {
    if (keycloak && keycloak.authenticated) {
      await keycloak.logout({
        redirectUri: `${window.location.origin}`,
      });
      setAuthenticated(false);
      setUserId(null);
      setProfile(null);
      setRoles([]);
    }
  };

  const register = async () => {
    keycloak?.register();
  };

  return (
    <KeycloakContext.Provider
      value={{
        keycloak,
        authenticated,
        loading,
        profile,
        login,
        logout,
        register,
        userId,
        roles,
      }}
    >
      {loading ? <div>Loading</div> : children}
    </KeycloakContext.Provider>
  );
};
