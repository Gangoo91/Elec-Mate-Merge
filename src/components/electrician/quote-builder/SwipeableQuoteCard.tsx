import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trash2, FileEdit, Send, CheckCircle, XCircle, MoreVertical, Clock } from 'lucide-react';
import { Quote } from '@/types/quote';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface SwipeableQuoteCardProps {
  quote: Quote;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
  delay?: number;
}

export function SwipeableQuoteCard({
  quote,
  onDelete,
  onEdit,
  onView,
  delay = 0
}: SwipeableQuoteCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const statusConfig = {
    draft: {
      color: 'bg-slate-500',
      label: 'Draft',
      icon: FileEdit,
      textColor: 'text-slate-500'
    },
    sent: {
      color: 'bg-amber-500',
      label: 'Sent',
      icon: Send,
      textColor: 'text-amber-500'
    },
    pending: {
      color: 'bg-amber-500',
      label: 'Pending',
      icon: Clock,
      textColor: 'text-amber-500'
    },
    approved: {
      color: 'bg-green-500',
      label: 'Approved',
      icon: CheckCircle,
      textColor: 'text-green-500'
    },
    rejected: {
      color: 'bg-red-500',
      label: 'Declined',
      icon: XCircle,
      textColor: 'text-red-500'
    },
  }[quote.status] || {
    color: 'bg-slate-500',
    label: quote.status,
    icon: FileEdit,
    textColor: 'text-slate-500'
  };

  // Use acceptance_status if available
  const finalStatus = quote.acceptance_status === 'accepted'
    ? { ...statusConfig, color: 'bg-green-500', label: 'Accepted', icon: CheckCircle, textColor: 'text-green-500' }
    : quote.acceptance_status === 'rejected'
    ? { ...statusConfig, color: 'bg-red-500', label: 'Declined', icon: XCircle, textColor: 'text-red-500' }
    : statusConfig;

  const StatusIcon = finalStatus.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay, duration: 0.3 }}
      className="relative"
    >
      {/* Delete action background (revealed on swipe left) */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-end px-6 bg-red-500 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-white" />
          <span className="text-white font-medium">Delete</span>
        </div>
      </div>

      {/* Card Content */}
      <motion.div
        className="relative bg-card border border-border/30 rounded-xl p-4 touch-manipulation cursor-pointer"
        animate={{ x: swipeOffset }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          if (info.offset.x < -80) {
            onDelete();
          } else {
            setSwipeOffset(0);
          }
        }}
        onClick={() => !isDragging && onView()}
      >
        <div className="flex items-start gap-3">
          {/* Client Avatar */}
          <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 shrink-0">
            <User className="h-5 w-5 text-elec-yellow" />
          </div>

          {/* Quote Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground truncate text-base">
                  {quote.client?.name || 'Unknown Client'}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {quote.jobDetails?.title || 'Electrical Work'}
                </p>
              </div>
              <Badge className={cn('shrink-0 text-white', finalStatus.color)}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {finalStatus.label}
              </Badge>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Quote Value</p>
                <p className="text-lg font-bold text-elec-yellow">
                  £{(quote.total || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="text-sm font-medium">
                  {format(new Date(quote.createdAt), 'dd MMM')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Expires</p>
                <p className="text-sm font-medium">
                  {format(new Date(quote.expiryDate), 'dd MMM')}
                </p>
              </div>
            </div>

            {/* Quote Number */}
            <div className="mt-2 pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                {quote.quoteNumber}
              </p>
            </div>
          </div>

          {/* Quick Actions Button */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-9 w-9"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
