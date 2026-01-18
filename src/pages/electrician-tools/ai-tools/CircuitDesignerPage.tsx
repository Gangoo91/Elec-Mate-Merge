import { ArrowLeft, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CircuitDesigner from "@/components/electrician-tools/ai-tools/CircuitDesigner";

const CircuitDesignerPage = () => {
  return (
    <div className="bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 ">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Cpu className="h-6 w-6 sm:h-7 sm:w-7 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Circuit Designer
              </h1>
              <p className="text-sm text-white/60">AI-powered circuit design assistant</p>
            </div>
          </div>
          <Link to="/electrician-tools/ai-tooling">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to AI Tools
            </Button>
          </Link>
        </header>

        {/* Content */}
        <CircuitDesigner />
      </main>
    </div>
  );
};

export default CircuitDesignerPage;