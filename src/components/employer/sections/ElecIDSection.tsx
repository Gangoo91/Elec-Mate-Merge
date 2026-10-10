import { useState, useMemo, useEffect, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useElecIdProfiles, useCreateElecIdProfile } from '@/hooks/useElecId';
import { useEmployees } from '@/hooks/useEmployees';
import { ElecIdProfile, type ElecIdQualification } from '@/services/elecIdService';
import {
  isHeld,
  verificationSentence,
  isAddedByThem,
  ELEC_MATE_APPROVAL_EXPLAINER,
  type VerificationLevel,
} from '@/services/credentialsService';
import {
  useDeleteTeamCredential,
  useSetCredentialVerification,
  useSetEcsCardVerification,
} from '@/hooks/useCredentialStore';
import {
  VerificationBadge,
  ElecMateApprovalBadge,
} from '@/components/credentials/VerificationBadge';
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
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { ELECID_HELP } from '@/components/employer/help/people';
import { CompetenceMatrix } from '@/components/employer/CompetenceMatrix';
import {
  getQualificationLabel,
  jobTitleText,
  ecsCardText,
} from '@/data/uk-electrician-constants';
import { useCreateCommunication } from '@/hooks/useCommunications';
import { ChevronRight, Loader2, Send } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  StatStrip,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
} from '@/components/employer/editorial';
import {
  frameClass,
  panel,
  PanelTitle,
  Row,
  RowList,
  StatusPill,
  PlainEmpty,
  Segments,
  Initials,
  SearchField,
  HeroActions,
  heroBtn,
  rowBtnPrimary,
  rowBtnSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';

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
    return new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
};

type FilterValue = 'all' | 'checked' | 'unchecked' | 'expiring' | 'expired';

/** A wrapping row for credential items: the "who checked it" sentence
 *  must never be cut off on a phone, so the lines wrap instead of truncating. */
function CredentialRow({
  title,
  lines,
  trailing,
  onClick,
}: {
  title: string;
  lines: string[];
  trailing?: ReactNode;
  onClick?: () => void;
}) {
  const body = (
    <>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold leading-snug text-white">{title}</p>
        {lines.map((l, i) => (
          <p key={i} className="mt-0.5 text-[13px] leading-snug text-white">
            {l}
          </p>
        ))}
      </div>
      {trailing && <div className="flex shrink-0 items-center">{trailing}</div>}
      {onClick && <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-white" />}
    </>
  );
  const base = 'flex w-full items-center gap-3 px-4 py-3 text-left sm:px-5';
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        base,
        'min-h-[60px] touch-manipulation transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60'
      )}
    >
      {body}
    </button>
  ) : (
    <div className={base}>{body}</div>
  );
}

const capitalise = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

export const ElecIDSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { data: allProfiles, isLoading, refetch } = useElecIdProfiles();
  const { data: employees } = useEmployees();
  // Every count on this page is against the active roster, the same people
  // Team counts: archived rows and profiles from outside the roster are left out.
  const activeRoster = useMemo(
    () => (employees ?? []).filter((e) => (e.status || 'Active') !== 'Archived'),
    [employees]
  );
  const profiles = useMemo(() => {
    if (!allProfiles || !employees) return allProfiles;
    const onRoster = new Set(activeRoster.map((e) => e.id));
    return allProfiles.filter((p) => onRoster.has(p.employee_id));
  }, [allProfiles, employees, activeRoster]);
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
    return activeRoster.filter((emp) => !profileEmployeeIds.has(emp.id));
  }, [employees, profiles, activeRoster]);

  // ELE-2086: the matrix lists the whole active roster, Elec-ID or not.
  const matrixRoster = useMemo(
    () =>
      activeRoster.map((e) => ({
        employeeId: e.id,
        name: e.name,
        role: e.team_role || e.role || '',
      })),
    [activeRoster]
  );

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
  // ?view=matrix opens the competence matrix (Overview's overdue-course row).
  const viewParam = searchParams.get('view');
  useEffect(() => {
    if (viewParam === 'matrix') setView('matrix');
  }, [viewParam]);
  useEffect(() => {
    if (!memberParam || !profiles || profiles.length === 0) return;
    const target = profiles.find((p) => p.employee_id === memberParam);
    if (target) {
      // A person link (e.g. the course-completed bell) shows the person, even
      // when the matrix was open.
      setView('workers');
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
        const haystack =
          `${p.employee?.name ?? ''} ${p.employee?.role ?? ''} ${p.elec_id_number ?? ''}`.toLowerCase();
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
          : "Saved with your name and today's date.",
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
        `• ECS card${p.ecs_card_type ? ` (${ecsCardText(p.ecs_card_type)})` : ''} — ${
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
      toast({
        title: 'Nudge failed',
        description: 'Message was not sent.',
        variant: 'destructive',
      });
    }
  };

  const handleProfileSelect = (profile: ElecIdProfile) => {
    setSelectedProfile(profile);
    if (isMobile) {
      setSheetOpen(true);
    }
  };

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  if (activeRoster.length === 0) {
    helpBlockers.push({
      text: 'No one on the team yet. Add people under Team first, then give them an Elec-ID.',
      fixLabel: 'Open the team',
      onFix: () => navigate('/employer?section=team'),
    });
  } else if (employeesWithoutElecId.length > 0) {
    helpBlockers.push({
      text: `${employeesWithoutElecId.length} ${employeesWithoutElecId.length === 1 ? 'person has' : 'people have'} no Elec-ID yet.`,
      fixLabel: 'Add credential',
      onFix: () => setCreateElecIdSheetOpen(true),
    });
  }

  const handleCreateAll = async () => {
    setBulkCreating(true);
    try {
      // ECS card type is a real-world credential: never guess it from a job
      // title. Create profiles empty; the actual card gets recorded per
      // worker. allSettled so one failure doesn't strand a half-created batch.
      const results = await Promise.allSettled(
        employeesWithoutElecId.map((emp) =>
          createElecIdProfile.mutateAsync({ employee_id: emp.id })
        )
      );
      const failed = results.filter((r) => r.status === 'rejected').length;
      if (failed > 0) {
        throw new Error(`${failed} of ${employeesWithoutElecId.length} could not be created`);
      }
      toast({
        title: 'Elec-IDs created',
        description: `Created ${employeesWithoutElecId.length} profiles. Add each worker's real ECS card details next`,
      });
      setCreateElecIdSheetOpen(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create some Elec-ID profiles',
        variant: 'destructive',
      });
    } finally {
      setBulkCreating(false);
    }
  };

  const heroActions = (
    <HeroActions stretchFirst>
      <PrimaryButton
        data-help="elecid.add"
        className={heroBtn}
        onClick={() => setCreateElecIdSheetOpen(true)}
      >
        Add credential
      </PrimaryButton>
      <SecondaryButton
        data-help="elecid.scan"
        className={heroBtn}
        onClick={() => setScanDialogOpen(true)}
      >
        Scan
      </SecondaryButton>
      <PageHelpButton
        help={ELECID_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'credentials', tab: view === 'matrix' ? 'matrix' : filterTab }}
      />
    </HeroActions>
  );

  // One live line: the problem first, else where things stand.
  const uncheckedCount = totalCount - ecsCheckedCount;
  const liveParts: string[] = [];
  if (expiredCount > 0) liveParts.push(`${plural(expiredCount, 'ECS card')} expired`);
  if (expiring30dCount > 0) liveParts.push(`${expiring30dCount} expiring in 30 days`);
  if (uncheckedCount > 0) liveParts.push(`${uncheckedCount} not checked`);
  const teamSize = activeRoster.length;
  const standing =
    teamSize === 0
      ? 'Add your team first'
      : `${totalCount} of ${plural(teamSize, 'person', 'people')} ${totalCount === 1 ? 'has' : 'have'} an Elec-ID`;
  const firstLive = liveParts.join(', ');
  const liveLine =
    liveParts.length > 0
      ? `${firstLive.charAt(0).toUpperCase()}${firstLive.slice(1)}. ${standing}.`
      : `${standing}. Every card is in date and checked.`;

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Credentials" description="Loading Elec-IDs." />
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
      role: jobTitleText(effectiveSelectedProfile.employee?.role) || 'Electrician',
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
      ecsCardType: ecsCardText(effectiveSelectedProfile.ecs_card_type) || 'Not recorded',
      ecsCardNumber: effectiveSelectedProfile.ecs_card_number || '',
      ecsExpiry: effectiveSelectedProfile.ecs_expiry_date || '',
      ecsStatus,
      skills:
        effectiveSelectedProfile.skills?.map((s) => ({
          name: s.skill_name,
          level: (s.skill_level.charAt(0).toUpperCase() + s.skill_level.slice(1)) as
            'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
          yearsExperience: s.years_experience,
          verified: s.is_verified,
        })) || [],
      workHistory:
        effectiveSelectedProfile.work_history?.map((w) => ({
          id: w.id,
          employer: w.employer_name,
          role: jobTitleText(w.job_title),
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

    const ecsPill =
      ecsStatus === 'Expired' ? (
        <StatusPill tone="red">Expired</StatusPill>
      ) : ecsStatus === 'Expiring' ? (
        <StatusPill tone="volt">Expiring</StatusPill>
      ) : (
        <VerificationBadge level={ecsLevel} />
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

        <div className="flex gap-2">
          {/* Bridge to the worker's team record: the expiry decisions this
              page surfaces are acted on there (timesheets, leave, jobs) */}
          <button
            type="button"
            className={cn(rowBtnSecondary, 'flex-1 sm:flex-none')}
            onClick={() =>
              navigate(`/employer?section=team&member=${effectiveSelectedProfile.employee_id}`)
            }
          >
            View team record
          </button>
          <button
            type="button"
            data-help="elecid.add-training"
            className={cn(rowBtnSecondary, 'flex-1 sm:flex-none')}
            onClick={() => setAddTrainingDialogOpen(true)}
          >
            Add training
          </button>
        </div>

        {(expiredItems.length > 0 || warningItems.length > 0) && (
          <section>
            <PanelTitle
              title="Needs renewing"
              meta={`${expiredItems.length + warningItems.length}`}
            />
            <RowList>
              {expiredItems.slice(0, 5).map((item, idx) => (
                <Row
                  key={`exp-${idx}`}
                  title={item.training_name}
                  detail={`Expired ${formatDate(item.expiry_date)}`}
                  trailing={<StatusPill tone="red">Expired</StatusPill>}
                />
              ))}
              {warningItems.slice(0, 5).map((item, idx) => {
                const daysLeft = item.expiry_date
                  ? Math.ceil(
                      (new Date(item.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                    )
                  : 0;
                return (
                  <Row
                    key={`warn-${idx}`}
                    title={item.training_name}
                    detail={`${daysLeft} days left`}
                    trailing={<StatusPill tone="volt">Expiring</StatusPill>}
                  />
                );
              })}
              <div className="px-4 py-3 sm:px-5">
                <button
                  type="button"
                  data-help="elecid.nudge"
                  className={cn(rowBtnPrimary, 'w-full sm:w-auto')}
                  onClick={handleNudgeRenewals}
                  disabled={createCommunication.isPending}
                >
                  <Send className="h-4 w-4" />
                  {createCommunication.isPending ? 'Sending…' : 'Nudge to renew'}
                </button>
              </div>
            </RowList>
          </section>
        )}

        <section data-help="elecid.verify">
          <PanelTitle title="Checks" />
          <RowList>
            <CredentialRow
              title="ECS card"
              lines={
                hasEcsCard
                  ? [
                      [
                        ecsCardText(effectiveSelectedProfile.ecs_card_type),
                        effectiveSelectedProfile.ecs_card_number
                          ? `No. ${effectiveSelectedProfile.ecs_card_number}`
                          : null,
                        effectiveSelectedProfile.ecs_expiry_date
                          ? `expires ${formatDate(effectiveSelectedProfile.ecs_expiry_date)}`
                          : 'no expiry on record',
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
              trailing={hasEcsCard ? ecsPill : undefined}
              onClick={hasEcsCard ? () => setChecking({ kind: 'ecs' }) : undefined}
            />
            <CredentialRow
              title="Elec-ID profile"
              lines={[
                effectiveSelectedProfile.is_verified
                  ? ELEC_MATE_APPROVAL_EXPLAINER
                  : 'Not yet reviewed by Elec-Mate. Each item below shows its own check.',
              ]}
              trailing={
                effectiveSelectedProfile.is_verified ? <ElecMateApprovalBadge /> : undefined
              }
            />
          </RowList>
        </section>

        <section>
          <PanelTitle
            title="Qualifications and training"
            meta={storeItems.length > 0 ? `${storeItems.length}` : undefined}
          />
          <RowList>
            {storeItems.length === 0 ? (
              <PlainEmpty bare text={`Nothing on ${workerName}'s Elec-ID yet.`} />
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
                  isAddedByThem(item) ? 'added by them' : null,
                  item.document_url ? 'photo on file' : null,
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
                    trailing={
                      held && item.expiry_date && status !== 'Active' ? (
                        <StatusPill tone={status === 'Expired' ? 'red' : 'volt'}>
                          {status === 'Warning' ? 'Expiring' : status}
                        </StatusPill>
                      ) : (
                        <VerificationBadge level={item.verification_level ?? 'self_declared'} />
                      )
                    }
                    onClick={() => setChecking({ kind: 'item', item })}
                  />
                );
              })
            )}
            <div className="space-y-3 px-4 py-3 sm:px-5">
              <p className="text-[13px] leading-snug text-white">
                Tap an item to record how you checked it. {workerName} keeps these on their own
                Elec-ID, so they move with them.
              </p>
              <AddCertificationDialog
                preselectedEmployeeId={effectiveSelectedProfile.employee_id}
              />
            </div>
          </RowList>
        </section>

        <section>
          <PanelTitle
            title="Skills"
            meta={skills.length > 0 ? `${skills.length}` : undefined}
            // Skills and work history are the person's own story: the office
            // edits them only on an Elec-ID it created itself
            action={firmOwnsProfile ? 'Add skill' : undefined}
            onAction={firmOwnsProfile ? () => setAddSkillDialogOpen(true) : undefined}
          />
          {skills.length === 0 ? (
            <PlainEmpty text="No skills recorded yet." />
          ) : (
            <RowList>
              {skills.map((skill) => (
                <Row
                  key={skill.id}
                  title={skill.skill_name}
                  detail={
                    skill.years_experience > 0
                      ? `${capitalise(skill.skill_level)} · ${skill.years_experience} yrs`
                      : capitalise(skill.skill_level)
                  }
                  trailing={
                    skill.is_verified ? <StatusPill tone="green">Verified</StatusPill> : undefined
                  }
                />
              ))}
            </RowList>
          )}
        </section>

        <section>
          <PanelTitle
            title="Work history"
            meta={workHistory.length > 0 ? `${workHistory.length}` : undefined}
            action={firmOwnsProfile ? 'Add work history' : undefined}
            onAction={firmOwnsProfile ? () => setAddWorkHistoryDialogOpen(true) : undefined}
          />
          {workHistory.length === 0 ? (
            <PlainEmpty text="No work history on record." />
          ) : (
            <RowList>
              {workHistory.map((job) => (
                <Row
                  key={job.id}
                  title={jobTitleText(job.job_title)}
                  detail={`${job.employer_name} · ${formatDate(job.start_date)} to ${job.is_current ? 'now' : formatDate(job.end_date)}`}
                  trailing={
                    job.is_verified ? (
                      <StatusPill tone="green">Verified</StatusPill>
                    ) : job.is_current ? (
                      <StatusPill>Current</StatusPill>
                    ) : undefined
                  }
                />
              ))}
            </RowList>
          )}
        </section>
      </div>
    );
  };

  return (
    <PageFrame className={frameClass}>
      <PageHero title="Credentials" description={liveLine} actions={heroActions} />

      <HowItWorks
        help={ELECID_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'credentials', tab: view === 'matrix' ? 'matrix' : filterTab }}
      />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Elec-IDs',
            value: totalCount,
            sub:
              employeesWithoutElecId.length > 0
                ? `${employeesWithoutElecId.length} without one`
                : 'Everyone has one',
          },
          {
            label: 'ECS checked',
            value: ecsCheckedCount,
            sub: uncheckedCount > 0 ? `${uncheckedCount} self-declared` : 'All checked',
            onClick: () => {
              setView('workers');
              setFilterTab(uncheckedCount > 0 ? 'unchecked' : 'checked');
            },
          },
          {
            label: 'Expiring in 30 days',
            value: expiring30dCount,
            tone: expiring30dCount > 0 ? 'yellow' : undefined,
            onClick: () => {
              setView('workers');
              setFilterTab('expiring');
            },
          },
          {
            label: 'Expired',
            value: expiredCount,
            tone: expiredCount > 0 ? 'red' : undefined,
            onClick: () => {
              setView('workers');
              setFilterTab('expired');
            },
          },
        ]}
      />

      {/* Workers or the competence matrix: the matrix is the grid principal
          contractors ask for, exportable as a branded PDF or CSV */}
      <div data-help="elecid.view" className="flex">
        <Segments
          items={[
            { value: 'workers', label: 'Workers' },
            { value: 'matrix', label: 'Competence matrix' },
          ]}
          value={view}
          onChange={(v) => setView(v)}
        />
      </div>

      {view === 'matrix' && (
        <CompetenceMatrix
          profiles={profiles ?? []}
          roster={matrixRoster}
          onCreateElecId={(person) => {
            setSelectedEmployeeForElecId(person);
            setCreateElecIdDialogOpen(true);
          }}
        />
      )}

      {view === 'workers' && (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start">
          <div className="min-w-0 space-y-4" data-help="elecid.list">
            <div data-help="elecid.tabs" className="space-y-3">
              <Segments
                wrap
                items={[
                  { value: 'all', label: 'All', count: totalCount },
                  { value: 'checked', label: 'Checked', count: ecsCheckedCount },
                  { value: 'unchecked', label: 'Not checked', count: uncheckedCount },
                  { value: 'expiring', label: 'Expiring', count: expiring30dCount },
                  { value: 'expired', label: 'Expired', count: expiredCount },
                ]}
                value={filterTab}
                onChange={(v) => setFilterTab(v)}
              />
              <SearchField
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search name, role or Elec-ID"
              />
            </div>
            {filteredProfiles.length === 0 ? (
              <PlainEmpty
                text={
                  totalCount === 0
                    ? 'Nobody has an Elec-ID yet. Add one for each person on the team.'
                    : 'No one matches. Clear the search or pick another filter.'
                }
                action={totalCount === 0 ? 'Add credential' : 'Show everyone'}
                onAction={
                  totalCount === 0
                    ? () => setCreateElecIdSheetOpen(true)
                    : () => {
                        setSearchQuery('');
                        setFilterTab('all');
                      }
                }
              />
            ) : (
              <RowList>
                {filteredProfiles.map((profile) => {
                  const ecsStatus = getEcsStatus(profile.ecs_expiry_date);
                  // Never display a card type that was never recorded
                  const cardType = profile.ecs_card_type
                    ? ecsCardText(profile.ecs_card_type)
                    : 'No ECS card recorded';
                  const expiresLabel = profile.ecs_expiry_date
                    ? `expires ${formatDate(profile.ecs_expiry_date)}`
                    : 'no expiry on record';
                  const hasCard = Boolean(profile.ecs_card_number || profile.ecs_card_type);
                  const selected = !isMobile && effectiveSelectedProfile?.id === profile.id;
                  return (
                    <Row
                      key={profile.id}
                      lead={<Initials name={profile.employee?.name || '?'} />}
                      title={profile.employee?.name || 'Unknown'}
                      detail={`${jobTitleText(profile.employee?.role) || 'Electrician'} · ${cardType} · ${expiresLabel}`}
                      wrapDetail
                      className={selected ? 'bg-white/[0.06]' : undefined}
                      trailing={
                        ecsStatus === 'Expired' ? (
                          <StatusPill tone="red">Expired</StatusPill>
                        ) : ecsStatus === 'Expiring' ? (
                          <StatusPill tone="volt">Expiring</StatusPill>
                        ) : hasCard ? (
                          <VerificationBadge
                            short
                            prefix="ECS"
                            level={profile.ecs_verification_level ?? 'self_declared'}
                          />
                        ) : undefined
                      }
                      onClick={() => handleProfileSelect(profile)}
                    />
                  );
                })}
              </RowList>
            )}
          </div>

          {!isMobile && (
            <div className="min-w-0">
              {effectiveSelectedProfile ? (
                renderProfileDetail()
              ) : (
                <PlainEmpty text="Pick someone on the left to see their Elec-ID, checks, training and share link." />
              )}
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div
                className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15"
                aria-hidden
              />
              <SheetHeader className="shrink-0 px-4 pb-3 pt-3 text-left">
                <SheetTitle className="text-[18px] font-semibold text-white">
                  {effectiveSelectedProfile?.employee?.name || 'Elec-ID'}
                </SheetTitle>
                <SheetDescription className="text-[13px] text-white">
                  Elec-ID, checks, training and work history.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8">
                {renderProfileDetail()}
              </div>
            </div>
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
              ? `ECS card${effectiveSelectedProfile.ecs_card_type ? ` (${ecsCardText(effectiveSelectedProfile.ecs_card_type)})` : ''}`
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
          photoPath={checking.kind === 'item' ? (checking.item.document_url ?? null) : null}
          addedByThem={checking.kind === 'item' && isAddedByThem(checking.item)}
          onRemove={
            checking.kind === 'item' &&
            actingFirmId &&
            checking.item.added_by_employer_id === actingFirmId
              ? async () => {
                  await deleteTeamCredential.mutateAsync(checking.item.id);
                  toast({
                    title: 'Removed',
                    description: 'The item has been taken off their Elec-ID.',
                  });
                }
              : undefined
          }
        />
      )}

      <FormSheet
        open={createElecIdSheetOpen}
        onOpenChange={setCreateElecIdSheetOpen}
        width="wide"
        title="Add credential"
        description={
          employeesWithoutElecId.length === 0
            ? `All ${activeRoster.length} people on the team have an Elec-ID.`
            : `${plural(employeesWithoutElecId.length, 'person', 'people')} without an Elec-ID. Tap one to set theirs up, or create them all and add each card after.`
        }
        footer={
          employeesWithoutElecId.length > 0 ? (
            <PrimaryButton
              fullWidth
              className="h-12 rounded-xl text-[15px]"
              disabled={bulkCreating}
              onClick={handleCreateAll}
            >
              {bulkCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                `Create all ${employeesWithoutElecId.length}`
              )}
            </PrimaryButton>
          ) : undefined
        }
      >
        {employeesWithoutElecId.length === 0 ? (
          <PlainEmpty text="Everyone has an Elec-ID. Add new people under Team first." />
        ) : (
          <div className={cn(panel, 'overflow-hidden')}>
            <div className="grid grid-cols-1 divide-y divide-white/[0.07] lg:grid-cols-2 lg:divide-y-0 lg:[&>*]:border-b lg:[&>*]:border-white/[0.07] lg:[&>*:nth-child(odd)]:border-r">
              {employeesWithoutElecId.map((emp) => (
                <Row
                  key={emp.id}
                  lead={<Initials name={emp.name} />}
                  title={emp.name}
                  detail={jobTitleText(emp.role) || 'Electrician'}
                  onClick={() => {
                    setSelectedEmployeeForElecId({ id: emp.id, name: emp.name });
                    setCreateElecIdSheetOpen(false);
                    setCreateElecIdDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </FormSheet>

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
