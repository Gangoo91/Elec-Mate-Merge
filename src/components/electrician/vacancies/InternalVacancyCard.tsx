import { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

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
        "transition-all duration-200 cursor-pointer",
        "border-border hover:border-elec-yellow/50 hover:shadow-lg",
        isHovered && "scale-[1.01]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(vacancy)}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Company Logo */}
          <Avatar className="h-14 w-14 rounded-xl border-2 border-border shrink-0">
            <AvatarImage src={vacancy.employer?.logo_url || undefined} />
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-elec-yellow/20 to-orange-500/20 text-elec-yellow font-bold">
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
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {vacancy.employer?.company_name || 'Unknown Company'}
                </p>
              </div>

              {vacancy.has_applied && (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/30 shrink-0">
                  Applied
                </Badge>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {vacancy.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {vacancy.type}
              </span>
              {salaryDisplay && (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                  <PoundSterling className="h-3.5 w-3.5" />
                  {salaryDisplay}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {postedAgo}
              </span>
            </div>

            {/* Description Preview */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {vacancy.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
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
                  size="sm"
                  className="gap-1.5 bg-elec-yellow text-black hover:bg-elec-yellow/90"
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
                size="sm"
                variant="ghost"
                className="ml-auto gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(vacancy);
                }}
              >
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
