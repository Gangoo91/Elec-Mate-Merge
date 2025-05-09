
import { MessageSquare, User, Heart, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const TalkToSomeone = () => {
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);

  const handleCounselorRequest = () => {
    setIsRequestSubmitted(true);
    toast.success("A counselor will contact you within 24 hours", {
      description: "For immediate support, call Samaritans at 116 123"
    });
  };

  return (
    <Card className="border-purple-500/20 bg-elec-gray">
      <CardContent className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-medium mb-3">Talk to Someone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Need someone to talk to? Connect with a mental health mate, professional counselor, or immediate support line.
        </p>
        <div className="space-y-3 mt-auto">
          <Link to="/messages" className="w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Message a Mate</span>
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
          {!isRequestSubmitted ? (
            <Button 
              className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2"
              size="sm"
              onClick={handleCounselorRequest}
            >
              <Heart className="h-4 w-4" />
              <span>Request Counselor</span>
            </Button>
          ) : (
            <div className="text-center py-2 px-1 bg-purple-500/10 rounded-md">
              <p className="text-purple-400 text-xs">Counselor request submitted</p>
            </div>
          )}
          <a href="tel:116123" className="w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 border-red-500/30 hover:bg-red-500/10 text-red-400"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Call Samaritans: 116 123</span>
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalkToSomeone;
