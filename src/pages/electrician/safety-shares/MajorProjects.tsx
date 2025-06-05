
import { Helmet } from "react-helmet";
import MajorProjectsCard from "@/components/electrician/safety-shares/MajorProjectsCard";
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MajorProjects = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Major Projects - Elec-Mate</title>
        <meta name="description" content="Latest major electrical infrastructure projects, tenders, and contract awards" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
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
