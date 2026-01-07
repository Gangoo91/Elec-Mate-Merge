import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  FileCheck,
  ClipboardCheck,
  Award,
  Search,
  AlertTriangle,
  Loader2,
  RefreshCw,
  ArrowLeft,
  LayoutGrid,
  List
} from 'lucide-react';
import { useCollegePortfolios, useStudentPortfolioDetail } from '@/hooks/college/useCollegePortfolios';
import StudentPortfolioCard from './StudentPortfolioCard';
import CoverageMatrixView from './CoverageMatrixView';
import PortfolioReviewQueue from './PortfolioReviewQueue';
import SubmissionReviewPanel from './SubmissionReviewPanel';
import IQASamplingPanel from './IQASamplingPanel';
import EPAGatewayChecklist from './EPAGatewayChecklist';
import StudentRequirementsPanel from './StudentRequirementsPanel';

type ViewMode = 'list' | 'student-detail' | 'submission-review';

const CollegePortfolioHub: React.FC = () => {
  const {
    studentPortfolios,
    portfoliosAwaitingReview,
    atRiskStudents,
    stats,
    isLoading,
    refetch
  } = useCollegePortfolios();

  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; qualificationId: string } | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  // Fetch student detail when selected
  const { portfolioDetail, isLoading: detailLoading } = useStudentPortfolioDetail(
    selectedStudent?.id || '',
    selectedStudent?.qualificationId || ''
  );

  const filteredPortfolios = studentPortfolios.filter(portfolio => {
    const matchesSearch = searchTerm === '' ||
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
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
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
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold">
              {portfolioDetail?.studentName || 'Loading...'}
            </h2>
            <p className="text-sm text-white/60">
              {portfolioDetail?.qualificationTitle}
            </p>
          </div>
        </div>

        {detailLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
          </div>
        ) : portfolioDetail ? (
          <Tabs defaultValue="coverage">
            <TabsList className="bg-white/5 border border-elec-gray/40">
              <TabsTrigger value="coverage">Coverage Matrix</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="gateway">EPA Gateway</TabsTrigger>
            </TabsList>

            <TabsContent value="coverage" className="mt-4">
              <CoverageMatrixView
                coverageMatrix={portfolioDetail.coverageMatrix}
                ksbMappings={portfolioDetail.portfolioItems.flatMap(item => item.ksbMappings)}
                studentName={portfolioDetail.studentName}
                qualificationTitle={portfolioDetail.qualificationTitle}
              />
            </TabsContent>

            <TabsContent value="requirements" className="mt-4">
              <StudentRequirementsPanel
                studentId={selectedStudent.id}
                qualificationId={selectedStudent.qualificationId}
              />
            </TabsContent>

            <TabsContent value="gateway" className="mt-4">
              <EPAGatewayChecklist
                studentId={selectedStudent.id}
                qualificationId={selectedStudent.qualificationId}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="bg-white/5 border-elec-gray/40">
            <CardContent className="py-12 text-center">
              <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <p className="text-white/70">Unable to load student portfolio</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Main Hub View
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <FileCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">Active</p>
                <p className="text-2xl font-bold">{stats.activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <ClipboardCheck className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">Awaiting Review</p>
                <p className="text-2xl font-bold">{stats.awaitingReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">At Risk</p>
                <p className="text-2xl font-bold">{stats.atRiskStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <Award className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-xs text-white/60">Completed</p>
                <p className="text-2xl font-bold">{stats.completedStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <TabsList className="bg-white/5 border border-elec-gray/40">
            <TabsTrigger value="overview">All Students</TabsTrigger>
            <TabsTrigger value="review">
              Review Queue
              {stats.awaitingReview > 0 && (
                <Badge className="ml-2 bg-amber-500/20 text-amber-400">{stats.awaitingReview}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="iqa">IQA Sampling</TabsTrigger>
          </TabsList>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="border-elec-gray/40"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Overview Tab - All Students */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-white/5 border-elec-gray/40"
              />
            </div>
            <Select value={statusFilter || ''} onValueChange={(v) => setStatusFilter(v || null)}>
              <SelectTrigger className="w-full sm:w-40 bg-white/5 border-elec-gray/40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-gray/40">
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="at_risk">At Risk</SelectItem>
                <SelectItem value="on_break">On Break</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border border-elec-gray/40 rounded-md">
              <Button
                variant={displayMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setDisplayMode('grid')}
                className="rounded-r-none"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={displayMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setDisplayMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* At Risk Alert */}
          {atRiskStudents.length > 0 && (
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <div>
                    <p className="font-medium text-red-300">
                      {atRiskStudents.length} student{atRiskStudents.length > 1 ? 's' : ''} at risk
                    </p>
                    <p className="text-sm text-white/60">
                      These students may need additional support
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Student Grid/List */}
          {filteredPortfolios.length === 0 ? (
            <Card className="bg-white/5 border-elec-gray/40">
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/50">
                  {studentPortfolios.length === 0
                    ? 'No students assigned to you yet'
                    : 'No students match your search'}
                </p>
              </CardContent>
            </Card>
          ) : displayMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPortfolios.map(portfolio => (
                <StudentPortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  onViewDetails={handleViewDetails}
                  onReviewSubmissions={(studentId) => {
                    setActiveTab('review');
                  }}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-white/5 border-elec-gray/40">
              <CardContent className="p-0">
                <div className="divide-y divide-elec-gray/40">
                  {filteredPortfolios.map(portfolio => (
                    <div
                      key={portfolio.id}
                      className="p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors"
                      onClick={() => handleViewDetails(portfolio.studentId, portfolio.qualificationId)}
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{portfolio.studentName}</p>
                          <p className="text-sm text-white/60">{portfolio.qualificationTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{portfolio.completionPercentage}%</p>
                          <p className="text-xs text-white/50">Complete</p>
                        </div>
                        {portfolio.submissionsAwaitingReview > 0 && (
                          <Badge className="bg-amber-500/20 text-amber-400">
                            {portfolio.submissionsAwaitingReview} to review
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Review Queue Tab */}
        <TabsContent value="review" className="mt-4">
          <PortfolioReviewQueue
            onViewSubmission={handleViewSubmission}
            onStartReview={handleViewSubmission}
          />
        </TabsContent>

        {/* IQA Tab */}
        <TabsContent value="iqa" className="mt-4">
          <IQASamplingPanel onViewSubmission={handleViewSubmission} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegePortfolioHub;
