/**
 * CertificatePrefillStrip — "New certificate for Jo Bloggs · 1 High St".
 *
 * Shown on the Inspection & Testing screens where a cert is CHOSEN (Start a
 * cert, All cert types, Certificates) when the visit came from a booking or a
 * project. The details travel in the URL to whichever form is opened (see
 * certificatePrefill); this makes that visible, and ✕ drops them for a cert
 * that is for someone else. Renders nothing without a prefill.
 */

import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import { readCertificatePrefill } from '@/utils/certificatePrefill';

export function CertificatePrefillStrip() {
  // Subscribing to the location re-renders the strip when ✕ clears the query.
  const location = useLocation();
  const navigate = useNavigate();
  const prefill = readCertificatePrefill();
  if (!prefill || (!prefill.clientName && !prefill.address)) return null;

  const clear = () => {
    const params = new URLSearchParams(location.search);
    ['projectId', 'clientName', 'address'].forEach((k) => params.delete(k));
    const qs = params.toString();
    navigate(`${location.pathname}${qs ? `?${qs}` : ''}`, { replace: true });
  };

  return (
    <div className="-mx-4 flex items-center gap-3 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] py-2.5 pl-4 pr-1 sm:mx-0 sm:rounded-2xl sm:border-x">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
          New certificate for
        </p>
        <p className="truncate text-[14.5px] font-semibold text-white">
          {[prefill.clientName, prefill.address].filter(Boolean).join(' · ')}
        </p>
      </div>
      <button
        type="button"
        onClick={clear}
        aria-label="Start without these details"
        className="flex h-11 w-11 shrink-0 items-center justify-center text-white touch-manipulation"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default CertificatePrefillStrip;
