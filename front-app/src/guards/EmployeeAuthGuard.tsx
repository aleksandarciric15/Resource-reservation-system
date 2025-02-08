import { useKeycloak } from "@/pages/shared/KeycloakProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type EmployeeAuthGuardProps = {
  children: React.ReactNode;
};

const EmployeeAuthGuard = ({ children }: EmployeeAuthGuardProps) => {
  const { keycloak, authenticated, loading } = useKeycloak();
  const navigate = useNavigate();

  const userRoles = keycloak?.tokenParsed?.realm_access?.roles || [];

  useEffect(() => {
    if (loading) return;

    if (
      !authenticated ||
      !userRoles.includes("employee") ||
      userRoles.includes("admin")
    ) {
      navigate("/unauthorized");
    }
  }, [authenticated, loading, userRoles, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (
    !authenticated ||
    !userRoles.includes("employee") ||
    userRoles.includes("admin")
  ) {
    return null;
  }

  return <>{children}</>;
};

export default EmployeeAuthGuard;
