import type { PageHelpContent } from '@/components/hub/PageHelp';

/** Employer Hub → Fleet (ELE-1984). */
export const FLEET_HELP: PageHelpContent = {
  id: 'employer-fleet',
  title: 'Fleet',
  what: 'Your vans and cars: who drives them, the daily walk-round check, problems drivers report with photos, and MOT, tax, insurance and service dates.',
  steps: [
    {
      title: 'Add each van and its driver',
      body: 'Tap Add vehicle. Add the registration, the dates you know, and who drives it. The driver then sees it in Worker Tools under My van.',
    },
    {
      title: 'Drivers check it daily',
      body: 'Each morning the driver does the walk-round on their phone. Today shows who has checked and who has not.',
    },
    {
      title: 'Sort problems',
      body: 'A problem comes to your bell with photos. Open the vehicle, get it fixed, then tap Mark fixed. Put it back on the road if it was taken off.',
    },
    {
      title: 'Book what is due',
      body: 'MOT, tax, insurance and service show on your Overview 30 days ahead, and the bell reminds you at 30 days, 7 days and when overdue.',
    },
  ],
  tasks: [
    {
      title: 'Add a vehicle',
      steps: [
        'Tap Add vehicle.',
        'Type the registration. It is the only required field.',
        'Add make, model, colour, who drives it, and the MOT and tax dates.',
        'Tap Add vehicle at the bottom.',
      ],
      tour: [
        { target: 'fleet.add', caption: 'Tap Add vehicle.', opens: true },
        { target: 'fleet.add-reg', caption: 'Type the registration, then the rest you know.' },
        { target: 'fleet.add-driver', caption: 'Pick who drives it. They will see it in My van.' },
        { target: 'fleet.add-save', caption: 'Tap Add vehicle to save it.' },
      ],
    },
    {
      title: 'See who has done today’s check',
      steps: [
        'Look at Today near the top.',
        'Vans not checked yet are listed with the driver’s name.',
        'Tap a van to see its checks and any problems.',
      ],
      tour: [
        { target: 'fleet.today', caption: 'Who has checked today, who has not, and any problems.' },
      ],
    },
    {
      title: 'Deal with a problem a driver reported',
      steps: [
        'Tap the bell notification, or the van under Today.',
        'Look at the photos under Problems.',
        'Once it is fixed, tap Mark fixed. Tick Back on the road if the driver took it off.',
      ],
      who: 'The owner and every co-admin, office managers included.',
      tour: [
        { target: 'fleet.today', caption: 'Problems show here. Tap the van.', opens: true },
        { target: 'fleet.problems', caption: 'The photos and notes from the driver.', optional: true },
        { target: 'fleet.fix', caption: 'Tap Mark fixed once it is sorted.', optional: true },
      ],
    },
    {
      title: 'Do a check from the office',
      steps: [
        'Tap the vehicle.',
        'Under Records, tap Daily check.',
        'Enter the mileage, then OK or Problem for each item. A problem needs a photo.',
        'Tap Send check.',
      ],
      tour: [
        { target: 'fleet.list', caption: 'Tap the vehicle.', opens: true },
        { target: 'fleet.records', text: 'Daily check', caption: 'Tap Daily check.', opens: true },
        { target: 'van.mileage', caption: 'Enter the mileage, then go through each item.' },
      ],
    },
    {
      title: 'Log a service',
      steps: ['Tap the vehicle.', 'Under Records, tap Service history.', 'Tap Log service, fill it in and tap Save service.'],
      tour: [
        { target: 'fleet.list', caption: 'Tap the vehicle.', opens: true },
        { target: 'fleet.records', text: 'Service history', caption: 'Tap Service history.', opens: true },
        { target: 'fleet.service-add', caption: 'Tap Log service to add one.' },
      ],
    },
    {
      title: 'Log fuel',
      steps: [
        'Tap Log fuel.',
        'Pick the vehicle and the date. Both are required.',
        'Add litres, cost, mileage and where you filled up, then tap Log fuel.',
      ],
      after: 'The latest fills show under Recent fuel logs.',
      tour: [
        { target: 'fleet.fuel', caption: 'Tap Log fuel.', opens: true },
        { target: 'fleet.fuel-save', caption: 'Pick the vehicle and date, add the fill, then tap Log fuel.' },
      ],
    },
    {
      title: 'Change the driver or status',
      steps: ['Tap the vehicle.', 'Under Quick actions, tap Edit vehicle.', 'Change who drives it, the status or the dates, then tap Save.'],
      tour: [
        { target: 'fleet.list', caption: 'Tap the vehicle.', opens: true },
        { target: 'fleet.quick', text: 'Edit vehicle', caption: 'Tap Edit vehicle.' },
      ],
    },
  ],
  notes: [
    {
      title: 'The driver has not joined the app',
      body: 'A driver needs an Elec-Mate account linked to your team to do the check on their phone. Invite them from Team.',
    },
    {
      title: 'Off the road',
      body: 'If a driver says a van is not safe, it is marked Off road and stops nagging for MOT and tax. Put it back from the vehicle once it is fixed.',
    },
    {
      title: 'Who sees what',
      body: 'Drivers see only the van on their name. Photos are private to your firm. Office managers see vehicles and checks but not fuel or service costs.',
    },
  ],
};
