import { Button } from "@/components/ui/button";
import { ArrowLeft, Clipboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ProjectManagerInterface from "@/components/electrician-tools/project-manager/ProjectManagerInterface";

const ProjectManagerPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="bg-elec-dark  ">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-3 sm:py-6 max-w-4xl">
        <div className="space-y-0 animate-fade-in">
          {/* Back Button */}
          <div className="mb-4">
            <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
              <Button variant="outline" className="gap-2 touch-manipulation h-11 active:scale-[0.98]">
                <ArrowLeft className="h-5 w-5" /> {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <ProjectManagerInterface />
        </div>
      </div>
    </div>
  );
};

export default ProjectManagerPage;
