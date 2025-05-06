
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, FileText } from "lucide-react";

const HealthSafetyDashboard = () => {
  // Hardcoded course and unit slugs for demo purposes
  const courseSlug = "electrical-installation";
  const unitSlug = "health-safety";

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-elec-yellow mb-6">Health & Safety Unit</h1>
        <p className="text-elec-light/80 mb-8">
          Welcome to the Health & Safety module. Choose a section below to start learning.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-elec-yellow" />
                <span>Legislation and Regulations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-elec-light/80 mb-4">
                Study of key health and safety laws relevant to electrical work, including the Health and Safety at Work Act,
                Electricity at Work Regulations, and COSHH.
              </p>
              <Button asChild className="w-full mt-2">
                <Link to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/legislation`}>
                  Start Learning
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-elec-yellow" />
                <span>Roles and Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-elec-light/80 mb-4">
                Identification of duties for employers, employees, and other stakeholders in 
                maintaining a safe working environment.
              </p>
              <Button asChild className="w-full mt-2">
                <Link to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/roles`}>
                  Start Learning
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthSafetyDashboard;
