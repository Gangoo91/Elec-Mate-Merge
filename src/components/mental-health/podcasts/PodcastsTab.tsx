import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, Sparkles, MessageCircle } from 'lucide-react';
import { podcasts, getPodcastsByCategory, getFeaturedPodcast } from './PodcastData';
import PodcastCard from './PodcastCard';
import FeaturedPodcastHero from './FeaturedPodcastHero';
import CategoryFilterBar from './CategoryFilterBar';

const PodcastsTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredPodcast = getFeaturedPodcast();

  // Get filtered podcasts and counts
  const { filteredPodcasts, podcastCounts } = useMemo(() => {
    const counts: Record<string, number> = {
      'all': podcasts.filter(p => !p.featured).length,
      'trades-specific': podcasts.filter(p => p.category === 'trades-specific').length,
      'general-mental-health': podcasts.filter(p => p.category === 'general-mental-health').length,
      'personal-stories': podcasts.filter(p => p.category === 'personal-stories' && !p.featured).length,
      'sleep-anxiety': podcasts.filter(p => p.category === 'sleep-anxiety').length,
    };

    const filtered = getPodcastsByCategory(selectedCategory).filter(p => !p.featured);
    return { filteredPodcasts: filtered, podcastCounts: counts };
  }, [selectedCategory]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20">
          <Headphones className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Mental Health Podcasts
          </h1>
          <p className="text-white mt-1 max-w-md mx-auto text-sm sm:text-base">
            Curated podcasts for tradespeople and anyone seeking wellbeing support
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-white">
          <span className="px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300">
            {podcasts.length} Podcasts
          </span>
          <span>Spotify, Apple Podcasts, YouTube & more</span>
        </div>
      </div>

      {/* Featured Podcast Hero */}
      {featuredPodcast && (selectedCategory === 'all' || selectedCategory === featuredPodcast.category) && (
        <FeaturedPodcastHero podcast={featuredPodcast} />
      )}

      {/* Sticky Category Filter */}
      <div className="sticky top-0 z-20 py-3 -mx-4 px-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <CategoryFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          podcastCounts={podcastCounts}
        />
      </div>

      {/* Podcasts Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-white uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-400" />
            {selectedCategory === 'all' ? 'All Podcasts' : `${selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
          </h2>
          <span className="text-xs text-white">{filteredPodcasts.length} results</span>
        </div>

        {filteredPodcasts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        ) : (
          <Card className="bg-white/[0.02] border-white/10">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                <Headphones className="h-8 w-8 text-white/20" />
              </div>
              <p className="text-white text-sm">
                No podcasts in this category yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Suggestion Card */}
      <Card className="bg-gradient-to-br from-orange-500/5 to-amber-500/5 border-orange-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
        <CardContent className="py-6 px-4 sm:px-6 relative">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-6 w-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm sm:text-base mb-1">
                Know a great podcast?
              </h3>
              <p className="text-xs sm:text-sm text-white">
                We're always looking for quality mental health content. Let us know through the feedback section if there's a podcast we should include.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Spacing for Mobile Nav */}
      <div className="h-4" />
    </div>
  );
};

export default PodcastsTab;
