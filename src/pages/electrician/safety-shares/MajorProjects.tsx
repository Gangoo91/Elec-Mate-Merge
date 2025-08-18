
import { Helmet } from "react-helmet";
import MajorProjectsCard from "@/components/electrician/safety-shares/MajorProjectsCard";
import { Building2 } from "lucide-react";
import BackButton from "@/components/common/BackButton";

const MajorProjects = () => {
  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Major Projects - Elec-Mate</title>
        <meta name="description" content="Latest major electrical infrastructure projects, tenders, and contract awards" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <BackButton customUrl="/electrician/safety-shares" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Major Projects</h1>
              <p className="text-muted-foreground">
                Latest major electrical infrastructure projects, tenders, and contract awards
              </p>
            </div>
          </div>
        </div>

        <MajorProjectsCard />
      </div>
    </div>
  );
};

export default MajorProjects;
