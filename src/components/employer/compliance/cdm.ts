/**
 * CDM 2015 construction phase plan (ELE-2076).
 *
 *  - A plan is needed on every project: the principal contractor draws it up
 *    (reg 12(1)), or the contractor where there is only one (reg 15(5)). It
 *    sets out the health and safety arrangements and site rules (reg 12(2)).
 *  - Content follows L153 Appendix 3 and HSE CIS80: project description and
 *    key dates, management of the work (site rules, cooperation, induction,
 *    welfare, fire and emergency), and control of the specific site risks.
 *  - Notification (F10, reg 6(1)): more than 30 working days with more than
 *    20 workers at once at any point, or more than 500 person days. The
 *    client notifies; for a domestic client the duty passes to the
 *    contractor, or the principal contractor if more than one (reg 7(1)).
 */

export type FirmRole = 'only_contractor' | 'principal_contractor' | 'contractor';

export interface CdmDetails {
  scope: string;
  services: string;
  asbestos: string;
  hazards: string;
  welfare: string;
  first_aid: string;
  emergency: string;
  fire: string;
  site_rules: string;
  induction: string;
  cooperation: string;
  responsible_employee_id: string;
}

export const DEFAULT_SITE_RULES = [
  'Sign in and out every day.',
  'Everyone is inducted before starting work.',
  'Safe isolation before any work on or near electrical equipment: prove dead, lock off and tag.',
  'Wear the PPE named in the RAMS.',
  'Keep walkways and fire exits clear. Tidy as you go.',
  'Report every accident, near miss and unsafe condition to the person in charge.',
  'No alcohol or drugs on site.',
].join('\n');

export const EMPTY_DETAILS: CdmDetails = {
  scope: '',
  services: '',
  asbestos: '',
  hazards: '',
  welfare: '',
  first_aid: '',
  emergency: '',
  fire: '',
  site_rules: DEFAULT_SITE_RULES,
  induction:
    'Every worker is inducted on their first day: the plan, site rules, hazards, welfare and emergency arrangements. Induction is recorded by signing the job pack.',
  cooperation:
    'The person in charge briefs the crew at the start of each day and coordinates with the client and any other trades on site.',
  responsible_employee_id: '',
};

export interface F10Check {
  notifiable: boolean;
  /** Who must notify, in plain words. */
  who: string;
  reason: string;
}

export const F10_URL = 'https://www.hse.gov.uk/forms/notification/f10.htm';

export function f10Check(input: {
  workingDays: number | null;
  peakWorkers: number | null;
  personDays: number | null;
  domestic: boolean;
  firmRole: FirmRole;
}): F10Check {
  const d = input.workingDays ?? 0;
  const w = input.peakWorkers ?? 0;
  const p = input.personDays ?? 0;
  const long = d > 30 && w > 20;
  const big = p > 500;
  const notifiable = long || big;
  const who = !input.domestic
    ? 'The client notifies HSE (F10) before the construction phase begins.'
    : input.firmRole === 'contractor'
      ? 'The client is domestic, so the principal contractor notifies HSE (F10).'
      : 'The client is domestic, so you take on the client’s duty and notify HSE (F10) before work starts.';
  const reason = notifiable
    ? long
      ? `${d} working days with ${w} people on site at once: over 30 days and over 20 workers.`
      : `${p} person days: over 500.`
    : 'Not more than 30 working days with more than 20 people at once, and not more than 500 person days.';
  return { notifiable, who, reason };
}

export const ROLE_LABEL: Record<FirmRole, string> = {
  only_contractor: 'The only contractor',
  principal_contractor: 'Principal contractor',
  contractor: 'A contractor under a principal contractor',
};

/** Pull hazard lines out of a RAMS risks array, whatever shape it was saved in. */
export function ramsHazards(risks: unknown): string[] {
  if (!Array.isArray(risks)) return [];
  return risks
    .map((r) => {
      if (typeof r === 'string') return r;
      if (r && typeof r === 'object') {
        const o = r as Record<string, unknown>;
        const hazard = o.hazard ?? o.risk ?? o.title ?? o.description ?? o.name;
        const control = o.controls ?? o.controlMeasures ?? o.control_measures ?? o.mitigation;
        const c = Array.isArray(control) ? control.join('; ') : control;
        return [hazard, c].filter(Boolean).join(': ');
      }
      return '';
    })
    .filter((s): s is string => !!s && s.trim().length > 0)
    .slice(0, 20);
}
