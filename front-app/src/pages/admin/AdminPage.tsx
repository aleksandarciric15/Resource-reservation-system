import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import CompanySettings from "./components/CompanySettings";
import MakeReservation from "./components/MakeReservation";
import ReservationManagement from "./components/ReservationManagement";
import ResourceManagement from "./components/ResourceManagement";
import ResourceTypeManagement from "./components/ResourceTypeManagement";
import DepartmentManagement from "./components/DepartmentManagement";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("company-settings");

  const renderContent = () => {
    switch (activeSection) {
      case "company-settings":
        return <CompanySettings />;
      case "reservations":
        return <ReservationManagement />;
      case "make-reservation":
        return <MakeReservation />;
      case "resource-types":
        return <ResourceTypeManagement />;
      case "resources":
        return <ResourceManagement />;
      case "departments":
        return <DepartmentManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <Card className="h-fit shadow-lg rounded-lg bg-white">
          <CardHeader className="bg-gray-100 rounded-t-lg py-4 text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Admin Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 p-6">
            <Button
              variant={
                activeSection === "company-settings" ? "default" : "outline"
              }
              onClick={() => setActiveSection("company-settings")}
              className="w-full"
            >
              Company Settings
            </Button>
            <Button
              variant={activeSection === "reservations" ? "default" : "outline"}
              onClick={() => setActiveSection("reservations")}
              className="w-full"
            >
              Manage Reservations
            </Button>
            <Button
              variant={
                activeSection === "make-reservation" ? "default" : "outline"
              }
              onClick={() => setActiveSection("make-reservation")}
              className="w-full"
            >
              Make Reservation
            </Button>
            <Button
              variant={
                activeSection === "resource-types" ? "default" : "outline"
              }
              onClick={() => setActiveSection("resource-types")}
              className="w-full"
            >
              Resource Types
            </Button>
            <Button
              variant={activeSection === "resources" ? "default" : "outline"}
              onClick={() => setActiveSection("resources")}
              className="w-full"
            >
              Resources
            </Button>
            <Button
              variant={activeSection === "departments" ? "default" : "outline"}
              onClick={() => setActiveSection("departments")}
              className="w-full"
            >
              Departments
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg bg-white">
          <CardHeader className="bg-gray-100 rounded-t-lg py-4 text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {activeSection
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage your {activeSection.replace(/-/g, " ")} here.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">{renderContent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
