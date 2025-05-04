
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, ArrowLeft } from "lucide-react";

const ElectricalChat = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-elec-yellow" />
            Electrical Chat
          </h1>
          <p className="text-muted-foreground">
            Connect with other electricians and share knowledge
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <div className="border p-6 rounded-lg bg-elec-gray border-elec-yellow/20">
          <h2 className="text-xl font-medium mb-4">Community Discussion</h2>
          <p className="mb-4">
            Welcome to the Electrical Chat community! This is a space where professional electricians 
            can connect, share knowledge, and discuss industry topics. Whether you're looking for advice 
            on a challenging installation, want to share a clever solution you've discovered, or simply 
            catch up with colleagues across the industry, you'll find valuable connections here.
          </p>
          <p className="mb-4">
            Our community is organized into discussion topics to make it easy to find the 
            conversations most relevant to your interests:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Technical Questions & Solutions</li>
            <li>Industry News & Regulations</li>
            <li>Tools & Equipment Reviews</li>
            <li>Apprentice Support Network</li>
            <li>Business Development for Contractors</li>
          </ul>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-6">
            <p className="font-medium">Coming Soon:</p>
            <p>Chat functionality is currently in development and will be available in the next update.</p>
          </div>
          <Link to="/electrician/toolbox-talk">
            <Button variant="default">Return to Toolbox</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ElectricalChat;
