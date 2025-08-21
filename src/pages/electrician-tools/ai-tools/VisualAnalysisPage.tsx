import VisualAnalysis from "@/components/electrician-tools/ai-tools/VisualAnalysis";
import AIToolingHeader from "@/components/electrician-tools/ai-tools/AIToolingHeader";

const VisualAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-8">
        <AIToolingHeader />
        <VisualAnalysis />
      </div>
    </div>
  );
};

export default VisualAnalysisPage;