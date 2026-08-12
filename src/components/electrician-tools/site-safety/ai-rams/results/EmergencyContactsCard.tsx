import React from 'react';
import { MethodStatementData } from '@/types/method-statement';

interface EmergencyContactsCardProps {
  methodData: MethodStatementData;
}

interface ContactRowProps {
  role: string;
  name?: string;
  phone?: string;
}

const ContactRow: React.FC<ContactRowProps> = ({ role, name, phone }) => {
  if (!name && !phone) return null;
  return (
    /* Stacks on mobile. The fixed w-28 label column left so little room that
       names truncated to "Michael Br…" while the label itself wrapped over two
       lines — the worst of both. Label above, name and number below. */
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white sm:w-32 sm:shrink-0">
        {role}
      </span>
      <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
        <span className="min-w-0 flex-1 text-[14px] font-medium text-white">{name || 'TBC'}</span>
        {phone && (
          <a
            href={`tel:${phone}`}
            className="-my-2 inline-flex min-h-11 shrink-0 items-center py-2 text-[13px] font-semibold tabular-nums text-elec-yellow transition-colors hover:text-elec-yellow/80 touch-manipulation"
          >
            {phone}
          </a>
        )}
      </div>
    </div>
  );
};

/**
 * Emergency contacts — editorial. No icons, no card chrome.
 * Eyebrow header + row-per-contact + tel: links rendered as tap-to-call
 * inline numbers. 999 sits as its own emphasised row.
 */
export function EmergencyContactsCard({ methodData }: EmergencyContactsCardProps) {
  const hasAnyContact =
    methodData.siteManagerName ||
    methodData.firstAiderName ||
    methodData.safetyOfficerName ||
    methodData.assemblyPoint;

  return (
    <section className="space-y-4">
      {/* No heading here — the section card supplies it. This component used
          to print its own eyebrow AND a large h3, so the page showed the same
          title three times over. */}
      <div className="flex justify-end">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400">
          Safety critical
        </span>
      </div>

      <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        <ContactRow
          role="Site manager"
          name={methodData.siteManagerName}
          phone={methodData.siteManagerPhone}
        />
        <ContactRow
          role="First aider"
          name={methodData.firstAiderName}
          phone={methodData.firstAiderPhone}
        />
        <ContactRow
          role="Safety officer"
          name={methodData.safetyOfficerName}
          phone={methodData.safetyOfficerPhone}
        />

        {/* 999 — editorial row with red accent on the number */}
        <div className="py-3 flex items-baseline gap-4">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400 w-28 sm:w-32 shrink-0">
            Emergency
          </span>
          <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
            <span className="text-[14px] font-medium text-white">Police / fire / ambulance</span>
            <a
              href="tel:999"
              className="text-[14px] font-bold tabular-nums text-red-400 hover:text-red-300 transition-colors touch-manipulation"
            >
              999
            </a>
          </div>
        </div>

        {methodData.assemblyPoint && (
          <div className="py-3 flex items-baseline gap-4">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white w-28 sm:w-32 shrink-0">
              Assembly point
            </span>
            <span className="text-[14px] font-medium text-white flex-1 min-w-0">
              {methodData.assemblyPoint}
            </span>
          </div>
        )}
      </div>

      {!hasAnyContact && (
        <p className="text-[12.5px] text-white leading-relaxed">
          Complete emergency contact details before starting work — these are embedded into the
          cover page of the RAMS PDF.
        </p>
      )}
    </section>
  );
}
