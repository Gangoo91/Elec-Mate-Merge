import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Building2,
  Clock,
  PoundSterling,
  MessageSquare,
  Send,
  Briefcase,
  ChevronRight,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export interface InternalVacancy {
  id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_period: string;
  description: string;
  requirements: string[];
  benefits: string[];
  closing_date: string | null;
  views: number;
  created_at: string;
  // Joined
  employer?: {
    id: string;
    company_name: string;
    logo_url: string | null;
  };
  application_count?: number;
  has_applied?: boolean;
}

interface InternalVacancyCardProps {
  vacancy: InternalVacancy;
  onApply: (vacancy: InternalVacancy) => void;
  onMessage: (vacancy: InternalVacancy) => void;
  onViewDetails: (vacancy: InternalVacancy) => void;
}

export function InternalVacancyCard({
  vacancy,
  onApply,
  onMessage,
  onViewDetails,
}: InternalVacancyCardProps) {
  const formatSalary = () => {
    if (!vacancy.salary_min && !vacancy.salary_max) return null;

    const period = vacancy.salary_period === 'annual' ? '/yr' : '/hr';

    if (vacancy.salary_min && vacancy.salary_max) {
      const min = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_min / 1000).toFixed(0)}k`
        : `£${vacancy.salary_min}`;
      const max = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_max / 1000).toFixed(0)}k`
        : `£${vacancy.salary_max}`;
      return `${min} - ${max}${period}`;
    }

    if (vacancy.salary_min) {
      const val = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_min / 1000).toFixed(0)}k`
        : `£${vacancy.salary_min}`;
      return `From ${val}${period}`;
    }

    return null;
  };

  const companyInitials = vacancy.employer?.company_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  const postedAgo = formatDistanceToNow(new Date(vacancy.created_at), { addSuffix: true });
  const salaryDisplay = formatSalary();

  return (
    <Card
      className={cn(
        "transition-all duration-150 overflow-hidden touch-manipulation",
        "bg-gradient-to-br from-emerald-500/5 via-background to-background",
        "border-emerald-500/30",
        "active:scale-[0.98] active:border-emerald-400/50 active:shadow-lg active:shadow-emerald-500/10"
      )}
      onClick={() => onViewDetails(vacancy)}
    >
      {/* Direct from Employer Banner */}
      <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border-b border-emerald-500/20 px-4 py-2 flex items-center gap-2">
        <BadgeCheck className="h-4 w-4 text-emerald-400" />
        <span className="text-xs font-medium text-emerald-400">Direct from Employer</span>
        <Sparkles className="h-3 w-3 text-emerald-400/60 ml-auto" />
      </div>

      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Company Logo */}
          <Avatar className="h-14 w-14 rounded-xl border-2 border-emerald-500/30 shrink-0">
            <AvatarImage src={vacancy.employer?.logo_url || undefined} />
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 text-emerald-400 font-bold">
              {companyInitials}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {vacancy.title}
                </h3>
                <p className="text-sm text-emerald-400/80 flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {vacancy.employer?.company_name || 'Employer'}
                </p>
              </div>

              {vacancy.has_applied && (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shrink-0">
                  Applied
                </Badge>
              )}
            </div>

            {/* Details - Improved contrast */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-white/10 border-white/20 text-foreground/90 font-normal">
                <MapPin className="h-3 w-3 mr-1" />
                {vacancy.location}
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/20 text-foreground/90 font-normal">
                <Briefcase className="h-3 w-3 mr-1" />
                {vacancy.type}
              </Badge>
              {salaryDisplay && (
                <Badge className="bg-emerald-500/20 border-emerald-500/30 text-emerald-400 font-medium">
                  <PoundSterling className="h-3 w-3 mr-1" />
                  {salaryDisplay}
                </Badge>
              )}
              <Badge variant="outline" className="bg-white/10 border-white/20 text-foreground/70 font-normal">
                <Clock className="h-3 w-3 mr-1" />
                {postedAgo}
              </Badge>
            </div>

            {/* Description Preview */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {vacancy.description}
            </p>

            {/* Actions - Mobile-first touch targets */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                className="h-11 gap-2 px-4 border-emerald-500/30 text-emerald-400 active:bg-emerald-500/10 active:text-emerald-300 touch-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  onMessage(vacancy);
                }}
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>

              {!vacancy.has_applied && (
                <Button
                  className="h-11 gap-2 px-4 bg-emerald-500 text-white active:bg-emerald-400 touch-manipulation active:scale-[0.98] transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(vacancy);
                  }}
                >
                  <Send className="h-4 w-4" />
                  Apply
                </Button>
              )}

              <Button
                variant="ghost"
                className="h-11 ml-auto gap-1 text-emerald-400/80 active:text-emerald-400 active:bg-emerald-500/10 touch-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(vacancy);
                }}
              >
                Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
