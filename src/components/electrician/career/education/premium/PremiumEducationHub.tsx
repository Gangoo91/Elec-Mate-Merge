/**
 * PremiumEducationHub - Main container for premium education experience
 * Native app feel with tabs, pull-to-refresh, and seamless navigation
 */

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Search,
  Bookmark,
  GitCompare,
  ArrowLeft,
  RefreshCw,
  GraduationCap,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import { useLiveEducationData } from '@/hooks/useLiveEducationData';
import { useBookmarks } from './hooks/useBookmarks';
import { useCompare } from './hooks/useCompare';
import { useEducationSearch } from './hooks/useEducationSearch';
import { pageVariants, listContainerVariants, listItemVariants } from './animations/variants';

import EducationHeroCard from './EducationHeroCard';
import CategoryPills from './CategoryPills';
import ProgrammeCard from './ProgrammeCard';
import ProgrammeCardSkeleton from './ProgrammeCardSkeleton';
import SmartSearchSheet from './SmartSearchSheet';
import ProgrammeDetailSheet from './ProgrammeDetailSheet';
import CompareDrawer from './CompareDrawer';
import FundingCalculator from '../../../../apprentice/career/education/FundingCalculator';

type TabType = 'explore' | 'saved' | 'compare';

interface PremiumEducationHubProps {
  onBack?: () => void;
}

const PremiumEducationHub = ({ onBack }: PremiumEducationHubProps) => {
  // Data hooks
  const { educationData, analytics, loading, error, lastUpdated, isFromCache, refreshData } =
    useLiveEducationData('all');

  const { bookmarkIds, isBookmarked, toggleBookmark, getBookmarkedProgrammes } = useBookmarks();

  const {
    compareList,
    compareCount,
    isInCompare,
    isCompareFull,
    toggleCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
  } = useCompare();

  const {
    searchTerm,
    setSearchTerm,
    filteredProgrammes,
    recentSearches,
    clearRecentSearches,
    saveToRecentSearches,
    categories,
    setFilter,
    resetFilters,
  } = useEducationSearch(educationData);

  // Local state
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [detailProgramme, setDetailProgramme] = useState<(typeof educationData)[0] | null>(null);
  const [compareDrawerOpen, setCompareDrawerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFundingCalculator, setShowFundingCalculator] = useState(false);

  // Filter programmes by selected category
  const displayedProgrammes = useMemo(() => {
    if (selectedCategory) {
      return filteredProgrammes.filter((p) => p.category === selectedCategory);
    }
    return filteredProgrammes;
  }, [filteredProgrammes, selectedCategory]);

  // Get bookmarked programmes
  const savedProgrammes = useMemo(() => {
    return getBookmarkedProgrammes(educationData);
  }, [educationData, bookmarkIds, getBookmarkedProgrammes]);

  // Get similar programmes for detail view
  const similarProgrammes = useMemo(() => {
    if (!detailProgramme) return [];
    return educationData
      .filter(
        (p) =>
          p.id !== detailProgramme.id &&
          (p.category === detailProgramme.category || p.level === detailProgramme.level)
      )
      .slice(0, 4);
  }, [educationData, detailProgramme]);

  // Handlers
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshData(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshData]);

  const handleCategorySelect = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      if (category) {
        setFilter('category', category);
      } else {
        setFilter('category', '');
      }
    },
    [setFilter]
  );

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setActiveTab('explore');
      setSearchOpen(false);
    },
    [setSearchTerm]
  );

  const handleSelectProgramme = useCallback((programme: (typeof educationData)[0]) => {
    setDetailProgramme(programme);
  }, []);

  const handleAddToCompare = useCallback(
    (programme: (typeof educationData)[0]) => {
      const added = addToCompare(programme);
      if (!added && isCompareFull) {
        setCompareDrawerOpen(true);
      }
    },
    [addToCompare, isCompareFull]
  );

  // Render tab content
  const renderTabContent = () => {
    if (showFundingCalculator) {
      return (
        <motion.div
          key="funding"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Button variant="ghost" onClick={() => setShowFundingCalculator(false)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Programmes
          </Button>
          <FundingCalculator />
        </motion.div>
      );
    }

    switch (activeTab) {
      case 'explore':
        return (
          <motion.div
            key="explore"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            {/* Hero Card */}
            <EducationHeroCard
              analytics={analytics}
              isFromCache={isFromCache}
              lastUpdated={lastUpdated}
              onFundingCalculator={() => setShowFundingCalculator(true)}
              onBrowseAll={() => {
                setSelectedCategory(null);
                resetFilters();
              }}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm text-destructive">
                  <strong>Connection Issue:</strong> {error}
                </div>
              </div>
            )}

            {/* Category Pills */}
            <CategoryPills
              categories={categories}
              selected={selectedCategory}
              onSelect={handleCategorySelect}
            />

            {/* Loading State */}
            {loading && <ProgrammeCardSkeleton count={4} />}

            {/* Programme List */}
            {!loading && (
              <>
                {displayedProgrammes.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="h-16 w-16 text-white/10 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No programmes found</h3>
                    <p className="text-sm text-white max-w-xs mx-auto mb-4">
                      Try adjusting your filters or search for something else
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory(null);
                        resetFilters();
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    variants={listContainerVariants}
                    initial="initial"
                    animate="animate"
                    className="space-y-4"
                  >
                    {/* Results count */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white">
                        {displayedProgrammes.length} programmes
                        {selectedCategory && ` in ${selectedCategory}`}
                      </p>
                    </div>

                    {displayedProgrammes.map((programme) => (
                      <motion.div key={programme.id} variants={listItemVariants}>
                        <ProgrammeCard
                          programme={programme}
                          onSelect={handleSelectProgramme}
                          onBookmark={toggleBookmark}
                          onAddToCompare={handleAddToCompare}
                          isBookmarked={isBookmarked(programme.id)}
                          isInCompare={isInCompare(programme.id)}
                          compareDisabled={isCompareFull}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        );

      case 'saved':
        return (
          <motion.div
            key="saved"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Saved Programmes</h2>
              <Badge variant="secondary" className="bg-white/10">
                {savedProgrammes.length} saved
              </Badge>
            </div>

            {savedProgrammes.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-16 w-16 text-white/10 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No saved programmes</h3>
                <p className="text-sm text-white max-w-xs mx-auto mb-4">
                  Swipe right on a programme card or tap the bookmark icon to save
                </p>
                <Button onClick={() => setActiveTab('explore')}>Browse Programmes</Button>
              </div>
            ) : (
              <motion.div
                variants={listContainerVariants}
                initial="initial"
                animate="animate"
                className="space-y-4"
              >
                {savedProgrammes.map((programme) => (
                  <motion.div key={programme.id} variants={listItemVariants}>
                    <ProgrammeCard
                      programme={programme}
                      onSelect={handleSelectProgramme}
                      onBookmark={toggleBookmark}
                      onAddToCompare={handleAddToCompare}
                      isBookmarked={true}
                      isInCompare={isInCompare(programme.id)}
                      compareDisabled={isCompareFull}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        );

      case 'compare':
        return (
          <motion.div
            key="compare"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Compare Programmes</h2>
              <Badge variant="secondary" className="bg-white/10">
                {compareCount}/3
              </Badge>
            </div>

            {compareCount === 0 ? (
              <div className="text-center py-12">
                <GitCompare className="h-16 w-16 text-white/10 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No programmes to compare</h3>
                <p className="text-sm text-white max-w-xs mx-auto mb-4">
                  Swipe left on programme cards to add them to your comparison
                </p>
                <Button onClick={() => setActiveTab('explore')}>Browse Programmes</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={() => setCompareDrawerOpen(true)}
                  className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
                >
                  <GitCompare className="h-4 w-4 mr-2" />
                  View Comparison ({compareCount} programmes)
                </Button>

                <motion.div
                  variants={listContainerVariants}
                  initial="initial"
                  animate="animate"
                  className="space-y-4"
                >
                  {compareList.map((programme) => (
                    <motion.div key={programme.id} variants={listItemVariants}>
                      <ProgrammeCard
                        programme={programme}
                        onSelect={handleSelectProgramme}
                        onBookmark={toggleBookmark}
                        onAddToCompare={() => removeFromCompare(programme.id)}
                        isBookmarked={isBookmarked(programme.id)}
                        isInCompare={true}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-xl border-b border-white/10"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 h-12 px-2 sm:px-4">
          {/* Back button */}
          {onBack && (
            <button
              onClick={onBack}
              className="h-8 w-8 flex-shrink-0 flex items-center justify-center hover:bg-white/10 rounded-lg touch-manipulation active:scale-95 transition-all"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
          )}

          {/* Tab navigation — text only on mobile, icons on desktop */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="flex bg-white/5 rounded-lg p-0.5 gap-px">
              {[
                { id: 'explore' as TabType, label: 'Browse', icon: GraduationCap },
                {
                  id: 'saved' as TabType,
                  label: 'Saved',
                  icon: Bookmark,
                  count: bookmarkIds.length,
                },
                {
                  id: 'compare' as TabType,
                  label: 'Compare',
                  icon: GitCompare,
                  count: compareCount,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-md sm:rounded-lg text-[13px] sm:text-sm font-medium transition-all touch-manipulation',
                    activeTab === tab.id
                      ? 'bg-elec-yellow text-elec-dark'
                      : 'text-white hover:bg-white/5'
                  )}
                >
                  <tab.icon className="hidden sm:block h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className={cn(
                        'ml-0.5 text-[10px] font-bold',
                        activeTab === tab.id ? 'text-elec-dark/60' : 'text-white'
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="h-8 w-8 flex-shrink-0 flex items-center justify-center hover:bg-white/10 rounded-lg touch-manipulation bg-white/5 border border-white/10 active:scale-95 transition-all"
          >
            <Search className="h-3.5 w-3.5 text-white" />
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="px-3 sm:px-4 py-4">
        <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
      </main>

      {/* Smart Search Sheet */}
      <SmartSearchSheet
        open={searchOpen}
        onOpenChange={setSearchOpen}
        programmes={educationData}
        onSelectProgramme={(programme) => {
          setDetailProgramme(programme);
          setSearchOpen(false);
        }}
        onSearch={handleSearch}
        recentSearches={recentSearches}
        onClearRecentSearches={clearRecentSearches}
        onSaveSearch={saveToRecentSearches}
        categories={categories}
        onSelectCategory={(category) => {
          handleCategorySelect(category);
          setSearchOpen(false);
        }}
      />

      {/* Programme Detail Sheet */}
      <ProgrammeDetailSheet
        programme={detailProgramme}
        open={!!detailProgramme}
        onOpenChange={(open) => !open && setDetailProgramme(null)}
        onBookmark={toggleBookmark}
        onAddToCompare={handleAddToCompare}
        isBookmarked={detailProgramme ? isBookmarked(detailProgramme.id) : false}
        isInCompare={detailProgramme ? isInCompare(detailProgramme.id) : false}
        similarProgrammes={similarProgrammes}
        onSelectSimilar={(programme) => setDetailProgramme(programme)}
      />

      {/* Compare Drawer */}
      <CompareDrawer
        open={compareDrawerOpen}
        onOpenChange={setCompareDrawerOpen}
        programmes={compareList}
        onRemove={removeFromCompare}
        onClear={clearCompare}
        onAddMore={() => {
          setCompareDrawerOpen(false);
          setActiveTab('explore');
        }}
        onSelectProgramme={handleSelectProgramme}
      />
    </div>
  );
};

export default PremiumEducationHub;
