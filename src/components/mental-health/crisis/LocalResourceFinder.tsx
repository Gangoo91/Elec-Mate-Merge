import { useState } from 'react';
import { MapPin, Search, Compass, Stethoscope } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';

/**
 * Honest local-help finder. We don't have a licensed directory of NHS/charity
 * services, so instead of faking results we hand the postcode to services
 * that genuinely hold one: Hub of Hope (the UK's largest mental health
 * support directory) and a Maps search. NHS 111 online covers the urgent
 * triage route.
 */
const LocalResourceFinder = () => {
  const [postcode, setPostcode] = useState('');

  const trimmed = postcode.trim();

  const openMapsSearch = () => {
    const query = encodeURIComponent(
      `mental health support ${trimmed ? `near ${trimmed}` : 'near me'}`
    );
    openExternalUrl(`https://maps.google.com/?q=${query}`);
  };

  const destinations = [
    {
      id: 'hub-of-hope',
      icon: Compass,
      title: 'Hub of Hope',
      subtitle: 'UK-wide directory of local charities, groups and therapists. Search by postcode.',
      cta: 'Open directory',
      onOpen: () => openExternalUrl('https://hubofhope.co.uk/'),
    },
    {
      id: 'nhs-111',
      icon: Stethoscope,
      title: 'NHS 111 — mental health',
      subtitle: 'Urgent but not life-threatening. Online triage connects you to local NHS options.',
      cta: 'Start online',
      onOpen: () => openExternalUrl('https://111.nhs.uk/triage/check-your-mental-health-symptoms'),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Postcode → maps search */}
      <div>
        <label htmlFor="wb-postcode" className="block text-[14px] leading-relaxed text-white">
          Your postcode, to search for services near you
        </label>
        <div className="mt-2 flex items-end gap-2">
          <input
            id="wb-postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="e.g. M1 1AA"
            autoComplete="postal-code"
            autoCapitalize="characters"
            enterKeyHint="search"
            className="input-underline h-11 min-w-0 flex-1 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow placeholder:text-white/25 transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation"
            onKeyDown={(e) => e.key === 'Enter' && openMapsSearch()}
          />
          <button
            type="button"
            onClick={openMapsSearch}
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.35] active:bg-white/[0.06]"
            aria-label="Search for mental health support near this postcode"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
            Search
          </button>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[12.5px] text-white">
          <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          Opens a map search. Nothing you type here is stored.
        </p>
      </div>

      {/* Trusted directories */}
      <ul className="-mx-5 -mb-5 divide-y divide-white/[0.06] border-t border-white/[0.06] sm:-mx-6 sm:-mb-6">
        {destinations.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              onClick={d.onOpen}
              className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
            >
              <d.icon className="h-[18px] w-[18px] shrink-0 text-white" strokeWidth={1.5} />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">{d.title}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-white">
                  {d.subtitle}
                </span>
              </span>
              <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">{d.cta}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalResourceFinder;
