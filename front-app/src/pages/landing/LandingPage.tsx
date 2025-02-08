import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useKeycloak } from "../shared/KeycloakProvider";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { login, register, authenticated, roles } = useKeycloak();
  useEffect(() => {
    if (authenticated && roles.length > 0) {
      if (roles.includes("admin")) {
        navigate("admin/dashboard");
      } else if (roles.includes("employee")) {
        navigate("employee/schedule");
      } else {
        navigate("/unauthorized");
      }
    }
  }, [roles]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">RRS</span>
        </div>
        <nav>
          <Button variant="outline" onClick={() => login()}>
            Login
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Resource Reservation System
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Streamline your resource management with our intuitive and efficient
          reservation system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => register()}
          >
            Get Started
          </Button>
          <Link to="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </Link>
        </div>
      </main>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Calendar className="h-12 w-12 text-primary" />}
            title="Easy Scheduling"
            description="Book resources with just a few clicks, anytime and anywhere."
          />
          <FeatureCard
            icon={<Users className="h-12 w-12 text-primary" />}
            title="Team Collaboration"
            description="Share resources and coordinate schedules effortlessly with your team."
          />
          <FeatureCard
            icon={<Clock className="h-12 w-12 text-primary" />}
            title="Real-time Availability"
            description="View up-to-date resource availability to make informed decisions."
          />
        </div>
      </section>

      <footer className="bg-muted py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Resource Reservation System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
