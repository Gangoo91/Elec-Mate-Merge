import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { InspectorProfile, useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { INSPECTOR_QUALIFICATIONS } from '@/constants/inspectorQualifications';
import { useHaptic } from '@/hooks/useHaptic';

interface InspectorProfileDialogProps {
  onProfileSelected?: (profile: InspectorProfile) => void;
}

const qualificationOptions = INSPECTOR_QUALIFICATIONS;

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[80px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const chipOn =
  'bg-elec-yellow border border-elec-yellow text-black font-semibold outline-none focus:outline-none focus-visible:outline-none';
const chipOff =
  'bg-white/[0.06] border border-white/[0.12] text-white font-medium outline-none focus:outline-none focus-visible:outline-none';

const InspectorProfileDialog = ({ onProfileSelected }: InspectorProfileDialogProps) => {
  const { profiles, addProfile, updateProfile, deleteProfile, setDefaultProfile } =
    useInspectorProfiles();
  const haptic = useHaptic();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('manage');
  const [editingProfile, setEditingProfile] = useState<InspectorProfile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    qualifications: [] as string[],
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    registrationScheme: 'none',
    registrationNumber: '',
    registrationExpiry: '',
    insuranceProvider: 'none',
    insurancePolicyNumber: '',
    insuranceCoverage: '',
    insuranceExpiry: '',
    signatureData: '',
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      qualifications: [],
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      registrationScheme: 'none',
      registrationNumber: '',
      registrationExpiry: '',
      insuranceProvider: 'none',
      insurancePolicyNumber: '',
      insuranceCoverage: '',
      insuranceExpiry: '',
      signatureData: '',
      isDefault: false,
    });
    setEditingProfile(null);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;
    haptic.success();

    if (editingProfile) {
      updateProfile(editingProfile.id, formData);
    } else {
      addProfile(formData);
    }

    resetForm();
    setActiveTab('manage');
  };

  const handleEdit = (profile: InspectorProfile) => {
    setFormData({
      name: profile.name,
      qualifications: profile.qualifications,
      companyName: profile.companyName,
      companyAddress: profile.companyAddress,
      companyPhone: profile.companyPhone,
      companyEmail: profile.companyEmail,
      registrationScheme: profile.registrationScheme || 'none',
      registrationNumber: profile.registrationNumber || '',
      registrationExpiry: profile.registrationExpiry || '',
      insuranceProvider: profile.insuranceProvider || 'none',
      insurancePolicyNumber: profile.insurancePolicyNumber || '',
      insuranceCoverage: profile.insuranceCoverage || '',
      insuranceExpiry: profile.insuranceExpiry || '',
      signatureData: profile.signatureData || '',
      isDefault: profile.isDefault,
    });
    setEditingProfile(profile);
    setActiveTab('form');
  };

  const toggleQualification = (qual: string) => {
    const current = formData.qualifications;
    const updated = current.includes(qual) ? current.filter((q) => q !== qual) : [...current, qual];
    setFormData({ ...formData, qualifications: updated });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="min-h-11 px-2 text-xs font-medium text-white touch-manipulation active:scale-[0.98]"
        >
          Manage profiles
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header carries the view: list ↔ form. One flow, no tab strip. */}
          <div className="border-b border-white/[0.1] px-4 pb-3 pt-4">
            <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1">
                {activeTab === 'form' && (
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      resetForm();
                      setActiveTab('manage');
                    }}
                    className="-ml-2 h-11 shrink-0 px-2 text-[13px] font-semibold text-white/85 touch-manipulation active:scale-[0.97] outline-none focus:outline-none focus-visible:outline-none"
                  >
                    Back
                  </button>
                )}
                <SheetTitle className="truncate text-[15px] font-semibold tracking-tight text-white">
                  {activeTab === 'form'
                    ? editingProfile
                      ? 'Edit profile'
                      : 'New profile'
                    : 'Inspector profiles'}
                </SheetTitle>
              </div>
              {activeTab === 'manage' && (
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    resetForm();
                    setActiveTab('form');
                  }}
                  className="h-9 shrink-0 rounded-lg bg-elec-yellow px-3.5 text-[12px] font-semibold text-black touch-manipulation transition-transform active:scale-[0.97] outline-none focus:outline-none focus-visible:outline-none"
                >
                  New profile
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="mx-auto w-full max-w-2xl space-y-4">
            {activeTab === 'manage' && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 space-y-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-base font-semibold text-white">{profile.name}</p>
                          {profile.isDefault && (
                            <span className="text-[11px] font-semibold text-elec-yellow">
                              Default
                            </span>
                          )}
                        </div>
                        {profile.companyName && (
                          <p className="text-sm text-white mt-0.5">{profile.companyName}</p>
                        )}
                      </div>

                      {profile.qualifications.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {profile.qualifications.map((qual) => (
                            <span
                              key={qual}
                              className="text-xs text-white bg-white/[0.06] border border-white/[0.12] rounded-lg px-2 py-1"
                            >
                              {qual}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="text-sm text-white space-y-1">
                        {profile.companyPhone && <div>Tel: {profile.companyPhone}</div>}
                        {profile.companyEmail && <div>Email: {profile.companyEmail}</div>}
                        {profile.registrationNumber && <div>Reg: {profile.registrationNumber}</div>}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            haptic.success();
                            onProfileSelected?.(profile);
                            setOpen(false);
                          }}
                          className={cn(
                            'h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
                            chipOn
                          )}
                        >
                          Use profile
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEdit(profile)}
                          className={cn(
                            'h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
                            chipOff
                          )}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDefaultProfile(profile.id)}
                          disabled={profile.isDefault}
                          className={cn(
                            'h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50',
                            chipOff
                          )}
                        >
                          Set as default
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            haptic.warning();
                            deleteProfile(profile.id);
                          }}
                          className="h-11 rounded-xl text-sm font-medium text-red-400 border border-red-500/30 bg-transparent touch-manipulation active:scale-[0.98] transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {profiles.length === 0 && (
                    <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-5 py-8 text-center">
                      <p className="text-sm font-semibold text-white">No saved profiles yet</p>
                      <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-white/85">
                        Save your name, qualifications and company details once — then
                        fill the sign-off on every certificate with one tap.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          haptic.light();
                          resetForm();
                          setActiveTab('form');
                        }}
                        className="mt-4 h-11 rounded-xl bg-elec-yellow px-6 text-sm font-semibold text-black touch-manipulation transition-transform active:scale-[0.98] outline-none focus:outline-none focus-visible:outline-none"
                      >
                        Create your first profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'form' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profileName" className={labelCn}>
                      Inspector name *
                    </Label>
                    <Input
                      id="profileName"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full name of inspector"
                      className={inputCn}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox
                      id="defaultProfile"
                      checked={formData.isDefault}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isDefault: checked as boolean })
                      }
                      className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                    <Label htmlFor="defaultProfile" className="text-sm font-medium text-white">
                      Set as default profile
                    </Label>
                  </div>
                </div>

                <div>
                  <Label className={labelCn}>Qualifications</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                    {qualificationOptions.map((qual) => {
                      const isSelected = formData.qualifications.includes(qual);
                      return (
                        <button
                          key={qual}
                          type="button"
                          onClick={() => toggleQualification(qual)}
                          className={cn(
                            'min-h-11 rounded-xl px-2 py-1.5 text-xs text-left transition-all touch-manipulation active:scale-[0.98]',
                            isSelected ? chipOn : chipOff
                          )}
                        >
                          {qual}
                          {isSelected ? ' ✓' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="companyName" className={labelCn}>
                    Company name
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Company or organisation name"
                    className={inputCn}
                  />
                </div>

                <div>
                  <Label htmlFor="companyAddress" className={labelCn}>
                    Company address
                  </Label>
                  <Textarea
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                    placeholder="Full company address"
                    rows={3}
                    className={textareaCn}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyPhone" className={labelCn}>
                      Phone number
                    </Label>
                    <Input
                      id="companyPhone"
                      value={formData.companyPhone}
                      onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                      placeholder="Company phone number"
                      className={inputCn}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail" className={labelCn}>
                      Email address
                    </Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                      placeholder="Company email address"
                      className={inputCn}
                    />
                  </div>
                </div>

                <div>
                  <Label className={labelCn}>Registration scheme</Label>
                  <Input
                    value={formData.registrationScheme}
                    onChange={(e) =>
                      setFormData({ ...formData, registrationScheme: e.target.value })
                    }
                    placeholder="e.g. NICEIC, NAPIT, ELECSA"
                    className={inputCn}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registrationNumber" className={labelCn}>
                      Registration number
                    </Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, registrationNumber: e.target.value })
                      }
                      placeholder="Registration number"
                      className={inputCn}
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceProvider" className={labelCn}>
                      Insurance provider
                    </Label>
                    <Input
                      id="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={(e) =>
                        setFormData({ ...formData, insuranceProvider: e.target.value })
                      }
                      placeholder="e.g. AXA, Hiscox"
                      className={inputCn}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!formData.name.trim()}
                    className="h-12 w-full rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {editingProfile ? 'Update profile' : 'Save profile'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab('manage');
                    }}
                    className={cn(
                      'h-12 w-full rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
                      chipOff
                    )}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InspectorProfileDialog;
