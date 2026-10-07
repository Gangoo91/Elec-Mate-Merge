import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import type { RosterItem } from '@/lib/collegeRoster';

/* ==========================================================================
   TempLoginsPanel — the logins a roster run made when NOBODY was emailed
   (college-roster-import with send_email: false). The temporary passwords
   come back once, in this response only (never stored), so the person who
   ran the import can hand them out. Each person is asked to choose their own
   password the first time they sign in (TempPasswordPrompt).
   ========================================================================== */

const SIGN_IN_URL = 'https://app.elec-mate.com/auth/signin';

export function TempLoginsPanel({ items, kind }: { items: RosterItem[]; kind: 'learners' | 'staff' }) {
  const logins = items.filter((i) => i.temp_password);
  const [copied, setCopied] = useState(false);
  if (logins.length === 0) return null;

  const copyAll = async () => {
    const lines = [
      `Sign in at ${SIGN_IN_URL}`,
      '',
      ...logins.map((i) => `${i.name}\t${i.email}\t${i.temp_password}${i.join_code ? `\tjoin code ${i.join_code}` : ''}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the list is on screen */
    }
  };

  return (
    <section className="space-y-3 rounded-2xl border border-elec-yellow/40 bg-elec-yellow/[0.06] p-4">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          {logins.length} {logins.length === 1 ? 'login' : 'logins'} to hand out
        </h3>
        <p className="mt-1 text-[12.5px] leading-relaxed text-white">
          Nobody was emailed, so give each {kind === 'staff' ? 'person' : 'learner'} their email and temporary password.
          They sign in at app.elec-mate.com or in the Elec-Mate app and are asked to choose their own password straight
          away. Copy the list now: these passwords are not shown again.
        </p>
      </div>
      <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/[0.1]">
        {logins.map((i) => (
          <li key={i.index} className="grid gap-0.5 px-3 py-2.5 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center sm:gap-3">
            <span className="truncate text-[13.5px] font-medium text-white">{i.name}</span>
            <span className="truncate text-[12.5px] text-white">{i.email}</span>
            <span className="font-mono text-[13.5px] font-semibold tracking-wide text-elec-yellow">{i.temp_password}</span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => void copyAll()} className={cn(buttonSecondaryCn, 'w-full')}>
        {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
        {copied ? 'Copied' : 'Copy all logins'}
      </button>
    </section>
  );
}
