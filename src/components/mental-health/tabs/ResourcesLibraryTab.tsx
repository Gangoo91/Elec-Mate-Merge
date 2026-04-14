import { useState } from 'react';
import {
  BookOpen, FileText, Video, Search, ExternalLink, Star, Zap, Heart, Brain, Briefcase, X,
} from 'lucide-react';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import { cn } from '@/lib/utils';

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

const categories = [
  { id: 'all', label: 'All', icon: BookOpen },
  { id: 'stress', label: 'Stress', icon: Zap },
  { id: 'anxiety', label: 'Anxiety', icon: Brain },
  { id: 'workplace', label: 'Work', icon: Briefcase },
  { id: 'self-care', label: 'Self-Care', icon: Heart },
];

const ResourcesLibraryTab = () => {
  const { favoriteResources, toggleFavoriteResource } = useMentalHealth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = resources.filter((r) => {
    const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.sub.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'all' || r.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="w-full h-11 pl-10 pr-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white/70 focus:border-white/20 focus:outline-none touch-manipulation"
          style={{ fontSize: '16px' }}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 touch-manipulation">
            <X className="h-4 w-4 text-white/70" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap touch-manipulation active:scale-[0.97] transition-all',
              category === c.id
                ? 'bg-white text-black'
                : 'bg-white/[0.06] text-white/60 border border-white/[0.08]'
            )}
          >
            <c.icon className={cn('h-3.5 w-3.5', category === c.id ? 'text-black' : 'text-white/70')} />
            {c.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">{filtered.length} resources</p>

      {/* Resource list */}
      <div className="space-y-2">
        {filtered.map((r) => {
          const isFav = favoriteResources.includes(r.id);
          const isVideo = r.type === 'video';
          return (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5',
                  isVideo ? 'bg-red-500/15' : 'bg-blue-500/15'
                )}>
                  {isVideo ? <Video className="h-4 w-4 text-red-400" /> : <FileText className="h-4 w-4 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white leading-tight">{r.title}</h4>
                  <p className="text-[11px] text-white/80 mt-0.5 line-clamp-1">{r.sub}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded',
                      isVideo ? 'bg-red-500/15 text-red-400' : 'bg-blue-500/15 text-blue-400'
                    )}>{r.type}</span>
                    <span className="text-[10px] text-white/70">{r.source}</span>
                    <div className="flex-1" />
                    <ExternalLink className="h-3 w-3 text-white/60" />
                  </div>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavoriteResource(r.id); }}
                  className="p-1.5 touch-manipulation flex-shrink-0"
                >
                  <Star className={cn('h-4 w-4', isFav ? 'fill-amber-400 text-amber-400' : 'text-white/15')} />
                </button>
              </div>
            </a>
          );
        })}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="text-center py-8">
          <Search className="h-8 w-8 text-white/15 mx-auto mb-3" />
          <p className="text-sm text-white/80">No resources found</p>
          <button onClick={() => { setSearch(''); setCategory('all'); }} className="text-xs text-white/70 mt-2 touch-manipulation">Clear filters</button>
        </div>
      )}

      {/* Tip */}
      <p className="text-[11px] text-white/70 text-center py-2">
        Star resources to save them. All links go to official, trusted sources.
      </p>
    </div>
  );
};

export default ResourcesLibraryTab;
