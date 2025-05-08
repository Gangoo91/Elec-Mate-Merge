
import { MessageSquare, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

// Import DirectMessageModal component
import DirectMessageModal from "@/components/chat/DirectMessageModal";

interface TalkToSomeoneProps {
  onShowMentalHealthMates?: () => void;
}

const TalkToSomeone = ({ onShowMentalHealthMates }: TalkToSomeoneProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleRequestCounselor = () => {
    setIsModalOpen(true);
  };
  
  return (
    <>
      <Card className="border-purple-500/20 bg-elec-gray">
        <CardContent className="p-4 flex flex-col h-full">
          <h3 className="text-lg font-medium mb-3">Talk to Someone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Need someone to talk to? Connect with a mental health mate or professional counselor.
          </p>
          <div className="space-y-3 mt-auto">
            <Link to="/messages" state={{ activeTab: 'mental-health' }} className="w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2"
                onClick={onShowMentalHealthMates}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Message a Mental Health Mate</span>
              </Button>
            </Link>
            <Link to="/apprentice/mentor" className="w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2"
              >
                <User className="h-4 w-4" />
                <span>Find a Mentor</span>
              </Button>
            </Link>
            <Button 
              className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2"
              size="sm"
              onClick={handleRequestCounselor}
            >
              <Heart className="h-4 w-4" />
              <span>Request Counselor</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <DirectMessageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipient={{
          id: 'counselor-1',
          name: 'Professional Counselor',
          type: 'mental-health'
        }}
      />
    </>
  );
};

export default TalkToSomeone;
