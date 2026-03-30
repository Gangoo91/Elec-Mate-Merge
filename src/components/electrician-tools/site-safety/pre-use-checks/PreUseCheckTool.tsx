import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ClipboardCheck,
  ArrowUpFromLine,
  Hammer,
  Gauge,
  Construction,
  Wrench,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Loader2,
  Search,
  X,
  RotateCcw,
  Share2,
  Shield,
  Cable,
  ShieldCheck,
  Zap,
  Flame,
  HeartPulse,
  HardHat,
  ChevronsUp,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  usePreUseChecks,
  CHECK_TEMPLATES,
  REGULATION_REFS,
  type CheckItem,
  type PreUseCheck,
} from '@/hooks/usePreUseChecks';
import { ApprovalBadge } from '../common/ApprovalBadge';
import { SafetyRecordCard, fmtCardDate } from '../common/SafetyRecordCard';
import { MapPin, Calendar } from 'lucide-react';
import { ChecklistForm } from './ChecklistForm';
import { SafetyEmptyState } from '../common/SafetyEmptyState';
import { SafetySkeletonLoader } from '../common/SafetySkeletonLoader';
import { useHaptic } from '@/hooks/useHaptic';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';

interface PreUseCheckToolProps {
  onBack: () => void;
}

const CATEGORIES = [
  { key: 'ladder', label: 'Ladder', icon: ArrowUpFromLine },
  { key: 'scaffold', label: 'Scaffold', icon: Construction },
  { key: 'power_tool', label: 'Power Tool', icon: Hammer },
  { key: 'test_instrument', label: 'Test Instrument', icon: Gauge },
  { key: 'access_equipment', label: 'Access Equipment', icon: Wrench },
  { key: 'harness', label: 'Harness & Lanyard', icon: Shield },
  { key: 'extension_lead', label: 'Extension Lead', icon: Cable },
  { key: 'portable_rcd', label: 'Portable RCD', icon: ShieldCheck },
  { key: 'generator', label: 'Generator', icon: Zap },
  { key: 'fire_extinguisher', label: 'Fire Extinguisher', icon: Flame },
  { key: 'first_aid_kit', label: 'First Aid Kit', icon: HeartPulse },
  { key: 'ppe', label: 'PPE (General)', icon: HardHat },
  { key: 'mewp', label: 'MEWP / Cherry Picker', icon: ChevronsUp },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

function resultBadge(result: string) {
  if (result === 'pass')
    return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Pass</Badge>;
  if (result === 'fail')
    return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Fail</Badge>;
  return <Badge className="bg-white/10 text-white border-white/20">N/A</Badge>;
}

export function PreUseCheckTool({ onBack }: PreUseCheckToolProps) {
  const haptic = useHaptic();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [shareRecordId, setShareRecordId] = useState<string | null>(null);
  const [shareRecordTitle, setShareRecordTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: checks = [], isLoading } = usePreUseChecks();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState('all');

  const filteredChecks = useMemo(() => {
    return checks.filter((check) => {
      const matchesSearch =
        !searchQuery ||
        check.equipment_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        check.equipment_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        check.site_address?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesResult = resultFilter === 'all' || check.overall_result === resultFilter;
      return matchesSearch && matchesResult;
    });
  }, [checks, searchQuery, resultFilter]);

  const filterTabs = useMemo(() => {
    const passCount = checks.filter((c) => c.overall_result === 'pass').length;
    const failCount = checks.filter((c) => c.overall_result === 'fail').length;
    return [
      { key: 'all', label: 'All', count: checks.length },
      { key: 'pass', label: 'Pass', count: passCount },
      { key: 'fail', label: 'Fail', count: failCount },
    ];
  }, [checks]);

  const handleCategorySelect = (key: CategoryKey) => {
    setSelectedCategory(key);
    setShowForm(true);
  };

  const handleRecheck = (equipmentType: CategoryKey) => {
    setSelectedCategory(equipmentType);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedCategory(null);
  };

  const handleFormSubmit = () => {
    haptic.success();
    setShowForm(false);
    setSelectedCategory(null);
  };

  const templateItems: CheckItem[] = selectedCategory
    ? CHECK_TEMPLATES[selectedCategory].map((t) => ({
        ...t,
        result: 'na' as const,
      }))
    : [];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <button
          onClick={onBack}
          className="h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">Pre-Use Equipment Checks</h1>
          <p className="text-sm text-white">Record inspections before use</p>
        </div>
        <ClipboardCheck className="w-5 h-5 text-elec-yellow" />
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          {showForm && selectedCategory ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ChecklistForm
                equipmentType={selectedCategory}
                items={templateItems}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Category Selector */}
              <div className="px-4 pt-4 pb-2">
                <h2 className="text-sm font-semibold text-white mb-3">Select Equipment Type</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.key;
                    const reg = REGULATION_REFS[cat.key];
                    const itemCount = CHECK_TEMPLATES[cat.key]?.length || 0;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => handleCategorySelect(cat.key)}
                        className={`relative overflow-hidden rounded-xl p-3.5 text-left touch-manipulation active:scale-[0.97] transition-all border ${
                          isSelected
                            ? 'bg-elec-yellow/15 border-elec-yellow/40 ring-1 ring-elec-yellow/30'
                            : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15] active:bg-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-elec-yellow/20' : 'bg-white/[0.06]'}`}>
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-elec-yellow' : 'text-white'}`} />
                          </div>
                          <span className={`text-sm font-semibold ${isSelected ? 'text-elec-yellow' : 'text-white'}`}>{cat.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {reg && (
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {reg.shortName}
                            </span>
                          )}
                          <span className="text-[10px] text-white">{itemCount} checks</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Checks */}
              <div className="px-4 pt-4">
                <h2 className="text-sm font-semibold text-white mb-3">Recent Checks</h2>

                {/* Search bar */}
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                  <Input
                    placeholder="Search checks..."
                    className="pl-8 pr-8 h-9 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full touch-manipulation"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3.5 w-3.5 text-white" />
                    </button>
                  )}
                </div>

                {/* Filter chips */}
                <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mb-3">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setResultFilter(tab.key)}
                      className={`h-9 px-3 rounded-full text-xs font-medium whitespace-nowrap touch-manipulation transition-all ${
                        resultFilter === tab.key
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/5 text-white border border-white/10'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>

                {isLoading ? (
                  <SafetySkeletonLoader variant="list" />
                ) : checks.length === 0 ? (
                  <SafetyEmptyState
                    icon={ClipboardCheck}
                    heading="No Checks Recorded"
                    description="Select an equipment type above to start your first pre-use inspection check."
                    tip="Pre-use checks help keep you safe on site"
                  />
                ) : filteredChecks.length === 0 ? (
                  <div className="py-8 text-center">
                    <Search className="w-8 h-8 text-white mx-auto mb-3" />
                    <p className="text-sm font-medium text-white">No matching checks found</p>
                    <p className="text-sm text-white mt-1">Try adjusting your search or filters</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setResultFilter('all');
                      }}
                      className="mt-3 h-9 px-4 rounded-full bg-white/5 border border-white/10 text-sm text-white font-medium touch-manipulation transition-all active:scale-95"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredChecks.map((check: PreUseCheck, idx: number) => {
                      const cat = CATEGORIES.find((c) => c.key === check.equipment_type);
                      const CatIcon = cat?.icon || ClipboardCheck;
                      const reg = REGULATION_REFS[check.equipment_type];
                      const passCount = check.items.filter((i) => i.result === 'pass').length;
                      const failCount = check.items.filter((i) => i.result === 'fail').length;
                      return (
                        <SafetyRecordCard
                          key={check.id}
                          id={check.id}
                          title={`${(check.equipment_type || '').replace(/_/g, ' ')} Check`}
                          subtitle={check.equipment_description || undefined}
                          status={check.overall_result}
                          statusLabel={check.overall_result.toUpperCase()}
                          regulation={reg?.shortName}
                          icon={CatIcon}
                          meta={[
                            { icon: Calendar, label: fmtCardDate(check.created_at) },
                            ...(check.site_address ? [{ icon: MapPin, label: check.site_address }] : []),
                            { label: `${passCount}P / ${failCount}F / ${check.items.length} items` },
                          ]}
                          actions={[
                            { label: 'Re-check', icon: RotateCcw, onClick: () => handleRecheck(check.equipment_type as CategoryKey) },
                          ]}
                          pdfType="pre-use-check"
                          index={idx}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {shareRecordId && (
        <SafetyDocumentShare
          open={!!shareRecordId}
          onClose={() => setShareRecordId(null)}
          pdfType="pre-use-check"
          recordId={shareRecordId}
          documentTitle={`Pre-Use Check — ${shareRecordTitle}`}
        />
      )}
    </div>
  );
}

export default PreUseCheckTool;
