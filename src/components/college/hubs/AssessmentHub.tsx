import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CollegeFeatureTile } from '@/components/college/CollegeFeatureTile';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { Button } from '@/components/ui/button';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { RecordGradeSheet } from '@/components/college/sheets/RecordGradeSheet';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { usePendingGrades } from '@/hooks/college/useCollegeGrades';
import { useOverdueILPReviews } from '@/hooks/college/useCollegeILP';
import { useCollegeEPAs } from '@/hooks/college/useCollegeEPA';
import { useCollegeAttendance } from '@/hooks/college/useCollegeAttendance';
import { useWorkQueue } from '@/hooks/college/useWorkQueue';
import { useQueryClient } from '@tanstack/react-query';
import {
  CheckSquare,
  Clock,
  Target,
  Award,
  TrendingUp,
  FolderOpen,
  Inbox,
  Plus,
  Sparkles,
} from 'lucide-react';

interface AssessmentHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function AssessmentHub({ onNavigate }: AssessmentHubProps) {
  const { data: pendingGrades = [] } = usePendingGrades();
  const { data: overdueILPs = [] } = useOverdueILPReviews();
  const { data: epaRecords = [] } = useCollegeEPAs();
  const { data: attendance = [] } = useCollegeAttendance();
  const { stats: workStats } = useWorkQueue();
  const { staggerContainer, staggerItem } = useHapticFeedback();
  const queryClient = useQueryClient();
  const [gradeSheetOpen, setGradeSheetOpen] = useState(false);

  const handleRefresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['college-grades'] }),
      queryClient.invalidateQueries({ queryKey: ['college-ilps'] }),
      queryClient.invalidateQueries({ queryKey: ['college-epa'] }),
      queryClient.invalidateQueries({ queryKey: ['college-attendance'] }),
    ]);
  };

  const pendingAssessments = pendingGrades.length;
  const overdueILPReviews = overdueILPs.length;
  const studentsAtGateway = epaRecords.filter(
    (e) => e.status === 'Pre-Gateway' || e.status === 'Gateway Ready'
  ).length;
  const pendingWork = workStats.total;
  const avgAttendance =
    attendance.length > 0
      ? Math.round(
          (attendance.filter((a) => a.status === 'Present' || a.status === 'Late').length /
            attendance.length) *
            100
        )
      : 0;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <motion.div
        className="space-y-4 md:space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <CollegeSectionHeader
          title="Assessment Hub"
          description="Track grades, attendance, ILPs and EPA progress"
          action={
            <Button
              className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black h-11 touch-manipulation"
              onClick={() => setGradeSheetOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Record Grade
            </Button>
          }
        />

        {/* Quick Stats */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-warning/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-warning via-orange-400 to-warning/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/20 shadow-lg shadow-warning/5 group-hover:scale-110 transition-transform duration-300">
                <CheckSquare className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{pendingAssessments}</p>
                <p className="text-xs text-white">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-success/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-success via-green-400 to-success/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20 shadow-lg shadow-success/5 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{avgAttendance}%</p>
                <p className="text-xs text-white">Attendance</p>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-elec-yellow/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{studentsAtGateway}</p>
                <p className="text-xs text-white">Gateway</p>
              </div>
            </CardContent>
          </Card>
          {overdueILPReviews > 0 && (
            <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-warning/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-warning via-orange-400 to-warning/50" />
              <CardContent className="p-3 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/20 shadow-lg shadow-warning/5 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{overdueILPReviews}</p>
                  <p className="text-xs text-white">Overdue ILPs</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Grading & Attendance */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full"></span>
            Grading & Attendance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CollegeFeatureTile
              icon={CheckSquare}
              title="Grading"
              description="Mark assessments & record grades"
              onClick={() => onNavigate('grading')}
              badge={pendingAssessments > 0 ? `${pendingAssessments} pending` : undefined}
              badgeVariant="warning"
            />
            <CollegeFeatureTile
              icon={Clock}
              title="Attendance"
              description="Record & track attendance"
              onClick={() => onNavigate('attendance')}
              badge={`${avgAttendance}%`}
              badgeVariant="success"
            />
          </div>
        </motion.div>

        {/* Progress & ILP */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-info to-blue-500 rounded-full"></span>
            Progress & Learning Plans
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <CollegeFeatureTile
              icon={Target}
              title="ILP Management"
              description="Learning plans & reviews"
              onClick={() => onNavigate('ilpmanagement')}
              badge={overdueILPReviews > 0 ? `${overdueILPReviews} overdue` : undefined}
              badgeVariant="warning"
              compact
            />
            <CollegeFeatureTile
              icon={TrendingUp}
              title="Progress Tracking"
              description="Student RAG status"
              onClick={() => onNavigate('progresstracking')}
              compact
            />
            <CollegeFeatureTile
              icon={FolderOpen}
              title="Portfolios"
              description="Evidence & submissions"
              onClick={() => onNavigate('portfolio')}
              compact
            />
          </div>
        </motion.div>

        {/* EPA Tracking */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-success to-green-500 rounded-full"></span>
            End Point Assessment
          </h2>
          <CollegeFeatureTile
            icon={Award}
            title="EPA Tracking"
            description="Gateway readiness & EPA progress"
            onClick={() => onNavigate('epatracking')}
            badge={studentsAtGateway > 0 ? `${studentsAtGateway} at gateway` : undefined}
            badgeVariant="success"
          />
        </motion.div>

        {/* Work Queue */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-warning to-orange-500 rounded-full"></span>
            Work Queue
          </h2>
          <CollegeFeatureTile
            icon={Inbox}
            title="Work Queue"
            description="Pending reviews & assignments"
            onClick={() => onNavigate('workqueue')}
            badge={pendingWork > 0 ? `${pendingWork} items` : undefined}
            badgeVariant="warning"
          />
        </motion.div>

        {/* AI-Powered */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full"></span>
            AI-Powered
          </h2>
          <CollegeFeatureTile
            icon={Sparkles}
            title="AI Portfolio Review"
            description="Analyse submissions against qualification criteria"
            onClick={() => onNavigate('portfolio')}
            badge="AI"
            badgeVariant="success"
          />
        </motion.div>

        <RecordGradeSheet open={gradeSheetOpen} onOpenChange={setGradeSheetOpen} />
      </motion.div>
    </PullToRefresh>
  );
}
