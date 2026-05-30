/**
 * EmergencyProcedures — critical contacts + procedures for electrical work sites.
 * Editorial standard: masthead + PageHero + hairline rows, monochrome with a single
 * red accent reserved for the 999 line. Tappable tel: links, expandable procedures.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SafetyMasthead } from './common/SafetyModuleShell';
import { PageHero, Eyebrow, ListCard } from '@/components/college/primitives';

const EMERGENCY_CONTACTS: { service: string; number: string; description: string; critical?: boolean }[] = [
  { service: 'Emergency Services', number: '999', description: 'Fire, Police, Ambulance', critical: true },
  { service: 'Power Cut / Emergency', number: '105', description: 'Electricity network emergency' },
  { service: 'Gas Emergency', number: '0800 111 999', description: 'National Gas Emergency Service' },
  { service: 'HSE Incident Contact', number: '0345 300 9923', description: 'RIDDOR reporting line' },
  { service: 'NHS Non-Emergency', number: '111', description: 'Medical advice' },
  { service: 'Poison Information', number: '0344 892 0111', description: 'National Poisons Info (COSHH)' },
];

const PROCEDURES: { id: string; title: string; steps: string[] }[] = [
  {
    id: 'electric-shock',
    title: 'Electric Shock Response',
    steps: [
      'Do NOT touch the casualty if they are still in contact with the electrical source',
      'Switch off the power at the isolator, consumer unit, or emergency stop',
      'If you cannot switch off, use a non-conductive material (dry wood, plastic) to separate the casualty from the source',
      'Call 999 immediately — state "electrical injury"',
      'Check for breathing and pulse — begin CPR if trained and necessary',
      'Place in recovery position if unconscious but breathing',
      'Treat visible burns with cool running water (20 minutes minimum)',
      'Do not remove clothing stuck to burns',
      'Keep the casualty warm and monitor until paramedics arrive',
      'Record all details in the accident book',
    ],
  },
  {
    id: 'evacuation',
    title: 'Site Evacuation',
    steps: [
      'Stop work immediately — make equipment safe if it can be done quickly',
      'Raise the alarm — shout "FIRE" or activate nearest call point',
      'Alert all personnel in the immediate area',
      'Leave by the nearest safe exit — do NOT use lifts',
      'Close doors behind you (do not lock)',
      'Assemble at the designated muster point',
      'Report to the site supervisor or fire warden',
      'Account for all team members — report anyone missing',
      'Do NOT re-enter the building until the all-clear is given',
      'Cooperate fully with emergency services on arrival',
    ],
  },
  {
    id: 'first-aid',
    title: 'First Aid Response',
    steps: [
      'Assess the scene for ongoing dangers before approaching',
      'Call 999 immediately for serious injuries, unconsciousness, or breathing difficulties',
      'Locate the nearest first aid kit and trained first aider',
      'Do not move the casualty unless in immediate danger',
      'Control severe bleeding with direct pressure using a clean pad',
      'For burns: cool with clean running water for 20 minutes, then cover loosely with cling film',
      'Keep the casualty warm, comfortable and reassured',
      'Do not give food or drink to the casualty',
      'Record all details in the accident book (BI 510)',
      'Determine if the incident is RIDDOR reportable',
    ],
  },
  {
    id: 'fire',
    title: 'Fire Response',
    steps: [
      'Raise the alarm immediately — activate nearest call point',
      'Call 999 — do not assume someone else has called',
      'Only attempt to fight the fire if trained, it is small, and you have a safe escape route',
      'Use the correct extinguisher type — NEVER use water on electrical fires',
      'Electrical fires: use CO₂ or dry powder extinguisher',
      'If in doubt, leave immediately and close the door',
      'Follow the evacuation procedure to the muster point',
      'Inform the fire warden of the fire location and any people unaccounted for',
      'Do not re-enter for any reason',
    ],
  },
  {
    id: 'before-work',
    title: 'Before Starting Work — Site Checklist',
    steps: [
      'Identify the location of nearest emergency exits and routes',
      'Locate fire extinguishers — confirm correct type for electrical work (CO₂ / dry powder)',
      'Locate the nearest first aid kit and identify the trained first aider',
      'Identify the muster point for the site',
      'Establish communication methods with your team (phone, radio)',
      'Share emergency contact details with all personnel on site',
      'Identify the nearest hospital / A&E department',
      'Check for site-specific hazards (asbestos, confined spaces, overhead lines)',
      'Review the site induction and emergency plan if available',
      'Ensure your phone is charged and has signal',
    ],
  },
];

const RESOURCES = [
  { title: 'INDG231 — Electrical safety at work', url: 'https://www.hse.gov.uk/pubns/indg231.pdf' },
  { title: 'GS38 — Electrical test equipment', url: 'https://www.hse.gov.uk/pubns/gs38.pdf' },
  { title: 'First aid at work (INDG214)', url: 'https://www.hse.gov.uk/pubns/indg214.pdf' },
  { title: 'RIDDOR — Report an incident', url: 'https://notifications.hse.gov.uk/riddorforms' },
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
    <div className="bg-elec-dark min-h-screen pb-24">
      <SafetyMasthead onBack={onBack ?? (() => {})} moduleName="Emergency" />
      <div className="mx-auto max-w-3xl px-4 pb-6 space-y-7">
        <PageHero
          eyebrow="Emergency · keep to hand"
          title="Emergency procedures & contacts"
          description="Critical procedures for electrical work sites. Make sure every team member knows these before work starts."
          tone="red"
        />

        {/* Contacts */}
        <div>
          <Eyebrow className="mb-2">Emergency contacts</Eyebrow>
          <ListCard>
            {EMERGENCY_CONTACTS.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number.replace(/\s/g, '')}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-[hsl(0_0%_15%)] active:scale-[0.995] transition-all touch-manipulation"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-white">{c.service}</div>
                  <div className="text-[11.5px] text-white/55">{c.description}</div>
                </div>
                <span className={cn('text-[15px] font-semibold tabular-nums shrink-0', c.critical ? 'text-red-400' : 'text-white')}>
                  {c.number}
                </span>
              </a>
            ))}
          </ListCard>
        </div>

        {/* Procedures */}
        <div>
          <Eyebrow className="mb-2">Procedures</Eyebrow>
          <div className="space-y-2">
            {PROCEDURES.map((proc) => {
              const isOpen = expanded.has(proc.id);
              return (
                <div key={proc.id} className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggle(proc.id)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
                  >
                    <span className="text-[14px] font-medium text-white flex-1">{proc.title}</span>
                    <span className="text-[11px] text-white/45 tabular-nums">{proc.steps.length} steps</span>
                    <span className={cn('text-white/40 text-[13px] transition-transform duration-200', isOpen && 'rotate-180')} aria-hidden>
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
                        <div className="px-5 pb-4 pt-1 divide-y divide-white/[0.05]">
                          {proc.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3 py-2.5">
                              <span className="w-5 text-[11px] font-medium tabular-nums text-elec-yellow/80 shrink-0 mt-0.5">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="text-[13px] text-white/85 leading-relaxed">{step}</span>
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
          <ListCard>
            {RESOURCES.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
              >
                <span className="text-[13px] text-white/90 flex-1">{link.title}</span>
                <span className="text-elec-yellow/70 text-[13px] shrink-0" aria-hidden>↗</span>
              </a>
            ))}
          </ListCard>
        </div>
      </div>
    </div>
  );
};

export default EmergencyProcedures;
