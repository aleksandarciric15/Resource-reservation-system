import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-svh flex flex-col">
      <main className="flex-1">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
