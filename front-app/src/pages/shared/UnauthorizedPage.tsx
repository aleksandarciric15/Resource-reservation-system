import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 flex flex-col items-center justify-center text-center">
      <header className="mb-8">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-10 w-10 text-destructive" />
          <h1 className="text-5xl font-extrabold text-destructive">
            Unauthorized
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto space-y-6">
        <p className="text-lg text-muted-foreground">
          You do not have permission to access this page. Please contact your
          administrator if you believe this is a mistake.
        </p>

        <div className="flex justify-center mt-6 space-x-4">
          <Link to="/">
            <Button variant="outline" size="lg">
              Go to Home
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="lg"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </main>

      <footer className="mt-12 text-muted-foreground">
        <p>&copy; 2024 Resource Reservation System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UnauthorizedPage;
