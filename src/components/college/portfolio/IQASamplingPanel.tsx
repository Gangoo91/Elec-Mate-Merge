import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIQASampling, SamplingCandidate, SamplingRecord } from '@/hooks/college/useIQASampling';
import {
  SectionHeader,
  StatStrip,
  ListCard,
  Pill,
  EmptyState,
  LoadingState,
  Eyebrow,
  Field,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  type Tone,
} from '@/components/college/primitives';

interface IQASamplingPanelProps {
  onViewSubmission?: (submissionId: string) => void;
}

const IQASamplingPanel: React.FC<IQASamplingPanelProps> = ({ onViewSubmission }) => {
  const {
    candidates,
    samplingRecords,
    stats,
    isLoading,
    sampleSubmission,
    completeVerification,
    refetchCandidates,
    refetchRecords,
  } = useIQASampling();

  const [activeTab, setActiveTab] = useState('candidates');
  const [selectedRecord, setSelectedRecord] = useState<SamplingRecord | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string>('');
  const [iqaNotes, setIqaNotes] = useState('');
  const [feedbackQuality, setFeedbackQuality] = useState<string>('');
  const [gradingAccuracy, setGradingAccuracy] = useState<string>('');
  const [actionRequired, setActionRequired] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSample = async (submissionId: string) => {
    await sampleSubmission.mutateAsync(submissionId);
  };

  const handleVerification = async () => {
    if (!selectedRecord || !verificationStatus) return;
    setIsSubmitting(true);
    try {
      await completeVerification.mutateAsync({
        recordId: selectedRecord.id,
        verificationStatus: verificationStatus as 'verified' | 'concerns_raised',
        notes: iqaNotes,
        feedbackQuality,
        gradingAccuracy,
        actionRequired,
      });
      setSelectedRecord(null);
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setVerificationStatus('');
    setIqaNotes('');
    setFeedbackQuality('');
    setGradingAccuracy('');
    setActionRequired('');
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const getStatusTone = (status: string): Tone => {
    switch (status) {
      case 'verified':
        return 'green';
      case 'concerns_raised':
        return 'red';
      default:
        return 'amber';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'concerns_raised':
        return 'Concerns Raised';
      default:
        return 'Pending';
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatStrip
        columns={5}
        stats={[
          { value: stats.pendingCandidates, label: 'To Sample', tone: 'blue' },
          { value: stats.pendingVerification, label: 'Pending Review', tone: 'amber' },
          { value: stats.verified, label: 'Verified', tone: 'green' },
          { value: stats.concernsRaised, label: 'Concerns', tone: 'red' },
          { value: stats.totalSampled, label: 'Total Sampled', accent: true },
        ]}
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between gap-3">
          <TabsList className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full p-1 h-auto">
            <TabsTrigger
              value="candidates"
              className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
            >
              Sampling Candidates
            </TabsTrigger>
            <TabsTrigger
              value="records"
              className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
            >
              Sampling Records
            </TabsTrigger>
          </TabsList>
          <button
            onClick={() => {
              refetchCandidates();
              refetchRecords();
            }}
            className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            Refresh →
          </button>
        </div>

        {/* Candidates */}
        <TabsContent value="candidates" className="mt-6 space-y-4">
          <div>
            <SectionHeader
              eyebrow="01 · Available"
              title="Submissions Available for Sampling"
            />
            <p className="mt-2 text-[13px] text-white">
              Select submissions to add to your IQA sampling queue
            </p>
          </div>

          {candidates.length === 0 ? (
            <EmptyState
              title="No submissions available for sampling"
              description="Signed-off submissions will appear here for IQA review."
            />
          ) : (
            <ListCard>
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="px-5 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-white truncate">
                      {candidate.studentName}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-white truncate">
                      {candidate.qualificationTitle} · {candidate.categoryName}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11.5px] text-white">
                      <span>Assessor: {candidate.assessorName}</span>
                      <span>·</span>
                      <span>Signed off {formatDate(candidate.signedOffAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Pill tone="indigo" className="capitalize">
                      {candidate.grade}
                    </Pill>
                    {onViewSubmission && (
                      <button
                        onClick={() => onViewSubmission(candidate.id)}
                        className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                      >
                        View
                      </button>
                    )}
                    <PrimaryButton size="sm" onClick={() => handleSample(candidate.id)}>
                      Sample
                    </PrimaryButton>
                  </div>
                </div>
              ))}
            </ListCard>
          )}
        </TabsContent>

        {/* Records */}
        <TabsContent value="records" className="mt-6 space-y-4">
          <div>
            <SectionHeader eyebrow="02 · Records" title="Sampling Records" />
            <p className="mt-2 text-[13px] text-white">
              Review and verify sampled submissions
            </p>
          </div>

          {samplingRecords.length === 0 ? (
            <EmptyState
              title="No sampling records yet"
              description="Sampled submissions will appear here for verification."
            />
          ) : (
            <ListCard>
              {samplingRecords.map((record) => (
                <div
                  key={record.id}
                  className="px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-white truncate">
                      {record.studentName}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-white truncate">
                      {record.categoryName} · Sampled {formatDate(record.sampledAt)}
                    </div>
                  </div>
                  <Pill tone={getStatusTone(record.verificationStatus)}>
                    {getStatusLabel(record.verificationStatus)}
                  </Pill>
                  <button
                    onClick={() => setSelectedRecord(record)}
                    className={
                      record.verificationStatus === 'pending'
                        ? 'h-10 px-4 bg-elec-yellow text-black rounded-full text-[12.5px] font-semibold hover:opacity-90 transition-opacity touch-manipulation'
                        : 'text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation'
                    }
                  >
                    {record.verificationStatus === 'pending' ? 'Review' : 'View'}
                  </button>
                </div>
              ))}
            </ListCard>
          )}
        </TabsContent>
      </Tabs>

      {/* Verification Sheet (converted from Dialog) */}
      <Sheet open={!!selectedRecord} onOpenChange={(open) => !open && setSelectedRecord(null)}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <SheetShell
            eyebrow="IQA"
            title="IQA Verification"
            description={`${selectedRecord?.studentName ?? ''} — ${selectedRecord?.categoryName ?? ''}`}
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => setSelectedRecord(null)}>
                  {selectedRecord?.verificationStatus === 'pending' ? 'Cancel' : 'Close'}
                </SecondaryButton>
                {selectedRecord?.verificationStatus === 'pending' && (
                  <PrimaryButton
                    fullWidth
                    disabled={!verificationStatus || isSubmitting}
                    onClick={handleVerification}
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit Verification'}
                  </PrimaryButton>
                )}
              </>
            }
          >
            {selectedRecord?.verificationStatus === 'pending' ? (
              <>
                <Field label="Verification Decision" required>
                  <Select value={verificationStatus} onValueChange={setVerificationStatus}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select decision" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="verified">Verified — Assessment Accurate</SelectItem>
                      <SelectItem value="concerns_raised">Concerns Raised</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Assessor Feedback Quality">
                  <Select value={feedbackQuality} onValueChange={setFeedbackQuality}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Rate feedback quality" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="adequate">Adequate</SelectItem>
                      <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Grading Accuracy">
                  <Select value={gradingAccuracy} onValueChange={setGradingAccuracy}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Rate grading accuracy" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="accurate">Accurate</SelectItem>
                      <SelectItem value="questionable">Questionable</SelectItem>
                      <SelectItem value="inaccurate">Inaccurate</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="IQA Notes">
                  <Textarea
                    placeholder="Add verification notes…"
                    value={iqaNotes}
                    onChange={(e) => setIqaNotes(e.target.value)}
                    className={textareaClass}
                  />
                </Field>

                {verificationStatus === 'concerns_raised' && (
                  <Field label="Action Required">
                    <Textarea
                      placeholder="Describe the action required…"
                      value={actionRequired}
                      onChange={(e) => setActionRequired(e.target.value)}
                      className={textareaClass}
                    />
                  </Field>
                )}
              </>
            ) : (
              <>
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl p-4">
                  <Eyebrow>Status</Eyebrow>
                  <div className="mt-1 text-[14px] font-medium text-white capitalize">
                    {selectedRecord?.verificationStatus.replace('_', ' ')}
                  </div>
                </div>
                {selectedRecord?.iqaNotes && (
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl p-4">
                    <Eyebrow>IQA Notes</Eyebrow>
                    <p className="mt-1 text-[13px] text-white leading-relaxed">
                      {selectedRecord.iqaNotes}
                    </p>
                  </div>
                )}
                {selectedRecord?.actionRequired && (
                  <div className="bg-[hsl(0_0%_12%)] border border-red-500/20 rounded-xl p-4">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-400">
                      Action Required
                    </div>
                    <p className="mt-1 text-[13px] text-white leading-relaxed">
                      {selectedRecord.actionRequired}
                    </p>
                  </div>
                )}
              </>
            )}
          </SheetShell>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default IQASamplingPanel;
