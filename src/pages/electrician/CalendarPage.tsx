import { Helmet } from 'react-helmet';
import { CalendarDays } from 'lucide-react';
import BusinessPageLayout from '@/components/business-hub/BusinessPageLayout';
import { CalendarPageContent } from '@/components/calendar';

const CalendarPage = () => {
  const canonical = `${window.location.origin}/electrician/business/calendar`;

  return (
    <BusinessPageLayout
      title="Calendar"
      subtitle="Jobs, meetings & appointments"
      icon={CalendarDays}
      backUrl="/electrician/business"
      accentColor="blue"
    >
      <Helmet>
        <title>Calendar | Elec-Mate Business Hub</title>
        <meta
          name="description"
          content="Manage your jobs, meetings and appointments. Sync with Google Calendar for seamless scheduling."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <CalendarPageContent />
    </BusinessPageLayout>
  );
};

export default CalendarPage;
