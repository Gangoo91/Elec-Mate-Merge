import { useState } from 'react';
import { FileWarning, Calendar, Building2, Clock, MoreVertical, MapPin, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge } from './StatusBadge';
import { QuickActionButtons } from './QuickActionButtons';
import { BuildingControlFinder } from './BuildingControlFinder';
import { Notification } from '@/hooks/useNotifications';
import { formatDeadlineStatus, getDeadlineUrgency } from '@/utils/notificationHelper';
import { cn } from '@/lib/utils';

interface NotificationCardProps {
  notification: Notification;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (notification: Notification) => void;
  onViewCertificate: (reportId: string, reportType: string) => void;
  showNiceic?: boolean;
  showNapit?: boolean;
}

const REPORT_TYPE_LABELS = {
  'eicr': 'EICR',
  'eic': 'EIC',
  'minor-works': 'Minor Works',
};

export const NotificationCard = ({
  notification,
  onUpdate,
  onDelete,
  onViewDetails,
  onViewCertificate,
  showNiceic = true,
  showNapit = true,
}: NotificationCardProps) => {
  const [showBuildingControlFinder, setShowBuildingControlFinder] = useState(false);
  const urgency = notification.submission_deadline ? getDeadlineUrgency(notification.submission_deadline) : 'safe';
  const deadlineStatus = notification.submission_deadline ? formatDeadlineStatus(notification.submission_deadline) : null;

  const handleBuildingControlSelect = (authority: string) => {
    onUpdate(notification.id, { 
      building_control_authority: authority,
      local_authority_submitted: true,
    });
  };

  const urgencyStyles = {
    safe: 'border-l-green-500',
    warning: 'border-l-yellow-500',
    urgent: 'border-l-orange-500',
    overdue: 'border-l-red-500',
  };

  return (
    <>
      <Card className={cn('p-3 sm:p-4 border-l-4 hover:shadow-lg transition-shadow', urgencyStyles[urgency])}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <FileWarning className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">
                  {REPORT_TYPE_LABELS[notification.reports?.report_type as keyof typeof REPORT_TYPE_LABELS] || 'Certificate'}
                </span>
                <StatusBadge status={notification.notification_status} />
              </div>
              <button
                onClick={() => onViewCertificate(notification.report_id, notification.reports?.report_type || '')}
                className="text-xs text-muted-foreground hover:text-primary transition-colors break-all text-left"
              >
                {notification.reports?.certificate_number || notification.report_id}
              </button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 sm:h-8 sm:w-8 flex-shrink-0 touch-manipulation"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={() => onViewDetails(notification)}
                className="min-h-[44px] sm:min-h-[36px]"
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(notification.id)} 
                className="text-red-600 min-h-[44px] sm:min-h-[36px]"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Body */}
        <div className="space-y-2 mb-3">
          <div>
            <p className="text-sm font-medium break-words">{notification.work_type}</p>
            {notification.reports?.client_name && (
              <p className="text-xs text-muted-foreground break-words">Client: {notification.reports.client_name}</p>
            )}
            {notification.reports?.installation_address && (
              <p className="text-xs text-muted-foreground break-words">{notification.reports.installation_address}</p>
            )}
          </div>

          {notification.building_control_authority && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="w-3 h-3 flex-shrink-0" />
              <span className="break-words">{notification.building_control_authority}</span>
            </div>
          )}

          {deadlineStatus && (
            <div className={cn(
              'flex items-center gap-2 text-xs font-medium',
              urgency === 'overdue' ? 'text-red-500' : urgency === 'urgent' ? 'text-orange-500' : 'text-muted-foreground'
            )}>
              {urgency === 'overdue' ? <Clock className="w-3 h-3 animate-pulse flex-shrink-0" /> : <Calendar className="w-3 h-3 flex-shrink-0" />}
              <span className="break-words">{deadlineStatus}</span>
            </div>
          )}
        </div>

        {/* Submission Checkboxes */}
        <div className="space-y-3 mb-3 pb-3 border-b">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Tick to record where you've submitted or plan to submit this notification
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            {showNiceic && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label className="flex items-center gap-2 text-xs cursor-pointer touch-manipulation">
                      <Checkbox
                        checked={notification.niceic_submitted}
                        onCheckedChange={(checked) => onUpdate(notification.id, { niceic_submitted: checked })}
                        className="h-6 w-6 sm:h-5 sm:w-5"
                      />
                      <span>NICEIC</span>
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Check when submitted to NICEIC online certification</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {showNapit && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label className="flex items-center gap-2 text-xs cursor-pointer touch-manipulation">
                      <Checkbox
                        checked={notification.napit_submitted}
                        onCheckedChange={(checked) => onUpdate(notification.id, { napit_submitted: checked })}
                        className="h-6 w-6 sm:h-5 sm:w-5"
                      />
                      <span>NAPIT</span>
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Check when submitted to NAPIT Direct portal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="flex items-center gap-2 text-xs cursor-pointer touch-manipulation">
                    <Checkbox
                      checked={notification.local_authority_submitted}
                      onCheckedChange={(checked) => onUpdate(notification.id, { local_authority_submitted: checked })}
                      className="h-6 w-6 sm:h-5 sm:w-5"
                    />
                    <span>Local Authority</span>
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Check when submitted directly to local building control</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Building Control Finder Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBuildingControlFinder(true)}
            className="w-full sm:w-auto min-h-[44px] sm:min-h-[36px]"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Find Building Control Office
          </Button>
        </div>

        {/* Quick Actions */}
        <QuickActionButtons
          notificationId={notification.id}
          reportId={notification.report_id}
          napitSubmitted={notification.napit_submitted}
          niceicSubmitted={notification.niceic_submitted}
          onUpdate={onUpdate}
          onViewCertificate={() => onViewCertificate(notification.report_id, notification.reports?.report_type || '')}
          showNiceic={showNiceic}
          showNapit={showNapit}
        />
      </Card>

      {/* Building Control Finder Dialog */}
      <BuildingControlFinder
        open={showBuildingControlFinder}
        onOpenChange={setShowBuildingControlFinder}
        onSelect={handleBuildingControlSelect}
        initialAddress={notification.reports?.installation_address || ''}
      />
    </>
  );
};
