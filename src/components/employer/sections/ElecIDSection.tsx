import { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useElecIdProfiles,
  useVerifyElecIdProfile,
  useGenerateShareableLink,
  useCreateElecIdProfile,
} from '@/hooks/useElecId';
import { useEmployees } from '@/hooks/useEmployees';
import { ElecIdProfile } from '@/services/elecIdService';
import { ElecIDCard } from '@/components/employer/ElecIDCard';
import { ShareElecIDDialog } from '@/components/employer/dialogs/ShareElecIDDialog';
import { AddTrainingRecordDialog } from '@/components/employer/dialogs/AddTrainingRecordDialog';
import { ScanElecIDDialog } from '@/components/employer/dialogs/ScanElecIDDialog';
import { AddCertificationDialog } from '@/components/employer/dialogs/AddCertificationDialog';
import { AddSkillDialog } from '@/components/employer/dialogs/AddSkillDialog';
import { AddWorkHistoryDialog } from '@/components/employer/dialogs/AddWorkHistoryDialog';
import { CreateElecIDForEmployeeDialog } from '@/components/employer/dialogs/CreateElecIDForEmployeeDialog';
import { RefreshCw, QrCode, UserPlus, Loader2 } from 'lucide-react';
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

type FilterValue = 'all' | 'verified' | 'pending' | 'expiring' | 'expired';

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

export const ElecIDSection = () => {
  const isMobile = useIsMobile();
  const { data: profiles, isLoading, refetch } = useElecIdProfiles();
  const { data: employees } = useEmployees();
  const verifyProfile = useVerifyElecIdProfile();
  const generateLink = useGenerateShareableLink();
  const createElecIdProfile = useCreateElecIdProfile();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterValue>('all');
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
    if (selectedProfile) return selectedProfile;
    if (profiles && profiles.length > 0) return profiles[0];
    return null;
  }, [selectedProfile, profiles]);

  const allTraining = useMemo(
    () =>
      profiles?.flatMap(
        (p) =>
          p.training?.map((t) => ({
            ...t,
            workerName: p.employee?.name,
            workerId: p.employee_id,
            status: getCertStatus(t.expiry_date),
          })) || []
      ) || [],
    [profiles]
  );

  const expiredItems = allTraining.filter((t) => t.status === 'Expired');
  const warningItems = allTraining.filter((t) => t.status === 'Warning');

  const totalCount = profiles?.length ?? 0;
  const verifiedCount = profiles?.filter((p) => p.is_verified).length ?? 0;

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
      if (filterTab === 'verified') return p.is_verified;
      if (filterTab === 'pending') return !p.is_verified;
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

  const handleVerifyCredentials = async () => {
    if (!effectiveSelectedProfile) return;
    try {
      await verifyProfile.mutateAsync({
        id: effectiveSelectedProfile.id,
        verifiedBy: 'Employer Admin',
      });
      toast({
        title: 'Credentials verified',
        description: `${effectiveSelectedProfile.employee?.name}'s credentials have been verified.`,
      });
    } catch (error) {
      toast({
        title: 'Verification failed',
        description: 'Could not verify credentials. Please try again.',
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
      yearsExperience: 0,
      ecsCardType: effectiveSelectedProfile.ecs_card_type || 'Gold Card',
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
      certifications:
        effectiveSelectedProfile.qualifications?.map((q) => ({
          name: q.qualification_name,
          issuer: q.awarding_body || '',
          certNumber: q.certificate_number || '',
          issueDate: q.date_achieved || '',
          expiryDate: q.date_achieved || '',
          status: 'Active' as const,
          verified: q.is_verified,
        })) || [],
      training:
        effectiveSelectedProfile.training?.map((t) => ({
          id: t.id,
          name: t.training_name,
          provider: t.provider || '',
          completedDate: t.completed_date || '',
          certificateId: t.certificate_id || '',
          fundedBy: t.funded_by || '',
          ownedBy: 'worker' as const,
          verified: t.status === 'valid',
        })) || [],
      qualifications:
        effectiveSelectedProfile.qualifications?.map((q) => ({
          name: q.qualification_name,
          issuer: q.awarding_body || '',
          year: q.date_achieved ? new Date(q.date_achieved).getFullYear().toString() : '',
        })) || [],
      verified: effectiveSelectedProfile.is_verified,
      lastVerified: effectiveSelectedProfile.verified_at || '',
      profileViews: effectiveSelectedProfile.profile_views,
      shareableLink: effectiveSelectedProfile.shareable_link || undefined,
    };

    const skills = effectiveSelectedProfile.skills ?? [];
    const training = effectiveSelectedProfile.training ?? [];
    const workHistory = effectiveSelectedProfile.work_history ?? [];
    const qualifications = effectiveSelectedProfile.qualifications ?? [];

    return (
      <div className="space-y-6">
        <ElecIDCard profile={cardProfile} onShare={() => setShareDialogOpen(true)} />

        <div className="flex flex-wrap gap-2">
          <PrimaryButton
            onClick={handleVerifyCredentials}
            disabled={verifyProfile.isPending}
          >
            {verifyProfile.isPending ? 'Verifying…' : 'Verify credentials'}
          </PrimaryButton>
          <SecondaryButton onClick={() => setAddTrainingDialogOpen(true)}>Add training</SecondaryButton>
          <SecondaryButton onClick={() => setAddSkillDialogOpen(true)}>Add skill</SecondaryButton>
          <SecondaryButton onClick={() => setAddWorkHistoryDialogOpen(true)}>
            Add work history
          </SecondaryButton>
        </div>

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
            tone="cyan"
            title="Training"
            meta={<Pill tone="cyan">{training.length}</Pill>}
          />
          <ListBody>
            {training.length === 0 ? (
              <div className="px-5 py-8 text-center text-[12.5px] text-white">
                No training records found.
              </div>
            ) : (
              training.map((train) => (
                <ListRow
                  key={train.id}
                  title={train.training_name}
                  subtitle={`${train.provider || 'Provider unknown'}${train.completed_date ? ` · completed ${formatDate(train.completed_date)}` : ''}${train.funded_by ? ` · funded by ${train.funded_by}` : ''}`}
                  trailing={
                    <Pill tone={train.status === 'valid' ? 'emerald' : 'amber'}>
                      {train.status === 'valid' ? 'Valid' : 'Pending'}
                    </Pill>
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
            title="Qualifications"
            meta={<Pill tone="purple">{qualifications.length}</Pill>}
          />
          <ListBody>
            {qualifications.length === 0 ? (
              <div className="px-5 py-8 text-center text-[12.5px] text-white">
                No qualifications recorded.
              </div>
            ) : (
              qualifications.map((qual) => (
                <ListRow
                  key={qual.id}
                  title={qual.qualification_name}
                  subtitle={qual.awarding_body || 'Issuer unknown'}
                  trailing={
                    <Pill tone="purple">
                      {qual.date_achieved ? new Date(qual.date_achieved).getFullYear() : 'N/A'}
                    </Pill>
                  }
                />
              ))
            )}
          </ListBody>
        </ListCard>

        <ListCard>
          <ListCardHeader tone="orange" title="Certifications" />
          <div className="px-5 py-5">
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
          { label: 'Verified', value: verifiedCount, tone: 'emerald' },
          { label: 'Expiring 30d', value: expiring30dCount, tone: 'orange' },
          { label: 'Expired', value: expiredCount, tone: 'red' },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'all', label: 'All', count: totalCount },
          { value: 'verified', label: 'Verified', count: verifiedCount },
          { value: 'pending', label: 'Pending', count: totalCount - verifiedCount },
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
                  const cardType = (profile.ecs_card_type || 'Gold').split(' ')[0];
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
                          {profile.is_verified && <Pill tone="emerald">Verified</Pill>}
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

      {isMobile && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            className="h-[92vh] p-0 rounded-t-3xl border-t-0 bg-[hsl(0_0%_10%)]"
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-2" />
            <SheetHeader className="px-4 pb-3 border-b border-white/[0.06]">
              <SheetTitle className="text-lg text-white">Elec-ID profile</SheetTitle>
              <SheetDescription className="text-[12px] text-white">
                Skills, training, work history and verification.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(92vh-90px)] px-4 py-4">
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
                        for (const emp of employeesWithoutElecId) {
                          const cardType = emp.role?.toLowerCase().includes('apprentice')
                            ? 'white'
                            : emp.role?.toLowerCase().includes('supervisor') ||
                                emp.role?.toLowerCase().includes('manager')
                              ? 'black'
                              : emp.role?.toLowerCase().includes('labourer')
                                ? 'green'
                                : 'gold';
                          await createElecIdProfile.mutateAsync({
                            employee_id: emp.id,
                            ecs_card_type: cardType,
                          });
                        }
                        toast({
                          title: 'Elec-IDs created',
                          description: `Created Elec-ID profiles for ${employeesWithoutElecId.length} employees`,
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
