import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star } from 'lucide-react';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import { openExternalUrl } from '@/utils/open-external-url';
import { cn } from '@/lib/utils';
import { P_TAB_LINE, P_TAB_RAIL, pTab } from '@/components/apprentice-hub/portfolio2/ui';
import { COLLEGE_BTN, CollegeEmpty } from '@/components/college/ui/CollegeUi';
import { WellbeingIntro } from '@/components/mental-health/wellbeingUi';

const TYPE_LABEL: Record<string, string> = {
  document: 'Guide',
  video: 'Video',
  tool: 'In the app',
};

const resources = [
  {
    id: 'stress-guide',
    title: 'Stress Management Guide for Electricians',
    sub: 'Proven techniques for managing workplace stress',
    type: 'document',
    category: 'stress',
    url: 'https://www.hse.gov.uk/stress/',
    source: 'HSE',
  },
  {
    id: 'anxiety-toolkit',
    title: 'Anxiety Toolkit for On-Site Relief',
    sub: 'Quick anxiety management for work breaks',
    type: 'document',
    category: 'anxiety',
    url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/',
    source: 'Mind',
  },
  {
    id: 'mindfulness-video',
    title: '5-Minute Mindfulness for Tradespeople',
    sub: 'Short guided exercises for busy professionals',
    type: 'video',
    category: 'self-care',
    url: 'https://www.headspace.com/work',
    source: 'Headspace',
  },
  {
    id: 'sleep-hygiene',
    title: 'Sleep Guide for Shift Workers',
    sub: 'Healthy sleep with irregular schedules',
    type: 'document',
    category: 'self-care',
    url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-improve-your-mental-wellbeing/',
    source: 'NHS',
  },
  {
    id: 'workplace-communication',
    title: 'Discussing Mental Health at Work',
    sub: 'How to talk to supervisors and colleagues',
    type: 'document',
    category: 'workplace',
    url: 'https://www.mentalhealthatwork.org.uk/',
    source: 'MHAW',
  },
  {
    id: 'breathing-exercises',
    title: 'Quick Breathing Exercises',
    sub: 'Simple techniques anywhere, anytime',
    type: 'video',
    category: 'stress',
    url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/',
    source: 'NHS',
  },
  {
    id: 'construction-wellbeing',
    title: 'Construction Industry Wellbeing',
    sub: 'Mental health for construction workers',
    type: 'document',
    category: 'workplace',
    url: 'https://www.matesinmind.org/',
    source: 'Mates in Mind',
  },
  {
    id: 'eic-support',
    title: 'Electrical Industry Support',
    sub: 'Financial, practical and emotional support',
    type: 'document',
    category: 'workplace',
    url: 'https://www.electricalcharity.org/',
    source: 'EIC',
  },
  {
    id: 'calm-resources',
    title: 'CALM Resources for Men',
    sub: "Support and resources for men's mental health",
    type: 'document',
    category: 'anxiety',
    url: 'https://www.thecalmzone.net/help/get-help/',
    source: 'CALM',
  },
  {
    id: 'body-scan',
    title: 'Body Scan Relaxation',
    sub: 'Guided 3-minute exercise — built into this hub',
    type: 'tool',
    category: 'self-care',
    url: '/mental-health?section=tools',
    source: 'Elec-Mate',
  },
  {
    id: 'burnout-prevention',
    title: 'Preventing Burnout at Work',
    sub: 'Recognise signs and take action early',
    type: 'document',
    category: 'stress',
    url: 'https://www.mind.org.uk/information-support/tips-for-everyday-living/how-to-be-mentally-healthy-at-work/work-and-stress/',
    source: 'Mind',
  },
  {
    id: 'grounding-techniques',
    title: '5-4-3-2-1 Grounding Technique',
    sub: 'Quick anxiety relief using your senses — try it now',
    type: 'tool',
    category: 'anxiety',
    url: '/mental-health?section=grounding',
    source: 'Elec-Mate',
  },
];

const categoryTabs = [
  { value: 'all', label: 'All' },
  { value: 'stress', label: 'Stress' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'workplace', label: 'Work' },
  { value: 'self-care', label: 'Self-care' },
];

const ResourcesLibraryTab = () => {
  const { favoriteResources, toggleFavoriteResource } = useMentalHealth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = resources.filter((r) => {
    const matchesSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.sub.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      category === 'all'
        ? true
        : category === 'starred'
          ? favoriteResources.includes(r.id)
          : r.category === category;
    return matchesSearch && matchesCat;
  });

  const tabsWithCounts = [...categoryTabs, { value: 'starred', label: 'Starred' }].map((t) => ({
    ...t,
    count:
      t.value === 'all'
        ? resources.length
        : t.value === 'starred'
          ? favoriteResources.length
          : resources.filter((r) => r.category === t.value).length,
  }));

  const openResource = (r: (typeof resources)[number]) => {
    if (r.url.startsWith('/')) navigate(r.url);
    else openExternalUrl(r.url);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <WellbeingIntro
        label="Library"
        title="Resources and guides"
        description="Trusted reading and short videos. Star anything you want to come back to."
      />

      <div className="space-y-3">
        {/* Quiet text tabs with counts (10 Oct design language), then search */}
        <div className={P_TAB_RAIL} role="tablist" aria-label="Topic">
          {tabsWithCounts.map((t) => {
            const on = category === t.value;
            return (
              <button
                key={t.value}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setCategory(t.value)}
                className={pTab(on)}
              >
                {t.label}
                <span className="tabular-nums">{t.count}</span>
                {on && <span className={P_TAB_LINE} aria-hidden />}
              </button>
            );
          })}
        </div>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
            strokeWidth={1.5}
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources"
            aria-label="Search resources"
            enterKeyHint="search"
            className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white caret-elec-yellow placeholder:text-white/25 transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <CollegeEmpty
          title="Nothing matches that"
          body="Try a different word or topic."
          action={
            <button
              type="button"
              className={COLLEGE_BTN}
              onClick={() => {
                setSearch('');
                setCategory('all');
              }}
            >
              Show everything
            </button>
          }
        />
      ) : (
        <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.06] bg-[hsl(0_0%_12%)] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:overflow-visible sm:border-0 sm:bg-transparent xl:grid-cols-3">
          {filtered.map((r) => {
            const isFav = favoriteResources.includes(r.id);
            return (
              /* Star is a SIBLING of the card button, not a child — nested
                 <button> inside <button> is invalid DOM (console warning). */
              <li key={r.id} className="relative sm:flex">
                <button
                  type="button"
                  onClick={() => openResource(r)}
                  className="flex w-full flex-col px-5 py-4 pr-14 text-left transition-colors touch-manipulation active:bg-white/[0.07] sm:rounded-2xl sm:border sm:border-white/[0.1] sm:bg-[hsl(0_0%_15%)] sm:p-5 sm:pr-14 sm:hover:border-white/[0.16] sm:hover:bg-[hsl(0_0%_17%)]"
                >
                  <span className="text-[15px] font-semibold leading-snug text-white">
                    {r.title}
                  </span>
                  <span className="mt-1 text-[13px] leading-relaxed text-white">{r.sub}</span>
                  <span className="mt-2 text-[12.5px] font-medium text-white sm:mt-auto sm:pt-3">
                    {r.source} · {TYPE_LABEL[r.type] ?? r.type}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavoriteResource(r.id)}
                  className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-xl touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.08]"
                  aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                  aria-pressed={isFav}
                >
                  <Star
                    className={cn(
                      'h-[18px] w-[18px]',
                      isFav ? 'fill-elec-yellow text-elec-yellow' : 'text-white'
                    )}
                    strokeWidth={1.5}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-[13px] text-white">Every link goes to an official, trusted source.</p>
    </div>
  );
};

export default ResourcesLibraryTab;
