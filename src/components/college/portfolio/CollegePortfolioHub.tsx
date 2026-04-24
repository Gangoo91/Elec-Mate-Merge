import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  useCollegePortfolios,
  useStudentPortfolioDetail,
} from '@/hooks/college/useCollegePortfolios';
import StudentPortfolioCard from './StudentPortfolioCard';
import CoverageMatrixView from './CoverageMatrixView';
import PortfolioReviewQueue from './PortfolioReviewQueue';
import SubmissionReviewPanel from './SubmissionReviewPanel';
import IQASamplingPanel from './IQASamplingPanel';
import EPAGatewayChecklist from './EPAGatewayChecklist';
import StudentRequirementsPanel from './StudentRequirementsPanel';
import {
  PageFrame,
  SectionHeader,
  StatStrip,
  ListCard,
  ListRow,
  Pill,
  EmptyState,
  LoadingState,
  itemVariants,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  Eyebrow,
} from '@/components/college/primitives';

type ViewMode = 'list' | 'student-detail' | 'submission-review';

const CollegePortfolioHub: React.FC = () => {
  const { studentPortfolios, portfoliosAwaitingReview, atRiskStudents, stats, isLoading, refetch } =
    useCollegePortfolios();

  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStudent, setSelectedStudent] = useState<{
    id: string;
    qualificationId: string;
  } | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  // Fetch student detail when selected
  const { portfolioDetail, isLoading: detailLoading } = useStudentPortfolioDetail(
    selectedStudent?.id || '',
    selectedStudent?.qualificationId || ''
  );

  const filteredPortfolios = studentPortfolios.filter((portfolio) => {
    const matchesSearch =
      searchTerm === '' ||
      portfolio.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.qualificationTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || portfolio.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (studentId: string, qualificationId: string) => {
    setSelectedStudent({ id: studentId, qualificationId });
    setViewMode('student-detail');
  };

  const handleViewSubmission = (submissionId: string) => {
    setSelectedSubmission(submissionId);
    setViewMode('submission-review');
  };

  const handleBack = () => {
    if (viewMode === 'submission-review') {
      setSelectedSubmission(null);
      setViewMode('list');
    } else {
      setSelectedStudent(null);
      setViewMode('list');
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  // Submission Review View
  if (viewMode === 'submission-review' && selectedSubmission) {
    return (
      <SubmissionReviewPanel
        submissionId={selectedSubmission}
        onBack={handleBack}
        onComplete={() => {
          handleBack();
          refetch();
        }}
      />
    );
  }

  // Student Detail View
  if (viewMode === 'student-detail' && selectedStudent) {
    return (
      <PageFrame>
        <div className="flex items-center gap-4 pt-6 sm:pt-8">
          <button
            onClick={handleBack}
            className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            ← Back
          </button>
          <div className="min-w-0 flex-1">
            <Eyebrow>Student Portfolio</Eyebrow>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight">
              {portfolioDetail?.studentName || 'Loading…'}
            </h2>
            {portfolioDetail?.qualificationTitle && (
              <p className="mt-1 text-[13px] text-white">{portfolioDetail.qualificationTitle}</p>
            )}
          </div>
        </div>

        {detailLoading ? (
          <LoadingState />
        ) : portfolioDetail ? (
          <Tabs defaultValue="coverage">
            <TabsList className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full p-1 h-auto">
              <TabsTrigger
                value="coverage"
                className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
              >
                Coverage Matrix
              </TabsTrigger>
              <TabsTrigger
                value="requirements"
                className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
              >
                Requirements
              </TabsTrigger>
              <TabsTrigger
                value="gateway"
                className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
              >
                EPA Gateway
              </TabsTrigger>
            </TabsList>

            <TabsContent value="coverage" className="mt-6">
              <CoverageMatrixView
                coverageMatrix={portfolioDetail.coverageMatrix}
                ksbMappings={portfolioDetail.portfolioItems.flatMap((item) => item.ksbMappings)}
                studentName={portfolioDetail.studentName}
                qualificationTitle={portfolioDetail.qualificationTitle}
              />
            </TabsContent>

            <TabsContent value="requirements" className="mt-6">
              <StudentRequirementsPanel
                studentId={selectedStudent.id}
                qualificationId={selectedStudent.qualificationId}
              />
            </TabsContent>

            <TabsContent value="gateway" className="mt-6">
              <EPAGatewayChecklist
                studentId={selectedStudent.id}
                qualificationId={selectedStudent.qualificationId}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <EmptyState
            title="Unable to load student portfolio"
            description="Please try again or return to the queue."
          />
        )}
      </PageFrame>
    );
  }

  // Main Hub View
  return (
    <PageFrame>
      {/* Stats Strip */}
      <motion.div variants={itemVariants}>
        <StatStrip
          columns={5}
          stats={[
            { value: stats.totalStudents, label: 'Total Students' },
            { value: stats.activeStudents, label: 'Active', tone: 'green' },
            { value: stats.awaitingReview, label: 'Awaiting Review', tone: 'amber' },
            { value: stats.atRiskStudents, label: 'At Risk', tone: 'red' },
            { value: stats.completedStudents, label: 'Completed', accent: true },
          ]}
        />
      </motion.div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <TabsList className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full p-1 h-auto">
            <TabsTrigger
              value="overview"
              className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
            >
              All Students
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
            >
              Review Queue
              {stats.awaitingReview > 0 && (
                <span className="ml-1.5 tabular-nums text-[11px] text-white data-[state=active]:text-black/60">
                  {stats.awaitingReview}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="iqa"
              className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
            >
              IQA Sampling
            </TabsTrigger>
          </TabsList>

          <button
            onClick={() => refetch()}
            className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation self-start sm:self-auto"
          >
            Refresh →
          </button>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <SectionHeader eyebrow="01 · Cohort" title="Students" />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search students or qualifications…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={inputClass}
            />
            <Select
              value={statusFilter || 'all'}
              onValueChange={(v) => setStatusFilter(v === 'all' ? null : v)}
            >
              <SelectTrigger className={cn(selectTriggerClass, 'w-full sm:w-44')}>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="at_risk">At Risk</SelectItem>
                <SelectItem value="on_break">On Break</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="inline-flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full">
              <button
                onClick={() => setDisplayMode('grid')}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                  displayMode === 'grid'
                    ? 'bg-elec-yellow text-black'
                    : 'text-white hover:text-white'
                )}
              >
                Grid
              </button>
              <button
                onClick={() => setDisplayMode('list')}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                  displayMode === 'list'
                    ? 'bg-elec-yellow text-black'
                    : 'text-white hover:text-white'
                )}
              >
                List
              </button>
            </div>
          </div>

          {/* At Risk Alert */}
          {atRiskStudents.length > 0 && (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 flex items-center gap-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {atRiskStudents.length} student{atRiskStudents.length > 1 ? 's' : ''} at risk
                </p>
                <p className="text-[12.5px] text-white mt-0.5">
                  These students may need additional support
                </p>
              </div>
              <Pill tone="red">At Risk</Pill>
            </div>
          )}

          {/* Student Grid/List */}
          {filteredPortfolios.length === 0 ? (
            <EmptyState
              title={
                studentPortfolios.length === 0
                  ? 'No students assigned to you yet'
                  : 'No students match your search'
              }
              description={
                studentPortfolios.length === 0
                  ? 'Students will appear here once they are assigned.'
                  : 'Try adjusting your filters or search term.'
              }
            />
          ) : displayMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPortfolios.map((portfolio) => (
                <StudentPortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  onViewDetails={handleViewDetails}
                  onReviewSubmissions={() => {
                    setActiveTab('review');
                  }}
                />
              ))}
            </div>
          ) : (
            <ListCard>
              {filteredPortfolios.map((portfolio) => (
                <ListRow
                  key={portfolio.id}
                  title={portfolio.studentName}
                  subtitle={portfolio.qualificationTitle}
                  trailing={
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[15px] font-semibold tabular-nums text-white">
                          {portfolio.completionPercentage}%
                        </div>
                        <Eyebrow>Complete</Eyebrow>
                      </div>
                      {portfolio.submissionsAwaitingReview > 0 && (
                        <Pill tone="amber">{portfolio.submissionsAwaitingReview} to review</Pill>
                      )}
                    </div>
                  }
                  onClick={() =>
                    handleViewDetails(portfolio.studentId, portfolio.qualificationId)
                  }
                />
              ))}
            </ListCard>
          )}
        </TabsContent>

        {/* Review Queue Tab */}
        <TabsContent value="review" className="mt-6">
          <PortfolioReviewQueue
            onViewSubmission={handleViewSubmission}
            onStartReview={handleViewSubmission}
          />
        </TabsContent>

        {/* IQA Tab */}
        <TabsContent value="iqa" className="mt-6">
          <IQASamplingPanel onViewSubmission={handleViewSubmission} />
        </TabsContent>
      </Tabs>
    </PageFrame>
  );
};

export default CollegePortfolioHub;
