import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Sheet } from '@/components/ui/sheet';
import SettingsSheetContent from '@/components/settings/SettingsSheetContent';
import SecuritySection from './SecuritySection';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import {
  Eyebrow,
  TextAction,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';
import { SettingsCard } from '@/components/settings/rows';
import { ECS_CARD_TYPES, getEcsCardLabel } from '@/data/uk-electrician-constants';
import { cn } from '@/lib/utils';
import {
  chipBase,
  chipOff,
  chipOn,
  hintCn,
  inputCn,
  labelCn,
  selectTriggerCn,
} from '@/components/settings/formStyles';

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
  { value: 'testing_inspection_engineer', label: 'Testing & Inspection Engineer' },
  { value: 'commissioning_engineer', label: 'Commissioning Engineer' },
  { value: 'design_engineer', label: 'Electrical Design Engineer' },
  { value: 'electrical_improver', label: 'Electrical Improver' },
  { value: 'electricians_mate', label: "Electrician's Mate" },
  { value: 'panel_builder', label: 'Panel Builder' },
  { value: 'business_owner', label: 'Business Owner' },
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
  { value: 'testing_inspection', label: 'Testing & Inspection' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'new_build', label: 'New Build' },
  { value: 'social_housing', label: 'Social Housing' },
  { value: 'street_lighting', label: 'Street Lighting' },
  { value: 'agricultural', label: 'Agricultural' },
  { value: 'bms', label: 'BMS & Controls' },
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

const APPRENTICE_YEARS = [
  { value: '1', label: 'Year 1' },
  { value: '2', label: 'Year 2' },
  { value: '3', label: 'Year 3' },
  { value: '4', label: 'Year 4' },
];

const ECS_CARD_STATUSES = [
  { value: 'not_applied', label: 'Not applied' },
  { value: 'applied', label: 'Applied' },
  { value: 'received', label: 'Received' },
] as const;

const ECS_CARD_PICKER_OPTIONS = ECS_CARD_TYPES.map((card) => ({
  value: card.value,
  label: card.label,
}));

const getLabel = (options: { value: string; label: string }[], value: string) => {
  return options.find((opt) => opt.value === value)?.label || 'Not set';
};

/* ────────────────────────────────────────────────
   Row building block — used within SettingsCard
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
      className="text-[13px] font-medium text-elec-yellow hover:text-elec-yellow transition-colors touch-manipulation disabled:opacity-50"
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
    >
      {/* ── PROFILE ── */}
      <motion.section variants={itemVariants} className="h-full">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />

        <SettingsCard
          eyebrow="01"
          title="Profile"
          action={<TextAction onClick={() => setIsEditingProfile(true)}>Edit</TextAction>}
        >
          {/* Avatar + identity row */}
          <div className="p-5 sm:p-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`relative h-16 w-16 rounded-2xl overflow-hidden bg-white/[0.04] border border-elec-yellow/35 flex items-center justify-center touch-manipulation ${
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
                <span className="text-[12.5px] text-white truncate">
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
        </SettingsCard>
      </motion.section>

      {/* ── APPRENTICE ── */}
      {role === 'apprentice' && (
        <motion.section variants={itemVariants} className="h-full">
          <SettingsCard
            eyebrow="02"
            title="Apprentice Details"
            action={<TextAction onClick={() => setIsEditingApprentice(true)}>Edit</TextAction>}
          >
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
          </SettingsCard>
        </motion.section>
      )}

      {/* ── PROFESSIONAL (electrician + employer) ── */}
      {(role === 'electrician' || role === 'employer') && (
        <motion.section variants={itemVariants} className="h-full">
          <SettingsCard
            eyebrow="02"
            title="Professional Details"
            action={<TextAction onClick={() => setIsEditingElectrician(true)}>Edit</TextAction>}
          >
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
              value={getEcsCardLabel(ecsCardType)}
              onEdit={() => setIsEditingElectrician(true)}
            />
          </SettingsCard>
        </motion.section>
      )}

      {/* ── BUSINESS ROLE ── */}
      {role === 'employer' && (
        <motion.section variants={itemVariants} className="h-full">
          <SettingsCard
            eyebrow="03"
            title="Business Role"
            action={<TextAction onClick={() => setIsEditingEmployer(true)}>Edit</TextAction>}
          >
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
          </SettingsCard>
        </motion.section>
      )}

      {/* ── SECURITY ── */}
      <SecuritySection eyebrow={role === 'employer' ? '04' : '03'} />

      {/* ── PROFILE EDIT SHEET ── */}
      <Sheet open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <SettingsSheetContent className="bg-elec-dark flex flex-col" title="Edit Profile">
          <div className="lg:hidden flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pt-4 lg:pt-6 pb-4 border-b border-white/[0.06] shrink-0">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="text-[13px] font-medium text-white hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[15px] font-semibold text-white">Edit Profile</h2>
            {renderSaveButton(handleSaveProfile)}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-4 pb-10">
            <div>
              <Label className={labelCn}>Display name</Label>
              <Input
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={inputCn}
              />
            </div>
            <div className="border-t border-white/[0.1] pt-4">
              <Label className={labelCn}>Email</Label>
              <div className="h-11 flex items-center border-b border-white/[0.15] px-1">
                <p className="text-base font-medium text-white">{user?.email || ''}</p>
              </div>
              <p className={hintCn}>Email cannot be changed here</p>
            </div>
          </div>
        </SettingsSheetContent>
      </Sheet>

      {/* ── APPRENTICE EDIT SHEET ── */}
      <Sheet open={isEditingApprentice} onOpenChange={setIsEditingApprentice}>
        <SettingsSheetContent className="bg-elec-dark flex flex-col" title="Apprentice Details">
          <div className="lg:hidden flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pt-4 lg:pt-6 pb-4 border-b border-white/[0.06] shrink-0">
            <button
              onClick={() => setIsEditingApprentice(false)}
              className="text-[13px] font-medium text-white hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[15px] font-semibold text-white">Apprentice Details</h2>
            {renderSaveButton(handleSaveApprentice)}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-4 pb-10">
            <div>
              <Label className={labelCn}>Course level</Label>
              <MobileSelectPicker
                value={apprenticeLevel}
                onValueChange={setApprenticeLevel}
                options={APPRENTICE_LEVELS}
                placeholder="Select level"
                triggerClassName={selectTriggerCn}
              />
            </div>

            <div>
              <Label className={labelCn}>Current year</Label>
              <MobileSelectPicker
                value={apprenticeYear}
                onValueChange={setApprenticeYear}
                options={APPRENTICE_YEARS}
                placeholder="Select year"
                triggerClassName={selectTriggerCn}
              />
            </div>

            <div>
              <Label className={labelCn}>Training provider</Label>
              <Input
                placeholder="e.g. City College"
                value={trainingProvider}
                onChange={(e) => setTrainingProvider(e.target.value)}
                className={inputCn}
              />
            </div>

            <div>
              <Label className={labelCn}>ECS card status</Label>
              <div className="flex gap-2">
                {ECS_CARD_STATUSES.map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => setEcsCardStatus(status.value)}
                    className={cn(chipBase, ecsCardStatus === status.value ? chipOn : chipOff)}
                    aria-pressed={ecsCardStatus === status.value}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className={labelCn}>Supervisor</Label>
              <Input
                placeholder="Supervisor name"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
        </SettingsSheetContent>
      </Sheet>

      {/* ── ELECTRICIAN EDIT SHEET ── */}
      <Sheet open={isEditingElectrician} onOpenChange={setIsEditingElectrician}>
        <SettingsSheetContent className="bg-elec-dark flex flex-col" title="Professional Details">
          <div className="lg:hidden flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pt-4 lg:pt-6 pb-4 border-b border-white/[0.06] shrink-0">
            <button
              onClick={() => setIsEditingElectrician(false)}
              className="text-[13px] font-medium text-white hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[15px] font-semibold text-white">Professional Details</h2>
            {renderSaveButton(handleSaveElectrician)}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-4 pb-10">
            <div>
              <Label className={labelCn}>Job title</Label>
              <MobileSelectPicker
                value={jobTitle}
                onValueChange={setJobTitle}
                options={UK_JOB_TITLES}
                placeholder="Select job title"
                triggerClassName={selectTriggerCn}
              />
            </div>

            <div>
              <Label className={labelCn}>Specialisation</Label>
              <MobileSelectPicker
                value={specialisation}
                onValueChange={setSpecialisation}
                options={UK_SPECIALISATIONS}
                placeholder="Select area"
                triggerClassName={selectTriggerCn}
              />
            </div>

            <div>
              <Label className={labelCn}>Years experience</Label>
              <Input
                type="number"
                min="0"
                max="50"
                placeholder="0"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className={inputCn}
              />
            </div>

            <div>
              <Label className={labelCn}>ECS card type</Label>
              <MobileSelectPicker
                value={ecsCardType}
                onValueChange={setEcsCardType}
                options={ECS_CARD_PICKER_OPTIONS}
                placeholder="Select card type"
                triggerClassName={selectTriggerCn}
              />
            </div>
          </div>
        </SettingsSheetContent>
      </Sheet>

      {/* ── EMPLOYER EDIT SHEET ── */}
      <Sheet open={isEditingEmployer} onOpenChange={setIsEditingEmployer}>
        <SettingsSheetContent className="bg-elec-dark flex flex-col" title="Business Role">
          <div className="lg:hidden flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center justify-between px-5 pt-4 lg:pt-6 pb-4 border-b border-white/[0.06] shrink-0">
            <button
              onClick={() => setIsEditingEmployer(false)}
              className="text-[13px] font-medium text-white hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[15px] font-semibold text-white">Business Role</h2>
            {renderSaveButton(handleSaveEmployer)}
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-4 pb-10">
            <div>
              <Label className={labelCn}>Position</Label>
              <MobileSelectPicker
                value={businessPosition}
                onValueChange={setBusinessPosition}
                options={EMPLOYER_POSITIONS}
                placeholder="Select position"
                triggerClassName={selectTriggerCn}
              />
            </div>

            <div>
              <Label className={labelCn}>Company size</Label>
              <MobileSelectPicker
                value={companySize}
                onValueChange={setCompanySize}
                options={COMPANY_SIZES}
                placeholder="Select size"
                triggerClassName={selectTriggerCn}
              />
            </div>
          </div>
        </SettingsSheetContent>
      </Sheet>
    </motion.div>
  );
};

export default AccountTab;
