import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useSEO from "@/hooks/useSEO";

export default function LeadershipModule1Section4() {
  useSEO({
    title: "Leadership Module 1 Section 4 | Elec-Mate",
    description: "Leadership on-site module 1 section 4",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <Link to="/study-centre/apprentice/leadership-on-site">
          <Button variant="ghost" size="sm" className="gap-2 text-white h-11 touch-manipulation">
            <ArrowLeft className="h-4 w-4" />
            Back to Leadership On-Site
          </Button>
        </Link>

        <div className="text-center py-12 space-y-4">
          <h1 className="text-2xl font-bold text-white">Section 4</h1>
          <p className="text-white">Content coming soon.</p>
        </div>
      </div>
    </div>
  );
}
