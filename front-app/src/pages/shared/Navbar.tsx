import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useKeycloak } from "./KeycloakProvider";
import { MessageCircleNotification, NotificationBell } from "./Notification";

type NavbarMenuItem = {
  title: string;
  link: string;
  submenu?: NavbarSubMenuItem[];
};

type NavbarSubMenuItem = {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
};

const Navbar = () => {
  const { roles } = useKeycloak();
  const isMobile = useIsMobile();

  const navbarMenu: NavbarMenuItem[] = [
    {
      title: "Dashboard",
      link: "admin/dashboard",
    },
    {
      title: "Manage",
      link: "admin/manage",
    },
    {
      title: "Schedule",
      link: "employee/schedule",
    },
    {
      title: "Make Reservation",
      link: "employee/make-reservation",
    },
    {
      title: "Settings",
      link: "employee/settings",
    },
  ];

  const filteredMenu = navbarMenu.filter((item) => {
    if (
      roles.includes("admin") &&
      (item.title === "Dashboard" || item.title === "Manage")
    ) {
      return true;
    }

    if (
      roles.includes("employee") &&
      !roles.includes("admin") &&
      (item.title === "Schedule" ||
        item.title === "Make Reservation" ||
        item.title === "Settings")
    )
      return true;

    return false;
  });

  return (
    <section className="py-3 shadow-md dark:shadow-white/15 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container mx-auto">
        {isMobile ? (
          <MobileNavbar navbarMenuItems={filteredMenu} />
        ) : (
          <DesktopNavbar navbarMenuItems={filteredMenu} />
        )}
      </div>
    </section>
  );
};

const DesktopNavbar = ({
  navbarMenuItems,
}: {
  navbarMenuItems: NavbarMenuItem[];
}) => {
  const { login, logout, keycloak, register, roles } = useKeycloak();

  return (
    <nav className="hidden justify-between lg:flex">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navbarMenuItems.map((item, index) => {
                if (!item.submenu) {
                  return (
                    <Link
                      key={"nav-bar_" + index}
                      className={cn(
                        "text-muted-foreground",
                        navigationMenuTriggerStyle,
                        buttonVariants({
                          variant: "ghost",
                        })
                      )}
                      to={item.link}
                    >
                      {item.title}
                    </Link>
                  );
                } else {
                  return (
                    <NavigationMenuItem
                      key={"nav-bar_" + index}
                      className="text-muted-foreground"
                    >
                      <NavigationMenuTrigger>
                        <span>{item.title}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-[360px] p-3">
                          <NavigationMenuLink>
                            {item.submenu.map((item, idx) => (
                              <li key={idx}>
                                <Link
                                  className={cn(
                                    "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  )}
                                  to={item.link}
                                >
                                  {item.icon}
                                  <div>
                                    <div className="text-sm font-semibold">
                                      {item.title}
                                    </div>
                                    <p className="text-sm leading-snug text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </NavigationMenuLink>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!keycloak?.authenticated === true ? (
          <>
            <Button
              onClick={() => {
                login();
              }}
              size="default"
              variant={"outline"}
            >
              Log in
            </Button>
            <Button
              onClick={() => {
                register();
              }}
              size="default"
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                logout();
              }}
              size="default"
            >
              Log out
            </Button>
            {roles.includes("employee") && !roles.includes("admin") && (
              <>
                <NotificationBell />
                <MessageCircleNotification />
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

const MobileNavbar = ({
  navbarMenuItems,
}: {
  navbarMenuItems: NavbarMenuItem[];
}) => {
  const { login, logout, keycloak, register, roles } = useKeycloak();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center">
      <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Menu />
      </Button>
      <div className="flex items-center gap-2">
        {!keycloak?.authenticated === true ? (
          <>
            <Button
              onClick={() => {
                login();
              }}
              size="sm"
              variant="outline"
            >
              Log in
            </Button>
            <Button
              onClick={() => {
                register();
              }}
              size="sm"
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                logout();
              }}
              size="sm"
            >
              Log out
            </Button>
            {roles.includes("employee") && !roles.includes("admin") && (
              <>
                <NotificationBell />
                <MessageCircleNotification />
              </>
            )}
          </>
        )}
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-md">
          {navbarMenuItems.map((item, index) => (
            <Link
              key={`mobile-nav-${index}`}
              to={item.link}
              className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
