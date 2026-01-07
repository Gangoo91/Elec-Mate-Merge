import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Eye,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { StudentPortfolio } from '@/hooks/college/useCollegePortfolios';

interface StudentPortfolioCardProps {
  portfolio: StudentPortfolio;
  onViewDetails: (studentId: string, qualificationId: string) => void;
  onReviewSubmissions?: (studentId: string) => void;
  showActions?: boolean;
}

const StudentPortfolioCard: React.FC<StudentPortfolioCardProps> = ({
  portfolio,
  onViewDetails,
  onReviewSubmissions,
  showActions = true
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
      case 'at_risk':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">At Risk</Badge>;
      case 'on_break':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">On Break</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const daysSinceActivity = portfolio.lastActivityDate
    ? Math.floor((Date.now() - new Date(portfolio.lastActivityDate).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card className="bg-white/5 border-elec-gray/40 hover:border-elec-yellow/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-elec-gray/40">
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-sm">
                {getInitials(portfolio.studentName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className="text-base truncate">{portfolio.studentName}</CardTitle>
              <CardDescription className="text-xs truncate">{portfolio.qualificationTitle}</CardDescription>
            </div>
          </div>
          {getStatusBadge(portfolio.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/70">Portfolio Progress</span>
            <span className="font-medium">{portfolio.completionPercentage}%</span>
          </div>
          <Progress value={portfolio.completionPercentage} className="h-2" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-white/5">
            <p className="text-lg font-bold">{portfolio.completedEntries}</p>
            <p className="text-xs text-white/50">Complete</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5">
            <p className="text-lg font-bold">{portfolio.draftEntries}</p>
            <p className="text-xs text-white/50">Drafts</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5">
            <p className="text-lg font-bold">{portfolio.submissionsAwaitingReview}</p>
            <p className="text-xs text-white/50">To Review</p>
          </div>
        </div>

        {/* Alerts/Notifications */}
        {portfolio.submissionsAwaitingReview > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <MessageSquare className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="text-sm text-amber-300">
              {portfolio.submissionsAwaitingReview} submission{portfolio.submissionsAwaitingReview > 1 ? 's' : ''} awaiting review
            </span>
          </div>
        )}

        {daysSinceActivity !== null && daysSinceActivity > 14 && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
            <span className="text-sm text-red-300">
              No activity for {daysSinceActivity} days
            </span>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-white/60">
            <CheckCircle2 className="h-4 w-4" />
            <span>{portfolio.categoriesComplete}/{portfolio.categoriesTotal} units</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <FileText className="h-4 w-4" />
            <span>{portfolio.ksbsCovered}/{portfolio.ksbsTotal} KSBs</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <Clock className="h-4 w-4" />
            <span>{portfolio.ojtHoursCompleted}/{portfolio.ojtHoursRequired}h OJT</span>
          </div>
          {portfolio.cohortName && (
            <div className="flex items-center gap-2 text-white/60">
              <Calendar className="h-4 w-4" />
              <span className="truncate">{portfolio.cohortName}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-elec-gray/40"
              onClick={() => onViewDetails(portfolio.studentId, portfolio.qualificationId)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {portfolio.submissionsAwaitingReview > 0 && onReviewSubmissions && (
              <Button
                size="sm"
                className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
                onClick={() => onReviewSubmissions(portfolio.studentId)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Review
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentPortfolioCard;
