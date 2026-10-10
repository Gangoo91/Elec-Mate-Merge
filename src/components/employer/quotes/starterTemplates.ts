import type { FirmPriceBookItem } from '@/hooks/useFirmPriceBook';
import type { QuoteTemplate, TemplateSources } from '@/hooks/useQuotesThatWin';

/* ELE-2073 starter job templates. Lines are priced from the firm's own price
   book (first item whose name matches, with a sell price); a line with no
   match comes in at £0, flagged to price. Labour hours come from the firm's
   own approved timesheets on jobs of that type when it has some, else from
   typical task times in the practical-work data (quote_template_task_minutes),
   multiplied by how many of each task the job has. */

interface StarterLine {
  label: string;
  match: RegExp;
  qty: number;
  unit?: string;
}

interface StarterDef {
  key: string;
  name: string;
  jobType: string;
  description: string;
  lines: StarterLine[];
  tasks: { key: string; qty: number }[];
}

export const STARTERS: StarterDef[] = [
  {
    key: 'cu',
    name: 'Consumer unit change',
    jobType: 'Consumer unit change',
    description: 'Replace the board with a new RCBO consumer unit, then test and certify.',
    lines: [
      { label: 'Consumer unit', match: /consumer unit|\bcu\b|distribution board/i, qty: 1 },
      { label: 'RCBO', match: /rcbo/i, qty: 8 },
      { label: 'Surge protection device', match: /\bspd\b|surge/i, qty: 1 },
      { label: 'Meter tails', match: /meter tail/i, qty: 2, unit: 'm' },
    ],
    tasks: [
      { key: 'cu_replace', qty: 1 },
      { key: 'testing', qty: 1 },
    ],
  },
  {
    key: 'ev',
    name: 'EV charger install',
    jobType: 'EV charger',
    description:
      'Supply and fit a home charge point on its own circuit, with testing and the certificate.',
    lines: [
      {
        label: 'EV charge point',
        match: /ev charg|charge ?point|wallbox|\bzappi\b|\bohme\b/i,
        qty: 1,
      },
      { label: 'SWA cable', match: /\bswa\b|armoured/i, qty: 15, unit: 'm' },
      { label: 'RCBO', match: /rcbo/i, qty: 1 },
      { label: 'Isolator', match: /isolator/i, qty: 1 },
    ],
    tasks: [
      { key: 'ev_install', qty: 1 },
      { key: 'testing', qty: 1 },
    ],
  },
  {
    key: 'rewire3',
    name: 'Full rewire, 3-bed house',
    jobType: 'Rewire',
    description:
      'Rewire a three-bedroom house: sockets, lighting, smoke alarms and a new consumer unit.',
    lines: [
      { label: 'Consumer unit', match: /consumer unit|\bcu\b/i, qty: 1 },
      { label: 'RCBO', match: /rcbo/i, qty: 10 },
      {
        label: '2.5mm twin and earth',
        match: /2\.5\s?mm.*(t\s?&\s?e|twin)|(t\s?&\s?e|twin).*2\.5/i,
        qty: 100,
        unit: 'm',
      },
      {
        label: '1.5mm twin and earth',
        match: /1\.5\s?mm.*(t\s?&\s?e|twin)|(t\s?&\s?e|twin).*1\.5/i,
        qty: 100,
        unit: 'm',
      },
      { label: 'Double socket', match: /double socket|twin socket|2g(ang)? socket/i, qty: 20 },
      { label: 'Light switch', match: /light switch|1g(ang)? switch|switch/i, qty: 10 },
      { label: 'Ceiling rose or pendant', match: /ceiling rose|pendant|batten holder/i, qty: 12 },
      { label: 'Smoke or heat alarm', match: /smoke|heat alarm/i, qty: 3 },
      { label: 'Back box', match: /back ?box/i, qty: 30 },
    ],
    tasks: [
      { key: 'socket_add', qty: 20 },
      { key: 'light_point', qty: 12 },
      { key: 'cu_replace', qty: 1 },
      { key: 'smoke', qty: 3 },
      { key: 'testing', qty: 1 },
    ],
  },
  {
    key: 'socket',
    name: 'Add a double socket',
    jobType: 'Sockets',
    description: 'One new double socket off an existing circuit, with a minor works certificate.',
    lines: [
      { label: 'Double socket', match: /double socket|twin socket|2g(ang)? socket/i, qty: 1 },
      { label: 'Back box', match: /back ?box/i, qty: 1 },
      {
        label: '2.5mm twin and earth',
        match: /2\.5\s?mm.*(t\s?&\s?e|twin)|(t\s?&\s?e|twin).*2\.5/i,
        qty: 10,
        unit: 'm',
      },
    ],
    tasks: [
      { key: 'socket_add', qty: 1 },
      { key: 'testing', qty: 1 },
    ],
  },
  {
    key: 'outdoor',
    name: 'Outdoor socket',
    jobType: 'Sockets',
    description: 'A weatherproof outdoor socket on RCD protection.',
    lines: [
      { label: 'Outdoor socket', match: /outdoor|weatherproof|ip66|ip65/i, qty: 1 },
      { label: 'SWA cable', match: /\bswa\b|armoured/i, qty: 10, unit: 'm' },
    ],
    tasks: [
      { key: 'outdoor', qty: 1 },
      { key: 'testing', qty: 1 },
    ],
  },
  {
    key: 'smoke',
    name: 'Smoke and heat alarms',
    jobType: 'Alarms',
    description: 'Mains interlinked smoke and heat alarms: hall, landing and kitchen.',
    lines: [{ label: 'Smoke or heat alarm', match: /smoke|heat alarm/i, qty: 3 }],
    tasks: [
      { key: 'smoke', qty: 3 },
      { key: 'testing', qty: 1 },
    ],
  },
  {
    key: 'shower',
    name: 'Electric shower circuit',
    jobType: 'Shower',
    description: 'A new circuit for an electric shower, with isolator and RCBO.',
    lines: [
      { label: 'Electric shower', match: /shower/i, qty: 1 },
      {
        label: '10mm twin and earth',
        match: /10\s?mm.*(t\s?&\s?e|twin)|(t\s?&\s?e|twin).*10\s?mm/i,
        qty: 15,
        unit: 'm',
      },
      { label: 'Isolator', match: /isolator|pull ?cord/i, qty: 1 },
      { label: 'RCBO', match: /rcbo/i, qty: 1 },
    ],
    tasks: [
      { key: 'shower', qty: 1 },
      { key: 'testing', qty: 1 },
    ],
  },
];

const roundHalf = (h: number) => Math.max(0.5, Math.round(h * 2) / 2);

export function buildStarterTemplates(
  priceBook: FirmPriceBookItem[],
  sources: TemplateSources | undefined
): QuoteTemplate[] {
  const rate = Number(sources?.hourly_rate) > 0 ? Number(sources!.hourly_rate) : 0;
  return STARTERS.map((s) => {
    const lines = s.lines.map((l) => {
      const hit = priceBook.find((p) => l.match.test(p.name) && Number(p.sell_price) > 0);
      return {
        description: hit ? hit.name : l.label,
        quantity: l.qty,
        unit: hit?.unit || l.unit || 'each',
        unitPrice: hit ? Number(hit.sell_price) : 0,
        priceBookItemId: hit?.item_id ?? null,
        unpriced: !hit,
      };
    });
    const history = sources?.history?.[s.jobType.toLowerCase()];
    let hours: number;
    let basis: string;
    if (history && history.avg_hours > 0) {
      hours = roundHalf(history.avg_hours);
      basis = `Average of your last ${history.jobs} ${s.jobType.toLowerCase()} job${history.jobs === 1 ? '' : 's'}`;
    } else {
      const mins = s.tasks.reduce(
        (sum, t) => sum + (sources?.task_minutes?.[t.key]?.minutes ?? 0) * t.qty,
        0
      );
      const sample = s.tasks.reduce(
        (sum, t) => sum + (sources?.task_minutes?.[t.key]?.sample ?? 0),
        0
      );
      hours = roundHalf(mins / 60);
      basis = `Typical task times from ${sample.toLocaleString('en-GB')} practical-work records. Check before sending.`;
    }
    return {
      id: `starter:${s.key}`,
      starter: true,
      name: s.name,
      job_type: s.jobType,
      description: s.description,
      labour: [{ description: `Labour: ${s.name.toLowerCase()}`, hours, hourlyRate: rate, basis }],
      lines,
      labourSource: basis,
    };
  });
}

export function templateTotal(t: QuoteTemplate) {
  return (
    t.labour.reduce((s, l) => s + l.hours * l.hourlyRate, 0) +
    t.lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0)
  );
}
