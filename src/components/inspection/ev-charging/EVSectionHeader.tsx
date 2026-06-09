import React from 'react';
import {
  User,
  Car,
  MapPin,
  Plug,
  Zap,
  ShieldAlert,
  ShieldCheck,
  Box,
  Cable,
  Gauge,
  Radio,
  FlaskConical,
  Activity,
  Cpu,
  Wrench,
  Banknote,
  PackageCheck,
  FileSignature,
  BadgeCheck,
  Building2,
  FileCheck,
  type LucideIcon,
} from 'lucide-react';

// Section title → accent icon. Keyed by the exact title strings used across the
// EV charging tabs so headers get a consistent icon with no per-call changes.
const SECTION_ICONS: Record<string, LucideIcon> = {
  // Installation
  'Client Details': User,
  'Vehicle Details (Optional)': Car,
  'Installation Details': MapPin,
  'Charger Details': Plug,
  // Supply
  'Supply Characteristics': Zap,
  'PME Considerations': ShieldAlert,
  'O-PEN Protection (IET01:2024)': ShieldCheck,
  'Distribution Board': Box,
  'Circuit Details': Cable,
  'Circuit Protection': ShieldCheck,
  'Protective Devices (A4:2026)': ShieldCheck,
  'Maximum Demand (722.311.201)': Gauge,
  'DNO Notification': Radio,
  // Testing
  'Circuit Tests': FlaskConical,
  'Additional Tests': FlaskConical,
  'RCD Tests': Activity,
  'Functional Tests': Activity,
  'Smart Features': Cpu,
  'Test Equipment': Wrench,
  // Declarations
  'OZEV Grant Details': Banknote,
  'Handover & Documentation': PackageCheck,
  'Installer Declaration': FileSignature,
  'Compliance & Standards': BadgeCheck,
  'Building Regulations': Building2,
};

/**
 * Shared section header for the EV charging form. Gold accent line + an icon
 * chip + uppercase title. Used as SectionHeader/SectionHeading/SectionTitle
 * across the four tabs so they render consistently inside the desktop cards.
 */
export const EVSectionHeader: React.FC<{ title: string }> = ({ title }) => {
  const Icon = SECTION_ICONS[title] ?? FileCheck;
  return (
    <div className="pb-2 mb-3">
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-elec-yellow/10 text-elec-yellow flex-shrink-0">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <h2 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h2>
      </div>
    </div>
  );
};

export default EVSectionHeader;
