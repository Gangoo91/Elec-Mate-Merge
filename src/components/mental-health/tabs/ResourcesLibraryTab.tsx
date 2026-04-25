import { useState } from 'react';
import { Star } from 'lucide-react';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import { cn } from '@/lib/utils';
import {
  PageHero,
  FilterBar,
  ListCard,
  ListRow,
  Pill,
  EmptyState,
  Eyebrow,
} from '@/components/college/primitives';

const resources = [
  { id: 'stress-guide', title: 'Stress Management Guide for Electricians', sub: 'Proven techniques for managing workplace stress', type: 'document', category: 'stress', url: 'https://www.hse.gov.uk/stress/', source: 'HSE' },
  { id: 'anxiety-toolkit', title: 'Anxiety Toolkit for On-Site Relief', sub: 'Quick anxiety management for work breaks', type: 'document', category: 'anxiety', url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/', source: 'Mind' },
  { id: 'mindfulness-video', title: '5-Minute Mindfulness for Tradespeople', sub: 'Short guided exercises for busy professionals', type: 'video', category: 'self-care', url: 'https://www.headspace.com/work', source: 'Headspace' },
  { id: 'sleep-hygiene', title: 'Sleep Guide for Shift Workers', sub: 'Healthy sleep with irregular schedules', type: 'document', category: 'self-care', url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-improve-your-mental-wellbeing/', source: 'NHS' },
  { id: 'workplace-communication', title: 'Discussing Mental Health at Work', sub: 'How to talk to supervisors and colleagues', type: 'document', category: 'workplace', url: 'https://www.mentalhealthatwork.org.uk/', source: 'MHAW' },
  { id: 'breathing-exercises', title: 'Quick Breathing Exercises', sub: 'Simple techniques anywhere, anytime', type: 'video', category: 'stress', url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/', source: 'NHS' },
  { id: 'construction-wellbeing', title: 'Construction Industry Wellbeing', sub: 'Mental health for construction workers', type: 'document', category: 'workplace', url: 'https://www.matesinmind.org/', source: 'Mates in Mind' },
  { id: 'eic-support', title: 'Electrical Industry Support', sub: 'Financial, practical and emotional support', type: 'document', category: 'workplace', url: 'https://www.electricalcharity.org/', source: 'EIC' },
  { id: 'calm-resources', title: 'CALM Resources for Men', sub: "Support and resources for men's mental health", type: 'document', category: 'anxiety', url: 'https://www.thecalmzone.net/help/get-help/', source: 'CALM' },
  { id: 'body-scan', title: 'Body Scan Meditation', sub: 'Progressive relaxation technique', type: 'video', category: 'self-care', url: 'https://www.youtube.com/results?search_query=body+scan+meditation', source: 'YouTube' },
  { id: 'burnout-prevention', title: 'Preventing Burnout at Work', sub: 'Recognise signs and take action early', type: 'document', category: 'stress', url: 'https://www.mind.org.uk/information-support/tips-for-everyday-living/how-to-be-mentally-healthy-at-work/work-and-stress/', source: 'Mind' },
  { id: 'grounding-techniques', title: '5-4-3-2-1 Grounding Technique', sub: 'Quick anxiety relief using your senses', type: 'video', category: 'anxiety', url: 'https://www.youtube.com/results?search_query=54321+grounding+technique', source: 'YouTube' },
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
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = resources.filter((r) => {
    const matchesSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.sub.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'all' || r.category === category;
    return matchesSearch && matchesCat;
  });

  const tabsWithCounts = categoryTabs.map((t) => ({
    ...t,
    count:
      t.value === 'all'
        ? resources.length
        : resources.filter((r) => r.category === t.value).length,
  }));

  return (
    <div className="space-y-8 sm:space-y-10">
      <PageHero
        eyebrow="Library"
        title="Resources & guides"
        description="Curated, trusted reading and short videos. Star anything you want to come back to."
        tone="blue"
      />

      <FilterBar
        tabs={tabsWithCounts}
        activeTab={category}
        onTabChange={setCategory}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search resources..."
      />

      <div className="space-y-3">
        <Eyebrow>{filtered.length} resources</Eyebrow>

        {filtered.length === 0 ? (
          <EmptyState
            title="No resources found"
            description="Try a different search term or category."
            action="Clear filters"
            onAction={() => {
              setSearch('');
              setCategory('all');
            }}
          />
        ) : (
          <ListCard>
            {filtered.map((r) => {
              const isFav = favoriteResources.includes(r.id);
              const isVideo = r.type === 'video';
              return (
                <ListRow
                  key={r.id}
                  accent={isVideo ? 'red' : 'blue'}
                  title={r.title}
                  subtitle={
                    <span className="flex items-center gap-2">
                      <span className="truncate">{r.sub}</span>
                      <span className="text-white/30">·</span>
                      <span>{r.source}</span>
                    </span>
                  }
                  trailing={
                    <div className="flex items-center gap-2">
                      <Pill tone={isVideo ? 'red' : 'blue'}>{r.type}</Pill>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavoriteResource(r.id);
                        }}
                        className="p-1.5 touch-manipulation"
                        aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                      >
                        <Star
                          className={cn(
                            'h-4 w-4',
                            isFav ? 'fill-elec-yellow text-elec-yellow' : 'text-white'
                          )}
                        />
                      </button>
                    </div>
                  }
                  onClick={() => window.open(r.url, '_blank', 'noopener,noreferrer')}
                />
              );
            })}
          </ListCard>
        )}
      </div>

      <p className="text-[11.5px] text-white text-center">
        Star resources to save them. All links go to official, trusted sources.
      </p>
    </div>
  );
};

export default ResourcesLibraryTab;
