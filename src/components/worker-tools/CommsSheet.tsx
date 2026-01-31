/**
 * CommsSheet
 *
 * Bottom sheet for workers to view and acknowledge team communications.
 * Shows messages, alerts, and announcements from the employer.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  MessageSquare,
  X,
  ChevronLeft,
  Loader2,
  Bell,
  AlertTriangle,
  Megaphone,
  Pin,
  Check,
  CheckCheck,
  ChevronRight,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { Communication, CommunicationPriority, CommunicationType } from '@/services/communicationService';

type CommsStep = 'list' | 'detail';

const getPriorityBadge = (priority: CommunicationPriority) => {
  switch (priority) {
    case 'urgent':
      return <Badge className="bg-red-500/20 text-red-400 border-0 text-[10px]">Urgent</Badge>;
    case 'high':
      return <Badge className="bg-amber-500/20 text-amber-400 border-0 text-[10px]">High</Badge>;
    case 'normal':
      return null;
    case 'low':
      return null;
    default:
      return null;
  }
};

const getTypeIcon = (type: CommunicationType) => {
  switch (type) {
    case 'announcement':
      return Megaphone;
    case 'alert':
      return AlertTriangle;
    case 'message':
    default:
      return MessageSquare;
  }
};

const getTypeColour = (type: CommunicationType, priority: CommunicationPriority) => {
  if (priority === 'urgent') return 'text-red-400 bg-red-500/10';
  if (priority === 'high') return 'text-amber-400 bg-amber-500/10';

  switch (type) {
    case 'announcement':
      return 'text-elec-yellow bg-elec-yellow/10';
    case 'alert':
      return 'text-amber-400 bg-amber-500/10';
    case 'message':
    default:
      return 'text-blue-400 bg-blue-500/10';
  }
};

interface CommsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommsSheet({ open, onOpenChange }: CommsSheetProps) {
  const {
    employee,
    employeeId,
    communications,
    unreadCount,
    isLoadingComms,
    markAsRead,
    acknowledgeMessage,
  } = useWorkerSelfService();

  const [step, setStep] = useState<CommsStep>('list');
  const [selectedComm, setSelectedComm] = useState<(Communication & { recipient: { read_at: string | null; acknowledged_at: string | null } }) | null>(null);
  const [isAcknowledging, setIsAcknowledging] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation
    setTimeout(() => {
      setStep('list');
      setSelectedComm(null);
    }, 300);
  };

  const handleSelectComm = async (comm: Communication & { recipient: { read_at: string | null; acknowledged_at: string | null } }) => {
    setSelectedComm(comm);
    setStep('detail');

    // Mark as read if not already
    if (!comm.recipient.read_at && employeeId) {
      try {
        await markAsRead.mutateAsync({
          communicationId: comm.id,
          employeeId,
        });
      } catch {
        // Silent fail for read marking
      }
    }
  };

  const handleAcknowledge = async () => {
    if (!selectedComm || !employeeId) return;

    setIsAcknowledging(true);
    try {
      await acknowledgeMessage.mutateAsync({
        communicationId: selectedComm.id,
        employeeId,
      });
      toast.success('Message acknowledged');
      setSelectedComm(prev => prev ? {
        ...prev,
        recipient: { ...prev.recipient, acknowledged_at: new Date().toISOString() },
      } : null);
    } catch {
      toast.error('Failed to acknowledge message');
    } finally {
      setIsAcknowledging(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'list':
        return 'Team Comms';
      case 'detail':
        return selectedComm?.title || 'Message';
      default:
        return 'Team Comms';
    }
  };

  const canGoBack = step !== 'list';

  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              {canGoBack ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep('list')}
                  className="h-10 w-10 touch-manipulation"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              ) : (
                <div className="w-10" />
              )}
              <SheetTitle className="text-lg font-semibold flex-1 text-center truncate px-2">
                {getStepTitle()}
              </SheetTitle>
              <SheetDescription className="sr-only">
                View team communications and announcements
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {/* Step: List */}
              {step === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full"
                >
                  {/* Unread count header */}
                  {unreadCount > 0 && (
                    <div className="p-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2 text-elec-yellow">
                        <Bell className="h-4 w-4" />
                        <p className="text-sm font-medium">
                          {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  )}

                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-2">
                      {isLoadingComms && (
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                        </div>
                      )}

                      {!isLoadingComms && communications.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 rounded-2xl bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="h-8 w-8 text-elec-yellow" />
                          </div>
                          <p className="text-white/60">No messages yet</p>
                          <p className="text-sm text-white/40 mt-1">
                            Team updates will appear here
                          </p>
                        </div>
                      )}

                      {communications.map((comm) => {
                        const Icon = getTypeIcon(comm.type);
                        const colourClass = getTypeColour(comm.type, comm.priority);
                        const isUnread = !comm.recipient.read_at;
                        const needsAck = comm.priority === 'urgent' || comm.priority === 'high';
                        const isAcked = !!comm.recipient.acknowledged_at;

                        return (
                          <button
                            key={comm.id}
                            onClick={() => handleSelectComm(comm)}
                            className={cn(
                              'w-full p-4 rounded-xl border transition-all touch-manipulation text-left',
                              isUnread
                                ? 'bg-elec-yellow/5 border-elec-yellow/30'
                                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn('p-2 rounded-lg flex-shrink-0', colourClass.split(' ')[1])}>
                                <Icon className={cn('h-4 w-4', colourClass.split(' ')[0])} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  {comm.is_pinned && (
                                    <Pin className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                                  )}
                                  <p className={cn(
                                    'text-sm font-medium truncate',
                                    isUnread ? 'text-white' : 'text-white/80'
                                  )}>
                                    {comm.title}
                                  </p>
                                  {getPriorityBadge(comm.priority)}
                                </div>

                                <p className="text-xs text-white/50 line-clamp-2 mb-2">
                                  {comm.content}
                                </p>

                                <div className="flex items-center justify-between">
                                  <p className="text-[10px] text-white/40">
                                    {formatDistanceToNow(parseISO(comm.created_at), { addSuffix: true })}
                                  </p>

                                  <div className="flex items-center gap-1">
                                    {needsAck && (
                                      isAcked ? (
                                        <CheckCheck className="h-3.5 w-3.5 text-green-400" />
                                      ) : (
                                        <Badge className="bg-amber-500/20 text-amber-400 border-0 text-[9px] px-1.5">
                                          Needs Ack
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>

                              <ChevronRight className="h-4 w-4 text-white/30 flex-shrink-0" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}

              {/* Step: Detail */}
              {step === 'detail' && selectedComm && (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full flex flex-col"
                >
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                      {/* Type and priority badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={cn(
                          'border-0 capitalize',
                          getTypeColour(selectedComm.type, selectedComm.priority).replace('text-', 'bg-').replace('bg-', 'text-').split(' ').map((c, i) => i === 0 ? c.replace('text', 'bg') + '/20' : c).join(' ')
                        )}>
                          {selectedComm.type}
                        </Badge>
                        {getPriorityBadge(selectedComm.priority)}
                        {selectedComm.is_pinned && (
                          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0">
                            <Pin className="h-3 w-3 mr-1" />
                            Pinned
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-semibold text-white">
                        {selectedComm.title}
                      </h2>

                      {/* Meta */}
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <p>
                          {formatDistanceToNow(parseISO(selectedComm.created_at), { addSuffix: true })}
                        </p>
                        {selectedComm.recipient.read_at && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1 text-green-400">
                              <Check className="h-3 w-3" />
                              Read
                            </span>
                          </>
                        )}
                        {selectedComm.recipient.acknowledged_at && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1 text-green-400">
                              <CheckCheck className="h-3 w-3" />
                              Acknowledged
                            </span>
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
                          {selectedComm.content}
                        </p>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Acknowledge footer */}
                  {(selectedComm.priority === 'urgent' || selectedComm.priority === 'high') && !selectedComm.recipient.acknowledged_at && (
                    <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
                      <Button
                        onClick={handleAcknowledge}
                        disabled={isAcknowledging}
                        className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
                      >
                        {isAcknowledging ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Acknowledging...
                          </>
                        ) : (
                          <>
                            <CheckCheck className="h-5 w-5 mr-2" />
                            Acknowledge Message
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
