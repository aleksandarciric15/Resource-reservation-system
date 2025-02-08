import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/pages/shared/Navbar";
import { NotificationProvider } from "@/pages/shared/NotificationProvider";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const isMobile = useIsMobile();

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 flex flex-col">
        <Navbar />
        <ScrollArea className={`flex-1 ${isMobile ? "px-4" : ""}`}>
          <div className={`${isMobile ? "" : "container mx-auto"} py-6`}>
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </NotificationProvider>
  );
};

export default MainLayout;
