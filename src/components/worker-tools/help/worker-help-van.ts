import type { PageHelpContent } from '@/components/hub/PageHelp';

/** Worker Tools → My van (ELE-1984). */
export const WT_MY_VAN_HELP: PageHelpContent = {
  id: 'wt-my-van',
  title: 'My van',
  what: 'The van the office has put on your name. Do the walk-round check before you drive it each day, and report anything wrong with a photo so the office can get it fixed.',
  steps: [
    {
      title: 'Check it every day',
      body: 'Tap Start today’s check. Enter the mileage, then tap OK or Problem for each item. It takes about a minute.',
    },
    {
      title: 'Photo anything wrong',
      body: 'Tap Problem, then Take a photo. Add a short note if it helps. The office sees the photo straight away.',
    },
    {
      title: 'Say if it is safe',
      body: 'If it is not safe to drive, choose No, take it off the road. The office is told and the van is marked off the road.',
    },
    {
      title: 'Report a problem any time',
      body: 'Something goes wrong mid-day? Tap Report a problem. You do not need to do the whole check again.',
    },
  ],
  tasks: [
    {
      title: 'Do today’s check',
      steps: [
        'Tap Start today’s check.',
        'Type the mileage on the dash and tap Next.',
        'For each item tap OK or Problem. Rest all OK fills in anything you have not answered.',
        'For a problem, take a photo and add a note.',
        'On the last screen say whether it is safe to drive, then tap Send check.',
      ],
      after: 'The card shows Checked today with the time. The office sees it in Fleet.',
      tour: [
        { target: 'van.start', caption: 'Tap Start today’s check.', opens: true },
        { target: 'van.mileage', caption: 'Type the mileage on the dash.' },
        { target: 'van.next', caption: 'Tap Next, then OK or Problem for each item.' },
      ],
    },
    {
      title: 'Report a problem',
      steps: [
        'Tap Report a problem.',
        'Pick what is wrong, or Something else.',
        'Tap Take a photo. Add a note.',
        'Say whether it is safe to drive, then tap Send to the office.',
      ],
      tour: [
        { target: 'van.report', caption: 'Tap Report a problem.', opens: true },
        { target: 'van.report-what', caption: 'Pick what is wrong, then take a photo.' },
        { target: 'van.send', caption: 'Say if it is safe to drive, then send it.', optional: true },
      ],
    },
  ],
  notes: [
    {
      title: 'Off the road',
      body: 'A van marked off the road should not be driven until the office puts it back on. The card on this page shows when it is.',
    },
    {
      title: 'No van showing?',
      body: 'The office assigns vans in Fleet. If you drive one and it is not here, ask them to put it on your name.',
    },
    {
      title: 'Who sees your check',
      body: 'Your employer’s office. Photos are private to your firm.',
    },
  ],
};
