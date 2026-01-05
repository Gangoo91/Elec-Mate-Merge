import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Wrench, HelpCircle, ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

interface CommissioningChatProps {
  response: string;
  queryType: 'troubleshooting' | 'question' | 'photo-analysis';
  citations: any[];
  onStartOver: () => void;
  onAskFollowUp: (query: string) => void;
}

const CommissioningChat = ({
  response,
  queryType,
  citations,
  onStartOver,
  onAskFollowUp
}: CommissioningChatProps) => {
  const [followUpQuery, setFollowUpQuery] = useState("");

  const handleFollowUpSubmit = () => {
    if (followUpQuery.trim()) {
      onAskFollowUp(followUpQuery);
      setFollowUpQuery("");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button 
        onClick={onStartOver} 
        variant="outline" 
        size="sm" 
        className="gap-2 touch-manipulation h-10"
      >
        <ArrowLeft className="h-4 w-4" /> New Query
      </Button>

      {/* Mode Indicator */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/30">
        <div className="flex items-center gap-3">
          {queryType === 'troubleshooting' ? (
            <>
              <Wrench className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-purple-300 text-base sm:text-lg">Troubleshooting Mode</h3>
                <p className="text-xs sm:text-sm text-foreground">Diagnostic advice and fault-finding guidance</p>
              </div>
            </>
          ) : (
            <>
              <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-purple-300 text-base sm:text-lg">Question & Answer Mode</h3>
                <p className="text-xs sm:text-sm text-foreground">Quick reference and clarification</p>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* AI Response */}
      <Card className="p-4 sm:p-6 bg-card border-border">
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>

        {/* Citations */}
        {citations && citations.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">
              📚 Referenced Regulations ({citations.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {citations.slice(0, 6).map((citation: any, idx: number) => (
                <div 
                  key={idx} 
                  className="text-xs bg-muted/50 p-2 rounded border border-border"
                >
                  <span className="font-mono text-purple-400">
                    {citation.regulation_number || citation.topic || `Source ${idx + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Follow-Up Question Input */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="h-5 w-5 text-purple-400" />
          <h4 className="font-semibold text-sm sm:text-base">Ask a Follow-Up Question</h4>
        </div>
        <div className="flex flex-col gap-2">
          <Textarea
            value={followUpQuery}
            onChange={(e) => setFollowUpQuery(e.target.value)}
            placeholder="e.g., What if the reading is still high after checking terminals?"
            className="min-h-[80px] resize-none text-sm sm:text-base"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleFollowUpSubmit();
              }
            }}
          />
          <Button 
            onClick={handleFollowUpSubmit}
            disabled={!followUpQuery.trim()}
            className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 h-10 sm:h-11"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4 sm:p-6 bg-muted/30">
        <h4 className="text-sm font-semibold mb-3">Need a full procedure instead?</h4>
        <p className="text-xs text-foreground mb-3">
          For structured testing procedures with step-by-step guides, use a detailed request.
        </p>
        <Button 
          onClick={onStartOver}
          variant="outline"
          className="w-full h-10"
        >
          Generate Full Testing Procedure
        </Button>
      </Card>
    </div>
  );
};

export default CommissioningChat;
