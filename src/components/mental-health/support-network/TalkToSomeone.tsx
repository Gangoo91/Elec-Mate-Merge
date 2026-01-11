import { useState } from "react";
import { MessageSquare, User, Heart, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const TalkToSomeone = () => {
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);

  const handleCounselorRequest = () => {
    setIsRequestSubmitted(true);
    toast.success("A counselor will contact you within 24 hours", {
      description: "For immediate support, call Samaritans at 116 123"
    });
  };

  return (
    <div className="space-y-4">
      {/* Emergency Banner - Samaritans */}
      <Card className="border-red-500/50 bg-gradient-to-br from-red-600/20 to-red-500/10 shadow-lg shadow-red-500/10 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0 animate-pulse">
              <PhoneCall className="h-7 w-7 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-red-400 mb-0.5">Need to Talk Now?</h2>
              <p className="text-sm text-foreground/80">Free, confidential support 24/7</p>
            </div>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white flex-shrink-0 h-12 px-5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <a href="tel:116123">
                <PhoneCall className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">Call</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2x2 Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Message a Mate - Blue */}
        <Link to="/electrician/mental-health" className="block">
          <div className="p-4 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/10
            touch-manipulation active:scale-[0.98] transition-all duration-300 min-h-[100px] flex flex-col">
            <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center mb-2">
              <MessageSquare className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-sm font-medium text-foreground">Message a Mate</div>
            <div className="text-xs text-white/70">Connect with peers</div>
          </div>
        </Link>

        {/* Find a Mentor - Emerald */}
        <Link to="/apprentice/mentor" className="block">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10
            touch-manipulation active:scale-[0.98] transition-all duration-300 min-h-[100px] flex flex-col">
            <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center mb-2">
              <User className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="text-sm font-medium text-foreground">Find a Mentor</div>
            <div className="text-xs text-white/70">Industry guidance</div>
          </div>
        </Link>

        {/* Request Counselor - Purple */}
        <button
          onClick={handleCounselorRequest}
          disabled={isRequestSubmitted}
          className="text-left w-full"
        >
          <div className={`p-4 rounded-xl border transition-all duration-300 min-h-[100px] flex flex-col
            touch-manipulation active:scale-[0.98]
            ${isRequestSubmitted
              ? 'border-purple-500/50 bg-purple-500/20'
              : 'border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/10'
            }`}>
            <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center mb-2">
              <Heart className={`h-6 w-6 ${isRequestSubmitted ? 'text-purple-300' : 'text-purple-400'}`} />
            </div>
            <div className="text-sm font-medium text-foreground">
              {isRequestSubmitted ? 'Request Sent' : 'Request Counselor'}
            </div>
            <div className="text-xs text-white/70">
              {isRequestSubmitted ? 'We\'ll contact you soon' : 'Professional support'}
            </div>
          </div>
        </button>

        {/* Text SHOUT - Green */}
        <a href="sms:85258?body=SHOUT" className="block">
          <div className="p-4 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/10
            touch-manipulation active:scale-[0.98] transition-all duration-300 min-h-[100px] flex flex-col">
            <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center mb-2">
              <MessageSquare className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-sm font-medium text-foreground">Text SHOUT</div>
            <div className="text-xs text-white/70">85258 - Free 24/7</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default TalkToSomeone;
