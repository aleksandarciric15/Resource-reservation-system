import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, ClipboardList, Calendar, AlignJustify } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ className, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-background shadow-lg transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-4">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleTabClick("company-settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Company Settings</span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleTabClick("manage-reservations")}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Manage Reservations</span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => handleTabClick("make-reservation")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Make Reservation</span>
            </Button>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
