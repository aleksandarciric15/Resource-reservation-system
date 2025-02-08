import AdminLayout from "@/layouts/AdminLayout";
import EmployeeLayout from "@/layouts/EmployeeLayout";
import MainLayout from "@/layouts/MainLayout";
import RootLayout from "@/layouts/RootLayout";
import AdminPage from "@/pages/admin/AdminPage";
import MakeReservation from "@/pages/admin/components/MakeReservation";
import LandingPage from "@/pages/landing/LandingPage";
import MessagesPage from "@/pages/messages/MessagesPage";
import ReportingDashboard from "@/pages/report/ReportPage";
import Schedule from "@/pages/reservations-graphical-view/Schedule";
import DepartmentPage from "@/pages/settings/components/DepartmentPage";
import SettingsPageLayout from "@/pages/settings/SettingsPageLayout";
import AboutPage from "@/pages/shared/AboutPage";
import NotFoundPage from "@/pages/shared/NotFoundPage";
import { NotificationPage } from "@/pages/shared/Notification";
import UnauthorizedPage from "@/pages/shared/UnauthorizedPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/employee",
            element: <EmployeeLayout />,
            children: [
              {
                path: "schedule",
                element: <Schedule />,
              },
              {
                path: "make-reservation",
                element: <MakeReservation />,
              },
              {
                path: "notifications",
                element: <NotificationPage />,
              },
              {
                path: "messages",
                element: <MessagesPage />,
              },
              {
                path: "settings",
                element: <SettingsPageLayout />,
                children: [
                  {
                    path: "",
                    element: <DepartmentPage />,
                  },
                ],
              },
            ],
          },
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              {
                path: "manage",
                element: <AdminPage />,
              },
              {
                path: "dashboard",
                element: <ReportingDashboard />,
              },
            ],
          },
        ],
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
