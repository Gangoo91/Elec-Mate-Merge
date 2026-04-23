import React, { useState, useCallback } from 'react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { motion } from 'framer-motion';
import { saveOfficeLocation } from '@/services/settingsService';
import {
  ListCard,
  ListRow,
  SectionHeader,
  containerVariants,
  itemVariants,
  LoadingState,
} from '@/components/college/primitives';
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

interface BusinessRow {
  id: string;
  title: string;
  subtitle: string;
}

interface BusinessGroup {
  eyebrow: string;
  title: string;
  rows: BusinessRow[];
}

const GROUPS: BusinessGroup[] = [
  {
    eyebrow: '01',
    title: 'Identity',
    rows: [
      { id: 'company', title: 'Company', subtitle: 'Name, logo and contact' },
      { id: 'brand', title: 'Brand', subtitle: 'Colours and styling' },
    ],
  },
  {
    eyebrow: '02',
    title: 'Financials',
    rows: [
      { id: 'payment', title: 'Payment', subtitle: 'Banking and Stripe' },
      { id: 'pricing', title: 'Pricing', subtitle: 'Rates and margins' },
      { id: 'accounting', title: 'Accounting', subtitle: 'Xero and QuickBooks' },
    ],
  },
  {
    eyebrow: '03',
    title: 'Documents',
    rows: [
      { id: 'quotes', title: 'Quotes', subtitle: 'Terms and defaults' },
      { id: 'invoices', title: 'Invoices', subtitle: 'Terms and payment' },
    ],
  },
  {
    eyebrow: '04',
    title: 'Professional',
    rows: [
      { id: 'inspector', title: 'Inspector', subtitle: 'Credentials and qualifications' },
      { id: 'instruments', title: 'Instruments', subtitle: 'Testing equipment' },
      { id: 'regional', title: 'Regional', subtitle: 'Currency and locale' },
    ],
  },
];

const BusinessTab = () => {
  const { companyProfile, loading, saveCompanyProfile, uploadLogo } = useCompanyProfile();
  const { addNotification } = useNotifications();
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  const handleSave = useCallback(
    async (data: Record<string, unknown>) => {
      try {
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
    return <LoadingState />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {GROUPS.map((group) => (
        <motion.section key={group.title} variants={itemVariants} className="space-y-3">
          <SectionHeader eyebrow={group.eyebrow} title={group.title} />
          <ListCard>
            {group.rows.map((row) => (
              <ListRow
                key={row.id}
                title={row.title}
                subtitle={row.subtitle}
                onClick={() => setOpenSheet(row.id)}
                trailing={
                  <span
                    aria-hidden
                    className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all"
                  >
                    {'\u2192'}
                  </span>
                }
              />
            ))}
          </ListCard>
        </motion.section>
      ))}

      {/* Sheet components (visual surfaces inside are owned by business-sheets) */}
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
    </motion.div>
  );
};

export default BusinessTab;
