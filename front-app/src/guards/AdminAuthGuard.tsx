import { useKeycloak } from "@/pages/shared/KeycloakProvider";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AdminAuthGuardProps = {
  children: React.ReactNode;
};

const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
  const { keycloak, authenticated, loading, roles } = useKeycloak();
  const navigate = useNavigate();

  const userRoles = keycloak?.tokenParsed?.realm_access?.roles || [];

  useEffect(() => {
    if (!loading && (!authenticated || !roles.includes("admin"))) {
      navigate("/unauthorized");
    }
  }, [loading, authenticated, roles, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated || !userRoles.includes("admin")) {
    return null;
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
