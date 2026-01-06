import { ArrowLeft, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConversationalSearch from "@/components/electrician-tools/ai-tools/ConversationalSearch";

const AssistantPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <button
            onClick={() => navigate('/electrician-tools/ai-tooling')}
            className="flex items-center gap-2 text-white active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">AI Tools</span>
          </button>
        </div>
      </div>

      <main className="px-4 py-4 space-y-5">
        {/* Hero Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/20">
            <MessageSquare className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Assistant</h1>
            <p className="text-sm text-white/50">Conversational electrical support</p>
          </div>
        </div>

        {/* Content */}
        <ConversationalSearch />
      </main>
    </div>
  );
};

export default AssistantPage;