import { Button } from "@/components/ui/button";
import { ArrowLeft, Clipboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AIMethodStatementGenerator } from "@/components/electrician-tools/method-statement/AIMethodStatementGenerator";

const AIMethodStatementPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="bg-elec-dark  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Back Button */}
          <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
            <Button variant="outline" className="gap-2 touch-manipulation h-11 active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" /> {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <Clipboard className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400" />
              Method Statement Generator
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Step-by-step procedures with integrated risk assessment
            </p>
          </div>

          {/* Main Content */}
          <AIMethodStatementGenerator />
        </div>
      </div>
    </div>
  );
};

export default AIMethodStatementPage;
