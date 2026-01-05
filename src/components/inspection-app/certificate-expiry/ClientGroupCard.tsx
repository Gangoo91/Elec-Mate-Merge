import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Building2, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { ClientGroup } from '@/types/expiryTypes';
import { getExpiryColorClasses, formatRevenue } from '@/utils/expiryHelper';
import { format, parseISO } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ClientGroupCardProps {
  group: ClientGroup;
  onSelectReminder: (reminderId: string) => void;
  selectedIds: Set<string>;
  children?: React.ReactNode;
}

export const ClientGroupCard = ({ 
  group, 
  onSelectReminder, 
  selectedIds,
  children 
}: ClientGroupCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const urgencyClasses = getExpiryColorClasses(group.urgency);
  const urgencyBadgeClass = `${urgencyClasses.badge}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Building2 className="h-5 w-5 text-muted-foreground shrink-0" />
              <h3 className="text-base sm:text-lg font-semibold break-words">{group.clientName || 'Unnamed Client'}</h3>
              <Badge variant="outline" className={urgencyBadgeClass}>
                {group.propertyCount} {group.propertyCount === 1 ? 'Property' : 'Properties'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Earliest: {format(parseISO(group.earliestExpiry), 'dd MMM yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium text-foreground">
                  {formatRevenue(group.totalRevenue)} potential
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size={isMobile ? "default" : "sm"}
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "shrink-0",
              isMobile && "min-h-[44px] min-w-[44px] p-2"
            )}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isMobile ? (
              isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />
            ) : (
              <>
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Expand
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3 pt-0">
          {group.reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="border rounded-lg p-3 space-y-2 bg-card"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.has(reminder.id)}
                  onChange={() => onSelectReminder(reminder.id)}
                  className={cn(
                    "mt-1 rounded border-border cursor-pointer",
                    isMobile ? "h-6 w-6 min-h-[24px] min-w-[24px]" : "h-4 w-4"
                  )}
                  aria-label={`Select reminder ${reminder.certificate_number}`}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{reminder.certificate_number}</span>
                    <Badge variant="outline" className="text-xs">
                      {reminder.reminder_status}
                    </Badge>
                  </div>
                  {reminder.installation_address && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {reminder.installation_address}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Expires: {format(parseISO(reminder.expiry_date), 'dd MMM yyyy')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};
