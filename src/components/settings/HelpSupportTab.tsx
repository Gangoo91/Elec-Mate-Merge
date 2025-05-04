
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  Mail, 
  ExternalLink,
  Search
} from "lucide-react";

const HelpSupportTab = () => {
  const { addNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSendFeedback = () => {
    addNotification({
      title: 'Feedback Sent',
      message: 'Thank you for your feedback!',
      type: 'success'
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      title: 'Searching Help Center',
      message: `Searching for: ${searchQuery}`,
      type: 'info'
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-2">
        <label className="text-sm font-medium">Search Help Center</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-elec-gray/80 border-elec-yellow/20"
              placeholder="Search for help topics..."
            />
          </div>
          <Button type="submit" variant="secondary" size="sm" className="h-10">
            Search
          </Button>
        </div>
      </form>

      <Separator className="my-4" />
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Common Questions</h3>
        <div className="space-y-2">
          {[
            'How do I reset my password?',
            'How to track learning hours?',
            'What are the subscription options?',
            'How to contact my mentor?'
          ].map((question, index) => (
            <div key={index} className="p-3 border border-elec-yellow/20 rounded-md hover:bg-elec-yellow/5 transition-colors cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm">{question}</span>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Contact Support</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            <span className="text-sm">Chat Support</span>
            <span className="text-xs text-muted-foreground">Available 9am-5pm</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <Mail className="h-5 w-5 text-elec-yellow" />
            <span className="text-sm">Email Support</span>
            <span className="text-xs text-muted-foreground">24-48hr response</span>
          </Button>
        </div>
      </div>

      <Separator className="my-4" />
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Documentation & Resources</h3>
        <div className="grid grid-cols-1 gap-2">
          {[
            { title: 'User Guide', icon: FileText },
            { title: 'Video Tutorials', icon: MessageSquare },
            { title: 'FAQ', icon: HelpCircle },
          ].map((item, index) => (
            <Button key={index} variant="outline" className="justify-start w-full">
              <item.icon className="h-4 w-4 mr-2 text-elec-yellow" />
              {item.title}
            </Button>
          ))}
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Send Feedback</label>
        <p className="text-xs text-muted-foreground">
          Help us improve ElecMate by sharing your thoughts
        </p>
        <Button 
          onClick={handleSendFeedback} 
          className="w-full" 
          variant="secondary"
        >
          Share Feedback
        </Button>
      </div>
    </div>
  );
};

export default HelpSupportTab;
