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
  User,
  Mail,
  Loader2,
  Building2,
  CreditCard,
  Calendar,
  Briefcase,
  Target,
  Clock,
  Users,
  Award,
  UserCheck,
  ChevronRight,
  Check,
  Camera,
} from 'lucide-react';

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

// UK Specialisations
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

// UK ECS Card Types
const UK_ECS_CARD_TYPES = [
  { value: 'gold', label: 'Gold Card (Electrician)' },
  { value: 'blue', label: 'Blue Card (Approved Electrician)' },
  { value: 'black', label: 'Black Card (Installation Electrician - Maintenance)' },
  { value: 'white', label: 'White Card (Provisional)' },
  { value: 'green', label: 'Green Card (Apprentice)' },
  { value: 'red', label: 'Red Card (Trainee)' },
];

// Apprentice Levels (City & Guilds / EAL)
const APPRENTICE_LEVELS = [
  { value: 'level2', label: 'Level 2 - Installation (2365)' },
  { value: 'level3', label: 'Level 3 - Electrotechnical (2365)' },
  { value: 'level3_am2', label: 'Level 3 + AM2' },
];

// Employer Positions
const EMPLOYER_POSITIONS = [
  { value: 'director', label: 'Director' },
  { value: 'managing_director', label: 'Managing Director' },
  { value: 'owner', label: 'Owner/Sole Trader' },
  { value: 'operations_manager', label: 'Operations Manager' },
  { value: 'office_manager', label: 'Office Manager' },
];

// Company Sizes
const COMPANY_SIZES = [
  { value: '1-5', label: '1-5 employees' },
  { value: '6-20', label: '6-20 employees' },
  { value: '21-50', label: '21-50 employees' },
  { value: '50+', label: '50+ employees' },
];

// Helper to get label from value
const getLabel = (options: { value: string; label: string }[], value: string) => {
  return options.find((opt) => opt.value === value)?.label || 'Not set';
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

  // Profile fields state
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

  // Update local state when profile loads
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

  // Generic save handler
  const handleSave = async (updateData: Record<string, any>, closeSheet: () => void) => {
    if (!user?.id) return;
    setIsSaving(true);

    try {
      const { error } = await supabase.from('profiles').update(updateData).eq('id', user.id);

      if (error) throw error;

      // CRITICAL: Refresh the profile from database to ensure AuthContext is updated
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

  // Photo upload handler
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
      // Use user.id as folder for RLS policy compliance
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
    } catch (error: any) {
      addNotification({ title: 'Upload failed', message: error.message, type: 'error' });
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

  // Row renderer for cards
  const renderRow = (
    icon: React.ElementType,
    iconBg: string,
    iconColor: string,
    label: string,
    value: string,
    isLast: boolean,
    badge?: string
  ) => {
    const Icon = icon;
    return (
      <div
        key={label}
        className={`flex items-center gap-3 px-4 py-3 ${!isLast ? 'border-b border-white/[0.04]' : ''}`}
      >
        <div
          className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">{label}</p>
          <p className="text-[15px] text-white truncate">{value}</p>
        </div>
        {badge && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-medium">
            {badge}
          </span>
        )}
      </div>
    );
  };

  // Save button renderer for sheets
  const renderSaveButton = (onClick: () => void) => (
    <button
      onClick={onClick}
      disabled={isSaving}
      className="text-[17px] text-blue-400 font-semibold active:opacity-50 touch-manipulation disabled:opacity-50"
    >
      {isSaving ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : showSuccess ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <Check className="h-5 w-5 text-green-400" />
        </motion.div>
      ) : (
        'Save'
      )}
    </button>
  );

  return (
    <motion.div className="space-y-4">
      {/* Profile Card */}
      <motion.div
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />
        <button
          onClick={() => setIsEditingProfile(true)}
          className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <div className="flex items-center gap-3">
            {/* Avatar with camera button */}
            <div className="relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className={`w-10 h-10 rounded-xl overflow-hidden bg-white/[0.05] border border-white/10 flex items-center justify-center cursor-pointer ${uploading ? 'animate-pulse' : ''}`}
              >
                {profile?.avatar_url ? (
                  <img
                    loading="lazy"
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white/40" />
                )}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center pointer-events-none">
                <Camera className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="font-semibold text-[15px] text-white">Profile</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>

        <div className="border-t border-white/[0.06]">
          {renderRow(
            User,
            'bg-blue-500/15',
            'text-blue-400',
            'Display Name',
            displayName || 'Not set',
            false
          )}
          {renderRow(
            Mail,
            'bg-green-500/15',
            'text-green-400',
            'Email',
            user?.email || 'Not set',
            true,
            'Verified'
          )}
        </div>
      </motion.div>

      {/* Apprentice Card */}
      {role === 'apprentice' && (
        <motion.div
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <button
            onClick={() => setIsEditingApprentice(true)}
            className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="font-semibold text-[15px] text-white">Apprentice Details</span>
            </div>
            <ChevronRight className="h-5 w-5 text-white/30" />
          </button>

          <div className="border-t border-white/[0.06]">
            {renderRow(
              Award,
              'bg-amber-500/15',
              'text-amber-400',
              'Course Level',
              getLabel(APPRENTICE_LEVELS, apprenticeLevel),
              false
            )}
            {renderRow(
              Calendar,
              'bg-blue-500/15',
              'text-blue-400',
              'Current Year',
              `Year ${apprenticeYear}`,
              false
            )}
            {renderRow(
              Building2,
              'bg-cyan-500/15',
              'text-cyan-400',
              'Training Provider',
              trainingProvider || 'Not set',
              false
            )}
            {renderRow(
              CreditCard,
              'bg-green-500/15',
              'text-green-400',
              'ECS Card Status',
              ecsCardStatus === 'not_applied'
                ? 'Not Applied'
                : ecsCardStatus === 'applied'
                  ? 'Applied'
                  : 'Received',
              false
            )}
            {renderRow(
              UserCheck,
              'bg-rose-500/15',
              'text-rose-400',
              'Supervisor',
              supervisorName || 'Not set',
              true
            )}
          </div>
        </motion.div>
      )}

      {/* Professional Details Card - electricians AND employers */}
      {(role === 'electrician' || role === 'employer') && (
        <motion.div
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <button
            onClick={() => setIsEditingElectrician(true)}
            className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-semibold text-[15px] text-white">Professional Details</span>
            </div>
            <ChevronRight className="h-5 w-5 text-white/30" />
          </button>

          <div className="border-t border-white/[0.06]">
            {renderRow(
              Briefcase,
              'bg-blue-500/15',
              'text-blue-400',
              'Job Title',
              getLabel(UK_JOB_TITLES, jobTitle),
              false
            )}
            {renderRow(
              Target,
              'bg-purple-500/15',
              'text-purple-400',
              'Specialisation',
              getLabel(UK_SPECIALISATIONS, specialisation),
              false
            )}
            {renderRow(
              Clock,
              'bg-green-500/15',
              'text-green-400',
              'Years Experience',
              yearsExperience ? `${yearsExperience} years` : 'Not set',
              false
            )}
            {renderRow(
              CreditCard,
              'bg-amber-500/15',
              'text-amber-400',
              'ECS Card Type',
              getLabel(UK_ECS_CARD_TYPES, ecsCardType),
              true
            )}
          </div>
        </motion.div>
      )}

      {/* Employer Card */}
      {role === 'employer' && (
        <motion.div
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <button
            onClick={() => setIsEditingEmployer(true)}
            className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="font-semibold text-[15px] text-white">Business Role</span>
            </div>
            <ChevronRight className="h-5 w-5 text-white/30" />
          </button>

          <div className="border-t border-white/[0.06]">
            {renderRow(
              User,
              'bg-purple-500/15',
              'text-purple-400',
              'Position',
              getLabel(EMPLOYER_POSITIONS, businessPosition),
              false
            )}
            {renderRow(
              Users,
              'bg-green-500/15',
              'text-green-400',
              'Company Size',
              getLabel(COMPANY_SIZES, companySize),
              true
            )}
          </div>
        </motion.div>
      )}

      {/* Profile Edit Sheet */}
      <Sheet open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e] flex flex-col"
        >
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Edit Profile</h2>
            {renderSaveButton(handleSaveProfile)}
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-6 pb-8">
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Display Name
              </Label>
              <Input
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Email
              </Label>
              <div className="h-[50px] flex items-center bg-white/[0.04] rounded-xl px-4 border border-white/[0.06]">
                <p className="text-[17px] text-white/40">{user?.email || ''}</p>
              </div>
              <p className="text-[12px] text-white/40 px-1">Email cannot be changed here</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Apprentice Edit Sheet */}
      <Sheet open={isEditingApprentice} onOpenChange={setIsEditingApprentice}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e] flex flex-col"
        >
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setIsEditingApprentice(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Apprentice Details</h2>
            {renderSaveButton(handleSaveApprentice)}
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-6 pb-8">
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Course Level
              </Label>
              <Select value={apprenticeLevel} onValueChange={setApprenticeLevel}>
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
                  {APPRENTICE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Current Year
              </Label>
              <Select value={apprenticeYear} onValueChange={setApprenticeYear}>
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Training Provider
              </Label>
              <Input
                placeholder="e.g. City College"
                value={trainingProvider}
                onChange={(e) => setTrainingProvider(e.target.value)}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                ECS Card Status
              </Label>
              <Select value={ecsCardStatus} onValueChange={setEcsCardStatus}>
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
                  <SelectItem value="not_applied">Not Applied</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Supervisor
              </Label>
              <Input
                placeholder="Supervisor name"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Electrician Edit Sheet */}
      <Sheet open={isEditingElectrician} onOpenChange={setIsEditingElectrician}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e] flex flex-col"
        >
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setIsEditingElectrician(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Professional Details</h2>
            {renderSaveButton(handleSaveElectrician)}
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-6 pb-8">
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Job Title
              </Label>
              <Select value={jobTitle} onValueChange={setJobTitle}>
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select job title" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
                  {UK_JOB_TITLES.map((title) => (
                    <SelectItem key={title.value} value={title.value}>
                      {title.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Specialisation
              </Label>
              <Select value={specialisation} onValueChange={setSpecialisation}>
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
                  {UK_SPECIALISATIONS.map((spec) => (
                    <SelectItem key={spec.value} value={spec.value}>
                      {spec.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Years Experience
              </Label>
              <Input
                type="number"
                min="0"
                max="50"
                placeholder="0"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                ECS Card Type
              </Label>
              <Select value={ecsCardType} onValueChange={setEcsCardType}>
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
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

      {/* Employer Edit Sheet */}
      <Sheet open={isEditingEmployer} onOpenChange={setIsEditingEmployer}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e] flex flex-col"
        >
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setIsEditingEmployer(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Business Role</h2>
            {renderSaveButton(handleSaveEmployer)}
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-6 pb-8">
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Position
              </Label>
              <Select value={businessPosition} onValueChange={setBusinessPosition}>
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
                  {EMPLOYER_POSITIONS.map((pos) => (
                    <SelectItem key={pos.value} value={pos.value}>
                      {pos.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Company Size
              </Label>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
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
