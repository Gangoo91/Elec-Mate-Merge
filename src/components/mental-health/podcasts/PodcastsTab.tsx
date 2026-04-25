import { useState, useMemo } from 'react';
import { podcasts, getPodcastsByCategory, getFeaturedPodcast } from './PodcastData';
import PodcastCard from './PodcastCard';
import FeaturedPodcastHero from './FeaturedPodcastHero';
import CategoryFilterBar from './CategoryFilterBar';
import {
  PageHero,
  SectionHeader,
  EmptyState,
  Pill,
  Eyebrow,
} from '@/components/college/primitives';

const PodcastsTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredPodcast = getFeaturedPodcast();

  const { filteredPodcasts, podcastCounts } = useMemo(() => {
    const counts: Record<string, number> = {
      all: podcasts.filter((p) => !p.featured).length,
      'trades-specific': podcasts.filter((p) => p.category === 'trades-specific').length,
      'general-mental-health': podcasts.filter((p) => p.category === 'general-mental-health').length,
      'personal-stories': podcasts.filter((p) => p.category === 'personal-stories' && !p.featured).length,
      'sleep-anxiety': podcasts.filter((p) => p.category === 'sleep-anxiety').length,
    };

    const filtered = getPodcastsByCategory(selectedCategory).filter((p) => !p.featured);
    return { filteredPodcasts: filtered, podcastCounts: counts };
  }, [selectedCategory]);

  const sectionTitle =
    selectedCategory === 'all'
      ? 'All podcasts'
      : selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="space-y-8 sm:space-y-10">
      <PageHero
        eyebrow="Listening"
        title="Mental health podcasts"
        description="Curated podcasts for tradespeople and anyone seeking wellbeing support."
        tone="orange"
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Pill tone="orange">{podcasts.length} podcasts</Pill>
            <span className="text-[11.5px] text-white">Spotify, Apple, YouTube & more</span>
          </div>
        }
      />

      {featuredPodcast &&
        (selectedCategory === 'all' || selectedCategory === featuredPodcast.category) && (
          <FeaturedPodcastHero podcast={featuredPodcast} />
        )}

      <div className="sticky top-0 z-20 py-3 -mx-4 px-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-md border-b border-white/[0.06]">
        <CategoryFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          podcastCounts={podcastCounts}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow="Browse" title={sectionTitle} />
          <Eyebrow>{filteredPodcasts.length} results</Eyebrow>
        </div>

        {filteredPodcasts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No podcasts in this category yet"
            description="Check back soon — we add new picks regularly."
          />
        )}
      </div>

      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Pill tone="orange">Suggest</Pill>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-white">Know a great podcast?</h3>
            <p className="mt-1 text-[13px] text-white leading-relaxed">
              We're always looking for quality mental health content. Let us know through the
              feedback section if there's a podcast we should include.
            </p>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
};

export default PodcastsTab;
