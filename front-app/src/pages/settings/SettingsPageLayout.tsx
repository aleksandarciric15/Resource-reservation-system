import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/SidebarNav";
import { Outlet } from "react-router-dom";

const sidebarNavItems = [
  {
    title: "Department",
    href: "",
  },
];

const SettingsPageLayout = () => {
  return (
    <section className="overflow-hidden relative sm:px-5 px-4 md:pt-6 pt-4 pb-10">
      <div className=" container mx-auto space-y-5">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">My settings</h2>
          <p className="text-muted-foreground sm:text-base text-sm">
            Manage your settings
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/6">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPageLayout;
