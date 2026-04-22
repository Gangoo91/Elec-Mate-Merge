/**
 * IQAWorkflowSection — Internal Quality Assurance workflow management.
 * Sampling plans, findings & actions, standardisation meetings, EQA preparation.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  ListCard,
  ListRow,
  SectionHeader,
  Pill,
  EmptyState,
  type Tone,
} from '@/components/college/primitives';

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-10 sm:space-y-14 pb-12"
    >
      {/* Hero */}
      <motion.div variants={itemVariants}>
        <div className="pt-6 sm:pt-8 lg:pt-10 pb-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
            Tools · IQA Workflow
          </div>
          <h1 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
            Internal quality assurance
          </h1>
          <p className="mt-3 text-[13px] sm:text-sm text-white/55 max-w-2xl leading-relaxed">
            Sampling plan, standardisation meetings, action tracking and external assessment dates.
          </p>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {[
            { value: `${samplingRate}%`, label: 'Sampling', sub: 'Of assessor work', color: 'text-blue-400' },
            {
              value: openActions,
              label: 'Actions',
              sub: 'Open items',
              color: openActions > 0 ? 'text-amber-400' : 'text-emerald-400',
            },
            { value: meetings.length, label: 'Std. Meetings', sub: 'This quarter', color: 'text-purple-400' },
            {
              value: nextEQADate
                ? new Date(nextEQADate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                : 'TBC',
              label: 'Next EQA',
              sub: 'External assessment',
              color: 'text-cyan-400',
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[hsl(0_0%_12%)] px-5 py-6 sm:px-6 sm:py-8 lg:px-7 lg:py-9"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                {String(i + 1).padStart(2, '0')} · {stat.label}
              </div>
              <div
                className={cn(
                  'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                  'text-3xl sm:text-4xl lg:text-5xl',
                  stat.color
                )}
              >
                {stat.value}
              </div>
              <div className="mt-3 text-[11px] text-white/50">{stat.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Sampling Plan */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Sampling Plan"
          title="10% of each assessor's decisions"
        />
        {assessors.length === 0 ? (
          <EmptyState
            title="No assessors found"
            description="Add staff with the assessor or tutor role to start sampling."
          />
        ) : (
          <ListCard>
            {assessorSampling.map((a) => (
              <ListRow
                key={a.id}
                title={a.name}
                subtitle={`${a.sampledCount} of ${a.totalAssessments} sampled · ${a.percentSampled}%`}
                trailing={
                  <Pill tone={a.onTarget ? 'green' : 'amber'}>
                    {a.onTarget ? 'On target' : 'Below target'}
                  </Pill>
                }
              />
            ))}
          </ListCard>
        )}
      </motion.section>

      {/* Findings & Actions */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="IQA Findings"
          title="Findings & actions"
          action={showAddFinding ? 'Cancel' : 'Add finding'}
          onAction={() => setShowAddFinding(!showAddFinding)}
        />

        <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full w-fit">
          {(['All', 'Open', 'Closed'] as const).map((pill) => (
            <button
              key={pill}
              onClick={() => setFindingFilter(pill)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation',
                findingFilter === pill
                  ? 'bg-elec-yellow text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              {pill}
              {pill === 'Open' && openActions > 0 && (
                <span
                  className={cn(
                    'ml-1.5 tabular-nums text-[11px]',
                    findingFilter === pill ? 'text-black/60' : 'text-white/40'
                  )}
                >
                  {openActions}
                </span>
              )}
            </button>
          ))}
        </div>

        {showAddFinding && (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              New finding
            </div>
            <input
              type="text"
              placeholder="Assessor name"
              value={newFinding.assessorName}
              onChange={(e) => setNewFinding((p) => ({ ...p, assessorName: e.target.value }))}
              className="w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            />
            <select
              value={newFinding.findingType}
              onChange={(e) => setNewFinding((p) => ({ ...p, findingType: e.target.value as FindingType }))}
              className="w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            >
              <option value="Good Practice">Good Practice</option>
              <option value="Area for Improvement">Area for Improvement</option>
              <option value="Action Required">Action Required</option>
            </select>
            <textarea
              placeholder="Description of finding…"
              value={newFinding.description}
              onChange={(e) => setNewFinding((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation resize-none"
            />
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                onClick={() => setShowAddFinding(false)}
                className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFinding}
                disabled={!newFinding.description.trim()}
                className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[12.5px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
              >
                Save finding →
              </button>
            </div>
          </div>
        )}

        {filteredFindings.length === 0 ? (
          <EmptyState title="No findings recorded yet" />
        ) : (
          <ListCard>
            {filteredFindings.map((finding) => {
              const typeTone: Tone =
                finding.findingType === 'Good Practice'
                  ? 'green'
                  : finding.findingType === 'Area for Improvement'
                    ? 'amber'
                    : 'red';
              return (
                <ListRow
                  key={finding.id}
                  onClick={() => handleToggleFindingStatus(finding.id)}
                  accent={typeTone}
                  title={finding.assessorName}
                  subtitle={finding.description.length > 80 ? finding.description.substring(0, 80) + '…' : finding.description}
                  trailing={
                    <>
                      <Pill tone={typeTone}>{finding.findingType}</Pill>
                      <Pill tone={finding.status === 'Open' ? 'amber' : 'green'}>
                        {finding.status}
                      </Pill>
                    </>
                  }
                />
              );
            })}
          </ListCard>
        )}
      </motion.section>

      {/* Standardisation Meetings */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Standardisation"
          title="Meetings & outcomes"
          action={showAddMeeting ? 'Cancel' : 'Record meeting'}
          onAction={() => setShowAddMeeting(!showAddMeeting)}
        />

        {showAddMeeting && (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              New meeting
            </div>
            <input
              type="text"
              placeholder="Meeting topic"
              value={newMeeting.topic}
              onChange={(e) => setNewMeeting((p) => ({ ...p, topic: e.target.value }))}
              className="w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            />
            <input
              type="number"
              placeholder="Number of attendees"
              value={newMeeting.attendeesCount || ''}
              onChange={(e) =>
                setNewMeeting((p) => ({ ...p, attendeesCount: parseInt(e.target.value) || 0 }))
              }
              className="w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            />
            <textarea
              placeholder="Outcome summary…"
              value={newMeeting.outcomeSummary}
              onChange={(e) => setNewMeeting((p) => ({ ...p, outcomeSummary: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation resize-none"
            />
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                onClick={() => setShowAddMeeting(false)}
                className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMeeting}
                disabled={!newMeeting.topic.trim()}
                className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[12.5px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
              >
                Save meeting →
              </button>
            </div>
          </div>
        )}

        {meetings.length === 0 ? (
          <EmptyState title="No standardisation meetings recorded yet" />
        ) : (
          <ListCard>
            {meetings.map((meeting) => (
              <ListRow
                key={meeting.id}
                accent="purple"
                title={meeting.topic}
                subtitle={`${meeting.attendeesCount} attendees${meeting.outcomeSummary ? ' · ' + meeting.outcomeSummary : ''}`}
                trailing={<span className="text-[11px] text-white/50 tabular-nums">{meeting.date}</span>}
              />
            ))}
          </ListCard>
        )}
      </motion.section>

      {/* EQA Preparation */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="External Assessment"
          title="EQA preparation"
          action={editingEQADate ? 'Save' : 'Edit date'}
          onAction={() => setEditingEQADate(!editingEQADate)}
        />

        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Next EQA Visit
              </div>
              {editingEQADate ? (
                <input
                  type="date"
                  value={nextEQADate}
                  onChange={(e) => setNextEQADate(e.target.value)}
                  onBlur={() => setEditingEQADate(false)}
                  autoFocus
                  className="mt-2 h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                />
              ) : (
                <div className="mt-1 text-lg sm:text-xl font-semibold text-white tabular-nums">
                  {nextEQADate
                    ? new Date(nextEQADate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Not set'}
                </div>
              )}
            </div>
            <Pill tone={checkedCount === eqaChecklist.length ? 'green' : 'cyan'}>
              {checkedCount}/{eqaChecklist.length} ready
            </Pill>
          </div>

          <div className="pt-5 border-t border-white/[0.06]">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 mb-3">
              Required Evidence
            </div>
            <div className="space-y-1.5">
              {eqaChecklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleToggleCheckItem(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/[0.03] transition-colors text-left touch-manipulation"
                >
                  <div
                    className={cn(
                      'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all',
                      item.checked
                        ? 'bg-elec-yellow border-elec-yellow'
                        : 'border-white/20 bg-transparent'
                    )}
                  >
                    {item.checked && (
                      <span className="text-[9px] font-bold text-black leading-none">✓</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-[13px] text-white transition-opacity',
                      item.checked && 'line-through opacity-50'
                    )}
                  >
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
