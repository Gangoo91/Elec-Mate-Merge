import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  FileCheck,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useSubmissionQueue, SubmissionQueueItem } from '@/hooks/college/usePortfolioSubmissions';

interface PortfolioReviewQueueProps {
  onViewSubmission: (submissionId: string) => void;
  onStartReview?: (submissionId: string) => void;
}

const PortfolioReviewQueue: React.FC<PortfolioReviewQueueProps> = ({
  onViewSubmission,
  onStartReview
}) => {
  const { submissions, stats, isLoading, refetch } = useSubmissionQueue();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string | null>(null);

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = searchTerm === '' ||
      sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !filterPriority || sub.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium</Badge>;
      default:
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Low</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="outline" className="border-blue-500/30 text-blue-400">New</Badge>;
      case 'under_review':
        return <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Under Review</Badge>;
      case 'resubmitted':
        return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Resubmitted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-white/60">Total Queue</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-xs text-white/60">High Priority</p>
                <p className="text-xl font-bold">{stats.highPriority}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-xs text-white/60">Medium</p>
                <p className="text-xl font-bold">{stats.mediumPriority}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-xs text-white/60">Low</p>
                <p className="text-xl font-bold">{stats.lowPriority}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-white/60" />
              <div>
                <p className="text-xs text-white/60">Avg Wait</p>
                <p className="text-xl font-bold">{stats.avgDaysWaiting}d</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Table */}
      <Card className="bg-white/5 border-elec-gray/40">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-base">Review Queue</CardTitle>
              <CardDescription>Submissions awaiting assessor review</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search student or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-white/5 border-elec-gray/40"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-elec-gray/40">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-elec-dark border-elec-gray/40">
                  <DropdownMenuItem onClick={() => setFilterPriority(null)}>
                    All Priorities
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority('high')}>
                    High Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority('medium')}>
                    Medium Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority('low')}>
                    Low Priority
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                onClick={() => refetch()}
                className="border-elec-gray/40"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-elec-gray/40">
                  <TableHead className="text-white/70">Student</TableHead>
                  <TableHead className="text-white/70">Category</TableHead>
                  <TableHead className="text-white/70 text-center">Submitted</TableHead>
                  <TableHead className="text-white/70 text-center">Attempt</TableHead>
                  <TableHead className="text-white/70 text-center">Wait</TableHead>
                  <TableHead className="text-white/70 text-center">Priority</TableHead>
                  <TableHead className="text-white/70 text-center">Status</TableHead>
                  <TableHead className="text-white/70 w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map(submission => (
                  <TableRow
                    key={submission.id}
                    className="border-elec-gray/40 hover:bg-white/5 cursor-pointer"
                    onClick={() => onViewSubmission(submission.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs">
                            {getInitials(submission.studentName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{submission.studentName}</p>
                          <p className="text-xs text-white/50 truncate">{submission.qualificationTitle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{submission.categoryName}</span>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {formatDate(submission.submittedAt)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-xs">
                        #{submission.submissionCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm ${submission.daysAwaitingReview > 7 ? 'text-red-400' : submission.daysAwaitingReview > 3 ? 'text-amber-400' : ''}`}>
                        {submission.daysAwaitingReview}d
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getPriorityBadge(submission.priority)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(submission.status)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-elec-dark border-elec-gray/40">
                          <DropdownMenuItem onClick={() => onViewSubmission(submission.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {onStartReview && submission.status === 'submitted' && (
                            <DropdownMenuItem onClick={() => onStartReview(submission.id)}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Start Review
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSubmissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-white/50 py-12">
                      {submissions.length === 0
                        ? 'No submissions awaiting review'
                        : 'No submissions match your search'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioReviewQueue;
