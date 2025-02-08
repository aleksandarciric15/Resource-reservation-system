import AdminAuthGuard from "@/guards/AdminAuthGuard";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <AdminAuthGuard>
      <Outlet />
    </AdminAuthGuard>
  );
};

export default AdminLayout;
