import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Building2,
  Palette,
  CreditCard,
  PoundSterling,
  Calculator,
  FileText,
  Receipt,
  Star,
  CalendarClock,
  BadgeCheck,
  Gauge,
  Globe,
} from 'lucide-react';
import { SettingsCard, NavRow } from '@/components/settings/rows';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, LoadingState } from '@/components/college/primitives';
import {
  CompanySheet,
  BrandSheet,
  PaymentSheet,
  AccountingSheet,
  PricingSheet,
  QuoteSettingsSheet,
  InvoiceSettingsSheet,
  ReviewsSheet,
  InspectorSheet,
  InstrumentsSheet,
  RegionalSheet,
  BookingAvailabilitySheet,
} from '@/components/settings/business-sheets';

interface BusinessRow {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
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
      { id: 'company', title: 'Company', subtitle: 'Name, logo and contact', icon: Building2 },
      { id: 'brand', title: 'Brand', subtitle: 'Colours and styling', icon: Palette },
    ],
  },
  {
    eyebrow: '02',
    title: 'Financials',
    rows: [
      { id: 'payment', title: 'Payment', subtitle: 'Banking and Stripe', icon: CreditCard },
      { id: 'pricing', title: 'Pricing', subtitle: 'Rates and margins', icon: PoundSterling },
      { id: 'accounting', title: 'Accounting', subtitle: 'Xero and QuickBooks', icon: Calculator },
    ],
  },
  {
    eyebrow: '03',
    title: 'Documents',
    rows: [
      { id: 'quotes', title: 'Quotes', subtitle: 'Terms and defaults', icon: FileText },
      { id: 'invoices', title: 'Invoices', subtitle: 'Terms and payment', icon: Receipt },
      { id: 'reviews', title: 'Reviews', subtitle: 'Review links for invoice emails', icon: Star },
    ],
  },
  {
    eyebrow: '04',
    title: 'Scheduling',
    rows: [
      {
        id: 'booking-availability',
        title: 'Booking availability',
        subtitle: 'Working hours, buffer, daily cap',
        icon: CalendarClock,
      },
    ],
  },
  {
    eyebrow: '05',
    title: 'Professional',
    rows: [
      {
        id: 'inspector',
        title: 'Inspector',
        subtitle: 'Credentials and qualifications',
        icon: BadgeCheck,
      },
      { id: 'instruments', title: 'Instruments', subtitle: 'Testing equipment', icon: Gauge },
      { id: 'regional', title: 'Regional', subtitle: 'Currency and locale', icon: Globe },
    ],
  },
];

const BusinessTab = () => {
  const { companyProfile, loading, saveCompanyProfile, uploadLogo } = useCompanyProfile();
  const { addNotification } = useNotifications();
  const [openSheet, setOpenSheet] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Deep link: /settings?tab=business&sheet=<id> opens that sheet directly
  // (used by the readiness meter). Param is consumed once, then removed.
  useEffect(() => {
    const sheet = searchParams.get('sheet');
    if (sheet) {
      setOpenSheet(sheet);
      searchParams.delete('sheet');
      setSearchParams(searchParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        // office_lat/office_lng are columns on company_profiles and persist via
        // saveCompanyProfile below — a separate saveOfficeLocation call would
        // race the profile insert on first save (unique user_id).
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
    >
      {GROUPS.map((group) => (
        <motion.section key={group.title} variants={itemVariants} className="h-full">
          <SettingsCard eyebrow={group.eyebrow} title={group.title}>
            {group.rows.map((row) => (
              <NavRow
                key={row.id}
                icon={row.icon}
                title={row.title}
                subtitle={row.subtitle}
                onClick={() => setOpenSheet(row.id)}
              />
            ))}
          </SettingsCard>
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
      <ReviewsSheet
        open={openSheet === 'reviews'}
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
      <BookingAvailabilitySheet
        open={openSheet === 'booking-availability'}
        onOpenChange={(o) => !o && setOpenSheet(null)}
      />
    </motion.div>
  );
};

export default BusinessTab;
