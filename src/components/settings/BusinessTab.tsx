import React, { useState, useCallback } from 'react';
import { BusinessCard } from '@/components/business-hub';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { motion } from 'framer-motion';
import { saveOfficeLocation } from '@/services/settingsService';
import {
  Building2,
  Palette,
  CreditCard,
  PoundSterling,
  Calculator,
  FileText,
  Shield,
  Gauge,
  Coins,
} from 'lucide-react';
import {
  CompanySheet,
  BrandSheet,
  PaymentSheet,
  AccountingSheet,
  PricingSheet,
  QuoteSettingsSheet,
  InvoiceSettingsSheet,
  InspectorSheet,
  InstrumentsSheet,
  RegionalSheet,
} from '@/components/settings/business-sheets';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const BusinessTab = () => {
  const { companyProfile, loading, saveCompanyProfile, uploadLogo } = useCompanyProfile();
  const { addNotification } = useNotifications();
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  const handleSave = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        // If office location is included, also save to app_settings
        if (data.office_lat !== undefined && data.office_lng !== undefined) {
          const lat = data.office_lat as number | null;
          const lng = data.office_lng as number | null;
          if (lat !== null && lng !== null) {
            await saveOfficeLocation({
              lat,
              lng,
              address: (data.company_address as string) || null,
            });
          }
        }

        const success = await saveCompanyProfile(data);
        if (success) {
          addNotification({
            title: 'Settings Saved',
            message: 'Your business settings have been saved.',
            type: 'success',
          });
          return true;
        }
        addNotification({
          title: 'Save Failed',
          message: 'Could not save settings. Please try again.',
          type: 'error',
        });
        return false;
      } catch {
        addNotification({
          title: 'Save Failed',
          message: 'Could not save settings. Please try again.',
          type: 'error',
        });
        return false;
      }
    },
    [saveCompanyProfile, addNotification]
  );

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse px-4 py-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl bg-[#1c1c1e] border border-white/[0.08] h-20" />
        ))}
      </div>
    );
  }

  return (
    <motion.main className="px-4 py-4 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Building2 className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Business Settings</h2>
          <p className="text-xs text-white">Configure your business profile</p>
        </div>
      </div>

      {/* IDENTITY */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Identity</h2>
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <BusinessCard
            title="Company"
            description="Name, logo & contact"
            icon={Building2}
            onClick={() => setOpenSheet('company')}
            variant="compact"
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
          />
          <BusinessCard
            title="Brand"
            description="Colours & styling"
            icon={Palette}
            onClick={() => setOpenSheet('brand')}
            variant="compact"
            accentColor="from-pink-500 via-rose-400 to-pink-400"
            iconColor="text-pink-400"
            iconBg="bg-pink-500/10 border border-pink-500/20"
          />
        </motion.div>
      </section>

      {/* FINANCIALS */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Financials
        </h2>
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <BusinessCard
            title="Payment"
            description="Banking & Stripe"
            icon={CreditCard}
            onClick={() => setOpenSheet('payment')}
            variant="compact"
            accentColor="from-green-500 via-emerald-400 to-green-400"
            iconColor="text-green-400"
            iconBg="bg-green-500/10 border border-green-500/20"
          />
          <BusinessCard
            title="Pricing"
            description="Rates & margins"
            icon={PoundSterling}
            onClick={() => setOpenSheet('pricing')}
            variant="compact"
            accentColor="from-emerald-500 via-teal-400 to-emerald-400"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
          />
          <BusinessCard
            title="Accounting"
            description="Xero & QuickBooks"
            icon={Calculator}
            onClick={() => setOpenSheet('accounting')}
            variant="compact"
            accentColor="from-purple-500 via-violet-400 to-purple-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
        </motion.div>
      </section>

      {/* DOCUMENTS */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Documents
        </h2>
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <BusinessCard
            title="Quotes"
            description="Terms & defaults"
            icon={FileText}
            onClick={() => setOpenSheet('quotes')}
            variant="compact"
            accentColor="from-amber-500 via-yellow-400 to-amber-400"
            iconColor="text-amber-400"
            iconBg="bg-amber-500/10 border border-amber-500/20"
          />
          <BusinessCard
            title="Invoices"
            description="Terms & payment"
            icon={FileText}
            onClick={() => setOpenSheet('invoices')}
            variant="compact"
            accentColor="from-cyan-500 via-teal-400 to-cyan-400"
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
          />
        </motion.div>
      </section>

      {/* PROFESSIONAL */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Professional
        </h2>
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <BusinessCard
            title="Inspector"
            description="Credentials & quals"
            icon={Shield}
            onClick={() => setOpenSheet('inspector')}
            variant="compact"
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
          />
          <BusinessCard
            title="Instruments"
            description="Testing equipment"
            icon={Gauge}
            onClick={() => setOpenSheet('instruments')}
            variant="compact"
            accentColor="from-purple-500 via-violet-400 to-purple-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
          <BusinessCard
            title="Regional"
            description="Currency & locale"
            icon={Coins}
            onClick={() => setOpenSheet('regional')}
            variant="compact"
            accentColor="from-rose-500 via-pink-400 to-rose-400"
            iconColor="text-rose-400"
            iconBg="bg-rose-500/10 border border-rose-500/20"
          />
        </motion.div>
      </section>

      {/* Bottom Padding for Mobile */}
      <div className="h-20 sm:h-4" />

      {/* Sheet components */}
      <CompanySheet
        open={openSheet === 'company'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
        uploadLogo={uploadLogo}
      />
      <BrandSheet
        open={openSheet === 'brand'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
      />
      <PaymentSheet
        open={openSheet === 'payment'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
      />
      <AccountingSheet
        open={openSheet === 'accounting'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
      />
      <PricingSheet
        open={openSheet === 'pricing'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
      />
      <QuoteSettingsSheet
        open={openSheet === 'quotes'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
      />
      <InvoiceSettingsSheet
        open={openSheet === 'invoices'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
      />
      <InspectorSheet
        open={openSheet === 'inspector'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
      />
      <InstrumentsSheet
        open={openSheet === 'instruments'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
      />
      <RegionalSheet
        open={openSheet === 'regional'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
        profile={companyProfile}
        onSave={handleSave}
      />
    </motion.main>
  );
};

export default BusinessTab;
