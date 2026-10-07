import { format, parseISO } from 'date-fns';
import type { HomeTodo } from '@/components/employer/overview/HomeSections';
import type { KitAttention } from '@/hooks/useKit';

/* Overview "To do" rows for the kit register and van stock (ELE-1829):
   a fault or loss reported from site, calibration / PAT due within 30 days
   ("Megger MFT1741 calibration due Tue 3 Nov, with van AB12 CDE (Dan)"), and
   vans running low. Each row deep-links to the exact item. */

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const shortDate = (iso: string) => format(parseISO(iso), 'EEE d MMM');
/** 'PAT test' stays capitalised; 'Calibration' reads as 'calibration' mid-sentence. */
const testWord = (label: string) => (label.startsWith('PAT') ? label : label.toLowerCase());

export function buildKitTodo(k: KitAttention | null | undefined, today: string): (HomeTodo & { hero: string })[] {
  if (!k) return [];
  const t: (HomeTodo & { hero: string })[] = [];

  if (k.faults > 0 && k.fault_first) {
    const f = k.fault_first;
    t.push({
      key: 'kit-faults',
      kind: 'Jobs',
      badge: 'KF',
      urgent: true,
      rank: 26,
      title: k.faults === 1 ? `${f.name} ${f.status === 'Lost' ? 'reported lost' : 'has a fault'}` : `${k.faults} kit faults or losses reported`,
      detail: f.who ? `Reported by ${f.who}` : 'Reported from site',
      action: 'Look',
      hero: 'Deal with reported kit',
      section: 'kit',
      params: k.faults === 1 ? { tool: f.tool_id } : { tab: 'kit' },
    });
  }

  if (k.due > 0 && k.due_first) {
    const d = k.due_first;
    const overdue = d.due < today;
    t.push({
      key: 'kit-due',
      kind: 'Expiring',
      badge: 'KT',
      urgent: k.overdue > 0,
      rank: 33,
      title:
        k.due === 1
          ? `${d.name} ${testWord(d.label)} ${overdue ? 'overdue' : `due ${shortDate(d.due)}`}`
          : `${plural(k.due, 'kit test')} due or overdue`,
      detail: k.due === 1 ? (d.holder ? `With ${d.holder}` : 'In the office') : `First: ${d.name}, ${testWord(d.label)}`,
      meta: `${overdue ? 'Was due' : 'Due'} ${shortDate(d.due)}`,
      action: 'Book in',
      hero: 'Book kit in for testing',
      section: 'kit',
      params: { tool: d.tool_id },
    });
  }

  if (k.low_stock > 0 && k.low_first) {
    const l = k.low_first;
    t.push({
      key: 'van-stock-low',
      kind: 'Jobs',
      badge: 'VS',
      rank: 34,
      title:
        k.low_vans === 1
          ? `${l.registration ?? 'A van'} is low on ${k.low_stock === 1 ? l.name : plural(k.low_stock, 'item')}`
          : `${plural(k.low_vans, 'van')} running low`,
      detail: 'Draft orders are ready to check in Purchase orders',
      action: 'Check',
      hero: 'Restock the vans',
      section: 'kit',
      params: k.low_vans === 1 ? { tab: 'stock', van: l.vehicle_id } : { tab: 'stock' },
    });
  }

  return t;
}
