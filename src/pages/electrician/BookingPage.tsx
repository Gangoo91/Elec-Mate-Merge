import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants, warningPanelCn } from '@/components/shared/surfaceStyles';
import { useAuth } from '@/contexts/AuthContext';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useBookingSettings, openDayCount } from '@/hooks/useBookingSettings';
import { usePortalBookings, splitBookings } from '@/hooks/usePortalBookings';
import { useStartDateRequests } from '@/hooks/useStartDateRequests';
import { bookingUrl } from '@/components/electrician/booking/bookingMessage';
import BookingLinkCard from '@/components/electrician/booking/BookingLinkCard';
import BookingSendSheet from '@/components/electrician/booking/BookingSendSheet';
import PortalBookingsCard from '@/components/electrician/booking/PortalBookingsCard';
import StartDateRequestsCard from '@/components/electrician/booking/StartDateRequestsCard';
import AvailabilityCard from '@/components/electrician/booking/AvailabilityCard';

/**
 * The booking link's home.
 *
 * Until now the Business Hub tile fired the OS share sheet and nothing else —
 * which on a phone listed WhatsApp and Mail and looked like a screen, and on
 * desktop fell through to a clipboard copy that appeared to do nothing. The
 * link had no page, the bookings it produced were invisible among everything
 * else in the diary, and the settings behind it were three levels into
 * Settings → Business.
 */
const BookingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { companyProfile } = useCompanyProfile();
  const { data: settings, isLoading: settingsLoading } = useBookingSettings();
  const { data: bookings = [], isLoading: bookingsLoading } = usePortalBookings();
  const { data: startRequests = [], isLoading: requestsLoading } = useStartDateRequests();

  const [sendOpen, setSendOpen] = useState(false);

  const url = user?.id ? bookingUrl(user.id) : '';
  const businessName = companyProfile?.company_name?.trim() || null;

  const { upcoming } = useMemo(() => splitBookings(bookings), [bookings]);

  // A page with every day closed still loads and still looks right to a
  // client — it simply never offers a slot. Say so before the link is shared.
  const openDays = settings ? openDayCount(settings.hours) : 0;
  const takingBookings = openDays > 0;

  return (
    <div className="-mt-3 min-h-screen bg-background pb-24 sm:-mt-4 md:-mt-6">
      <div className="sticky top-0 z-30 border-b border-white/[0.10] bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2 lg:mx-auto lg:max-w-[1200px] lg:px-8">
          <div className="flex h-11 items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/business')}
              aria-label="Back to Business Hub"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="min-w-0 flex-1 truncate text-[19px] font-semibold tracking-tight text-white">
              Booking Link
            </h1>
            {upcoming.length > 0 && (
              <span className="shrink-0 px-3 text-[13px] font-semibold text-elec-yellow tabular-nums">
                {upcoming.length} booked
              </span>
            )}
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-4 px-4 lg:mx-auto lg:max-w-[1180px] lg:px-8"
      >
        {!takingBookings && !settingsLoading && (
          <motion.div variants={itemVariants} className={cn(warningPanelCn, 'mb-5')}>
            <p className="text-[13px] font-semibold text-orange-300">
              Your booking page cannot take a booking
            </p>
            <p className="mt-1 text-[12.5px] leading-snug text-white">
              Every day is closed, so the link opens fine but never offers a slot. Open at least
              one day below before you send it out.
            </p>
          </motion.div>
        )}

        {/*
         * Two columns from lg.
         *
         * A single stack read as a phone screen blown up to 1,180px — the four
         * send buttons alone were 290px each. Sending goes left because it is
         * what the page is for; availability goes right because it is the
         * tallest block and balances the column, and because you set it once
         * and come back to the left-hand side thereafter.
         */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
          <div className="space-y-5">
            <motion.div variants={itemVariants}>
              <BookingLinkCard
                url={url}
                businessName={businessName}
                onSendToCustomer={() => setSendOpen(true)}
                onPreview={() => window.open(url, '_blank', 'noopener,noreferrer')}
              />
            </motion.div>

            {/* Above the bookings that already landed — someone is waiting on
                an answer, which outranks a diary entry already settled. */}
            <motion.div variants={itemVariants}>
              <StartDateRequestsCard requests={startRequests} isLoading={requestsLoading} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <PortalBookingsCard bookings={bookings} isLoading={bookingsLoading} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-5 lg:mt-0">
            {settings && !settingsLoading && <AvailabilityCard settings={settings} />}
          </motion.div>
        </div>
      </motion.div>

      <BookingSendSheet
        open={sendOpen}
        onOpenChange={setSendOpen}
        url={url}
        businessName={businessName}
      />
    </div>
  );
};

export default BookingPage;
