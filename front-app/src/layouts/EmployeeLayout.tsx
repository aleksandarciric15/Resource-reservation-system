import EmployeeAuthGuard from "@/guards/EmployeeAuthGuard";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <EmployeeAuthGuard>
      <Outlet />
    </EmployeeAuthGuard>
  );
};

export default EmployeeLayout;
