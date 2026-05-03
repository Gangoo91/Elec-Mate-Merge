import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, X } from 'lucide-react';
import { siteJargonTerms, siteJargonCategories } from '@/data/apprentice/siteJargonData';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import JargonTermCard from '@/components/apprentice/site-jargon/JargonTermCard';

const categoryMeta: Record<string, { emoji: string; colour: string; border: string; bg: string }> =
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

const JargonCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const category = siteJargonCategories.find((c) => c.id === categoryId);
  const style = categoryMeta[categoryId || ''];

  const allCategoryTerms = useMemo(() => {
    return siteJargonTerms.filter((term) => term.category === categoryId);
  }, [categoryId]);

  const filteredTerms = useMemo(() => {
    return allCategoryTerms.filter((term) => {
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchesTerm = term.term.toLowerCase().includes(search);
        const matchesDefinition = term.definition.toLowerCase().includes(search);
        const matchesUsage = term.commonUsage?.toLowerCase().includes(search);
        const matchesRelated = term.relatedTerms?.some((r) => r.toLowerCase().includes(search));
        if (!matchesTerm && !matchesDefinition && !matchesUsage && !matchesRelated) {
          return false;
        }
      }
      if (selectedDifficulty !== 'all' && term.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [allCategoryTerms, searchTerm, selectedDifficulty]);

  const basicCount = allCategoryTerms.filter((t) => t.difficulty === 'basic').length;
  const intermediateCount = allCategoryTerms.filter((t) => t.difficulty === 'intermediate').length;
  const advancedCount = allCategoryTerms.filter((t) => t.difficulty === 'advanced').length;

  if (!category || !style) {
    return (
      <PageFrame className="px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <Button
            variant="ghost"
            onClick={() => navigate('/apprentice/toolbox/site-jargon')}
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
        </motion.div>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Apprentice · Jargon"
            title="Category not found"
            description="This jargon category does not exist."
            tone="yellow"
          />
        </motion.div>
      </PageFrame>
    );
  }

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/site-jargon')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow={`Apprentice · ${category.name}`}
          title={category.name}
          description={category.description}
          tone="yellow"
        />
      </motion.div>

      {/* Stats */}
      <Card className={`${style.border} ${style.bg}`}>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className={`font-semibold ${style.colour}`}>
              {allCategoryTerms.length} terms in this category
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {basicCount > 0 && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {basicCount} basic
              </Badge>
            )}
            {intermediateCount > 0 && (
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                {intermediateCount} intermediate
              </Badge>
            )}
            {advancedCount > 0 && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                {advancedCount} advanced
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        {!searchTerm && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
        )}
        <Input
          placeholder={`Search ${category.name.toLowerCase()}...`}
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

      {/* Difficulty Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'basic', 'intermediate', 'advanced'] as const).map((level) => {
          const isActive = selectedDifficulty === level;
          const labelMap: Record<string, string> = {
            all: `All (${allCategoryTerms.length})`,
            basic: `Basic (${basicCount})`,
            intermediate: `Intermediate (${intermediateCount})`,
            advanced: `Advanced (${advancedCount})`,
          };
          const count =
            level === 'all'
              ? allCategoryTerms.length
              : level === 'basic'
                ? basicCount
                : level === 'intermediate'
                  ? intermediateCount
                  : advancedCount;
          if (level !== 'all' && count === 0) return null;
          return (
            <Button
              key={level}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty(level)}
              className="touch-manipulation active:scale-[0.98]"
            >
              {labelMap[level]}
            </Button>
          );
        })}
      </div>

      {/* Results count */}
      {(searchTerm || selectedDifficulty !== 'all') && (
        <p className="text-sm text-white">
          Showing {filteredTerms.length} of {allCategoryTerms.length} terms
        </p>
      )}

      {/* Terms */}
      {filteredTerms.length > 0 ? (
        <div className="space-y-3">
          {filteredTerms.map((term, i) => (
            <JargonTermCard key={i} term={term} />
          ))}
        </div>
      ) : (
        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="text-center py-8">
            <p className="text-white">No terms match your filters. Try adjusting your search.</p>
          </CardContent>
        </Card>
      )}
    </PageFrame>
  );
};

export default JargonCategoryPage;
