import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex sm:flex-row flex-col sm:gap-6 justify-center items-center text-center mb-2">
        <p className="text-4xl">404</p>
        <Separator
          className="sm:block hidden h-8"
          orientation="vertical"
        ></Separator>
        <p className="sm:text-3xl text-2xl">Page was not found</p>
      </div>
      <Link to="/">
        <Button className="text-base text-muted-foreground" variant="link">
          Click here to go to home page.
        </Button>
      </Link>
    </div>
  );
}
