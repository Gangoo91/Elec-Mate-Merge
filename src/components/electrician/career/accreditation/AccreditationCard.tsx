/**
 * AccreditationCard — editorial card.
 *
 * Type-led, gradient surface, tabular nums for fees + duration. Replaces the
 * gradient-background + circular-logo header with a tighter hierarchy: brand
 * mark next to title, key facts as a divide-y meta strip, benefit chips, and
 * primary + secondary actions in the footer.
 */

import { openExternalUrl } from '@/utils/open-external-url';
import { ExternalLink } from 'lucide-react';
import { AccreditationOption } from '../../../apprentice/career/accreditation/enhancedAccreditationData';
import { isValidUrl } from '@/utils/urlUtils';
import { cn } from '@/lib/utils';
import { getBrandInfo, getLogoUrl, getInitials } from './accreditationBranding';

interface AccreditationCardProps {
  accreditation: AccreditationOption;
  onViewDetails: (accreditation: AccreditationOption) => void;
}

const AccreditationCard = ({ accreditation, onViewDetails }: AccreditationCardProps) => {
  const brandInfo = getBrandInfo(accreditation.accreditationBody);
  const logoUrl = getLogoUrl(accreditation.accreditationBody, accreditation.website);
  const popularityTone =
    accreditation.popularity >= 90
      ? 'text-emerald-300'
      : accreditation.popularity >= 75
        ? 'text-elec-yellow'
        : 'text-amber-300';

  return (
    <button
      type="button"
      onClick={() => onViewDetails(accreditation)}
      className="text-left group rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation flex flex-col"
    >
      {/* Brand row */}
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border bg-white/[0.04] shrink-0"
          style={{ borderColor: brandInfo.brandColor }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${accreditation.accreditationBody} logo`}
              className="w-9 h-9 object-contain"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-[11px] font-semibold text-white">${getInitials(
                    accreditation.accreditationBody
                  )}</span>`;
                }
              }}
            />
          ) : (
            <span className="text-[11px] font-semibold text-white">
              {getInitials(accreditation.accreditationBody)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold tracking-tight text-white leading-tight line-clamp-2">
            {accreditation.title}
          </h3>
          <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 truncate">
            {accreditation.provider}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-[12px] leading-relaxed text-white line-clamp-3 flex-grow">
        {accreditation.description}
      </p>

      {/* Meta strip */}
      <dl className="mt-3 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
        <MetaRow label="Level" value={accreditation.level} />
        <MetaRow label="Cost" value={accreditation.cost} accent />
        <MetaRow label="Duration" value={accreditation.duration} />
        <MetaRow label="Renews" value={accreditation.renewalPeriod || '—'} />
      </dl>

      {/* Benefits */}
      {accreditation.benefits.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1">
          {accreditation.benefits.slice(0, 3).map((b, i) => (
            <li
              key={i}
              className="text-[10px] uppercase tracking-[0.12em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5"
            >
              {b}
            </li>
          ))}
          {accreditation.benefits.length > 3 && (
            <li className="text-[10px] uppercase tracking-[0.12em] text-white/65 px-1.5 py-0.5">
              +{accreditation.benefits.length - 3}
            </li>
          )}
        </ul>
      )}

      {/* Footer — popularity + actions */}
      <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-baseline justify-between gap-2">
        <span className={cn('text-[11px] tabular-nums font-semibold', popularityTone)}>
          {accreditation.popularity}% take-up
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10.5px] uppercase tracking-[0.14em] text-elec-yellow group-hover:underline">
            Details →
          </span>
          {isValidUrl(accreditation.website) && (
            <a
              href={accreditation.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                openExternalUrl(accreditation.website);
              }}
              className="ml-1 text-white/65 hover:text-elec-yellow inline-flex items-center justify-center h-7 w-7 rounded-md border border-white/15 hover:border-elec-yellow/40 transition-colors touch-manipulation"
              aria-label={`Visit ${accreditation.accreditationBody} website`}
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </button>
  );
};

const MetaRow = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="inline-flex items-baseline gap-1.5 min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65 shrink-0">
      {label}
    </dt>
    <dd
      className={cn(
        'tabular-nums truncate',
        accent ? 'text-elec-yellow font-semibold' : 'text-white'
      )}
    >
      {value}
    </dd>
  </div>
);

export default AccreditationCard;
