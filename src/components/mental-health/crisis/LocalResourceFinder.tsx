import { useState } from 'react';
import { Input } from '@/components/ui/input';
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
    <div className="space-y-4 pt-1">
      {/* Postcode → maps search */}
      <div>
        <p className="text-[13px] text-white leading-relaxed mb-3">
          Enter your postcode to search services near you, or use a trusted directory below.
        </p>
        <div className="flex gap-2">
          <Input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Postcode (e.g. M1 1AA)"
            autoComplete="postal-code"
            className="flex-1 h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            onKeyDown={(e) => e.key === 'Enter' && openMapsSearch()}
          />
          <button
            onClick={openMapsSearch}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl bg-elec-yellow/15 border border-elec-yellow/25 text-elec-yellow text-[13px] font-semibold touch-manipulation active:scale-[0.98]"
            aria-label="Search for mental health support near this postcode"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-white/60">
          <MapPin className="h-3 w-3 shrink-0" />
          Opens a map search — nothing you type here is stored.
        </p>
      </div>

      {/* Trusted directories */}
      <div className="space-y-2">
        {destinations.map((d) => (
          <button
            key={d.id}
            onClick={d.onOpen}
            className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_13%)] text-left touch-manipulation transition-colors"
          >
            <d.icon className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="flex-1 min-w-0">
              <span className="block text-[13.5px] font-semibold text-white">{d.title}</span>
              <span className="block text-[12px] text-white/70 leading-snug mt-0.5">
                {d.subtitle}
              </span>
            </span>
            <span className="text-[12px] font-medium text-elec-yellow shrink-0">{d.cta} →</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocalResourceFinder;
