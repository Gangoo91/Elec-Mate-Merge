import { Helmet } from 'react-helmet';
import { CalendarPageContent } from '@/components/calendar';

/**
 * The calendar owns its own shell rather than sitting inside
 * `BusinessPageLayout`.
 *
 * That layout's header scrolls away with the content, which is fine for a page
 * you read top to bottom and wrong for a calendar: the period you are looking
 * at, the arrows that change it and the view chips all have to stay put while
 * the agenda underneath them moves. `CalendarHeader` is that sticky bar, and it
 * carries the back button the layout used to provide.
 */
const CalendarPage = () => {
  const canonical = `${window.location.origin}/electrician/business/calendar`;

  return (
    <>
      <Helmet>
        <title>Calendar | Elec-Mate Business Hub</title>
        <meta
          name="description"
          content="Manage your jobs, meetings and appointments. Sync with Google Calendar for seamless scheduling."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <CalendarPageContent />
    </>
  );
};

export default CalendarPage;
