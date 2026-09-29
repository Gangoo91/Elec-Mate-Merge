import { PORTAL_LINKS } from '@/utils/portalLinks';
import { openExternalUrl } from '@/utils/open-external-url';

interface RegisteredUserGuideProps {
  /** NAPIT / NICEIC memberships from the company profile. */
  schemes: Array<'napit' | 'niceic'>;
  /** Another scheme (e.g. Stroma) — no portal link, but still self-certifying. */
  otherSchemeName?: string | null;
}

/**
 * One line that says which scheme the electrician is with and puts its
 * portal a tap away. Nothing else — the cards carry the work.
 */
export const RegisteredUserGuide = ({ schemes, otherSchemeName }: RegisteredUserGuideProps) => {
  const names = [
    ...schemes.map((s) => (s === 'napit' ? 'NAPIT' : 'NICEIC')),
    ...(otherSchemeName ? [otherSchemeName] : []),
  ];

  return (
    <div className="-mx-4 flex flex-col gap-3 border-y border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4 sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:border-x sm:p-5">
      <div className="min-w-0">
        <p className="text-[13.5px] font-semibold tracking-tight text-white">
          Registered with {names.join(' & ') || 'a competent person scheme'}
        </p>
        <p className="mt-0.5 text-[12.5px] leading-snug text-white">
          Self-certify through the portal within 30 days of finishing. Your scheme tells Building
          Control and posts the compliance certificate — no council fee.
        </p>
      </div>
      {schemes.length > 0 && (
        <div className="flex shrink-0 flex-wrap gap-2">
          {schemes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => openExternalUrl(PORTAL_LINKS[s].url)}
              className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation"
            >
              Open {s === 'napit' ? 'NAPIT' : 'NICEIC'} portal
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
