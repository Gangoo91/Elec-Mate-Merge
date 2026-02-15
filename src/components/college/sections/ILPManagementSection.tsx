import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { useCollegeILPs, useOverdueILPReviews } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Target,
  Calendar,
  User,
  MoreVertical,
  Filter,
  AlertTriangle,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ILPDetailSheet } from '@/components/college/sheets/ILPDetailSheet';
import { ILPReviewSheet } from '@/components/college/sheets/ILPReviewSheet';
import { ILPTargetsSheet } from '@/components/college/sheets/ILPTargetsSheet';
import { CreateILPSheet } from '@/components/college/sheets/CreateILPSheet';
import { ILPCardSkeletonList } from '@/components/college/ui/ILPCardSkeleton';
import { motion } from 'framer-motion';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useQueryClient } from '@tanstack/react-query';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';

export function ILPManagementSection() {
  const { data: ilps = [], isLoading: ilpsLoading } = useCollegeILPs();
  const { data: overdueReviews = [] } = useOverdueILPReviews();
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const { data: cohorts = [] } = useCollegeCohorts();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [selectedIlpId, setSelectedIlpId] = useState<string | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [detailInitialTab, setDetailInitialTab] = useState<'targets' | 'support' | 'history'>(
    'targets'
  );
  const [reviewSheetOpen, setReviewSheetOpen] = useState(false);
  const [targetsSheetOpen, setTargetsSheetOpen] = useState(false);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);

  const { staggerContainer, staggerItem } = useHapticFeedback();
  const queryClient = useQueryClient();
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
  };

  if (ilpsLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader title="ILP Management" description="Loading..." />
        <ILPCardSkeletonList count={4} />
      </div>
    );
  }

  const filteredILPs = ilps.filter((ilp) => {
    const student = students.find((s) => s.id === ilp.student_id);
    const targets = ilp.targets ?? [];
    const matchesSearch =
      student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      targets.some((t) => t.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || ilp.status === filterStatus;
    const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Draft':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Completed':
        return 'bg-info/10 text-info border-info/20';
      case 'Archived':
        return 'bg-muted text-white';
      default:
        return 'bg-muted text-white';
    }
  };

  const getTargetStatusColor = (status: string) => {
    switch (status) {
      case 'Achieved':
        return 'bg-success/10 text-success';
      case 'In Progress':
        return 'bg-primary/10 text-primary';
      case 'Overdue':
        return 'bg-warning/10 text-warning';
      case 'Pending':
        return 'bg-muted text-white';
      default:
        return 'bg-muted text-white';
    }
  };

  const getStudentInfo = (studentId: string | null) => {
    const student = students.find((s) => s.id === studentId);
    const initials = student?.name
      ? student.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '?';
    return {
      name: student?.name || 'Unknown',
      initials,
      photoUrl: student?.photo_url ?? undefined,
      cohortId: student?.cohort_id,
    };
  };

  const getCohortName = (cohortId?: string | null) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  };

  const getTutorName = (reviewedBy: string | null) => {
    if (!reviewedBy) return 'Unassigned';
    return staff.find((s) => s.id === reviewedBy)?.name || 'Unknown';
  };

  const getTargetProgress = (targets: (typeof ilps)[0]['targets']) => {
    const safeTargets = targets ?? [];
    if (safeTargets.length === 0) return 0;
    const achieved = safeTargets.filter((t) => t.status === 'Achieved').length;
    return Math.round((achieved / safeTargets.length) * 100);
  };

  const isReviewOverdue = (reviewDate: string | null) => {
    if (!reviewDate) return false;
    return new Date(reviewDate) < new Date();
  };

  const isReviewDueSoon = (reviewDate: string | null) => {
    if (!reviewDate) return false;
    const date = new Date(reviewDate);
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return date >= now && date <= weekFromNow;
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader
          title="ILP Management"
          description={`${ilps.filter((i) => i.status === 'Active').length} active learning plans`}
          action={
            <Button
              className="gap-2 h-11 touch-manipulation"
              onClick={() => setCreateSheetOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create ILP</span>
            </Button>
          }
        />

        {/* Quick Stats */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <Card className="bg-success/10 border-success/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-success" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  {ilps.filter((i) => i.status === 'Active').length}
                </p>
                <p className="text-xs text-white">Active ILPs</p>
              </div>
            </CardContent>
          </Card>
          {overdueReviews.length > 0 && (
            <Card className="bg-destructive/10 border-destructive/20 shrink-0">
              <CardContent className="p-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-lg font-bold text-foreground">{overdueReviews.length}</p>
                  <p className="text-xs text-white">Overdue Reviews</p>
                </div>
              </CardContent>
            </Card>
          )}
          <Card className="bg-info/10 border-info/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-info" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  {ilps.filter((i) => i.status === 'Completed').length}
                </p>
                <p className="text-xs text-white">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overdue Reviews Alert */}
        {overdueReviews.length > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Overdue ILP Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {overdueReviews.slice(0, 3).map((ilp) => {
                  const student = getStudentInfo(ilp.student_id);
                  return (
                    <div
                      key={ilp.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-background"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={student.photoUrl} />
                          <AvatarFallback className="text-xs">{student.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{student.name}</span>
                      </div>
                      {ilp.review_date && (
                        <Badge
                          variant="outline"
                          className="bg-destructive/10 text-destructive text-xs"
                        >
                          Due:{' '}
                          {new Date(ilp.review_date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:mx-0 md:px-0 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            )}
            <Input
              placeholder="Search ILPs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn('h-11 touch-manipulation', !searchQuery && 'pl-9')}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[140px] h-11 touch-manipulation">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="h-11 touch-manipulation">
                All Status
              </SelectItem>
              <SelectItem value="Active" className="h-11 touch-manipulation">
                Active
              </SelectItem>
              <SelectItem value="Draft" className="h-11 touch-manipulation">
                Draft
              </SelectItem>
              <SelectItem value="Completed" className="h-11 touch-manipulation">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCohort} onValueChange={setFilterCohort}>
            <SelectTrigger className="w-full sm:w-[180px] h-11 touch-manipulation">
              <SelectValue placeholder="Cohort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="h-11 touch-manipulation">
                All Cohorts
              </SelectItem>
              {cohorts
                .filter((c) => c.status === 'Active')
                .map((cohort) => (
                  <SelectItem key={cohort.id} value={cohort.id} className="h-11 touch-manipulation">
                    {cohort.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filter Chips */}
        {(filterStatus !== 'all' || filterCohort !== 'all') && (
          <div className="flex flex-wrap gap-2">
            {filterStatus !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterStatus('all')}
              >
                {filterStatus} <span className="ml-1">&times;</span>
              </Badge>
            )}
            {filterCohort !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterCohort('all')}
              >
                {cohorts.find((c) => c.id === filterCohort)?.name || filterCohort}{' '}
                <span className="ml-1">&times;</span>
              </Badge>
            )}
          </div>
        )}

        {/* ILP List */}
        <motion.div
          className="grid gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredILPs.map((ilp) => {
            const studentInfo = getStudentInfo(ilp.student_id);
            const targets = ilp.targets ?? [];
            const targetProgress = getTargetProgress(ilp.targets);
            const overdue = isReviewOverdue(ilp.review_date);
            const dueSoon = isReviewDueSoon(ilp.review_date);

            return (
              <motion.div variants={staggerItem} key={ilp.id}>
                <SwipeableCard
                  leftActions={[
                    {
                      icon: <FileText className="h-5 w-5" />,
                      label: 'Review',
                      onClick: () => {
                        setSelectedIlpId(ilp.id);
                        setReviewSheetOpen(true);
                      },
                      className: 'bg-success text-white',
                    },
                    {
                      icon: <Target className="h-5 w-5" />,
                      label: 'Targets',
                      onClick: () => {
                        setSelectedIlpId(ilp.id);
                        setTargetsSheetOpen(true);
                      },
                      className: 'bg-info text-white',
                    },
                  ]}
                >
                  <Card
                    className={`hover:shadow-md transition-shadow ${
                      overdue
                        ? 'border-l-4 border-l-destructive'
                        : dueSoon
                          ? 'border-l-4 border-l-warning'
                          : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarImage src={studentInfo.photoUrl} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {studentInfo.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{studentInfo.name}</h3>
                              <p className="text-sm text-white">
                                {getCohortName(studentInfo.cohortId)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getStatusColor(ilp.status)}>
                                {ilp.status || 'Unknown'}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-11 w-11 touch-manipulation"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedIlpId(ilp.id);
                                      setDetailInitialTab('targets');
                                      setDetailSheetOpen(true);
                                    }}
                                  >
                                    View ILP
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedIlpId(ilp.id);
                                      setReviewSheetOpen(true);
                                    }}
                                  >
                                    Conduct Review
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedIlpId(ilp.id);
                                      setTargetsSheetOpen(true);
                                    }}
                                  >
                                    Edit Targets
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedIlpId(ilp.id);
                                      setDetailInitialTab('history');
                                      setDetailSheetOpen(true);
                                    }}
                                  >
                                    View History
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => window.print()}
                                  >
                                    Print ILP
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          {/* Target Progress */}
                          {targets.length > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-white">Target Progress</span>
                                <span className="font-medium">
                                  {targets.filter((t) => t.status === 'Achieved').length}/
                                  {targets.length} achieved
                                </span>
                              </div>
                              <Progress value={targetProgress} className="h-2" />
                            </div>
                          )}

                          {/* Targets Summary */}
                          {targets.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {targets.slice(0, 3).map((target, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className={`${getTargetStatusColor(target.status)} text-xs`}
                                >
                                  {target.status === 'Achieved' && (
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                  )}
                                  {target.description.length > 25
                                    ? target.description.substring(0, 25) + '...'
                                    : target.description}
                                </Badge>
                              ))}
                              {targets.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{targets.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t text-xs text-white">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>Tutor: {getTutorName(ilp.reviewed_by)}</span>
                            </div>
                            {ilp.last_reviewed && (
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                <span>
                                  Last reviewed:{' '}
                                  {new Date(ilp.last_reviewed).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            )}
                            {ilp.review_date && (
                              <div
                                className={`flex items-center gap-1 ${overdue ? 'text-destructive' : dueSoon ? 'text-warning' : ''}`}
                              >
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {overdue ? 'Overdue: ' : dueSoon ? 'Due: ' : 'Next: '}
                                  {new Date(ilp.review_date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwipeableCard>
              </motion.div>
            );
          })}

          {filteredILPs.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-white">No ILPs found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <ILPDetailSheet
          ilpId={selectedIlpId}
          open={detailSheetOpen}
          onOpenChange={setDetailSheetOpen}
          initialTab={detailInitialTab}
          onConductReview={() => {
            setDetailSheetOpen(false);
            setTimeout(() => setReviewSheetOpen(true), 300);
          }}
          onEditTargets={() => {
            setDetailSheetOpen(false);
            setTimeout(() => setTargetsSheetOpen(true), 300);
          }}
        />
        <ILPReviewSheet
          ilpId={selectedIlpId}
          open={reviewSheetOpen}
          onOpenChange={setReviewSheetOpen}
        />
        <ILPTargetsSheet
          ilpId={selectedIlpId}
          open={targetsSheetOpen}
          onOpenChange={setTargetsSheetOpen}
        />
        <CreateILPSheet open={createSheetOpen} onOpenChange={setCreateSheetOpen} />
      </div>
    </PullToRefresh>
  );
}
