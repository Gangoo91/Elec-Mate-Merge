import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { useCollegeEPAs } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { EPADetailSheet } from '@/components/college/sheets/EPADetailSheet';
import { GatewayMeetingSheet } from '@/components/college/sheets/GatewayMeetingSheet';
import { AddEPARecordSheet } from '@/components/college/sheets/AddEPARecordSheet';
import { EPACardSkeletonList } from '@/components/college/ui/EPACardSkeleton';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import { motion } from 'framer-motion';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Award,
  Calendar,
  User,
  MoreVertical,
  Filter,
  Flag,
  FileCheck,
  Loader2,
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

type EPAStatus = 'Not Started' | 'In Progress' | 'Pre-Gateway' | 'Gateway Ready' | 'Complete';

interface EPATrackingSectionProps {
  onNavigate?: (section: string) => void;
}

export function EPATrackingSection({ onNavigate }: EPATrackingSectionProps) {
  const { data: epaRecords = [], isLoading: epasLoading } = useCollegeEPAs();
  const { data: students = [] } = useCollegeStudents();
  const { data: cohorts = [] } = useCollegeCohorts();
  const { data: staff = [] } = useCollegeStaff();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [selectedEpaId, setSelectedEpaId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [gatewaySheetOpen, setGatewaySheetOpen] = useState(false);
  const [addRecordSheetOpen, setAddRecordSheetOpen] = useState(false);

  const { staggerContainer, staggerItem } = useHapticFeedback();
  const queryClient = useQueryClient();
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-epa'] });
  };

  const isLoading = epasLoading;

  const filteredRecords = epaRecords.filter((epa) => {
    const student = students.find((s) => s.id === epa.student_id);
    const matchesSearch = student?.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || epa.status === filterStatus;
    const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  // Count by status
  const statusCounts = {
    notStarted: epaRecords.filter((r) => r.status === 'Not Started').length,
    inProgress: epaRecords.filter((r) => r.status === 'In Progress').length,
    preGateway: epaRecords.filter((r) => r.status === 'Pre-Gateway').length,
    gatewayReady: epaRecords.filter((r) => r.status === 'Gateway Ready').length,
    complete: epaRecords.filter((r) => r.status === 'Complete').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'bg-muted text-white';
      case 'In Progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Pre-Gateway':
        return 'bg-info/10 text-info border-info/20';
      case 'Gateway Ready':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Complete':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-white';
    }
  };

  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case 'Distinction':
        return 'bg-success/20 text-success';
      case 'Merit':
        return 'bg-info/20 text-info';
      case 'Pass':
        return 'bg-primary/20 text-primary';
      case 'Fail':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-white';
    }
  };

  const getStudentInfo = (studentId: string | null) => {
    if (!studentId) {
      return { name: 'Unknown', initials: '?', photoUrl: undefined, cohortId: undefined };
    }
    const student = students.find((s) => s.id === studentId);
    const name = student?.name || 'Unknown';
    const nameParts = name.split(' ').filter(Boolean);
    const initials =
      nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();
    return {
      name,
      initials,
      photoUrl: student?.photo_url ?? undefined,
      cohortId: student?.cohort_id ?? undefined,
    };
  };

  const getCohortName = (cohortId?: string) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  };

  const getStatusStep = (status: string | null): number => {
    switch (status) {
      case 'Not Started':
        return 1;
      case 'In Progress':
        return 2;
      case 'Pre-Gateway':
        return 3;
      case 'Gateway Ready':
        return 4;
      case 'Complete':
        return 5;
      default:
        return 0;
    }
  };

  const getProgressPercent = (status: string | null): number => {
    return (getStatusStep(status) / 5) * 100;
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader title="EPA Tracking" description="Loading..." />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-muted/50 animate-pulse" />
          ))}
        </div>
        <EPACardSkeletonList count={4} />
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader
          title="EPA Tracking"
          description={`${epaRecords.length} apprentices in EPA pipeline`}
          actions={
            <Button
              className="gap-2 h-11 touch-manipulation"
              onClick={() => setAddRecordSheetOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add EPA Record</span>
            </Button>
          }
        />

        {/* Pipeline Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Card className="bg-muted/50">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-foreground">{statusCounts.notStarted}</p>
              <p className="text-xs text-white">Not Started</p>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-warning">{statusCounts.inProgress}</p>
              <p className="text-xs text-white">In Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-info/10 border-info/20">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-info">{statusCounts.preGateway}</p>
              <p className="text-xs text-white">Pre-Gateway</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-primary">{statusCounts.gatewayReady}</p>
              <p className="text-xs text-white">Gateway Ready</p>
            </CardContent>
          </Card>
          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-success">{statusCounts.complete}</p>
              <p className="text-xs text-white">Complete</p>
            </CardContent>
          </Card>
        </div>

        {/* Gateway Ready Alert */}
        {statusCounts.gatewayReady > 0 && (
          <Card className="border-info/50 bg-info/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-info">
                <Flag className="h-4 w-4" />
                Gateway Ready - Action Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white mb-2">
                {statusCounts.gatewayReady} apprentices are ready for gateway. Review and schedule
                EPA assessments.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="h-11 touch-manipulation text-info border-info/50 hover:bg-info/10"
                onClick={() => setFilterStatus('Gateway Ready')}
              >
                View Gateway Ready
              </Button>
            </CardContent>
          </Card>
        )}

        {/* EPA Countdown with Gap Analysis */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            Gateway Readiness Analysis
          </h2>
          <EPACountdown />
        </div>

        {/* Search and Filters */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:mx-0 md:px-0 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            )}
            <Input
              placeholder="Search apprentices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn('h-11 touch-manipulation', !searchQuery && 'pl-9')}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[160px] h-11 touch-manipulation">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="h-11 touch-manipulation">
                All Status
              </SelectItem>
              <SelectItem value="Not Started" className="h-11 touch-manipulation">
                Not Started
              </SelectItem>
              <SelectItem value="In Progress" className="h-11 touch-manipulation">
                In Progress
              </SelectItem>
              <SelectItem value="Pre-Gateway" className="h-11 touch-manipulation">
                Pre-Gateway
              </SelectItem>
              <SelectItem value="Gateway Ready" className="h-11 touch-manipulation">
                Gateway Ready
              </SelectItem>
              <SelectItem value="Complete" className="h-11 touch-manipulation">
                Complete
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

        {/* EPA Records List */}
        <motion.div
          className="grid gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredRecords.map((epa) => {
            const studentInfo = getStudentInfo(epa.student_id);
            const progressPercent = getProgressPercent(epa.status);

            return (
              <motion.div variants={staggerItem} key={epa.id}>
                <SwipeableCard
                  leftActions={[
                    {
                      icon: <FileCheck className="h-5 w-5" />,
                      label: 'Details',
                      onClick: () => {
                        setSelectedEpaId(epa.id);
                        setDetailSheetOpen(true);
                      },
                      className: 'bg-info text-white',
                    },
                    {
                      icon: <Flag className="h-5 w-5" />,
                      label: 'Gateway',
                      onClick: () => {
                        setSelectedEpaId(epa.id);
                        setSelectedStudentId(epa.student_id);
                        setGatewaySheetOpen(true);
                      },
                      className: 'bg-success text-white',
                    },
                  ]}
                >
                  <Card className="hover:shadow-md transition-shadow">
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
                              <Badge variant="outline" className={getStatusColor(epa.status ?? '')}>
                                {epa.status ?? 'Unknown'}
                              </Badge>
                              {epa.result && (
                                <Badge className={getGradeColor(epa.result)}>{epa.result}</Badge>
                              )}
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
                                      setSelectedEpaId(epa.id);
                                      setDetailSheetOpen(true);
                                    }}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedEpaId(epa.id);
                                      setDetailSheetOpen(true);
                                    }}
                                  >
                                    Update Status
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => onNavigate?.('grading')}
                                  >
                                    Add Assessment
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedEpaId(epa.id);
                                      setSelectedStudentId(epa.student_id);
                                      setGatewaySheetOpen(true);
                                    }}
                                  >
                                    Gateway Meeting
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => onNavigate?.('portfolio')}
                                  >
                                    View Portfolio
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-white">EPA Progress</span>
                              <span className="font-medium">{Math.round(progressPercent)}%</span>
                            </div>
                            <div className="relative">
                              <Progress value={progressPercent} className="h-2" />
                              {/* Progress steps */}
                              <div className="absolute top-0 left-0 right-0 flex justify-between -translate-y-1">
                                {[1, 2, 3, 4, 5].map((step) => (
                                  <div
                                    key={step}
                                    className={`w-2 h-2 rounded-full ${
                                      getStatusStep(epa.status) >= step ? 'bg-primary' : 'bg-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t text-xs text-white">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{getCohortName(studentInfo.cohortId)}</span>
                            </div>
                            {epa.gateway_date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  Gateway:{' '}
                                  {new Date(epa.gateway_date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            )}
                            {epa.epa_date && (
                              <div className="flex items-center gap-1">
                                <FileCheck className="h-3 w-3" />
                                <span>
                                  EPA:{' '}
                                  {new Date(epa.epa_date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
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

          {filteredRecords.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-white">No EPA records found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <EPADetailSheet
          epaId={selectedEpaId}
          open={detailSheetOpen}
          onOpenChange={setDetailSheetOpen}
        />
        <GatewayMeetingSheet
          epaId={selectedEpaId}
          studentId={selectedStudentId}
          open={gatewaySheetOpen}
          onOpenChange={setGatewaySheetOpen}
        />
        <AddEPARecordSheet open={addRecordSheetOpen} onOpenChange={setAddRecordSheetOpen} />
      </div>
    </PullToRefresh>
  );
}
