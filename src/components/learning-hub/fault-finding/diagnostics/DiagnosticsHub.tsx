import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  ChevronRight,
  X,
  Activity,
  Zap,
  Shield,
  Eye,
  Target,
  Clock,
  ThermometerSun,
  AlertTriangle
} from 'lucide-react';
import {
  diagnosticScenarios,
  searchDiagnostics,
  getDiagnosticCategories
} from '../data/faultFindingData';
import { cn } from '@/lib/utils';

interface DiagnosticsHubProps {
  onSelectDiagnostic: (categoryId: string, diagnosticIndex: number) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  }
};

const getCategoryConfig = (category: string) => {
  const configs: Record<string, { icon: React.ElementType; iconBg: string }> = {
    'continuity': { icon: Activity, iconBg: 'bg-green-500' },
    'voltage': { icon: Zap, iconBg: 'bg-amber-500' },
    'rcd': { icon: Shield, iconBg: 'bg-purple-500' },
    'protection': { icon: Shield, iconBg: 'bg-purple-500' },
    'insulation': { icon: Shield, iconBg: 'bg-blue-500' },
    'earthing': { icon: Activity, iconBg: 'bg-green-500' },
    'power-quality': { icon: Eye, iconBg: 'bg-cyan-500' },
    'load': { icon: Target, iconBg: 'bg-orange-500' },
    'thermal': { icon: ThermometerSun, iconBg: 'bg-red-500' },
    'transient': { icon: Clock, iconBg: 'bg-purple-500' }
  };
  return configs[category] || { icon: Search, iconBg: 'bg-slate-500' };
};

const getSeverityBg = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    default: return 'bg-amber-500';
  }
};

const DiagnosticsHub = ({ onSelectDiagnostic }: DiagnosticsHubProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getDiagnosticCategories();

  // Filter diagnostics based on search and category
  const filteredDiagnostics = useMemo(() => {
    if (searchQuery.trim()) {
      return searchDiagnostics(searchQuery);
    }

    if (selectedCategory) {
      const scenario = diagnosticScenarios.find(s => s.id === selectedCategory);
      if (scenario) {
        return scenario.diagnostics.map((d, i) => ({
          ...d,
          categoryId: scenario.id,
          categoryTitle: scenario.title,
          originalIndex: i
        }));
      }
    }

    return diagnosticScenarios.flatMap((scenario) =>
      scenario.diagnostics.map((d, diagIndex) => ({
        ...d,
        categoryId: scenario.id,
        categoryTitle: scenario.title,
        originalIndex: diagIndex
      }))
    );
  }, [searchQuery, selectedCategory]);

  const handleDiagnosticClick = (diagnostic: any) => {
    const scenario = diagnosticScenarios.find(s => s.id === diagnostic.categoryId);
    if (scenario) {
      const index = scenario.diagnostics.findIndex(d => d.symptom === diagnostic.symptom);
      onSelectDiagnostic(diagnostic.categoryId, index >= 0 ? index : 0);
    }
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <Input
          placeholder="Search symptoms, readings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base touch-manipulation bg-white/[0.03] border-white/[0.06] rounded-xl"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-[13px] font-medium touch-manipulation transition-colors",
            selectedCategory === null
              ? "bg-white/10 text-white"
              : "bg-white/[0.03] text-white/50"
          )}
        >
          All
        </button>
        {categories.slice(0, 4).map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[13px] font-medium touch-manipulation transition-colors",
              selectedCategory === cat.id
                ? "bg-white/10 text-white"
                : "bg-white/[0.03] text-white/50"
            )}
          >
            {cat.title.replace(' Analysis', '').replace(' & Current Measurement', '')}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          {filteredDiagnostics.length} Diagnostics
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {filteredDiagnostics.slice(0, 15).map((diagnostic, index) => {
            const catId = diagnostic.categoryId.replace('-analysis', '').replace('-diagnostics', '');
            const config = getCategoryConfig(catId);
            const Icon = config.icon;

            return (
              <motion.div
                key={`${diagnostic.categoryId}-${index}`}
                variants={itemVariants}
                onClick={() => handleDiagnosticClick(diagnostic)}
                className="flex items-center gap-3 p-3.5 cursor-pointer touch-manipulation active:bg-white/[0.04] transition-colors"
              >
                <div className={cn(
                  "w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0",
                  config.iconBg
                )}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-medium text-white leading-tight">
                    {diagnostic.symptom}
                  </h3>
                  <p className="text-[13px] text-white/50 leading-tight mt-0.5 line-clamp-1">
                    {diagnostic.measurement}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={cn("w-2 h-2 rounded-full", getSeverityBg(diagnostic.severity))} />
                  <ChevronRight className="h-4 w-4 text-white/20" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {filteredDiagnostics.length === 0 && (
        <motion.div variants={itemVariants}>
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Search className="h-8 w-8 text-white/20" />
            <p className="text-[13px] text-white/40">No diagnostics found</p>
          </div>
        </motion.div>
      )}

      {/* Info notice */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02]">
          <AlertTriangle className="h-4 w-4 text-white/30 flex-shrink-0" />
          <p className="text-[12px] text-white/40">
            Severity indicated by dot colour (red = critical)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DiagnosticsHub;
