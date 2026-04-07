/**
 * EmergencyProcedures
 *
 * Critical emergency procedures and contacts for electrical work sites.
 * Full-width sections matching app design language — no boxed cards.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Phone,
  MapPin,
  Shield,
  FileText,
  Zap,
  Flame,
  Heart,
  Eye,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EMERGENCY_CONTACTS = [
  {
    service: 'Emergency Services',
    number: '999',
    description: 'Fire, Police, Ambulance',
    icon: Phone,
    colour: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    service: 'Power Cut / Emergency',
    number: '105',
    description: 'Electricity network emergency',
    icon: Zap,
    colour: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    service: 'Gas Emergency',
    number: '0800 111 999',
    description: 'National Gas Emergency Service',
    icon: Flame,
    colour: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    service: 'HSE Incident Contact',
    number: '0345 300 9923',
    description: 'RIDDOR reporting line',
    icon: Shield,
    colour: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    service: 'NHS Non-Emergency',
    number: '111',
    description: 'Medical advice',
    icon: Heart,
    colour: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    service: 'Poison Information',
    number: '0344 892 0111',
    description: 'National Poisons Info (COSHH)',
    icon: AlertTriangle,
    colour: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
];

interface ProcedureSection {
  id: string;
  title: string;
  icon: typeof AlertTriangle;
  colour: string;
  accentBg: string;
  steps: string[];
}

const PROCEDURES: ProcedureSection[] = [
  {
    id: 'electric-shock',
    title: 'Electric Shock Response',
    icon: Zap,
    colour: 'text-red-400',
    accentBg: 'bg-red-500/10 border-red-500/20',
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
    icon: MapPin,
    colour: 'text-amber-400',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
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
    icon: Heart,
    colour: 'text-green-400',
    accentBg: 'bg-green-500/10 border-green-500/20',
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
    icon: Flame,
    colour: 'text-orange-400',
    accentBg: 'bg-orange-500/10 border-orange-500/20',
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
    icon: Eye,
    colour: 'text-blue-400',
    accentBg: 'bg-blue-500/10 border-blue-500/20',
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

const EmergencyProcedures = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['electric-shock'])
  );

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Hero warning */}
      <div className="relative overflow-hidden rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-500/[0.08] via-background to-background">
        <div className="h-1 bg-gradient-to-r from-red-500 via-amber-500 to-red-500" />
        <div className="p-4 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/25 flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Emergency Procedures</h2>
            <p className="text-xs text-white mt-1 leading-relaxed">
              Critical procedures for electrical work sites. Ensure all team members are familiar
              with these before commencing work.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts — full width, tappable to call */}
      <div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider px-1 mb-2">
          Emergency Contacts
        </h3>
        <div className="space-y-1.5">
          {EMERGENCY_CONTACTS.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.number}
                href={`tel:${contact.number.replace(/\s/g, '')}`}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] active:scale-[0.99] transition-all touch-manipulation"
              >
                <div className={cn('p-2 rounded-lg', contact.bg, contact.border, 'border')}>
                  <Icon className={cn('h-4 w-4', contact.colour)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{contact.service}</div>
                  <div className="text-[11px] text-white">{contact.description}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={cn('text-base font-bold', contact.colour)}>
                    {contact.number}
                  </span>
                  <Phone className="h-4 w-4 text-white" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Procedures — expandable sections */}
      <div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider px-1 mb-2">
          Emergency Procedures
        </h3>
        <div className="space-y-2">
          {PROCEDURES.map((proc) => {
            const Icon = proc.icon;
            const isExpanded = expandedSections.has(proc.id);
            return (
              <div
                key={proc.id}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(proc.id)}
                  className="w-full flex items-center gap-3 p-3.5 touch-manipulation active:bg-white/[0.04] transition-colors"
                >
                  <div className={cn('p-2 rounded-lg border', proc.accentBg)}>
                    <Icon className={cn('h-4 w-4', proc.colour)} />
                  </div>
                  <span className="text-sm font-semibold text-white flex-1 text-left">
                    {proc.title}
                  </span>
                  <span className="text-[10px] text-white bg-white/[0.06] px-2 py-0.5 rounded">
                    {proc.steps.length} steps
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 pb-3.5 pt-1">
                        <div className="space-y-0">
                          {proc.steps.map((step, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0"
                            >
                              <span
                                className={cn(
                                  'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5 border',
                                  proc.accentBg,
                                  proc.colour
                                )}
                              >
                                {i + 1}
                              </span>
                              <span className="text-[13px] text-white leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider px-1 mb-2">
          HSE Resources
        </h3>
        <div className="space-y-1.5">
          {[
            {
              title: 'INDG231 — Electrical safety at work',
              url: 'https://www.hse.gov.uk/pubns/indg231.pdf',
            },
            {
              title: 'GS38 — Electrical test equipment',
              url: 'https://www.hse.gov.uk/pubns/gs38.pdf',
            },
            {
              title: 'First aid at work (INDG214)',
              url: 'https://www.hse.gov.uk/pubns/indg214.pdf',
            },
            {
              title: 'RIDDOR — Report an incident',
              url: 'https://notifications.hse.gov.uk/riddorforms',
            },
          ].map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] active:scale-[0.99] transition-all touch-manipulation"
            >
              <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <span className="text-sm text-white flex-1">{link.title}</span>
              <ExternalLink className="h-3.5 w-3.5 text-white" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyProcedures;
