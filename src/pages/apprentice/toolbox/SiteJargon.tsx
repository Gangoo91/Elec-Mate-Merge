import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Search, X, GraduationCap } from 'lucide-react';
import { siteJargonTerms, siteJargonCategories } from '@/data/apprentice/siteJargonData';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import JargonTermCard from '@/components/apprentice/site-jargon/JargonTermCard';

const categoryStyles: Record<string, { emoji: string; colour: string; border: string; bg: string }> =
  {
    'electrical-terms': {
      emoji: '⚡',
      colour: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10',
    },
    'tools-equipment': {
      emoji: '🔧',
      colour: 'text-orange-400',
      border: 'border-orange-500/30',
      bg: 'bg-orange-500/10',
    },
    'safety-terms': {
      emoji: '🛡',
      colour: 'text-red-400',
      border: 'border-red-500/30',
      bg: 'bg-red-500/10',
    },
    'site-language': {
      emoji: '💬',
      colour: 'text-green-400',
      border: 'border-green-500/30',
      bg: 'bg-green-500/10',
    },
    'regulations-standards': {
      emoji: '📋',
      colour: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
    },
    'installation-methods': {
      emoji: '🔌',
      colour: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
    },
    'testing-terminology': {
      emoji: '🔬',
      colour: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
    },
    'commercial-industrial': {
      emoji: '🏭',
      colour: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10',
    },
  };

const SiteJargon = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    siteJargonTerms.forEach((term) => {
      counts[term.category] = (counts[term.category] || 0) + 1;
    });
    return counts;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm) return [];
    const search = searchTerm.toLowerCase();
    return siteJargonTerms.filter((term) => {
      const matchesTerm = term.term.toLowerCase().includes(search);
      const matchesDefinition = term.definition.toLowerCase().includes(search);
      const matchesUsage = term.commonUsage?.toLowerCase().includes(search);
      const matchesRelated = term.relatedTerms?.some((r) => r.toLowerCase().includes(search));
      return matchesTerm || matchesDefinition || matchesUsage || matchesRelated;
    });
  }, [searchTerm]);

  const basicCount = siteJargonTerms.filter((t) => t.difficulty === 'basic').length;
  const intermediateCount = siteJargonTerms.filter((t) => t.difficulty === 'intermediate').length;
  const advancedCount = siteJargonTerms.filter((t) => t.difficulty === 'advanced').length;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in px-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <div>
          <h1 className="text-xl font-bold text-white">Site Jargon & Terminology</h1>
          <p className="text-sm text-white">Master the language of the electrical trade</p>
        </div>
      </div>

      {/* Intro Card */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm text-white">
            Every trade has its own language and the electrical industry is no different. From your
            first day on site you will hear terms like "bang", "spur", and "first fix" — knowing
            what they mean helps you stay safe, communicate clearly, and avoid looking lost.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
              <div className="text-lg font-bold text-green-400">{basicCount}</div>
              <div className="text-xs text-white">Basic</div>
            </div>
            <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
              <div className="text-lg font-bold text-yellow-400">{intermediateCount}</div>
              <div className="text-xs text-white">Intermediate</div>
            </div>
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              <div className="text-lg font-bold text-red-400">{advancedCount}</div>
              <div className="text-xs text-white">Advanced</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Search */}
      <div className="relative">
        {!searchTerm && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
        )}
        <Input
          placeholder="Search any term, definition, or usage..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`h-11 touch-manipulation ${!searchTerm ? 'pl-10' : ''}`}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm('')}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 touch-manipulation"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results OR Category Cards */}
      {searchTerm ? (
        <div className="space-y-3">
          <p className="text-sm text-white">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "
            {searchTerm}"
          </p>
          {searchResults.length > 0 ? (
            searchResults.map((term, i) => <JargonTermCard key={i} term={term} />)
          ) : (
            <Card className="border-elec-yellow/20 bg-white/5">
              <CardContent className="text-center py-8">
                <p className="text-white">No terms found. Try a different search.</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <>
          {/* Category Cards */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Browse by Category</h2>
            {siteJargonCategories.map((cat) => {
              const style = categoryStyles[cat.id];
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/apprentice/toolbox/site-jargon/${cat.id}`)}
                  className={`w-full text-left p-4 rounded-lg border ${style.border} ${style.bg} flex items-center gap-3 touch-manipulation active:scale-[0.98] transition-transform`}
                >
                  <span className="text-2xl flex-shrink-0">{style.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold ${style.colour}`}>{cat.name}</h3>
                    <p className="text-xs text-white line-clamp-1">{cat.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-medium text-white">{count}</span>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Study Mode */}
          <Card className="border-elec-yellow/20 bg-elec-yellow/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold text-elec-yellow">Study Mode</h3>
              </div>
              <p className="text-sm text-white">
                Test your knowledge with interactive flashcards. Terms are shuffled randomly — see
                the term first, then tap to reveal the definition, context, and usage examples.
              </p>
              <Button
                onClick={() => navigate('/apprentice/toolbox/site-jargon/study')}
                className="w-full h-11 touch-manipulation active:scale-[0.98]"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Start Flashcards ({siteJargonTerms.length} terms)
              </Button>
            </CardContent>
          </Card>

          {/* Tip */}
          <div className="p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg">
            <p className="text-xs text-white">
              <strong className="text-elec-yellow">New to site?</strong> Start with Basic level
              terms in Electrical Terms and Site Language — these are the ones you will hear most
              on your first day.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SiteJargon;
