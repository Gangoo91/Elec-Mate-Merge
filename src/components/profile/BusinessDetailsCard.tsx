import React, { useState } from 'react';
import { Building2, MapPin, Globe, Hash, ChevronRight, Loader2, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CompanyProfile } from '@/types/company';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface BusinessDetailsCardProps {
  companyProfile: CompanyProfile | null;
  onSave: (data: Partial<CompanyProfile>) => Promise<boolean>;
  isLoading: boolean;
}

const BusinessDetailsCard: React.FC<BusinessDetailsCardProps> = ({
  companyProfile,
  onSave,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVatRegistered, setIsVatRegistered] = useState(!!companyProfile?.vat_number);
  const [formData, setFormData] = useState({
    company_name: companyProfile?.company_name || '',
    company_address: companyProfile?.company_address || '',
    company_postcode: companyProfile?.company_postcode || '',
    company_website: companyProfile?.company_website || '',
    company_registration: companyProfile?.company_registration || '',
    vat_number: companyProfile?.vat_number || '',
  });

  const handleSave = async () => {
    setIsSaving(true);
    const dataToSave = {
      ...formData,
      vat_number: isVatRegistered ? formData.vat_number : null,
    };
    const success = await onSave(dataToSave);
    setIsSaving(false);
    if (success) {
      setShowSuccess(true);
      toast.success('Business details saved');
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 400);
    }
  };

  const handleOpen = () => {
    setFormData({
      company_name: companyProfile?.company_name || '',
      company_address: companyProfile?.company_address || '',
      company_postcode: companyProfile?.company_postcode || '',
      company_website: companyProfile?.company_website || '',
      company_registration: companyProfile?.company_registration || '',
      vat_number: companyProfile?.vat_number || '',
    });
    setIsVatRegistered(!!companyProfile?.vat_number);
    setIsEditing(true);
  };

  const rows = [
    {
      icon: Building2,
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
      label: 'Company Name',
      value: companyProfile?.company_name || 'Not set',
    },
    {
      icon: MapPin,
      iconBg: 'bg-orange-500/15',
      iconColor: 'text-orange-400',
      label: 'Address',
      value: companyProfile?.company_address
        ? `${companyProfile.company_address}${companyProfile.company_postcode ? `, ${companyProfile.company_postcode}` : ''}`
        : 'Not set',
    },
    ...(companyProfile?.company_website
      ? [{
          icon: Globe,
          iconBg: 'bg-cyan-500/15',
          iconColor: 'text-cyan-400',
          label: 'Website',
          value: companyProfile.company_website,
        }]
      : []),
    {
      icon: Hash,
      iconBg: 'bg-slate-500/15',
      iconColor: 'text-slate-400',
      label: 'Registration',
      value: companyProfile?.company_registration
        ? `${companyProfile.company_registration}${companyProfile.vat_number ? ` • VAT: ${companyProfile.vat_number}` : ''}`
        : 'Not set',
    },
  ];

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
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-semibold text-[15px] text-white">Business Details</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>

        <div className="border-t border-white/[0.06]">
          {rows.map((row, index) => {
            const Icon = row.icon;
            const isLast = index === rows.length - 1;
            return (
              <div
                key={row.label}
                className={`flex items-center gap-3 px-4 py-3 ${!isLast ? 'border-b border-white/[0.04]' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg ${row.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-4 w-4 ${row.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">{row.label}</p>
                  <p className="text-[15px] text-white truncate">{row.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e] flex flex-col">
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setIsEditing(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Business Details</h2>
            <button
              onClick={handleSave}
              disabled={isSaving || !formData.company_name}
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

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-6 pb-8">
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Company Name *
              </Label>
              <Input
                placeholder="ABC Electrical Ltd"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Address
              </Label>
              <Textarea
                placeholder="123 High Street&#10;London"
                value={formData.company_address}
                onChange={(e) => setFormData({ ...formData, company_address: e.target.value })}
                className="min-h-[100px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 py-3 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation resize-none text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Postcode
              </Label>
              <Input
                placeholder="SW1A 1AA"
                value={formData.company_postcode}
                onChange={(e) => setFormData({ ...formData, company_postcode: e.target.value.toUpperCase() })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Website
              </Label>
              <Input
                type="url"
                placeholder="www.yourcompany.co.uk"
                value={formData.company_website}
                onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Company Registration Number
              </Label>
              <Input
                placeholder="12345678"
                value={formData.company_registration}
                onChange={(e) => setFormData({ ...formData, company_registration: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="flex items-center justify-between py-3 px-1">
              <div>
                <p className="text-[15px] font-medium text-white">VAT Registered</p>
                <p className="text-[13px] text-white/50">Turn on if VAT registered</p>
              </div>
              <Switch checked={isVatRegistered} onCheckedChange={setIsVatRegistered} />
            </div>

            {isVatRegistered && (
              <div className="space-y-2">
                <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                  VAT Number
                </Label>
                <Input
                  placeholder="GB 123 4567 89"
                  value={formData.vat_number}
                  onChange={(e) => setFormData({ ...formData, vat_number: e.target.value })}
                  className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BusinessDetailsCard;
