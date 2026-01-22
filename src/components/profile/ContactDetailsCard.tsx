import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Mail, Phone, Building2, ChevronRight, Loader2, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CompanyProfile } from '@/types/company';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ContactDetailsCardProps {
  user: User | null;
  profile: any;
  companyProfile: CompanyProfile | null;
  onSave: (data: Partial<CompanyProfile>) => Promise<boolean>;
  isLoading: boolean;
}

const ContactDetailsCard: React.FC<ContactDetailsCardProps> = ({
  user,
  profile,
  companyProfile,
  onSave,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    company_phone: companyProfile?.company_phone || '',
    company_email: companyProfile?.company_email || '',
  });

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onSave(formData);
    setIsSaving(false);
    if (success) {
      setShowSuccess(true);
      toast.success('Contact details saved');
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 400);
    }
  };

  const handleOpen = () => {
    setFormData({
      company_phone: companyProfile?.company_phone || '',
      company_email: companyProfile?.company_email || '',
    });
    setIsEditing(true);
  };

  const rows = [
    {
      icon: Mail,
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-400',
      label: 'Personal Email',
      value: user?.email || 'Not set',
      subtitle: 'Login email',
    },
    {
      icon: Phone,
      iconBg: 'bg-green-500/15',
      iconColor: 'text-green-400',
      label: 'Phone',
      value: companyProfile?.company_phone || profile?.phone || 'Not set',
    },
    {
      icon: Building2,
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
      label: 'Company Email',
      value: companyProfile?.company_email || 'Not set',
      subtitle: 'For quotes & invoices',
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
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="font-semibold text-[15px] text-white">Contact Details</span>
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
                  {row.subtitle && (
                    <p className="text-[12px] text-white/40 mt-0.5">{row.subtitle}</p>
                  )}
                </div>
              </div>
            );
          })}
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
            <h2 className="text-[17px] font-semibold text-white">Contact Details</h2>
            <button
              onClick={handleSave}
              disabled={isSaving}
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
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Personal Email
              </Label>
              <div className="h-[50px] flex items-center bg-white/[0.04] rounded-xl px-4 border border-white/[0.06]">
                <p className="text-[17px] text-white/40">{user?.email || ''}</p>
              </div>
              <p className="text-[12px] text-white/40 px-1">Change in Settings → Account</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Phone Number
              </Label>
              <Input
                type="tel"
                placeholder="07XXX XXXXXX"
                value={formData.company_phone}
                onChange={(e) => setFormData({ ...formData, company_phone: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Company Email
              </Label>
              <Input
                type="email"
                placeholder="info@yourcompany.com"
                value={formData.company_email}
                onChange={(e) => setFormData({ ...formData, company_email: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
              <p className="text-[12px] text-white/40 px-1">
                This email appears on quotes and invoices
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ContactDetailsCard;
