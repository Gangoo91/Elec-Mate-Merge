/**
 * IQAWorkflowSection — Internal Quality Assurance workflow management.
 * Sampling plans, findings & actions, standardisation meetings, EQA preparation.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Search,
  Users,
  Target,
  Calendar,
  ChevronRight,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck,
  Shield,
  BarChart3,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';

interface IQAWorkflowSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

type FindingType = 'Good Practice' | 'Area for Improvement' | 'Action Required';
type FindingStatus = 'Open' | 'Closed';

interface Finding {
  id: string;
  date: string;
  assessorName: string;
  findingType: FindingType;
  description: string;
  status: FindingStatus;
}

interface StandardisationMeeting {
  id: string;
  date: string;
  topic: string;
  attendeesCount: number;
  outcomeSummary: string;
}

interface EQACheckItem {
  id: string;
  label: string;
  checked: boolean;
}

export function IQAWorkflowSection({ onNavigate }: IQAWorkflowSectionProps) {
  const { staff, grades } = useCollegeSupabase();

  const assessors = staff.filter((s) => s.role === 'assessor' || s.role === 'tutor');

  // KPI data
  const totalAssessments = grades.length;
  const sampledCount = Math.round(totalAssessments * 0.1);
  const samplingRate = totalAssessments > 0 ? Math.round((sampledCount / totalAssessments) * 100) : 0;

  // Findings state
  const [findings, setFindings] = useState<Finding[]>([]);
  const [findingFilter, setFindingFilter] = useState<'All' | 'Open' | 'Closed'>('All');
  const [showAddFinding, setShowAddFinding] = useState(false);
  const [newFinding, setNewFinding] = useState({
    assessorName: '',
    findingType: 'Area for Improvement' as FindingType,
    description: '',
  });

  // Standardisation meetings state
  const [meetings, setMeetings] = useState<StandardisationMeeting[]>([]);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    topic: '',
    attendeesCount: 0,
    outcomeSummary: '',
  });

  // EQA Preparation state
  const [nextEQADate, setNextEQADate] = useState('');
  const [editingEQADate, setEditingEQADate] = useState(false);
  const [eqaChecklist, setEqaChecklist] = useState<EQACheckItem[]>([
    { id: '1', label: 'Sampling records up to date', checked: false },
    { id: '2', label: 'Standardisation minutes filed', checked: false },
    { id: '3', label: 'Action plan current', checked: false },
    { id: '4', label: 'Student portfolios quality checked', checked: false },
    { id: '5', label: 'Assessment decisions verified', checked: false },
  ]);

  // Sampling plan — per-assessor breakdown
  const assessorSampling = assessors.map((assessor) => {
    const assessorGrades = grades.filter((g) => g.assessed_by === assessor.id);
    const total = assessorGrades.length;
    const sampled = Math.round(total * 0.1);
    const percent = total > 0 ? Math.round((sampled / total) * 100) : 0;
    return {
      id: assessor.id,
      name: assessor.name,
      totalAssessments: total,
      sampledCount: sampled,
      percentSampled: percent,
      onTarget: percent >= 10,
    };
  });

  const openActions = findings.filter((f) => f.status === 'Open').length;

  const filteredFindings = findings.filter((f) => {
    if (findingFilter === 'All') return true;
    return f.status === findingFilter;
  });

  const handleAddFinding = () => {
    if (!newFinding.description.trim()) return;
    const finding: Finding = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      assessorName: newFinding.assessorName || 'Unspecified',
      findingType: newFinding.findingType,
      description: newFinding.description,
      status: 'Open',
    };
    setFindings((prev) => [finding, ...prev]);
    setNewFinding({ assessorName: '', findingType: 'Area for Improvement', description: '' });
    setShowAddFinding(false);
  };

  const handleToggleFindingStatus = (id: string) => {
    setFindings((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: f.status === 'Open' ? 'Closed' : 'Open' } : f
      )
    );
  };

  const handleAddMeeting = () => {
    if (!newMeeting.topic.trim()) return;
    const meeting: StandardisationMeeting = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      topic: newMeeting.topic,
      attendeesCount: newMeeting.attendeesCount,
      outcomeSummary: newMeeting.outcomeSummary,
    };
    setMeetings((prev) => [meeting, ...prev]);
    setNewMeeting({ topic: '', attendeesCount: 0, outcomeSummary: '' });
    setShowAddMeeting(false);
  };

  const handleToggleCheckItem = (id: string) => {
    setEqaChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = eqaChecklist.filter((c) => c.checked).length;

  const getFindingTypeColor = (type: FindingType) => {
    switch (type) {
      case 'Good Practice':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Area for Improvement':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Action Required':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* KPI Strip */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2">
        {[
          { value: `${samplingRate}%`, label: 'Sampling', icon: BarChart3, color: 'text-blue-400' },
          { value: openActions, label: 'Actions', icon: AlertTriangle, color: openActions > 0 ? 'text-amber-400' : 'text-emerald-400' },
          { value: meetings.length, label: 'Std. Meetings', icon: Users, color: 'text-purple-400' },
          { value: nextEQADate ? new Date(nextEQADate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'TBC', label: 'Next EQA', icon: Calendar, color: 'text-cyan-400' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="card-surface p-3 flex flex-col items-center touch-manipulation"
          >
            <stat.icon className={cn('h-4 w-4 mb-1', stat.color)} />
            <span className={cn('text-lg font-bold', stat.color)}>{stat.value}</span>
            <span className="text-[10px] text-white uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Sampling Plan */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Sampling Plan</h2>
        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-30" />
          <div className="relative z-10 p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Target className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">10% of each assessor's decisions</p>
                <p className="text-[11px] text-white">{assessors.length} assessors to sample this month</p>
              </div>
            </div>

            {assessors.length === 0 ? (
              <p className="text-sm text-white text-center py-4">No assessors found. Add staff with the assessor or tutor role.</p>
            ) : (
              <div className="space-y-2">
                {assessorSampling.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{a.name}</p>
                      <p className="text-[11px] text-white">
                        {a.sampledCount}/{a.totalAssessments} sampled ({a.percentSampled}%)
                      </p>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-semibold border',
                        a.onTarget
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      )}
                    >
                      {a.onTarget ? 'On Target' : 'Below Target'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Findings & Actions */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Findings & Actions</h2>
          <button
            onClick={() => setShowAddFinding(!showAddFinding)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elec-yellow text-black text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Finding
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2">
          {(['All', 'Open', 'Closed'] as const).map((pill) => (
            <button
              key={pill}
              onClick={() => setFindingFilter(pill)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px] flex items-center',
                findingFilter === pill
                  ? 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30'
                  : 'bg-white/[0.02] text-white border-white/[0.06]'
              )}
            >
              {pill} {pill === 'Open' && openActions > 0 && `(${openActions})`}
            </button>
          ))}
        </div>

        {/* Add Finding Form */}
        {showAddFinding && (
          <div className="card-surface overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-400 opacity-30" />
            <div className="relative z-10 p-4 space-y-3">
              <input
                type="text"
                placeholder="Assessor name"
                value={newFinding.assessorName}
                onChange={(e) => setNewFinding((p) => ({ ...p, assessorName: e.target.value }))}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
              />
              <select
                value={newFinding.findingType}
                onChange={(e) => setNewFinding((p) => ({ ...p, findingType: e.target.value as FindingType }))}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
              >
                <option value="Good Practice">Good Practice</option>
                <option value="Area for Improvement">Area for Improvement</option>
                <option value="Action Required">Action Required</option>
              </select>
              <textarea
                placeholder="Description of finding..."
                value={newFinding.description}
                onChange={(e) => setNewFinding((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white focus:border-elec-yellow/40 focus:outline-none touch-manipulation resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddFinding}
                  className="flex-1 h-11 rounded-lg bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
                >
                  Save Finding
                </button>
                <button
                  onClick={() => setShowAddFinding(false)}
                  className="h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm touch-manipulation active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Findings List */}
        {filteredFindings.length === 0 ? (
          <div className="card-surface p-6 text-center">
            <p className="text-sm text-white">No findings recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFindings.map((finding) => (
              <button
                key={finding.id}
                onClick={() => handleToggleFindingStatus(finding.id)}
                className="w-full text-left touch-manipulation"
              >
                <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all">
                  <div className={cn(
                    'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30',
                    finding.findingType === 'Good Practice' ? 'from-emerald-500 to-green-400' :
                    finding.findingType === 'Area for Improvement' ? 'from-amber-500 to-orange-400' :
                    'from-red-500 to-rose-400'
                  )} />
                  <div className="relative z-10 p-3.5 flex items-start gap-3">
                    <div className={cn(
                      'p-2 rounded-xl border',
                      finding.findingType === 'Good Practice' ? 'bg-emerald-500/10 border-emerald-500/20' :
                      finding.findingType === 'Area for Improvement' ? 'bg-amber-500/10 border-amber-500/20' :
                      'bg-red-500/10 border-red-500/20'
                    )}>
                      {finding.status === 'Closed' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : finding.findingType === 'Action Required' ? (
                        <XCircle className="h-4 w-4 text-red-400" />
                      ) : (
                        <AlertTriangle className={cn(
                          'h-4 w-4',
                          finding.findingType === 'Good Practice' ? 'text-emerald-400' : 'text-amber-400'
                        )} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold border', getFindingTypeColor(finding.findingType))}>
                          {finding.findingType}
                        </span>
                        <span className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-semibold border',
                          finding.status === 'Open' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        )}>
                          {finding.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">{finding.assessorName}</p>
                      <p className="text-[11px] text-white line-clamp-2">{finding.description}</p>
                      <p className="text-[10px] text-white mt-1">{finding.date}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center shrink-0 mt-1">
                      <ChevronRight className="w-3.5 h-3.5 text-elec-yellow" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.section>

      {/* Standardisation Meetings */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Standardisation Meetings</h2>
          <button
            onClick={() => setShowAddMeeting(!showAddMeeting)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elec-yellow text-black text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]"
          >
            <Plus className="h-3.5 w-3.5" />
            Record Meeting
          </button>
        </div>

        {/* Add Meeting Form */}
        {showAddMeeting && (
          <div className="card-surface overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 opacity-30" />
            <div className="relative z-10 p-4 space-y-3">
              <input
                type="text"
                placeholder="Meeting topic"
                value={newMeeting.topic}
                onChange={(e) => setNewMeeting((p) => ({ ...p, topic: e.target.value }))}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
              />
              <input
                type="number"
                placeholder="Number of attendees"
                value={newMeeting.attendeesCount || ''}
                onChange={(e) => setNewMeeting((p) => ({ ...p, attendeesCount: parseInt(e.target.value) || 0 }))}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
              />
              <textarea
                placeholder="Outcome summary..."
                value={newMeeting.outcomeSummary}
                onChange={(e) => setNewMeeting((p) => ({ ...p, outcomeSummary: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white focus:border-elec-yellow/40 focus:outline-none touch-manipulation resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddMeeting}
                  className="flex-1 h-11 rounded-lg bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
                >
                  Save Meeting
                </button>
                <button
                  onClick={() => setShowAddMeeting(false)}
                  className="h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm touch-manipulation active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {meetings.length === 0 ? (
          <div className="card-surface p-6 text-center">
            <p className="text-sm text-white">No standardisation meetings recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="card-surface-interactive overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 opacity-30" />
                <div className="relative z-10 p-3.5 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Users className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{meeting.topic}</p>
                    <p className="text-[11px] text-white">{meeting.attendeesCount} attendees</p>
                    {meeting.outcomeSummary && (
                      <p className="text-[11px] text-white line-clamp-1 mt-0.5">{meeting.outcomeSummary}</p>
                    )}
                  </div>
                  <span className="text-[10px] text-white shrink-0">{meeting.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* EQA Preparation */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">EQA Preparation</h2>
        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400 opacity-30" />
          <div className="relative z-10 p-4 space-y-4">
            {/* Next EQA Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Shield className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Next EQA Visit</p>
                  {editingEQADate ? (
                    <input
                      type="date"
                      value={nextEQADate}
                      onChange={(e) => setNextEQADate(e.target.value)}
                      onBlur={() => setEditingEQADate(false)}
                      autoFocus
                      className="h-11 px-2 mt-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
                    />
                  ) : (
                    <button
                      onClick={() => setEditingEQADate(true)}
                      className="text-[11px] text-elec-yellow underline touch-manipulation h-11 min-h-[44px] flex items-center"
                    >
                      {nextEQADate
                        ? new Date(nextEQADate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                        : 'Set date'}
                    </button>
                  )}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {checkedCount}/{eqaChecklist.length} ready
              </span>
            </div>

            {/* Evidence Checklist */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-white uppercase tracking-wider">Required Evidence</p>
              {eqaChecklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleToggleCheckItem(item.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]"
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all',
                      item.checked
                        ? 'bg-elec-yellow border-elec-yellow'
                        : 'border-white/20 bg-white/[0.02]'
                    )}
                  >
                    {item.checked && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <span className={cn('text-sm text-white', item.checked && 'line-through opacity-60')}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
