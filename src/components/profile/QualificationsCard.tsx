import React, { useState } from 'react';
import { GraduationCap, IdCard, Shield, Award, ChevronRight, Loader2, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { InspectorProfile } from '@/hooks/useInspectorProfiles';
import { ElecIdProfile } from '@/hooks/useElecIdProfile';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface QualificationsCardProps {
  inspectorProfile: InspectorProfile | null;
  elecIdProfile: ElecIdProfile | null;
  hasElecId: boolean;
  onSave: (id: string, updates: Partial<InspectorProfile>) => Promise<void>;
  isLoading: boolean;
}

const QUALIFICATION_OPTIONS = [
  '18th Edition BS7671',
  'City & Guilds 2391-52',
  'City & Guilds 2391-51',
  'NICEIC Approved',
  'NAPIT Registered',
  'ECA Member',
  'JIB Approved',
  'CompEx Certified',
];

const SCHEME_OPTIONS = [
  { value: 'NICEIC', label: 'NICEIC' },
  { value: 'NAPIT', label: 'NAPIT' },
  { value: 'ELECSA', label: 'ELECSA' },
  { value: 'STROMA', label: 'STROMA' },
  { value: 'BRE', label: 'BRE' },
  { value: 'ECA', label: 'ECA' },
  { value: 'SELECT', label: 'SELECT' },
];

const QualificationsCard: React.FC<QualificationsCardProps> = ({
  inspectorProfile,
  elecIdProfile,
  hasElecId,
  onSave,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [formData, setFormData] = useState({
    registrationScheme: inspectorProfile?.registrationScheme || '',
    registrationNumber: inspectorProfile?.registrationNumber || '',
    registrationExpiry: inspectorProfile?.registrationExpiry || '',
    qualifications: inspectorProfile?.qualifications || [],
    insuranceProvider: inspectorProfile?.insuranceProvider || '',
    insurancePolicyNumber: inspectorProfile?.insurancePolicyNumber || '',
    insuranceCoverage: inspectorProfile?.insuranceCoverage || '',
    insuranceExpiry: inspectorProfile?.insuranceExpiry || '',
  });

  const handleSave = async () => {
    if (!inspectorProfile?.id) return;
    setIsSaving(true);
    await onSave(inspectorProfile.id, formData);
    setIsSaving(false);
    setShowSuccess(true);
    toast.success('Qualifications saved');
    setTimeout(() => {
      setShowSuccess(false);
      setIsEditing(false);
    }, 400);
  };

  const handleOpen = () => {
    setFormData({
      registrationScheme: inspectorProfile?.registrationScheme || '',
      registrationNumber: inspectorProfile?.registrationNumber || '',
      registrationExpiry: inspectorProfile?.registrationExpiry || '',
      qualifications: inspectorProfile?.qualifications || [],
      insuranceProvider: inspectorProfile?.insuranceProvider || '',
      insurancePolicyNumber: inspectorProfile?.insurancePolicyNumber || '',
      insuranceCoverage: inspectorProfile?.insuranceCoverage || '',
      insuranceExpiry: inspectorProfile?.insuranceExpiry || '',
    });
    setIsEditing(true);
  };

  const toggleQualification = (qual: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.includes(qual)
        ? prev.qualifications.filter(q => q !== qual)
        : [...prev.qualifications, qual],
    }));
  };

  const ecsCardType = elecIdProfile?.ecs_card_type;
  const ecsCardNumber = elecIdProfile?.ecs_card_number;
  const ecsExpiry = elecIdProfile?.ecs_expiry_date;

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <motion.div
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <button
          onClick={handleOpen}
          className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="font-semibold text-[15px] text-white">Qualifications</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>

        <div className="border-t border-white/[0.06]">
          {/* ECS Card */}
          {(ecsCardType || hasElecId) && (
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                <IdCard className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">ECS Card</p>
                <p className="text-[15px] text-white">{ecsCardType || 'Not set'}</p>
                {ecsCardNumber && (
                  <p className="text-[13px] text-white/50 mt-0.5">
                    {ecsCardNumber} {ecsExpiry && `• Exp: ${formatDate(ecsExpiry)}`}
                  </p>
                )}
                {hasElecId && (
                  <span className="inline-flex items-center gap-1 mt-1 text-[11px] text-emerald-400">
                    <Shield className="h-3 w-3" />
                    From Elec-ID
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Scheme Registration */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
              <Award className="h-4 w-4 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Scheme Registration</p>
              <p className="text-[15px] text-white">
                {inspectorProfile?.registrationScheme ? (
                  <>
                    {inspectorProfile.registrationScheme}: {inspectorProfile.registrationNumber || 'No number'}
                    {inspectorProfile.registrationExpiry && (
                      <span className="text-white/50"> • Exp: {formatDate(inspectorProfile.registrationExpiry)}</span>
                    )}
                  </>
                ) : (
                  'Not set'
                )}
              </p>
            </div>
          </div>

          {/* Qualifications */}
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Qualifications</p>
              {inspectorProfile?.qualifications && inspectorProfile.qualifications.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {inspectorProfile.qualifications.map((qual) => (
                    <span
                      key={qual}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 text-[12px] font-medium"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[15px] text-white">None added</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e]">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08]">
            <button
              onClick={() => setIsEditing(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Qualifications</h2>
            <button
              onClick={handleSave}
              disabled={isSaving || !inspectorProfile?.id}
              className="text-[17px] text-blue-400 font-semibold active:opacity-50 touch-manipulation disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : showSuccess ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                  <Check className="h-5 w-5 text-green-400" />
                </motion.div>
              ) : (
                'Save'
              )}
            </button>
          </div>

          <div className="px-4 py-6 space-y-6 momentum-scroll-y pb-32">
            {hasElecId && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span className="text-[14px] font-medium text-emerald-400">ECS Card from Elec-ID</span>
                </div>
                <p className="text-[13px] text-white/60">
                  Your ECS card details are pulled from your verified Elec-ID. Update them in Settings → Elec-ID.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Registration Scheme
              </Label>
              <Select
                value={formData.registrationScheme}
                onValueChange={(value) => setFormData({ ...formData, registrationScheme: value })}
              >
                <SelectTrigger className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 text-white">
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent className="bg-[#2c2c2e] border-white/10">
                  {SCHEME_OPTIONS.map((scheme) => (
                    <SelectItem key={scheme.value} value={scheme.value} className="text-white">
                      {scheme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Registration Number
              </Label>
              <Input
                placeholder="e.g. NIC/12345"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Registration Expiry
              </Label>
              <Input
                type="date"
                value={formData.registrationExpiry}
                onChange={(e) => setFormData({ ...formData, registrationExpiry: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Qualifications
              </Label>
              <div className="space-y-2">
                {QUALIFICATION_OPTIONS.map((qual) => (
                  <motion.button
                    key={qual}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] touch-manipulation text-left active:bg-white/[0.08]"
                    onClick={() => toggleQualification(qual)}
                  >
                    <Checkbox
                      checked={formData.qualifications.includes(qual)}
                      className="border-white/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <span className="text-[15px] text-white">{qual}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <Collapsible open={showInsurance} onOpenChange={setShowInsurance}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] touch-manipulation">
                <span className="text-[15px] font-medium text-white">Insurance Details</span>
                {showInsurance ? (
                  <ChevronUp className="h-5 w-5 text-white/50" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white/50" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                    Insurance Provider
                  </Label>
                  <Input
                    placeholder="e.g. Hiscox"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                    className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                    Policy Number
                  </Label>
                  <Input
                    placeholder="Policy number"
                    value={formData.insurancePolicyNumber}
                    onChange={(e) => setFormData({ ...formData, insurancePolicyNumber: e.target.value })}
                    className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                    Coverage Amount
                  </Label>
                  <Input
                    placeholder="e.g. £2,000,000"
                    value={formData.insuranceCoverage}
                    onChange={(e) => setFormData({ ...formData, insuranceCoverage: e.target.value })}
                    className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                    Expiry Date
                  </Label>
                  <Input
                    type="date"
                    value={formData.insuranceExpiry}
                    onChange={(e) => setFormData({ ...formData, insuranceExpiry: e.target.value })}
                    className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default QualificationsCard;
