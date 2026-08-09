/**
 * EmergencyProcedures — critical contacts + procedures for electrical work sites.
 *
 * COMPOSITION — why this page is not a flat stack.
 *
 * This screen is read under stress, one-handed, possibly by someone who has
 * just watched a colleague take a shock. Everything below is subordinate to
 * one question: how many decisions stand between opening this page and the
 * 999 call being placed?
 *
 * Previously: 999 was row one of a six-row list of visually identical rows —
 * the same 14px type and the same tap area as "Poison Information". Finding it
 * meant reading six labels. It now sits above the prose as a single full-bleed
 * red action bar with a 64px target, so it is the first thing the eye lands on
 * and the largest thing on the page; the remaining contacts stay below as an
 * ordinary list because none of them is time-critical in the same way.
 *
 * Red, not volt, for that bar: volt is the brand accent and appears elsewhere
 * on the page (step numerals, link chevrons). If the 999 bar were also volt it
 * would compete with the decoration rather than outrank it. A solid red fill
 * is the one colour on this page that means nothing else.
 *
 * ── CONTENT SOURCING ──
 * Every number, figure and publication reference below was verified on
 * 2026-08-09 against the issuing body. Where a claim could not be sourced the
 * false precision was removed rather than replaced with a guess. See the
 * inline notes on each corrected entry.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SafetyMasthead } from './common/SafetyModuleShell';
import { Eyebrow, containerVariants } from '@/components/college/primitives';
import { SafetyListCard } from './common/SafetyList';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { SafetyPageHeader } from './common/SafetyPageHeader';

/**
 * 999 is deliberately NOT in this array — it is the hero action above the
 * list. Duplicating it would put the most urgent number in two places with
 * two different weights, which is exactly the ambiguity this layout removes.
 */
const EMERGENCY_CONTACTS: {
  service: string;
  number: string;
  description: string;
}[] = [
  {
    service: 'Power cut / damaged line',
    number: '105',
    description:
      'Free, 24/7. England, Scotland & Wales only. Dial 999 instead if lines are down and the public is at risk.',
  },
  {
    service: 'National Gas Emergency Service',
    number: '0800 111 999',
    description: 'Free, 24/7. Smell of gas, suspected leak, or a struck gas pipe.',
  },
  {
    service: 'NHS 111',
    number: '111',
    description:
      'Urgent medical advice, including suspected poisoning or chemical exposure. Dial 999 if the casualty is seriously unwell.',
  },
  {
    // hse.gov.uk/contact/contact.htm — the telephone service is explicitly
    // "for reporting fatal and major injuries only"; everything else is
    // online. The previous description, "RIDDOR reporting line", implied you
    // could phone in any reportable incident.
    service: 'HSE Incident Contact Centre',
    number: '0345 300 9923',
    description:
      'Fatal and specified injuries only, Mon–Fri 08:30–17:00. Report all other RIDDOR incidents online.',
  },
  {
    // Same source. Added because the ICC line above is office-hours only, and
    // a work-related death outside those hours had no route on this page.
    service: 'HSE out-of-hours duty officer',
    number: '0151 922 9235',
    description: 'Work-related death or serious multi-casualty incident, outside office hours.',
  },
];

const PROCEDURES: { id: string; title: string; steps: string[] }[] = [
  {
    id: 'electric-shock',
    title: 'Electric shock response',
    steps: [
      'Do NOT touch the casualty while they are still in contact with the electrical source',
      'Switch off the supply at the isolator, consumer unit, or emergency stop',
      'If you cannot switch off, break the contact by pushing or pulling the casualty free with a non-conductive object such as a piece of dry wood',
      'Call 999 immediately — say it is an electrical injury',
      // Was: "Check for breathing and pulse". The pulse check was removed, not
      // rewritten: a carotid pulse check is no longer advised for non-clinical
      // rescuers because of the time lost attempting it, and this app has no
      // source for a compression rate or ratio it could safely substitute.
      // Instruction kept, false precision dropped.
      'Check whether they are breathing normally — begin CPR if trained and they are not',
      'Place in the recovery position if unconscious but breathing normally',
      'Cool any burn under running water for 15–30 minutes (NHS guidance) — do not use ice',
      'Do not remove anything that is stuck to the burn, and do not burst blisters',
      'Keep the casualty warm and monitor them until paramedics arrive',
      'Record the details in the accident book and check whether it is RIDDOR reportable',
    ],
  },
  {
    id: 'first-aid',
    title: 'First aid response',
    steps: [
      'Assess the scene for ongoing danger before approaching — do not become the second casualty',
      'Call 999 for serious injury, unconsciousness, or difficulty breathing',
      'Locate the nearest first aid kit and the trained first aider',
      'Do not move the casualty unless they are in immediate danger',
      'Control severe bleeding with firm direct pressure using a clean pad',
      'Burns: cool under running water for 15–30 minutes, then lay cling film over the burn — do not wrap it around the limb',
      'Do not put creams, oils or butter on a burn, and do not use a sticky dressing',
      // NHS burns and scalds guidance: a burn caused by electricity always
      // needs emergency assessment, regardless of how small it looks. Added
      // because electrical burns can be far deeper than the surface suggests.
      'Any burn caused by electricity needs emergency assessment — 999 or A&E, however minor it looks',
      'Keep the casualty warm, comfortable and reassured, and do not give food or drink',
      'Record the details in the accident book (BI 510) and check whether it is RIDDOR reportable',
    ],
  },
  {
    id: 'fire',
    title: 'Fire response',
    steps: [
      'Raise the alarm immediately — activate the nearest call point',
      'Call 999 — do not assume someone else has already called',
      'Only fight the fire if you are trained, it is small, and you have a clear escape route behind you',
      'NEVER use a water extinguisher on live electrical equipment',
      'Use CO₂ on live electrical equipment; isolate the supply as soon as it is safe to do so',
      // Sourced from the fire-safety material in the Elec-Mate safety corpus:
      // electrical fires have no fire class of their own, and equipment can
      // hold a lethal charge after isolation. Both points change behaviour, so
      // they earn a step each.
      'Treat isolated equipment as live — it can hold a lethal charge after the supply is off',
      'If in any doubt, leave immediately and close the door behind you',
      'Follow the evacuation procedure to the muster point',
      'Tell the fire warden where the fire is and who is unaccounted for',
      'Do not re-enter for any reason',
    ],
  },
  {
    id: 'evacuation',
    title: 'Site evacuation',
    steps: [
      'Stop work immediately — make equipment safe only if it can be done in seconds',
      'Raise the alarm — shout "FIRE" or activate the nearest call point',
      'Alert everyone in the immediate area',
      'Leave by the nearest safe exit — do NOT use lifts',
      'Close doors behind you, but do not lock them',
      'Assemble at the designated muster point',
      'Report to the site supervisor or fire warden',
      'Account for all team members and report anyone missing',
      'Do NOT re-enter the building until the all-clear is given',
      'Cooperate fully with the emergency services when they arrive',
    ],
  },
  {
    id: 'before-work',
    title: 'Before starting work — site checklist',
    steps: [
      'Identify the nearest emergency exits and escape routes',
      'Locate the fire extinguishers and confirm CO₂ is available for electrical work',
      'Locate the nearest first aid kit and identify the trained first aider',
      'Identify the muster point for the site',
      'Agree how the team will communicate (phone, radio) if separated',
      'Share emergency contact details with everyone on site',
      'Identify the nearest A&E department and how you would get there',
      'Check for site-specific hazards — asbestos, confined spaces, overhead lines',
      'Read the site induction and emergency plan if one exists',
      'Make sure your phone is charged and has signal',
    ],
  },
];

/**
 * Every URL below was requested on 2026-08-09 and returned HTTP 200, and the
 * titles are the titles printed on the documents themselves.
 *
 * Two were wrong before:
 *  - GS38 was linked at /pubns/gs38.pdf, which is a 404. HSE moved the
 *    guidance note to /pubns/priced/. A dead link in an emergency reference
 *    list is a defect, not a typo.
 *  - INDG231 was captioned "Electrical safety at work". The leaflet is called
 *    "Electrical safety and you".
 */
const RESOURCES = [
  {
    title: 'Electrical safety and you (INDG231)',
    url: 'https://www.hse.gov.uk/pubns/indg231.pdf',
  },
  {
    title: 'Electrical test equipment for low voltage systems (GS38)',
    url: 'https://www.hse.gov.uk/pubns/priced/gs38.pdf',
  },
  {
    title: 'Basic advice on first aid at work (INDG347)',
    url: 'https://www.hse.gov.uk/pubns/indg347.pdf',
  },
  {
    title: 'First aid at work: your questions answered (INDG214)',
    url: 'https://www.hse.gov.uk/pubns/indg214.pdf',
  },
  {
    title: 'Avoiding danger from overhead power lines (GS6)',
    url: 'https://www.hse.gov.uk/pubns/gs6.pdf',
  },
  {
    title: 'Make a RIDDOR report',
    url: 'https://www.hse.gov.uk/riddor/reporting/index.htm',
  },
];

const EmergencyProcedures = ({ onBack }: { onBack?: () => void }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['electric-shock']));

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    // 7% page ground, matching SafetyModuleShell — the rest of Site Safety
    // sits on this and `bg-elec-dark` (pure black) made this one screen read
    // as a different app.
    <div className="min-h-screen bg-[hsl(0_0%_7%)] pb-24">
      <SafetyMasthead onBack={onBack ?? (() => {})} moduleName="Emergency" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl space-y-7 px-4 pb-6"
      >
        {/* The whole point of the page. Full-bleed on mobile so the target is
            the width of the screen — no aiming required — and 64px tall,
            which is half again the 44px minimum because this is the one
            control a shaking hand has to hit first time.

            Press feel brightens (red-600 → red-500). A dark UI that DIMS on
            press reads as "disabled", which is the last signal you want on an
            emergency call button. */}
        <a
          href="tel:999"
          className={cn(
            '-mx-4 mt-4 flex h-16 items-center justify-center gap-3 border-y border-red-500',
            'bg-red-600 text-white sm:mx-0 sm:rounded-2xl sm:border-x',
            'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
            'transition-[background-color,transform] duration-150 ease-out',
            'active:scale-[0.98] active:bg-red-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
          )}
        >
          <span className="text-[22px] font-bold tracking-tight tabular-nums">Call 999</span>
          <span className="text-[13px] font-medium">Fire · Police · Ambulance</span>
        </a>

        <SafetyPageHeader
          eyebrow="Emergency · keep to hand"
          title="Emergency procedures & contacts"
          description="Critical procedures for electrical work sites. Make sure every team member knows these before work starts."
          tone="red"
        />

        {/* Contacts */}
        <div>
          <Eyebrow className="mb-2">Other emergency contacts</Eyebrow>
          <SafetyListCard>
            {EMERGENCY_CONTACTS.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number.replace(/\s/g, '')}`}
                className={cn(
                  'flex items-center gap-4 px-5 py-4 touch-manipulation',
                  '[-webkit-tap-highlight-color:transparent]',
                  'transition-[background-color,transform] duration-150',
                  'hover:bg-white/[0.05] active:scale-[0.99] active:bg-white/[0.08]'
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-white">{c.service}</div>
                  <div className="mt-0.5 text-[11.5px] leading-relaxed text-white">
                    {c.description}
                  </div>
                </div>
                <span className="shrink-0 text-[15px] font-semibold tabular-nums text-white">
                  {c.number}
                </span>
              </a>
            ))}
          </SafetyListCard>
        </div>

        {/* Procedures */}
        <div>
          <Eyebrow className="mb-2">Procedures</Eyebrow>
          <div className="space-y-2">
            {PROCEDURES.map((proc) => {
              const isOpen = expanded.has(proc.id);
              return (
                <div
                  key={proc.id}
                  className={cn(
                    'overflow-hidden rounded-2xl border border-elec-yellow/35',
                    CARD_SURFACE
                  )}
                >
                  <button
                    onClick={() => toggle(proc.id)}
                    className={cn(
                      'flex w-full items-center gap-3 px-5 py-4 text-left touch-manipulation',
                      '[-webkit-tap-highlight-color:transparent]',
                      'transition-[background-color,transform] duration-150',
                      'hover:bg-white/[0.05] active:scale-[0.995] active:bg-white/[0.08]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60'
                    )}
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1 text-[14px] font-medium text-white">{proc.title}</span>
                    <span className="text-[11px] tabular-nums text-white">
                      {proc.steps.length} steps
                    </span>
                    <span
                      className={cn(
                        'text-[13px] text-white transition-transform duration-200',
                        isOpen && 'rotate-180'
                      )}
                      aria-hidden
                    >
                      ⌄
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="divide-y divide-white/[0.08] px-5 pb-4 pt-1">
                          {proc.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3 py-2.5">
                              <span className="mt-0.5 w-5 shrink-0 text-[11px] font-medium tabular-nums text-elec-yellow">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="text-[13px] leading-relaxed text-white">{step}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* HSE resources */}
        <div>
          <Eyebrow className="mb-2">HSE resources</Eyebrow>
          <SafetyListCard>
            {RESOURCES.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  // py-3.5 on two lines of nothing was a 42px row — under the
                  // 44px floor. min-h-[44px] pins it regardless of type size.
                  'flex min-h-[44px] items-center gap-3 px-5 py-3.5 touch-manipulation',
                  '[-webkit-tap-highlight-color:transparent]',
                  'transition-[background-color,transform] duration-150',
                  'hover:bg-white/[0.05] active:scale-[0.99] active:bg-white/[0.08]'
                )}
              >
                <span className="flex-1 text-[13px] text-white">{link.title}</span>
                <span className="shrink-0 text-[13px] text-elec-yellow" aria-hidden>
                  ↗
                </span>
              </a>
            ))}
          </SafetyListCard>
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyProcedures;
