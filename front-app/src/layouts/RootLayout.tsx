import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="h-svh w-full flex flex-col">
      <main className="flex-1">
        <Outlet />
        <Toaster position="bottom-right" />
      </main>
    </div>
  );
}
