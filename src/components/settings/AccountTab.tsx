import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import {
  Eyebrow,
  ListCard,
  SectionHeader,
  TextAction,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';

// UK Job Titles for electricians
const UK_JOB_TITLES = [
  { value: 'electrician', label: 'Electrician' },
  { value: 'approved_electrician', label: 'Approved Electrician' },
  { value: 'qualified_supervisor', label: 'Qualified Supervisor' },
  { value: 'installation_electrician', label: 'Installation Electrician' },
  { value: 'maintenance_electrician', label: 'Maintenance Electrician' },
  { value: 'site_manager', label: 'Site Manager' },
  { value: 'contracts_manager', label: 'Contracts Manager' },
  { value: 'estimator', label: 'Estimator' },
  { value: 'project_manager', label: 'Project Manager' },
];

const UK_SPECIALISATIONS = [
  { value: 'domestic', label: 'Domestic' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'solar', label: 'Solar/Renewables' },
  { value: 'ev', label: 'EV Charging' },
  { value: 'fire_alarm', label: 'Fire Alarm' },
  { value: 'data', label: 'Data/Structured Cabling' },
  { value: 'hazardous', label: 'Hazardous Areas' },
];

const UK_ECS_CARD_TYPES = [
  { value: 'gold', label: 'Gold Card (Electrician)' },
  { value: 'blue', label: 'Blue Card (Approved Electrician)' },
  { value: 'black', label: 'Black Card (Installation Electrician - Maintenance)' },
  { value: 'white', label: 'White Card (Provisional)' },
  { value: 'green', label: 'Green Card (Apprentice)' },
  { value: 'red', label: 'Red Card (Trainee)' },
];

const APPRENTICE_LEVELS = [
  { value: 'level2', label: 'Level 2 - Installation (2365)' },
  { value: 'level3', label: 'Level 3 - Electrotechnical (2365)' },
  { value: 'level3_am2', label: 'Level 3 + AM2' },
];

const EMPLOYER_POSITIONS = [
  { value: 'director', label: 'Director' },
  { value: 'managing_director', label: 'Managing Director' },
  { value: 'owner', label: 'Owner/Sole Trader' },
  { value: 'operations_manager', label: 'Operations Manager' },
  { value: 'office_manager', label: 'Office Manager' },
];

const COMPANY_SIZES = [
  { value: '1-5', label: '1-5 employees' },
  { value: '6-20', label: '6-20 employees' },
  { value: '21-50', label: '21-50 employees' },
  { value: '50+', label: '50+ employees' },
];

const getLabel = (options: { value: string; label: string }[], value: string) => {
  return options.find((opt) => opt.value === value)?.label || 'Not set';
};

/* ────────────────────────────────────────────────
   Row building block — used within ListCard
   ──────────────────────────────────────────────── */
interface KVRowProps {
  label: string;
  value: React.ReactNode;
  trailing?: React.ReactNode;
  onEdit?: () => void;
}
const KVRow: React.FC<KVRowProps> = ({ label, value, trailing, onEdit }) => {
  return (
    <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
      <div className="flex-1 min-w-0">
        <Eyebrow>{label}</Eyebrow>
        <div className="mt-1 text-[15px] text-white truncate">{value}</div>
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
      {onEdit && !trailing && <TextAction onClick={onEdit}>Edit</TextAction>}
    </div>
  );
};

const AccountTab = () => {
  const { user, profile, fetchProfile } = useAuth();
  const { addNotification } = useNotifications();

  // File upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sheet states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingApprentice, setIsEditingApprentice] = useState(false);
  const [isEditingElectrician, setIsEditingElectrician] = useState(false);
  const [isEditingEmployer, setIsEditingEmployer] = useState(false);

  // Save states
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Profile fields
  const [displayName, setDisplayName] = useState(
    profile?.full_name || user?.email?.split('@')[0] || ''
  );

  // Apprentice fields
  const [apprenticeYear, setApprenticeYear] = useState<string>(
    String(profile?.apprentice_year || 1)
  );
  const [apprenticeLevel, setApprenticeLevel] = useState(profile?.apprentice_level || '');
  const [trainingProvider, setTrainingProvider] = useState(profile?.training_provider || '');
  const [ecsCardStatus, setEcsCardStatus] = useState(profile?.ecs_card_status || 'not_applied');
  const [supervisorName, setSupervisorName] = useState(profile?.supervisor_name || '');

  // Electrician fields
  const [jobTitle, setJobTitle] = useState(profile?.job_title || '');
  const [specialisation, setSpecialisation] = useState(profile?.specialisation || '');
  const [yearsExperience, setYearsExperience] = useState(
    profile?.years_experience?.toString() || ''
  );
  const [ecsCardType, setEcsCardType] = useState(profile?.ecs_card_type || '');

  // Employer fields
  const [businessPosition, setBusinessPosition] = useState(profile?.business_position || '');
  const [companySize, setCompanySize] = useState(profile?.company_size || '');

  const role = profile?.role;

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.full_name || user?.email?.split('@')[0] || '');
      setApprenticeYear(String(profile.apprentice_year || 1));
      setApprenticeLevel(profile.apprentice_level || '');
      setTrainingProvider(profile.training_provider || '');
      setEcsCardStatus(profile.ecs_card_status || 'not_applied');
      setSupervisorName(profile.supervisor_name || '');
      setJobTitle(profile.job_title || '');
      setSpecialisation(profile.specialisation || '');
      setYearsExperience(profile.years_experience?.toString() || '');
      setEcsCardType(profile.ecs_card_type || '');
      setBusinessPosition(profile.business_position || '');
      setCompanySize(profile.company_size || '');
    }
  }, [profile, user]);

  const handleSave = async (updateData: Record<string, unknown>, closeSheet: () => void) => {
    if (!user?.id) return;
    setIsSaving(true);

    try {
      const { error } = await supabase.from('profiles').update(updateData).eq('id', user.id);
      if (error) throw error;
      await fetchProfile(user.id);

      setShowSuccess(true);
      addNotification({
        title: 'Saved',
        message: 'Your changes have been saved.',
        type: 'success',
      });
      setTimeout(() => {
        setShowSuccess(false);
        closeSheet();
      }, 400);
    } catch (error) {
      console.error('Failed to update profile:', error);
      addNotification({
        title: 'Update Failed',
        message: 'Could not save changes. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      addNotification({ title: 'Invalid file', message: 'Please select an image', type: 'error' });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      addNotification({ title: 'File too large', message: 'Max 2MB', type: 'error' });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);
      if (updateError) throw updateError;

      await fetchProfile(user.id);
      addNotification({ title: 'Photo updated', message: 'Profile photo saved', type: 'success' });
    } catch (error: unknown) {
      addNotification({
        title: 'Upload failed',
        message: error instanceof Error ? error.message : 'Upload failed',
        type: 'error',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = () => {
    handleSave({ full_name: displayName }, () => setIsEditingProfile(false));
  };

  const handleSaveApprentice = () => {
    handleSave(
      {
        apprentice_year: parseInt(apprenticeYear),
        apprentice_level: apprenticeLevel,
        training_provider: trainingProvider,
        ecs_card_status: ecsCardStatus,
        supervisor_name: supervisorName,
      },
      () => setIsEditingApprentice(false)
    );
  };

  const handleSaveElectrician = () => {
    handleSave(
      {
        job_title: jobTitle,
        specialisation: specialisation,
        years_experience: yearsExperience ? parseInt(yearsExperience) : null,
        ecs_card_type: ecsCardType,
      },
      () => setIsEditingElectrician(false)
    );
  };

  const handleSaveEmployer = () => {
    handleSave(
      {
        business_position: businessPosition,
        company_size: companySize,
      },
      () => setIsEditingEmployer(false)
    );
  };

  const renderSaveButton = (onClick: () => void) => (
    <button
      onClick={onClick}
      disabled={isSaving}
      className="text-[13px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation disabled:opacity-50"
    >
      {isSaving ? 'Saving…' : showSuccess ? 'Saved' : 'Save'}
    </button>
  );

  const ecsStatusLabel =
    ecsCardStatus === 'not_applied'
      ? 'Not Applied'
      : ecsCardStatus === 'applied'
        ? 'Applied'
        : 'Received';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ── PROFILE ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="01"
          title="Profile"
          action="Edit"
          onAction={() => setIsEditingProfile(true)}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />

        {/* Avatar + identity row */}
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`relative h-16 w-16 rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.08] flex items-center justify-center touch-manipulation ${
              uploading ? 'animate-pulse' : ''
            }`}
            aria-label="Change profile photo"
          >
            {profile?.avatar_url ? (
              <img
                loading="lazy"
                src={profile.avatar_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[11px] font-medium text-white uppercase tracking-wider">
                Upload
              </span>
            )}
          </button>
          <div className="flex-1 min-w-0">
            <Eyebrow>Display Name</Eyebrow>
            <div className="mt-1 text-[17px] font-semibold text-white truncate">
              {displayName || 'Not set'}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[12.5px] text-white/65 truncate">
                {user?.email || 'Not set'}
              </span>
              {user?.email && (
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

      </motion.section>

      {/* ── APPRENTICE ── */}
      {role === 'apprentice' && (
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="02"
            title="Apprentice Details"
            action="Edit"
            onAction={() => setIsEditingApprentice(true)}
          />
          <ListCard>
            <KVRow
              label="Course Level"
              value={getLabel(APPRENTICE_LEVELS, apprenticeLevel)}
              onEdit={() => setIsEditingApprentice(true)}
            />
            <KVRow
              label="Current Year"
              value={`Year ${apprenticeYear}`}
              onEdit={() => setIsEditingApprentice(true)}
            />
            <KVRow
              label="Training Provider"
              value={trainingProvider || 'Not set'}
              onEdit={() => setIsEditingApprentice(true)}
            />
            <KVRow
              label="ECS Card Status"
              value={ecsStatusLabel}
              trailing={
                ecsCardStatus === 'received' ? (
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                    Received
                  </span>
                ) : ecsCardStatus === 'applied' ? (
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-amber-400">
                    Applied
                  </span>
                ) : (
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-red-400">
                    Not Applied
                  </span>
                )
              }
            />
            <KVRow
              label="Supervisor"
              value={supervisorName || 'Not set'}
              onEdit={() => setIsEditingApprentice(true)}
            />
          </ListCard>
        </motion.section>
      )}

      {/* ── PROFESSIONAL (electrician + employer) ── */}
      {(role === 'electrician' || role === 'employer') && (
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="03"
            title="Professional Details"
            action="Edit"
            onAction={() => setIsEditingElectrician(true)}
          />
          <ListCard>
            <KVRow
              label="Job Title"
              value={getLabel(UK_JOB_TITLES, jobTitle)}
              onEdit={() => setIsEditingElectrician(true)}
            />
            <KVRow
              label="Specialisation"
              value={getLabel(UK_SPECIALISATIONS, specialisation)}
              onEdit={() => setIsEditingElectrician(true)}
            />
            <KVRow
              label="Years Experience"
              value={yearsExperience ? `${yearsExperience} years` : 'Not set'}
              onEdit={() => setIsEditingElectrician(true)}
            />
            <KVRow
              label="ECS Card Type"
              value={getLabel(UK_ECS_CARD_TYPES, ecsCardType)}
              onEdit={() => setIsEditingElectrician(true)}
            />
          </ListCard>
        </motion.section>
      )}

      {/* ── BUSINESS ROLE ── */}
      {role === 'employer' && (
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow="04"
            title="Business Role"
            action="Edit"
            onAction={() => setIsEditingEmployer(true)}
          />
          <ListCard>
            <KVRow
              label="Position"
              value={getLabel(EMPLOYER_POSITIONS, businessPosition)}
              onEdit={() => setIsEditingEmployer(true)}
            />
            <KVRow
              label="Company Size"
              value={getLabel(COMPANY_SIZES, companySize)}
              onEdit={() => setIsEditingEmployer(true)}
            />
          </ListCard>
        </motion.section>
      )}

      {/* ── PROFILE EDIT SHEET ── */}
      <Sheet open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_12%)] flex flex-col"
        >
          <div className="flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06] shrink-0">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="text-[13px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[15px] font-semibold text-white">Edit Profile</h2>
            {renderSaveButton(handleSaveProfile)}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-6 pb-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Display Name
              </Label>
              <Input
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Email
              </Label>
              <div className="h-11 flex items-center bg-[#0a0a0a] rounded-xl px-4 border border-white/[0.06]">
                <p className="text-[15px] text-white">{user?.email || ''}</p>
              </div>
              <p className="text-[11.5px] text-white">Email cannot be changed here</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── APPRENTICE EDIT SHEET ── */}
      <Sheet open={isEditingApprentice} onOpenChange={setIsEditingApprentice}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_12%)] flex flex-col"
        >
          <div className="flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06] shrink-0">
            <button
              onClick={() => setIsEditingApprentice(false)}
              className="text-[13px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[15px] font-semibold text-white">Apprentice Details</h2>
            {renderSaveButton(handleSaveApprentice)}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-6 pb-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Course Level
              </Label>
              <Select value={apprenticeLevel} onValueChange={setApprenticeLevel}>
                <SelectTrigger className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                  {APPRENTICE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Current Year
              </Label>
              <Select value={apprenticeYear} onValueChange={setApprenticeYear}>
                <SelectTrigger className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Training Provider
              </Label>
              <Input
                placeholder="e.g. City College"
                value={trainingProvider}
                onChange={(e) => setTrainingProvider(e.target.value)}
                className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                ECS Card Status
              </Label>
              <Select value={ecsCardStatus} onValueChange={setEcsCardStatus}>
                <SelectTrigger className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                  <SelectItem value="not_applied">Not Applied</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Supervisor
              </Label>
              <Input
                placeholder="Supervisor name"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── ELECTRICIAN EDIT SHEET ── */}
      <Sheet open={isEditingElectrician} onOpenChange={setIsEditingElectrician}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_12%)] flex flex-col"
        >
          <div className="flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06] shrink-0">
            <button
              onClick={() => setIsEditingElectrician(false)}
              className="text-[13px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[15px] font-semibold text-white">Professional Details</h2>
            {renderSaveButton(handleSaveElectrician)}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-6 pb-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Job Title
              </Label>
              <Select value={jobTitle} onValueChange={setJobTitle}>
                <SelectTrigger className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select job title" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                  {UK_JOB_TITLES.map((title) => (
                    <SelectItem key={title.value} value={title.value}>
                      {title.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Specialisation
              </Label>
              <Select value={specialisation} onValueChange={setSpecialisation}>
                <SelectTrigger className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                  {UK_SPECIALISATIONS.map((spec) => (
                    <SelectItem key={spec.value} value={spec.value}>
                      {spec.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Years Experience
              </Label>
              <Input
                type="number"
                min="0"
                max="50"
                placeholder="0"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                ECS Card Type
              </Label>
              <Select value={ecsCardType} onValueChange={setEcsCardType}>
                <SelectTrigger className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                  {UK_ECS_CARD_TYPES.map((card) => (
                    <SelectItem key={card.value} value={card.value}>
                      {card.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── EMPLOYER EDIT SHEET ── */}
      <Sheet open={isEditingEmployer} onOpenChange={setIsEditingEmployer}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_12%)] flex flex-col"
        >
          <div className="flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06] shrink-0">
            <button
              onClick={() => setIsEditingEmployer(false)}
              className="text-[13px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[15px] font-semibold text-white">Business Role</h2>
            {renderSaveButton(handleSaveEmployer)}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-6 pb-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Position
              </Label>
              <Select value={businessPosition} onValueChange={setBusinessPosition}>
                <SelectTrigger className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                  {EMPLOYER_POSITIONS.map((pos) => (
                    <SelectItem key={pos.value} value={pos.value}>
                      {pos.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Company Size
              </Label>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                  {COMPANY_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default AccountTab;
