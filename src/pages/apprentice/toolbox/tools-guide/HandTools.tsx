/**
 * Tools · HandTools — editorial hand tools browser.
 *
 * Searchable, filterable list of hand tools with featured carousel,
 * essential quick reference, simple job kits, advanced tools section
 * (collapsible), and full grid.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Wrench,
  Star,
  Shield,
  Zap,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToolsData } from '@/hooks/useToolsData';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import ToolsFeaturedCarousel from '@/components/electrician-tools/ToolsFeaturedCarousel';
import ToolsGrid from '@/components/electrician-tools/ToolsGrid';
import EssentialToolsQuickRef from '@/components/electrician-tools/EssentialToolsQuickRef';
import SimpleJobKits from '@/components/electrician-tools/SimpleJobKits';
import ToolComparison from '@/components/electrician-tools/ToolComparison';
import ProfessionalTips from '@/components/electrician-tools/ProfessionalTips';
import QuickToolFinder from '@/components/electrician-tools/QuickToolFinder';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

const quickStats = [
  { label: 'Tool categories', value: '6+', icon: Wrench },
  { label: 'Price filters', value: '7', icon: Star },
  { label: 'UK suppliers', value: '5+', icon: Shield },
  { label: 'Quality focus', value: '100%', icon: Zap },
];

const quickFilters = [
  { id: 'all', label: 'All tools' },
  { id: 'essential', label: 'Essential only' },
  { id: 'under20', label: 'Under £20' },
  { id: 'under50', label: 'Under £50' },
  { id: 'testing', label: 'Testing' },
  { id: 'cutting', label: 'Cutting' },
  { id: 'instock', label: 'In stock' },
];

const HandTools = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { data: tools = [], isLoading } = useToolsData();

  const handTools = tools.filter((tool) => {
    const isHandTool =
      tool.category?.toLowerCase().includes('hand') ||
      tool.name.toLowerCase().includes('screwdriver') ||
      tool.name.toLowerCase().includes('pliers') ||
      tool.name.toLowerCase().includes('spanner') ||
      tool.name.toLowerCase().includes('wrench') ||
      tool.name.toLowerCase().includes('cutter') ||
      tool.name.toLowerCase().includes('stripper');

    const matchesSearch =
      !searchTerm ||
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.supplier?.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (selectedFilter === 'essential') {
      matchesFilter =
        tool.name.toLowerCase().includes('screwdriver') ||
        tool.name.toLowerCase().includes('tester') ||
        tool.name.toLowerCase().includes('stripper') ||
        tool.name.toLowerCase().includes('cutter');
    } else if (selectedFilter === 'under20') {
      const price = parseFloat((tool.salePrice || tool.price).replace(/[£,]/g, ''));
      matchesFilter = price < 20;
    } else if (selectedFilter === 'under50') {
      const price = parseFloat((tool.salePrice || tool.price).replace(/[£,]/g, ''));
      matchesFilter = price < 50;
    } else if (selectedFilter === 'testing') {
      matchesFilter =
        tool.name.toLowerCase().includes('tester') || tool.name.toLowerCase().includes('meter');
    } else if (selectedFilter === 'cutting') {
      matchesFilter =
        tool.name.toLowerCase().includes('cutter') || tool.name.toLowerCase().includes('stripper');
    } else if (selectedFilter === 'instock') {
      matchesFilter = tool.stockStatus === 'In Stock';
    }

    return isHandTool && matchesSearch && matchesFilter;
  });

  const featuredTools = handTools.slice(0, 6);
  const featuredToolIds = featuredTools.map((tool) => tool.id || 0);
  const gridTools = handTools.slice(6);

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/tools-guide')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Hand tools"
          title="Hand tools"
          description="Screwdrivers, pliers, strippers, cutters — the kit that lives in your pouch. UK prices, real suppliers, what's worth buying twice and what isn't."
          tone="yellow"
        />
      </motion.div>

      {/* ── Quick stats ─────────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
      >
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 sm:p-4 text-center space-y-1.5"
            >
              <Icon className="h-4 w-4 text-elec-yellow/85 mx-auto" />
              <p className="text-[18px] sm:text-[20px] font-mono font-semibold tabular-nums text-elec-yellow leading-none">
                {stat.value}
              </p>
              <Eyebrow className="text-[9.5px]">{stat.label}</Eyebrow>
            </div>
          );
        })}
      </motion.div>

      {/* ── Search & filters ────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
            <Input
              placeholder="Search hand tools…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 pl-10 pr-10 touch-manipulation bg-[hsl(0_0%_8%)] border border-white/[0.08] text-[13px] focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 placeholder:text-white/40"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full active:bg-white/[0.06] touch-manipulation"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-white/55" />
              </button>
            )}
          </div>

          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-1.5">
            {quickFilters.map((filter) => {
              const isActive = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={cn(
                    'inline-flex items-center h-8 px-3 rounded-md border text-[11.5px] font-medium touch-manipulation active:scale-[0.98] transition-all',
                    isActive
                      ? 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow'
                      : 'border-white/[0.08] bg-white/[0.02] text-white/85 hover:bg-white/[0.04]'
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {!isLoading && handTools.length > 0 && (
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.04]">
              <span className="text-[12px] font-mono tabular-nums text-white/55">
                {handTools.length} tools found
              </span>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-[11.5px] font-medium text-white/85 hover:text-white touch-manipulation"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {showAdvanced ? 'Hide' : 'Show'} advanced
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Results ─────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Eyebrow>Loading tools…</Eyebrow>
        </div>
      ) : handTools.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 sm:p-8 text-center space-y-3">
          <Search className="h-5 w-5 text-white/40 mx-auto" />
          <Eyebrow>No hand tools found</Eyebrow>
          <p className="text-[13px] text-white/70">
            Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter('all');
            }}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06] text-[12.5px] font-medium text-elec-yellow hover:bg-elec-yellow/[0.10] active:scale-[0.98] transition-all touch-manipulation"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <EssentialToolsQuickRef />
          <SimpleJobKits />

          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleContent className="space-y-6">
              <QuickToolFinder />
              <ToolComparison tools={handTools} />
              <ProfessionalTips />
            </CollapsibleContent>
          </Collapsible>

          {featuredTools.length > 0 && (
            <section className="space-y-3">
              <SectionHeader
                eyebrow="Featured"
                title="Featured hand tools"
                meta="Editor's pick — quality first"
              />
              <ToolsFeaturedCarousel />
            </section>
          )}

          {gridTools.length > 0 && (
            <section className="space-y-3">
              <SectionHeader
                eyebrow="Browse all"
                title="All hand tools"
                meta={`${gridTools.length} more tools to explore`}
              />
              <ToolsGrid tools={gridTools} excludeIds={featuredToolIds} />
            </section>
          )}
        </div>
      )}
    </PageFrame>
  );
};

export default HandTools;
