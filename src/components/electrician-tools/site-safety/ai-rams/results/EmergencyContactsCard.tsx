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
    <div className="py-3 flex items-baseline gap-4">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 w-28 sm:w-32 shrink-0">
        {role}
      </span>
      <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
        <span className="text-[14px] font-medium text-white truncate">{name || 'TBC'}</span>
        {phone && (
          <a
            href={`tel:${phone}`}
            className="text-[12px] font-semibold text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation tabular-nums shrink-0"
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
      <div className="flex items-baseline justify-between gap-3">
        <div className="space-y-1">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Emergency contacts
          </div>
          <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
            Who to call.
          </h3>
        </div>
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400 shrink-0">
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
            <span className="text-[14px] font-medium text-white">
              Police / fire / ambulance
            </span>
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
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 w-28 sm:w-32 shrink-0">
              Assembly point
            </span>
            <span className="text-[14px] font-medium text-white flex-1 min-w-0">
              {methodData.assemblyPoint}
            </span>
          </div>
        )}
      </div>

      {!hasAnyContact && (
        <p className="text-[12.5px] text-white/55 leading-relaxed">
          Complete emergency contact details before starting work — these are embedded into the
          cover page of the RAMS PDF.
        </p>
      )}
    </section>
  );
}
