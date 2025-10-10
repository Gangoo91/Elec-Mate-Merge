import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Flag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FeedbackModal } from "./FeedbackModal";

interface AgentFeedbackButtonsProps {
  agentId: string;
  agentName: string;
  question: string;
  response: string;
  structuredData?: any;
  conversationId?: string;
}

export const AgentFeedbackButtons = ({
  agentId,
  agentName,
  question,
  response,
  structuredData,
  conversationId
}: AgentFeedbackButtonsProps) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const submitFeedback = async (rating: number, correction?: string) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be signed in to provide feedback");
        return;
      }

      const { error } = await supabase
        .from('ai_interaction_feedback')
        .insert({
          user_id: user.id,
          conversation_id: conversationId,
          agent_name: agentId,
          question,
          ai_response: response,
          structured_data: structuredData || {},
          user_rating: rating,
          user_correction: correction,
          feedback_type: correction ? 'correction' : 'rating'
        });

      if (error) throw error;

      setUserRating(rating);
      toast.success(rating === 1 ? "Thanks for your feedback! 👍" : "Feedback recorded, we'll improve this");
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThumbsUp = () => {
    if (userRating !== 1) {
      submitFeedback(1);
    }
  };

  const handleThumbsDown = () => {
    if (userRating !== -1) {
      setShowReportModal(true);
    }
  };

  const handleReportSubmit = (correction: string) => {
    submitFeedback(-1, correction);
    setShowReportModal(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 pt-3 border-t border-border/30 mt-4">
        <span className="text-xs text-muted-foreground mr-2">Was this helpful?</span>
        <Button
          size="sm"
          variant={userRating === 1 ? "default" : "ghost"}
          onClick={handleThumbsUp}
          disabled={isSubmitting || userRating !== null}
          className="h-7 text-xs"
        >
          <ThumbsUp className="h-3 w-3 mr-1" />
          Helpful
        </Button>
        <Button
          size="sm"
          variant={userRating === -1 ? "destructive" : "ghost"}
          onClick={handleThumbsDown}
          disabled={isSubmitting || userRating !== null}
          className="h-7 text-xs"
        >
          <ThumbsDown className="h-3 w-3 mr-1" />
          Not Helpful
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowReportModal(true)}
          disabled={isSubmitting}
          className="h-7 text-xs ml-auto"
        >
          <Flag className="h-3 w-3 mr-1" />
          Report Issue
        </Button>
      </div>

      <FeedbackModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
        agentName={agentName}
      />
    </>
  );
};
