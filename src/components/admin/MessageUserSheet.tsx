/**
 * MessageUserSheet - Admin component for sending messages to users
 * Supports both email (via Resend) and in-app notifications
 */

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Send,
  Mail,
  Bell,
  Loader2,
  CheckCircle,
  User,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getInitials, getRoleColor } from '@/utils/adminUtils';

interface MessageUserSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    full_name?: string;
    email?: string;
    role?: string;
  } | null;
}

type MessageType = 'email' | 'in_app' | 'both';

export default function MessageUserSheet({ open, onOpenChange, user }: MessageUserSheetProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('both');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!user?.id || !subject.trim() || !message.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Please enter a subject and message',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-admin-message', {
        body: {
          recipientId: user.id,
          subject: subject.trim(),
          message: message.trim(),
          messageType,
        },
      });

      if (error) throw error;

      setSent(true);
      toast({
        title: 'Message sent',
        description: data.emailSent
          ? 'Email and in-app notification sent successfully'
          : 'In-app notification sent successfully',
      });

      // Reset after showing success
      setTimeout(() => {
        setSubject('');
        setMessage('');
        setSent(false);
        onOpenChange(false);
      }, 1500);
    } catch (error: any) {
      console.error('Send error:', error);
      toast({
        title: 'Failed to send',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (!isSending) {
      setSubject('');
      setMessage('');
      setSent(false);
      onOpenChange(false);
    }
  };

  if (!user) return null;

  const roleColors = getRoleColor(user.role);

  const messageTypes: { id: MessageType; label: string; icon: typeof Mail; description: string }[] = [
    { id: 'both', label: 'Both', icon: Send, description: 'Email + In-app' },
    { id: 'email', label: 'Email', icon: Mail, description: 'Send email only' },
    { id: 'in_app', label: 'In-App', icon: Bell, description: 'Notification only' },
  ];

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <SheetTitle className="flex items-center gap-3 text-left">
              <MessageSquare className="h-5 w-5 text-elec-yellow" />
              <span>Message User</span>
            </SheetTitle>
          </SheetHeader>

          {/* Success State */}
          {sent ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
              <p className="text-sm text-muted-foreground text-center">
                Your message has been delivered to {user.full_name || 'the user'}
              </p>
            </div>
          ) : (
            <>
              {/* Recipient Card */}
              <div className="p-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03]">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-bold",
                    roleColors.bg, roleColors.text
                  )}>
                    {getInitials(user.full_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white truncate">{user.full_name || 'Unknown'}</p>
                      {user.role && (
                        <Badge className={cn("text-[10px] capitalize", roleColors.badge)}>
                          {user.role}
                        </Badge>
                      )}
                    </div>
                    {user.email && (
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Type Selector */}
              <div className="p-4 border-b border-white/[0.06]">
                <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                  Delivery Method
                </label>
                <div className="flex gap-2">
                  {messageTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = messageType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setMessageType(type.id)}
                        className={cn(
                          "flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border transition-all touch-manipulation",
                          isSelected
                            ? "bg-elec-yellow/20 border-elec-yellow/50"
                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]"
                        )}
                      >
                        <Icon className={cn(
                          "h-5 w-5",
                          isSelected ? "text-elec-yellow" : "text-muted-foreground"
                        )} />
                        <span className={cn(
                          "text-xs font-medium",
                          isSelected ? "text-elec-yellow" : "text-white"
                        )}>
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Form */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                    Subject
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter message subject..."
                    className="h-12 bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                    Message
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="min-h-[200px] bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/30 resize-none"
                  />
                </div>

                {/* Quick Templates */}
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
                    Quick Templates
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Welcome', subject: 'Welcome to Elec-Mate!', message: "Thanks for joining Elec-Mate! We're excited to have you on board. If you have any questions, don't hesitate to reach out." },
                      { label: 'Feature Update', subject: 'New Feature Available', message: "We've just released a new feature that we think you'll love. Check it out in your dashboard!" },
                      { label: 'Support', subject: 'Following up on your query', message: "Hi! Just following up to see if you need any help with your account or have any questions." },
                    ].map((template) => (
                      <button
                        key={template.label}
                        onClick={() => {
                          setSubject(template.subject);
                          setMessage(template.message);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-xs text-white/70 hover:bg-white/[0.1] touch-manipulation"
                      >
                        {template.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <div className="p-4 border-t border-white/[0.06]">
                <Button
                  onClick={handleSend}
                  disabled={isSending || !subject.trim() || !message.trim()}
                  className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
