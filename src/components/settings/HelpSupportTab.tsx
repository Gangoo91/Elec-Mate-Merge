import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { cn } from '@/lib/utils';
import SupportTicketForm from "@/components/support/SupportTicketForm";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Mail,
  ExternalLink,
  Search,
  Phone,
  Clock,
  Send,
  ChevronRight,
  BookOpen,
  Video,
  Sparkles,
  Loader2,
  Headphones,
  MessagesSquare,
} from "lucide-react";

const HelpSupportTab = () => {
  const { addNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to Settings > Security > Password and click "Change Password". You can also request a password reset from the login page by clicking "Forgot Password".'
    },
    {
      question: 'How do I track my learning hours?',
      answer: 'Your learning hours are automatically tracked when you complete courses and modules. View your progress in the Learning Hub dashboard or check your Elec-ID profile for a complete history.'
    },
    {
      question: 'What subscription options are available?',
      answer: 'We offer Free, Pro, and Enterprise plans. Each tier provides different features - visit the Billing tab or our pricing page to compare all options and choose what works best for you.'
    },
    {
      question: 'How do I contact my mentor?',
      answer: 'You can message your mentor directly through the Mentorship section. If you haven\'t been assigned a mentor yet, visit the Mentorship Hub to browse and connect with available mentors.'
    },
    {
      question: 'How do I export my certificates?',
      answer: 'Go to your Elec-ID tab, navigate to the Share section, and use the PDF export feature. You can select which information to include and customize the document format.'
    },
  ];

  const resources = [
    {
      title: 'User Guide',
      description: 'Complete documentation for all features',
      icon: BookOpen,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video walkthroughs',
      icon: Video,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Release Notes',
      description: 'Latest updates and new features',
      icon: Sparkles,
      iconColor: 'text-elec-yellow',
      bgColor: 'bg-elec-yellow/10',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addNotification({
        title: 'Searching Help Center',
        message: `Looking for results matching: "${searchQuery}"`,
        type: 'info'
      });
    }
  };

  const handleSendFeedback = async () => {
    if (!feedbackText.trim()) {
      addNotification({
        title: 'Feedback Required',
        message: 'Please enter your feedback before submitting',
        type: 'info'
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setFeedbackText('');
    addNotification({
      title: 'Feedback Sent',
      message: 'Thank you for your feedback! We appreciate your input.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
              <Headphones className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Help & Support</h3>
              <p className="text-sm text-muted-foreground">
                Find answers or get in touch with our team
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch}>
            <div className="relative">
              {!searchQuery && (
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              )}
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("h-12 pr-24 bg-white/5 border-white/10 text-base touch-manipulation", !searchQuery ? "pl-12" : "pl-4")}
                placeholder="Search for help topics..."
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 touch-manipulation active:scale-[0.98] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-elec-yellow" />
            Frequently Asked Questions
          </h3>
        </div>
        <div className="p-4 md:p-6 space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg bg-white/5 border border-white/10 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-4 min-h-[56px] text-left hover:bg-white/5 transition-colors touch-manipulation active:bg-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{faq.question}</span>
                </div>
                <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                  expandedFaq === index ? 'rotate-90' : ''
                }`} />
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="pl-11">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground">Contact Support</h3>
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Live Chat */}
            <button className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center touch-manipulation active:scale-[0.98]">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <MessagesSquare className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Live Chat</p>
                <p className="text-xs text-muted-foreground mt-1">Available 9am - 5pm GMT</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </span>
            </button>

            {/* Email Support */}
            <button className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center touch-manipulation active:scale-[0.98]">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email Support</p>
                <p className="text-xs text-muted-foreground mt-1">support@elec-mate.com</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                24-48hr response
              </span>
            </button>

            {/* Phone Support */}
            <button className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center sm:col-span-2 lg:col-span-1 touch-manipulation active:scale-[0.98]">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Phone Support</p>
                <p className="text-xs text-muted-foreground mt-1">Pro & Enterprise only</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                Mon-Fri 9am-5pm
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <SupportTicketForm />
        </div>
      </div>

      {/* Resources */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-elec-yellow" />
            Documentation & Resources
          </h3>
        </div>
        <div className="p-4 md:p-6 space-y-2">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left touch-manipulation active:bg-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${resource.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${resource.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{resource.title}</p>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-elec-yellow" />
            Send Feedback
          </h3>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Help us improve ElecMate by sharing your thoughts, suggestions, or reporting issues.
          </p>
          <Textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="min-h-[100px] bg-white/5 border-white/10 resize-none text-base touch-manipulation"
            placeholder="What would you like to tell us?"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSendFeedback}
              className="h-11 touch-manipulation active:scale-[0.98] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportTab;
