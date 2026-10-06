import { useState, useMemo, useEffect, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useElecIdProfiles, useCreateElecIdProfile } from '@/hooks/useElecId';
import { useEmployees } from '@/hooks/useEmployees';
import { ElecIdProfile, type ElecIdQualification } from '@/services/elecIdService';
import {
  isHeld,
  verificationSentence,
  ELEC_MATE_APPROVAL_EXPLAINER,
  type VerificationLevel,
} from '@/services/credentialsService';
import {
  useDeleteTeamCredential,
  useSetCredentialVerification,
  useSetEcsCardVerification,
} from '@/hooks/useCredentialStore';
import { VerificationBadge, ElecMateApprovalBadge } from '@/components/credentials/VerificationBadge';
import { VerifyCredentialSheet } from '@/components/credentials/VerifyCredentialSheet';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { useAuth } from '@/contexts/AuthContext';
import { ElecIDCard } from '@/components/employer/ElecIDCard';
import { ShareElecIDDialog } from '@/components/employer/dialogs/ShareElecIDDialog';
import { AddTrainingRecordDialog } from '@/components/employer/dialogs/AddTrainingRecordDialog';
import { ScanElecIDDialog } from '@/components/employer/dialogs/ScanElecIDDialog';
import { AddCertificationDialog } from '@/components/employer/dialogs/AddCertificationDialog';
import { AddSkillDialog } from '@/components/employer/dialogs/AddSkillDialog';
import { AddWorkHistoryDialog } from '@/components/employer/dialogs/AddWorkHistoryDialog';
import { CreateElecIDForEmployeeDialog } from '@/components/employer/dialogs/CreateElecIDForEmployeeDialog';
import { CompetenceMatrix } from '@/components/employer/CompetenceMatrix';
import { getQualificationLabel } from '@/data/uk-electrician-constants';
import { useCreateCommunication } from '@/hooks/useCommunications';
import { RefreshCw, QrCode, UserPlus, Loader2, Send } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Eyebrow,
  Divider,
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';

const getInitials = (name?: string | null): string => {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getCertStatus = (expiryDate: string | null): string => {
  if (!expiryDate) return 'Active';
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysUntil = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntil < 0) return 'Expired';
  if (daysUntil <= 30) return 'Warning';
  return 'Active';
};

const getEcsStatus = (expiryDate: string | null): string => {
  if (!expiryDate) return 'Active';
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysUntil = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntil < 0) return 'Expired';
  if (daysUntil <= 60) return 'Expiring';
  return 'Valid';
};

const formatDate = (value?: string | null): string => {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
};

type FilterValue = 'all' | 'checked' | 'unchecked' | 'expiring' | 'expired';

const statusToneMap: Record<string, Tone> = {
  Active: 'emerald',
  Valid: 'emerald',
  Warning: 'orange',
  Expiring: 'orange',
  Expired: 'red',
};

const skillLevelTone: Record<string, Tone> = {
  beginner: 'cyan',
  intermediate: 'blue',
  advanced: 'yellow',
  expert: 'emerald',
};

/** A wrapping row for credential items — ListRow truncates to one line, which
 *  hid the verification badge and the "who checked it" sentence on a phone. */
function CredentialRow({
  title,
  lines,
  badges,
  onClick,
}: {
  title: string;
  lines: string[];
  badges: ReactNode;
  onClick?: () => void;
}) {
  const body = (
    <>
      <div className="text-[14px] font-medium text-white leading-snug">{title}</div>
      {lines.map((l, i) => (
        <div key={i} className="mt-0.5 text-[12px] text-white leading-snug">
          {l}
        </div>
      ))}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">{badges}</div>
    </>
  );
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left px-4 sm:px-5 py-3.5 touch-manipulation hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-colors border-b border-white/[0.06] last:border-b-0"
    >
      {body}
    </button>
  ) : (
    <div className="px-4 sm:px-5 py-3.5 border-b border-white/[0.06] last:border-b-0">{body}</div>
  );
}

export const ElecIDSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { data: profiles, isLoading, refetch } = useElecIdProfiles();
  const { data: employees } = useEmployees();
  const setItemVerification = useSetCredentialVerification();
  const setEcsVerification = useSetEcsCardVerification();
  const deleteTeamCredential = useDeleteTeamCredential();
  const { user } = useAuth();
  // The firm I act for — items it recorded can be removed by the office
  const [actingFirmId, setActingFirmId] = useState<string | null>(null);
  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    getActingEmployerId(user.id).then((id) => {
      if (!cancelled) setActingFirmId(id ?? user.id);
    });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);
  // What the verify sheet is checking: one store item, or the ECS card
  const [checking, setChecking] = useState<
    { kind: 'item'; item: ElecIdQualification } | { kind: 'ecs' } | null
  >(null);
  const createElecIdProfile = useCreateElecIdProfile();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterValue>('all');
  // Workers = per-person credential view; Matrix = the workforce competence
  // grid principal contractors ask for (with PDF/CSV export)
  const [view, setView] = useState<'workers' | 'matrix'>('workers');
  const [selectedProfile, setSelectedProfile] = useState<ElecIdProfile | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [addTrainingDialogOpen, setAddTrainingDialogOpen] = useState(false);
  const [addSkillDialogOpen, setAddSkillDialogOpen] = useState(false);
  const [addWorkHistoryDialogOpen, setAddWorkHistoryDialogOpen] = useState(false);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [createElecIdSheetOpen, setCreateElecIdSheetOpen] = useState(false);
  const [createElecIdDialogOpen, setCreateElecIdDialogOpen] = useState(false);
  const [selectedEmployeeForElecId, setSelectedEmployeeForElecId] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [bulkCreating, setBulkCreating] = useState(false);

  const employeesWithoutElecId = useMemo(() => {
    if (!employees || !profiles) return [];
    const profileEmployeeIds = new Set(profiles.map((p) => p.employee_id));
    return employees.filter((emp) => !profileEmployeeIds.has(emp.id));
  }, [employees, profiles]);

  const effectiveSelectedProfile = useMemo(() => {
    // Re-resolve from the latest fetch so a recorded check or a new item shows
    // straight away (the stored object is a snapshot from when it was tapped)
    if (selectedProfile) {
      return profiles?.find((p) => p.id === selectedProfile.id) ?? selectedProfile;
    }
    if (profiles && profiles.length > 0) return profiles[0];
    return null;
  }, [selectedProfile, profiles]);

  // ONE store per person (ELE-1950): everything the worker holds is on their
  // Elec-ID — qualifications, cards, certificates and training. The office's
  // "Add qualification" and "Add training" write to the same place.
  const storeItems = useMemo(
    () => effectiveSelectedProfile?.qualifications ?? [],
    [effectiveSelectedProfile]
  );
  const employeeCerts = useMemo(
    () =>
      storeItems
        .filter((q) => isHeld({ training_status: q.training_status ?? null }))
        .map((q) => ({
          id: q.id,
          name: getQualificationLabel(q.qualification_name),
          issuing_body: q.awarding_body,
          certificate_number: q.certificate_number,
          issue_date: q.date_achieved,
          expiry_date: q.expiry_date,
          document_url: q.document_url ?? null,
        })),
    [storeItems]
  );

  // Deep link: ?member={employee_id} opens that worker's credential —
  // Worker-360's "View" lands here
  const [searchParams, setSearchParams] = useSearchParams();
  const memberParam = searchParams.get('member');
  useEffect(() => {
    if (!memberParam || !profiles || profiles.length === 0) return;
    const target = profiles.find((p) => p.employee_id === memberParam);
    if (target) {
      setSelectedProfile(target);
      if (isMobile) setSheetOpen(true);
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('member');
        return next;
      },
      { replace: true }
    );
  }, [memberParam, profiles, isMobile, setSearchParams]);

  // Every held, dated item across the team — feeds "Urgent attention"
  const allTraining = useMemo(
    () =>
      profiles?.flatMap((p) =>
        (p.qualifications ?? [])
          .filter((q) => q.expiry_date && isHeld({ training_status: q.training_status ?? null }))
          .map((q) => ({
            training_name: getQualificationLabel(q.qualification_name),
            expiry_date: q.expiry_date,
            workerName: p.employee?.name,
            workerId: p.employee_id,
            status: getCertStatus(q.expiry_date),
          }))
      ) || [],
    [profiles]
  );

  // Scoped to the worker whose panel is open — this list renders inside a
  // single worker's detail view, so showing the whole fleet's expiring
  // training there misattributed other people's problems to this worker
  const expiredItems = allTraining.filter(
    (t) => t.status === 'Expired' && t.workerId === effectiveSelectedProfile?.employee_id
  );
  const warningItems = allTraining.filter(
    (t) => t.status === 'Warning' && t.workerId === effectiveSelectedProfile?.employee_id
  );

  const totalCount = profiles?.length ?? 0;
  // "Checked" = the ECS card was at least seen by someone. The old "Verified"
  // count was the Elec-Mate profile approval, which never checked the card.
  const ecsCheckedCount =
    profiles?.filter((p) => (p.ecs_verification_level ?? 'self_declared') !== 'self_declared')
      .length ?? 0;

  const expiring30dCount = useMemo(() => {
    if (!profiles) return 0;
    const now = Date.now();
    return profiles.filter((p) => {
      if (!p.ecs_expiry_date) return false;
      const days = Math.ceil((new Date(p.ecs_expiry_date).getTime() - now) / (1000 * 60 * 60 * 24));
      return days >= 0 && days <= 30;
    }).length;
  }, [profiles]);

  const expiredCount = useMemo(() => {
    if (!profiles) return 0;
    const now = Date.now();
    return profiles.filter((p) => {
      if (!p.ecs_expiry_date) return false;
      return new Date(p.ecs_expiry_date).getTime() < now;
    }).length;
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    const list = profiles ?? [];
    const query = searchQuery.trim().toLowerCase();
    const now = Date.now();
    return list.filter((p) => {
      if (query) {
        const haystack = `${p.employee?.name ?? ''} ${p.employee?.role ?? ''} ${p.elec_id_number ?? ''}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (filterTab === 'all') return true;
      const ecsChecked = (p.ecs_verification_level ?? 'self_declared') !== 'self_declared';
      if (filterTab === 'checked') return ecsChecked;
      if (filterTab === 'unchecked') return !ecsChecked;
      const expiry = p.ecs_expiry_date ? new Date(p.ecs_expiry_date).getTime() : null;
      if (filterTab === 'expiring') {
        if (expiry === null) return false;
        const days = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
        return days >= 0 && days <= 30;
      }
      if (filterTab === 'expired') {
        return expiry !== null && expiry < now;
      }
      return true;
    });
  }, [profiles, searchQuery, filterTab]);

  const workerName = effectiveSelectedProfile?.employee?.name || 'This worker';

  const saveCheck = async (level: VerificationLevel, method: string | null) => {
    if (!effectiveSelectedProfile || !checking) return;
    if (checking.kind === 'ecs') {
      await setEcsVerification.mutateAsync({
        profileId: effectiveSelectedProfile.id,
        level,
        method,
      });
    } else {
      await setItemVerification.mutateAsync({ id: checking.item.id, level, method });
    }
    toast({
      title: level === 'self_declared' ? 'Check cleared' : 'Check recorded',
      description:
        level === 'self_declared'
          ? 'It now shows as self-declared.'
          : 'Saved with your name and today\'s date.',
    });
  };

  // One-tap "nudge to renew" — a targeted high-priority comms message listing
  // exactly what this worker must renew. Rides the existing comms rails, so
  // the DB push triggers deliver it to their phone; before this, expiring
  // credentials only glowed amber at the employer and never reached the worker.
  const createCommunication = useCreateCommunication();
  const handleNudgeRenewals = async () => {
    const p = effectiveSelectedProfile;
    if (!p) return;
    const lines: string[] = [];
    const ecsStatus = getEcsStatus(p.ecs_expiry_date);
    if (p.ecs_expiry_date && (ecsStatus === 'Expired' || ecsStatus === 'Expiring')) {
      lines.push(
        `• ECS card${p.ecs_card_type ? ` (${p.ecs_card_type})` : ''} — ${
          ecsStatus === 'Expired' ? 'EXPIRED' : `expires ${formatDate(p.ecs_expiry_date)}`
        }`
      );
    }
    // Renewed-already guard: if the worker holds a current record with the
    // same name (the 2026 First Aid superseding the expired 2023 row), the
    // newest expiry governs — don't nag them about the old record. Also
    // dedupe repeated names so one credential never becomes three bullets.
    const norm = (s: string) => s.trim().toLowerCase();
    const currentNames = new Set<string>([
      ...allTraining
        .filter((t) => t.workerId === p.employee_id && t.status === 'Active')
        .map((t) => norm(t.training_name)),
      ...employeeCerts
        .filter((c) => getCertStatus(c.expiry_date) === 'Active')
        .map((c) => norm(c.name)),
    ]);
    const listed = new Set<string>();
    for (const t of [...expiredItems, ...warningItems]) {
      const key = norm(t.training_name);
      if (currentNames.has(key) || listed.has(key)) continue;
      listed.add(key);
      lines.push(
        `• ${t.training_name} — ${
          t.status === 'Expired' ? 'EXPIRED' : `expires ${formatDate(t.expiry_date)}`
        }`
      );
    }
    for (const c of employeeCerts) {
      const s = getCertStatus(c.expiry_date);
      if (s === 'Expired' || s === 'Warning') {
        const key = norm(c.name);
        if (currentNames.has(key) || listed.has(key)) continue;
        listed.add(key);
        lines.push(
          `• ${c.name} — ${s === 'Expired' ? 'EXPIRED' : `expires ${formatDate(c.expiry_date)}`}`
        );
      }
    }
    if (lines.length === 0) {
      toast({ title: 'Nothing to renew', description: 'All credentials are in date.' });
      return;
    }
    try {
      await createCommunication.mutateAsync({
        type: 'message',
        title: 'Credential renewal needed',
        content: `The following need renewing so you stay site-ready:\n\n${lines.join(
          '\n'
        )}\n\nPlease book the renewal and get the new certificate added to your record.`,
        priority: 'high',
        target_audience: 'specific',
        target_employee_ids: [p.employee_id],
        is_pinned: false,
        expires_at: null,
        sender_id: null,
        attachments: null,
      });
      toast({
        title: 'Renewal nudge sent',
        description: `${p.employee?.name || 'Worker'} has been asked to renew ${lines.length} credential${lines.length === 1 ? '' : 's'}.`,
      });
    } catch {
      toast({ title: 'Nudge failed', description: 'Message was not sent.', variant: 'destructive' });
    }
  };

  const handleProfileSelect = (profile: ElecIdProfile) => {
    setSelectedProfile(profile);
    if (isMobile) {
      setSheetOpen(true);
    }
  };

  const heroActions = (
    <>
      <PrimaryButton onClick={() => setCreateElecIdSheetOpen(true)}>Add credential</PrimaryButton>
      <SecondaryButton onClick={() => setScanDialogOpen(true)}>
        <QrCode className="h-4 w-4 mr-2" />
        Scan
      </SecondaryButton>
      <IconButton onClick={() => refetch()} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="People"
          title="Credentials"
          description="Elec-ID digital credentials — compliance, renewals and share links."
          tone="emerald"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const renderProfileDetail = () => {
    if (!effectiveSelectedProfile) return null;

    const ecsStatus = getEcsStatus(effectiveSelectedProfile.ecs_expiry_date);

    const cardProfile = {
      id: effectiveSelectedProfile.id,
      employeeId: effectiveSelectedProfile.employee_id,
      elecIdNumber: effectiveSelectedProfile.elec_id_number,
      name: effectiveSelectedProfile.employee?.name || 'Unknown',
      role: effectiveSelectedProfile.employee?.role || 'Electrician',
      photo: effectiveSelectedProfile.employee?.photo_url,
      bio: effectiveSelectedProfile.bio || '',
      // Real number from work history — every worker showing "0 years" was a
      // credibility hole on a shareable credential
      yearsExperience: (() => {
        const starts = (effectiveSelectedProfile.work_history ?? [])
          .map((w: { start_date?: string | null }) => w.start_date)
          .filter(Boolean) as string[];
        if (starts.length === 0) return 0;
        const earliest = starts.sort()[0];
        return Math.max(
          0,
          Math.floor((Date.now() - new Date(earliest).getTime()) / (365.25 * 24 * 3600 * 1000))
        );
      })(),
      ecsCardType: effectiveSelectedProfile.ecs_card_type || 'Not recorded',
      ecsCardNumber: effectiveSelectedProfile.ecs_card_number || '',
      ecsExpiry: effectiveSelectedProfile.ecs_expiry_date || '',
      ecsStatus,
      skills:
        effectiveSelectedProfile.skills?.map((s) => ({
          name: s.skill_name,
          level: (s.skill_level.charAt(0).toUpperCase() + s.skill_level.slice(1)) as
            | 'Beginner'
            | 'Intermediate'
            | 'Advanced'
            | 'Expert',
          yearsExperience: s.years_experience,
          verified: s.is_verified,
        })) || [],
      workHistory:
        effectiveSelectedProfile.work_history?.map((w) => ({
          id: w.id,
          employer: w.employer_name,
          role: w.job_title,
          location: '',
          startDate: w.start_date,
          endDate: w.end_date,
          isCurrent: w.is_current,
          description: w.description || '',
          projects: w.projects || [],
          referenceAvailable: false,
          verified: w.is_verified,
        })) || [],
      // Everything held, from the person's one credentials store (ELE-1950)
      certifications: employeeCerts.map((c) => ({
        name: c.name,
        issuer: c.issuing_body || '',
        certNumber: c.certificate_number || '',
        issueDate: c.issue_date || '',
        expiryDate: c.expiry_date || '',
        status: getCertStatus(c.expiry_date) as 'Active' | 'Warning' | 'Expired',
        documentUrl: c.document_url || undefined,
        verified: false,
      })),
      training: storeItems
        .filter((q) => q.category === 'training')
        .map((q) => ({
          id: q.id,
          name: getQualificationLabel(q.qualification_name),
          provider: q.awarding_body || '',
          completedDate: q.date_achieved || '',
          certificateId: q.certificate_number || '',
          fundedBy: q.funded_by || '',
          ownedBy: 'worker' as const,
          verified: q.verification_level === 'verified_at_source',
        })),
      qualifications:
        effectiveSelectedProfile.qualifications?.map((q) => ({
          // Stored as picker slugs (e.g. `2391_52`) — resolve to display labels
          name: getQualificationLabel(q.qualification_name),
          issuer: q.awarding_body || '',
          year: q.date_achieved ? new Date(q.date_achieved).getFullYear().toString() : '',
        })) || [],
      verified: effectiveSelectedProfile.is_verified,
      ecsVerification: effectiveSelectedProfile.ecs_verification_level ?? 'self_declared',
      lastVerified: effectiveSelectedProfile.verified_at || '',
      profileViews: effectiveSelectedProfile.profile_views,
      shareableLink: effectiveSelectedProfile.shareable_link || undefined,
    };

    const skills = effectiveSelectedProfile.skills ?? [];
    const workHistory = effectiveSelectedProfile.work_history ?? [];
    const ecsLevel = effectiveSelectedProfile.ecs_verification_level ?? 'self_declared';
    const firmOwnsProfile =
      !effectiveSelectedProfile.owner_employee_id ||
      effectiveSelectedProfile.owner_employee_id === effectiveSelectedProfile.employee_id;
    const hasEcsCard = Boolean(
      effectiveSelectedProfile.ecs_card_number || effectiveSelectedProfile.ecs_card_type
    );

    return (
      <div className="space-y-6">
        <ElecIDCard
          profile={cardProfile}
          onShare={
            // The person's own Elec-ID is theirs to share (consent, ELE-1928);
            // the office can share only a profile it created on its roster row
            firmOwnsProfile ? () => setShareDialogOpen(true) : undefined
          }
        />

        <div className="flex flex-wrap gap-2">
          <SecondaryButton onClick={() => setAddTrainingDialogOpen(true)}>Add training</SecondaryButton>
          {/* Skills and work history are the person's own story — the office
              edits them only on an Elec-ID it created itself */}
          {firmOwnsProfile && (
            <>
              <SecondaryButton onClick={() => setAddSkillDialogOpen(true)}>Add skill</SecondaryButton>
              <SecondaryButton onClick={() => setAddWorkHistoryDialogOpen(true)}>
                Add work history
              </SecondaryButton>
            </>
          )}
          {/* Bridge to the worker's team record — the expiry decisions this
              page surfaces are acted on there (timesheets, leave, jobs) */}
          <SecondaryButton
            onClick={() =>
              navigate(`/employer?section=team&member=${effectiveSelectedProfile.employee_id}`)
            }
          >
            View team record
          </SecondaryButton>
        </div>

        <ListCard>
          <ListCardHeader tone="emerald" title="Verification" />
          <ListBody>
            <CredentialRow
              title="ECS card"
              lines={
                hasEcsCard
                  ? [
                      [
                        effectiveSelectedProfile.ecs_card_type,
                        effectiveSelectedProfile.ecs_card_number
                          ? `No. ${effectiveSelectedProfile.ecs_card_number}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(' · '),
                      verificationSentence({
                        verification_level: ecsLevel,
                        verifier_firm: effectiveSelectedProfile.ecs_verifier_firm,
                        verifier_name: effectiveSelectedProfile.ecs_verifier_name,
                        verified_at: effectiveSelectedProfile.ecs_verified_at,
                        verification_method: effectiveSelectedProfile.ecs_verification_method,
                      }),
                    ]
                  : ['No ECS card recorded on this Elec-ID']
              }
              badges={hasEcsCard ? <VerificationBadge level={ecsLevel} /> : null}
              onClick={hasEcsCard ? () => setChecking({ kind: 'ecs' }) : undefined}
            />
            <CredentialRow
              title="Elec-ID profile"
              lines={[
                effectiveSelectedProfile.is_verified
                  ? ELEC_MATE_APPROVAL_EXPLAINER
                  : 'Not yet reviewed by Elec-Mate. Each item below shows its own check.',
              ]}
              badges={effectiveSelectedProfile.is_verified ? <ElecMateApprovalBadge /> : null}
            />
          </ListBody>
        </ListCard>

        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Skills"
            meta={<Pill tone="yellow">{skills.length}</Pill>}
          />
          <ListBody>
            {skills.length === 0 ? (
              <div className="px-5 py-8 text-center text-[12.5px] text-white">
                No skills recorded yet.
              </div>
            ) : (
              skills.map((skill) => (
                <ListRow
                  key={skill.id}
                  title={skill.skill_name}
                  subtitle={
                    skill.years_experience > 0
                      ? `${skill.skill_level.charAt(0).toUpperCase() + skill.skill_level.slice(1)} · ${skill.years_experience} yrs`
                      : skill.skill_level.charAt(0).toUpperCase() + skill.skill_level.slice(1)
                  }
                  trailing={
                    <>
                      <Pill tone={skillLevelTone[skill.skill_level.toLowerCase()] ?? 'blue'}>
                        {skill.skill_level.charAt(0).toUpperCase() + skill.skill_level.slice(1)}
                      </Pill>
                      {skill.is_verified && <Pill tone="emerald">Verified</Pill>}
                    </>
                  }
                />
              ))
            )}
          </ListBody>
        </ListCard>

        <ListCard>
          <ListCardHeader
            tone="indigo"
            title="Work history"
            meta={<Pill tone="indigo">{workHistory.length}</Pill>}
          />
          <ListBody>
            {workHistory.length === 0 ? (
              <div className="px-5 py-8 text-center text-[12.5px] text-white">
                No work history on record.
              </div>
            ) : (
              workHistory.map((job) => (
                <ListRow
                  key={job.id}
                  title={job.job_title}
                  subtitle={`${job.employer_name} · ${formatDate(job.start_date)} → ${job.is_current ? 'Present' : formatDate(job.end_date)}`}
                  trailing={
                    <>
                      {job.is_current && <Pill tone="yellow">Current</Pill>}
                      {job.is_verified && <Pill tone="emerald">Verified</Pill>}
                    </>
                  }
                />
              ))
            )}
          </ListBody>
        </ListCard>

        <ListCard>
          <ListCardHeader
            tone="purple"
            title="Qualifications and training"
            meta={<Pill tone="purple">{storeItems.length}</Pill>}
          />
          <ListBody>
            {storeItems.length === 0 ? (
              <div className="px-5 py-8 text-center text-[12.5px] text-white">
                Nothing on {workerName}&apos;s Elec-ID yet.
              </div>
            ) : (
              storeItems.map((item) => {
                const held = isHeld({ training_status: item.training_status ?? null });
                const status = getCertStatus(item.expiry_date);
                const parts = [
                  item.awarding_body || null,
                  item.certificate_number ? `No. ${item.certificate_number}` : null,
                  !held
                    ? (item.training_status ?? 'Planned')
                    : item.expiry_date
                      ? `expires ${formatDate(item.expiry_date)}`
                      : 'no expiry',
                ].filter(Boolean);
                return (
                  <CredentialRow
                    key={item.id}
                    title={getQualificationLabel(item.qualification_name)}
                    lines={[
                      parts.join(' · '),
                      verificationSentence({
                        verification_level: item.verification_level ?? 'self_declared',
                        verifier_firm: item.verifier_firm,
                        verifier_name: item.verifier_name,
                        verified_at: item.verified_at,
                        verification_method: item.verification_method,
                      }),
                    ]}
                    badges={
                      <>
                        <VerificationBadge level={item.verification_level ?? 'self_declared'} />
                        {held && item.expiry_date && status !== 'Active' && (
                          <Pill tone={statusToneMap[status] ?? 'orange'}>
                            {status === 'Warning' ? 'Expiring' : status}
                          </Pill>
                        )}
                      </>
                    }
                    onClick={() => setChecking({ kind: 'item', item })}
                  />
                );
              })
            )}
          </ListBody>
          <div className="px-5 py-4 border-t border-white/[0.06] space-y-3">
            <p className="text-[12px] text-white leading-snug">
              Tap an item to record how you checked it. {workerName} keeps these on their own
              Elec-ID, so they move with them.
            </p>
            <AddCertificationDialog preselectedEmployeeId={effectiveSelectedProfile.employee_id} />
          </div>
        </ListCard>

        {(expiredItems.length > 0 || warningItems.length > 0) && (
          <ListCard>
            <ListCardHeader
              tone="red"
              title="Urgent attention"
              meta={<Pill tone="red">{expiredItems.length + warningItems.length}</Pill>}
            />
            <ListBody>
              {expiredItems.slice(0, 5).map((item, idx) => (
                <ListRow
                  key={`exp-${idx}`}
                  title={item.training_name}
                  subtitle={`${item.workerName ?? 'Unknown'} · expired`}
                  trailing={<Pill tone="red">Expired</Pill>}
                />
              ))}
              {warningItems.slice(0, 5).map((item, idx) => {
                const daysLeft = item.expiry_date
                  ? Math.ceil((new Date(item.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                  : 0;
                return (
                  <ListRow
                    key={`warn-${idx}`}
                    title={item.training_name}
                    subtitle={`${item.workerName ?? 'Unknown'} · ${daysLeft} days remaining`}
                    trailing={<Pill tone="orange">Expiring</Pill>}
                  />
                );
              })}
            </ListBody>
            <div className="px-5 py-4 border-t border-white/[0.06]">
              <SecondaryButton
                fullWidth
                onClick={handleNudgeRenewals}
                disabled={createCommunication.isPending}
              >
                <Send className="h-4 w-4 mr-2" />
                {createCommunication.isPending ? 'Sending…' : 'Nudge to renew'}
              </SecondaryButton>
            </div>
          </ListCard>
        )}
      </div>
    );
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="People"
        title="Credentials"
        description="Elec-ID digital credentials — compliance, renewals and share links."
        tone="emerald"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Total', value: totalCount },
          { label: 'ECS checked', value: ecsCheckedCount, tone: 'emerald' },
          { label: 'Expiring 30d', value: expiring30dCount, tone: 'orange' },
          { label: 'Expired', value: expiredCount, tone: 'red' },
        ]}
      />

      {/* Workers ↔ competence matrix — the matrix is the grid principal
          contractors ask for, exportable as a branded PDF or CSV */}
      <div className="grid grid-cols-2 gap-2 sm:inline-grid sm:w-auto">
        {(
          [
            { value: 'workers', label: 'Workers' },
            { value: 'matrix', label: 'Competence matrix' },
          ] as const
        ).map((opt) => (
          <button
            key={opt.value}
            onClick={() => setView(opt.value)}
            className={`h-11 px-5 rounded-full border text-[13px] font-medium touch-manipulation transition-colors ${
              view === opt.value
                ? 'bg-elec-yellow text-black border-elec-yellow'
                : 'bg-[hsl(0_0%_12%)] text-white border-white/[0.08]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {view === 'matrix' && <CompetenceMatrix profiles={profiles ?? []} />}

      {view === 'workers' && (
      <>
      <FilterBar
        tabs={[
          { value: 'all', label: 'All', count: totalCount },
          { value: 'checked', label: 'ECS checked', count: ecsCheckedCount },
          { value: 'unchecked', label: 'ECS not checked', count: totalCount - ecsCheckedCount },
          { value: 'expiring', label: 'Expiring', count: expiring30dCount },
          { value: 'expired', label: 'Expired', count: expiredCount },
        ]}
        activeTab={filterTab}
        onTabChange={(v) => setFilterTab(v as FilterValue)}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search name, role or Elec-ID…"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6">
        <div className="space-y-4">
          <ListCard>
            <ListCardHeader
              tone="emerald"
              title="Credentials"
              meta={<Pill tone="emerald">{filteredProfiles.length}</Pill>}
            />
            <ListBody>
              {filteredProfiles.length === 0 ? (
                <div className="px-5 py-10">
                  <EmptyState
                    title="No credentials match"
                    description="Try clearing the search or switching tab."
                    action="Reset filters"
                    onAction={() => {
                      setSearchQuery('');
                      setFilterTab('all');
                    }}
                  />
                </div>
              ) : (
                filteredProfiles.map((profile) => {
                  const ecsStatus = getEcsStatus(profile.ecs_expiry_date);
                  const tone = statusToneMap[ecsStatus] ?? 'emerald';
                  // Never display a card type that was never recorded
                  const cardType = profile.ecs_card_type
                    ? profile.ecs_card_type.split(' ')[0]
                    : 'No ECS card recorded';
                  const expiresLabel = profile.ecs_expiry_date
                    ? `expires ${formatDate(profile.ecs_expiry_date)}`
                    : 'no expiry on record';
                  const subtitleParts = [
                    profile.employee?.role || 'Electrician',
                    cardType,
                    expiresLabel,
                  ];
                  return (
                    <ListRow
                      key={profile.id}
                      lead={<Avatar initials={getInitials(profile.employee?.name)} />}
                      title={profile.employee?.name || 'Unknown'}
                      subtitle={subtitleParts.join(' · ')}
                      accent={selectedProfile?.id === profile.id ? 'yellow' : undefined}
                      trailing={
                        <>
                          <Pill tone={tone}>{ecsStatus}</Pill>
                          {(profile.ecs_card_number || profile.ecs_card_type) && (
                            <VerificationBadge
                              short
                              prefix="ECS"
                              level={profile.ecs_verification_level ?? 'self_declared'}
                            />
                          )}
                        </>
                      }
                      onClick={() => handleProfileSelect(profile)}
                    />
                  );
                })
              )}
            </ListBody>
          </ListCard>
        </div>

        {!isMobile && (
          <div className="min-w-0">
            {effectiveSelectedProfile ? (
              renderProfileDetail()
            ) : (
              <EmptyState
                title="Select a credential"
                description="Pick a worker from the list to view Elec-ID, skills, training and share links."
              />
            )}
          </div>
        )}
      </div>
      </>
      )}

      {isMobile && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] p-0 rounded-t-2xl border-t-0 bg-[hsl(0_0%_10%)]"
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-2" />
            <SheetHeader className="px-4 pb-3 border-b border-white/[0.06]">
              <SheetTitle className="text-lg text-white">Elec-ID profile</SheetTitle>
              <SheetDescription className="text-[12px] text-white">
                Skills, training, work history and verification.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(85vh-90px)] px-4 py-4">
              {renderProfileDetail()}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}

      {effectiveSelectedProfile && (
        <>
          <ShareElecIDDialog
            open={shareDialogOpen}
            onOpenChange={setShareDialogOpen}
            profile={effectiveSelectedProfile}
          />
          <AddTrainingRecordDialog
            open={addTrainingDialogOpen}
            onOpenChange={setAddTrainingDialogOpen}
            workerName={effectiveSelectedProfile.employee?.name || 'Worker'}
            profileId={effectiveSelectedProfile.id}
            employeeId={effectiveSelectedProfile.employee_id}
          />
          <AddSkillDialog
            open={addSkillDialogOpen}
            onOpenChange={setAddSkillDialogOpen}
            profileId={effectiveSelectedProfile.id}
            workerName={effectiveSelectedProfile.employee?.name || 'Worker'}
          />
          <AddWorkHistoryDialog
            open={addWorkHistoryDialogOpen}
            onOpenChange={setAddWorkHistoryDialogOpen}
            profileId={effectiveSelectedProfile.id}
            profileName={effectiveSelectedProfile.employee?.name || 'Worker'}
          />
        </>
      )}
      <ScanElecIDDialog open={scanDialogOpen} onOpenChange={setScanDialogOpen} />

      {effectiveSelectedProfile && checking && (
        <VerifyCredentialSheet
          open={Boolean(checking)}
          onOpenChange={(o) => !o && setChecking(null)}
          personName={workerName}
          itemName={
            checking.kind === 'ecs'
              ? `ECS card${effectiveSelectedProfile.ecs_card_type ? ` (${effectiveSelectedProfile.ecs_card_type})` : ''}`
              : getQualificationLabel(checking.item.qualification_name)
          }
          details={
            checking.kind === 'ecs'
              ? [
                  {
                    label: 'Card number',
                    value: effectiveSelectedProfile.ecs_card_number || 'Not recorded',
                  },
                  { label: 'Expiry', value: formatDate(effectiveSelectedProfile.ecs_expiry_date) },
                ]
              : [
                  { label: 'Awarding body', value: checking.item.awarding_body || 'Not recorded' },
                  {
                    label: 'Certificate number',
                    value: checking.item.certificate_number || 'Not recorded',
                  },
                  { label: 'Achieved', value: formatDate(checking.item.date_achieved) },
                  { label: 'Expiry', value: formatDate(checking.item.expiry_date) },
                ]
          }
          currentLevel={
            (checking.kind === 'ecs'
              ? effectiveSelectedProfile.ecs_verification_level
              : checking.item.verification_level) ?? 'self_declared'
          }
          currentSentence={
            checking.kind === 'ecs'
              ? verificationSentence({
                  verification_level: effectiveSelectedProfile.ecs_verification_level ?? null,
                  verifier_firm: effectiveSelectedProfile.ecs_verifier_firm,
                  verifier_name: effectiveSelectedProfile.ecs_verifier_name,
                  verified_at: effectiveSelectedProfile.ecs_verified_at,
                  verification_method: effectiveSelectedProfile.ecs_verification_method,
                })
              : verificationSentence({
                  verification_level: checking.item.verification_level ?? null,
                  verifier_firm: checking.item.verifier_firm,
                  verifier_name: checking.item.verifier_name,
                  verified_at: checking.item.verified_at,
                  verification_method: checking.item.verification_method,
                })
          }
          onSave={saveCheck}
          onRemove={
            checking.kind === 'item' &&
            actingFirmId &&
            checking.item.added_by_employer_id === actingFirmId
              ? async () => {
                  await deleteTeamCredential.mutateAsync(checking.item.id);
                  toast({ title: 'Removed', description: 'The item has been taken off their Elec-ID.' });
                }
              : undefined
          }
        />
      )}

      <Sheet open={createElecIdSheetOpen} onOpenChange={setCreateElecIdSheetOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-[85vh] bg-[hsl(0_0%_10%)] border-t-0 rounded-t-3xl p-0'
              : 'bg-[hsl(0_0%_10%)] border-l border-white/[0.06] p-0'
          }
        >
          <div className="px-5 pt-6 pb-4 border-b border-white/[0.06]">
            <Eyebrow>People</Eyebrow>
            <SheetHeader className="mt-2">
              <SheetTitle className="text-xl font-semibold text-white tracking-tight">
                Add credential
              </SheetTitle>
              <SheetDescription className="text-[12px] text-white">
                Select an employee to issue a new Elec-ID profile for.
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="p-5 space-y-5">
            {employeesWithoutElecId.length === 0 ? (
              <EmptyState
                title="All employees have Elec-IDs"
                description={`All ${employees?.length || 0} employees have Elec-ID profiles in place.`}
              />
            ) : (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Eyebrow>Pending</Eyebrow>
                    <div className="mt-1 text-[13px] text-white">
                      {employeesWithoutElecId.length} employee
                      {employeesWithoutElecId.length !== 1 ? 's' : ''} without Elec-ID
                    </div>
                  </div>
                  <PrimaryButton
                    disabled={bulkCreating}
                    onClick={async () => {
                      setBulkCreating(true);
                      try {
                        // ECS card type is a real-world credential — never guess
                        // it from a job title. Create profiles empty; the actual
                        // card gets recorded per worker. allSettled so one
                        // failure doesn't strand a half-created batch silently.
                        const results = await Promise.allSettled(
                          employeesWithoutElecId.map((emp) =>
                            createElecIdProfile.mutateAsync({ employee_id: emp.id })
                          )
                        );
                        const failed = results.filter((r) => r.status === 'rejected').length;
                        if (failed > 0) {
                          throw new Error(
                            `${failed} of ${employeesWithoutElecId.length} could not be created`
                          );
                        }
                        toast({
                          title: 'Elec-IDs created',
                          description: `Created ${employeesWithoutElecId.length} profiles — add each worker's real ECS card details next`,
                        });
                        setCreateElecIdSheetOpen(false);
                      } catch (error) {
                        toast({
                          title: 'Error',
                          description: 'Failed to create some Elec-ID profiles',
                          variant: 'destructive',
                        });
                      } finally {
                        setBulkCreating(false);
                      }
                    }}
                  >
                    {bulkCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Creating…
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create all
                      </>
                    )}
                  </PrimaryButton>
                </div>

                <Divider />

                <ScrollArea className={isMobile ? 'h-[calc(85vh-260px)]' : 'h-[calc(100vh-260px)]'}>
                  <ListCard>
                    <ListBody>
                      {employeesWithoutElecId.map((emp) => (
                        <ListRow
                          key={emp.id}
                          lead={<Avatar initials={getInitials(emp.name)} />}
                          title={emp.name}
                          subtitle={emp.role || 'Electrician'}
                          onClick={() => {
                            setSelectedEmployeeForElecId({ id: emp.id, name: emp.name });
                            setCreateElecIdSheetOpen(false);
                            setCreateElecIdDialogOpen(true);
                          }}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                </ScrollArea>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {selectedEmployeeForElecId && (
        <CreateElecIDForEmployeeDialog
          open={createElecIdDialogOpen}
          onOpenChange={setCreateElecIdDialogOpen}
          employeeId={selectedEmployeeForElecId.id}
          employeeName={selectedEmployeeForElecId.name}
          onSuccess={() => {
            setSelectedEmployeeForElecId(null);
            refetch();
          }}
        />
      )}
    </PageFrame>
  );
};
