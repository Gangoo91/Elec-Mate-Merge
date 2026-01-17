import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trash2, FileEdit, Send, CheckCircle, XCircle, Clock, Eye, Edit, Calendar, MailOpen, AlertTriangle, Bell } from 'lucide-react';
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
      color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border-slate-200 dark:border-slate-800',
      label: 'Draft',
      icon: FileEdit,
      borderColor: 'border-slate-500/30 border-l-4 border-l-slate-500/60'
    },
    sent: {
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      label: 'Sent',
      icon: Send,
      borderColor: 'border-amber-500/30 border-l-4 border-l-amber-500/60'
    },
    pending: {
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      label: 'Pending',
      icon: Clock,
      borderColor: 'border-amber-500/30 border-l-4 border-l-amber-500/60'
    },
    approved: {
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      label: 'Approved',
      icon: CheckCircle,
      borderColor: 'border-green-500/30 border-l-4 border-l-green-500/60'
    },
    rejected: {
      color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800',
      label: 'Declined',
      icon: XCircle,
      borderColor: 'border-red-500/30 border-l-4 border-l-red-500/60'
    },
  }[quote.status] || {
    color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border-slate-200 dark:border-slate-800',
    label: quote.status,
    icon: FileEdit,
    borderColor: 'border-slate-500/30 border-l-4 border-l-slate-500/60'
  };

  // Use acceptance_status if available
  const finalStatus = quote.acceptance_status === 'accepted'
    ? {
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        label: 'Accepted',
        icon: CheckCircle,
        borderColor: 'border-green-500/30 border-l-4 border-l-green-500/60'
      }
    : quote.acceptance_status === 'rejected'
    ? {
        color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800',
        label: 'Declined',
        icon: XCircle,
        borderColor: 'border-red-500/30 border-l-4 border-l-red-500/60'
      }
    : statusConfig;

  const StatusIcon = finalStatus.icon;

  // Calculate expiry status
  const now = new Date();
  const expiryDate = quote.expiryDate ? new Date(quote.expiryDate) : null;
  const daysUntilExpiry = expiryDate ? Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 3 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry !== null && daysUntilExpiry <= 0;

  // Email tracking
  const hasBeenViewed = !!quote.email_opened_at;
  const viewCount = quote.email_open_count || 0;
  const reminderCount = quote.reminder_count || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay, duration: 0.3 }}
      className="relative"
    >
      {/* Delete action background (revealed on swipe left) */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-end px-6 bg-red-500 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-white" />
          <span className="text-white font-medium">Delete</span>
        </div>
      </div>

      {/* Card Content */}
      <motion.div
        className={cn(
          "relative bg-elec-card rounded-2xl overflow-hidden touch-manipulation cursor-pointer border",
          finalStatus.borderColor
        )}
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
        {/* Header: Quote Number + Status Badge */}
        <div className="flex items-start justify-between p-4 pb-3 border-b border-primary/20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold">
                {quote.quoteNumber || 'Quote'}
              </h3>
              <Badge className={cn('text-xs', finalStatus.color)}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {finalStatus.label}
              </Badge>
              {/* Viewed indicator - only show for sent quotes that haven't been accepted/rejected */}
              {quote.status === 'sent' && quote.acceptance_status === 'pending' && hasBeenViewed && (
                <Badge className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                  <MailOpen className="h-3 w-3 mr-1" />
                  Viewed{viewCount > 1 ? ` (${viewCount})` : ''}
                </Badge>
              )}
              {/* Expiry warning */}
              {quote.status === 'sent' && quote.acceptance_status === 'pending' && isExpiringSoon && (
                <Badge className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {daysUntilExpiry === 1 ? 'Expires Tomorrow' : `${daysUntilExpiry} Days Left`}
                </Badge>
              )}
              {/* Expired indicator */}
              {isExpired && quote.acceptance_status === 'pending' && (
                <Badge className="text-xs bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800">
                  <XCircle className="h-3 w-3 mr-1" />
                  Expired
                </Badge>
              )}
              {/* Reminder sent indicator */}
              {reminderCount > 0 && quote.acceptance_status === 'pending' && (
                <Badge className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                  <Bell className="h-3 w-3 mr-1" />
                  {reminderCount} {reminderCount === 1 ? 'Reminder' : 'Reminders'}
                </Badge>
              )}
            </div>
            {quote.jobDetails?.title && (
              <div className="text-xs text-muted-foreground">
                {quote.jobDetails.title}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="h-8 w-8 flex-shrink-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Client Information */}
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <User className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-muted-foreground mb-0.5">Client</div>
            <div className="text-base font-medium truncate">
              {quote.client?.name || 'Unknown Client'}
            </div>
            {quote.client?.email && (
              <div className="text-xs text-muted-foreground truncate">
                {quote.client.email}
              </div>
            )}
          </div>
        </div>

        {/* Amount Display - Centered */}
        <div className="text-center mx-4 mb-4 py-4 bg-background/40 rounded-lg border border-primary/10">
          <div className="text-sm text-muted-foreground mb-1">Quote Value</div>
          <div className="text-3xl sm:text-4xl font-bold text-elec-yellow">
            £{(quote.total || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* Date Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-4 px-4 mb-4 text-sm">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Created</div>
            <div className="text-foreground font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {quote.createdAt ? format(new Date(quote.createdAt), 'dd MMM yyyy') : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Expires</div>
            <div className="text-foreground font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {quote.expiryDate ? format(new Date(quote.expiryDate), 'dd MMM yyyy') : 'N/A'}
            </div>
          </div>
        </div>

        {/* Action Buttons - 2 columns */}
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
