import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConversationalSearch from "@/components/electrician-tools/ai-tools/ConversationalSearch";

const AssistantPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      {/* Minimal header - just back button */}
      <header className="shrink-0 px-4 py-2 pt-safe border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <button
          onClick={() => navigate('/electrician-tools/ai-tooling')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm">Back</span>
        </button>
      </header>

      {/* Chat fills remaining space - single scroll container */}
      <main className="flex-1 min-h-0 overflow-hidden">
        <ConversationalSearch />
      </main>
    </div>
  );
};

export default AssistantPage;