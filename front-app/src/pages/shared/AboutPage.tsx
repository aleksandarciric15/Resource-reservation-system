import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Briefcase,
  MessageSquare,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useKeycloak } from "./KeycloakProvider";

export default function AboutPage() {
  const { register } = useKeycloak();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">RRS</span>
        </div>
        <nav>
          <Link to="/">
            <Button variant="outline">Home</Button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About Our Resource Reservation System
        </h1>

        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What is RRS?</h2>
            <p className="text-lg text-muted-foreground">
              The Resource Reservation System (RRS) is a comprehensive platform
              designed to streamline the process of reserving and managing
              various resources within an organization. Whether you're working
              from home or in the office, our system ensures efficient
              allocation of workspaces and equipment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<Briefcase className="h-6 w-6 text-primary" />}
                title="Flexible Workspace Booking"
                description="Reserve your workspace at least 12 hours in advance, with a clear view of available seats."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-primary" />}
                title="Resource Variety"
                description="Book not just workstations, but also computers, projectors, and other essential resources."
              />
              <FeatureCard
                icon={<MessageSquare className="h-6 w-6 text-primary" />}
                title="User Communication"
                description="Easily send messages to other users regarding their reservations."
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-primary" />}
                title="Administrative Control"
                description="Admins can oversee all reservations, manage on behalf of users, and access reservation history."
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-lg text-muted-foreground">
              <li>
                Log in using your company credentials or OAuth2 with your
                *.etf.unibl.org account.
              </li>
              <li>Browse available resources and their descriptions.</li>
              <li>Make a reservation at least 12 hours in advance.</li>
              <li>
                Receive confirmations and notifications about your bookings.
              </li>
              <li>
                Enjoy a streamlined, efficient workplace resource management
                experience.
              </li>
            </ol>
          </section>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => register()}>
              Get Started with RRS
            </Button>
          </div>
        </div>
      </main>

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
    <div className="bg-card p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
