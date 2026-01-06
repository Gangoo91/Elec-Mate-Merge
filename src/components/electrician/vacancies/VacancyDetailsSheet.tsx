import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Building2,
  Clock,
  PoundSterling,
  MessageSquare,
  Send,
  Briefcase,
  Calendar,
  Eye,
  CheckCircle2,
  Star,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import type { InternalVacancy } from "./InternalVacancyCard";

interface VacancyDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: InternalVacancy | null;
  onApply: (vacancy: InternalVacancy) => void;
  onMessage: (vacancy: InternalVacancy) => void;
}

export function VacancyDetailsSheet({
  open,
  onOpenChange,
  vacancy,
  onApply,
  onMessage,
}: VacancyDetailsSheetProps) {
  if (!vacancy) return null;

  const companyInitials = vacancy.employer?.company_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  const formatSalary = () => {
    if (!vacancy.salary_min && !vacancy.salary_max) return null;

    const period = vacancy.salary_period === 'annual' ? ' per year' : ' per hour';

    if (vacancy.salary_min && vacancy.salary_max) {
      const min = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_min).toLocaleString()}`
        : `£${vacancy.salary_min}`;
      const max = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_max).toLocaleString()}`
        : `£${vacancy.salary_max}`;
      return `${min} - ${max}${period}`;
    }

    if (vacancy.salary_min) {
      const val = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_min).toLocaleString()}`
        : `£${vacancy.salary_min}`;
      return `From ${val}${period}`;
    }

    return null;
  };

  const salaryDisplay = formatSalary();
  const postedAgo = formatDistanceToNow(new Date(vacancy.created_at), { addSuffix: true });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Header */}
            <SheetHeader className="text-left">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 rounded-xl border-2 border-border">
                  <AvatarImage src={vacancy.employer?.logo_url || undefined} />
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-elec-yellow/20 to-orange-500/20 text-elec-yellow font-bold text-lg">
                    {companyInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-xl">{vacancy.title}</SheetTitle>
                  <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
                    <Building2 className="h-4 w-4" />
                    {vacancy.employer?.company_name || 'Unknown Company'}
                  </p>
                  {vacancy.has_applied && (
                    <Badge className="mt-2 bg-green-500/10 text-green-500 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Applied
                    </Badge>
                  )}
                </div>
              </div>
            </SheetHeader>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{vacancy.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-medium">{vacancy.type}</p>
                </div>
              </div>
              {salaryDisplay && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg col-span-2">
                  <PoundSterling className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Salary</p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      {salaryDisplay}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                Posted {postedAgo}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {vacancy.views} views
              </span>
              {vacancy.closing_date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Closes {format(new Date(vacancy.closing_date), 'dd MMM yyyy')}
                </span>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-3">About the Role</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {vacancy.description || 'No description provided.'}
              </p>
            </div>

            {/* Requirements */}
            {vacancy.requirements && vacancy.requirements.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {vacancy.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {vacancy.benefits && vacancy.benefits.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {vacancy.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <Star className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Spacer for bottom actions */}
            <div className="h-24" />
          </div>
        </ScrollArea>

        {/* Fixed Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 gap-2"
              onClick={() => {
                onMessage(vacancy);
                onOpenChange(false);
              }}
            >
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            {!vacancy.has_applied ? (
              <Button
                className="flex-1 h-12 gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={() => {
                  onApply(vacancy);
                  onOpenChange(false);
                }}
              >
                <Send className="h-4 w-4" />
                Apply Now
              </Button>
            ) : (
              <Button
                className="flex-1 h-12 gap-2"
                variant="secondary"
                disabled
              >
                <CheckCircle2 className="h-4 w-4" />
                Already Applied
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
