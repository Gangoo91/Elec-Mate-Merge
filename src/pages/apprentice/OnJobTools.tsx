
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import OnTheJobToolsBox from "@/components/apprentice/OnTheJobToolsBox";
import { Calculator, FileText, Settings } from "lucide-react";

const OnJobTools = () => {
  const onJobTools = [
    {
      id: 1,
      title: "Electrical Calculations",
      icon: Calculator,
      description: "Cable sizing, load calculations, voltage drop, and more",
      link: "/apprentice/on-job-tools/calculations"
    },
    {
      id: 2,
      title: "Documentation Templates",
      icon: FileText,
      description: "Forms, certificates, and reports for on-site documentation",
      link: "/apprentice/on-job-tools/documents"
    },
    {
      id: 3,
      title: "Site Assessment Tools",
      icon: Settings,
      description: "Checklists and guides for job site evaluations",
      link: "/apprentice/on-job-tools/assessment"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">On the Job Tools</h1>
        <Link to="/apprentice/hub" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apprentice Hub
          </Button>
        </Link>
      </div>

      <OnTheJobToolsBox tools={onJobTools} />
    </div>
  );
};

export default OnJobTools;
