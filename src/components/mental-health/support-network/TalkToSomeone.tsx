import { useState } from 'react';
import { MessageSquare, User, Heart, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const TalkToSomeone = () => {
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);

  const handleCounselorRequest = () => {
    setIsRequestSubmitted(true);
    toast.success('A counselor will contact you within 24 hours', {
      description: 'For immediate support, call Samaritans at 116 123',
    });
  };

  return (
    <div className="space-y-4">
      {/* Emergency Banner - Samaritans */}
      <Card className="border-white/[0.06] bg-white/[0.02] shadow-lg shadow-red-500/10 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/[0.02] flex items-center justify-center flex-shrink-0 animate-pulse">
              <PhoneCall className="h-7 w-7 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-red-400 mb-0.5">Need to Talk Now?</h2>
              <p className="text-sm text-white">Free, confidential support 24/7</p>
            </div>
            <Button
              className="bg-white/[0.02] hover:bg-white/[0.02] text-white flex-shrink-0 h-12 px-5 touch-manipulation active:scale-[0.98]"
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
          <div
            className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] touch-manipulation active:scale-[0.98] transition-all duration-300 min-h-[100px] flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center mb-2">
              <MessageSquare className="h-6 w-6 text-white/85" />
            </div>
            <div className="text-sm font-medium text-white">Message a Mate</div>
            <div className="text-xs text-white">Connect with peers</div>
          </div>
        </Link>

        {/* Find a Mentor - Emerald */}
        <Link to="/apprentice/mentor" className="block">
          <div
            className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] touch-manipulation active:scale-[0.98] transition-all duration-300 min-h-[100px] flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center mb-2">
              <User className="h-6 w-6 text-white/85" />
            </div>
            <div className="text-sm font-medium text-white">Find a Mentor</div>
            <div className="text-xs text-white">Industry guidance</div>
          </div>
        </Link>

        {/* Request Counselor - Purple */}
        <button
          onClick={handleCounselorRequest}
          disabled={isRequestSubmitted}
          className="text-left w-full"
        >
          <div
            className={`p-4 rounded-xl border transition-all duration-300 min-h-[100px] flex flex-col
            touch-manipulation active:scale-[0.98]
            ${
              isRequestSubmitted
                ? 'border-white/[0.06] bg-white/[0.02]'
                : 'border-white/[0.06] bg-white/[0.02]'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center mb-2">
              <Heart
                className={`h-6 w-6 ${isRequestSubmitted ? 'text-white/85' : 'text-white/85'}`}
              />
            </div>
            <div className="text-sm font-medium text-white">
              {isRequestSubmitted ? 'Request Sent' : 'Request Counselor'}
            </div>
            <div className="text-xs text-white">
              {isRequestSubmitted ? "We'll contact you soon" : 'Professional support'}
            </div>
          </div>
        </button>

        {/* Text SHOUT - Green */}
        <a href="sms:85258?body=SHOUT" className="block">
          <div
            className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] touch-manipulation active:scale-[0.98] transition-all duration-300 min-h-[100px] flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center mb-2">
              <MessageSquare className="h-6 w-6 text-white/85" />
            </div>
            <div className="text-sm font-medium text-white">Text SHOUT</div>
            <div className="text-xs text-white">85258 - Free 24/7</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default TalkToSomeone;
