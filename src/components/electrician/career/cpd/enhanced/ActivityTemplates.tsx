/**
 * ActivityTemplates — editorial CPD activity catalogue.
 *
 * Type-led search + select header, three-tab nav (popular/all/quick),
 * gradient-surface cards. Drops shadcn Card/Badge chrome for editorial
 * eyebrows, hairline dividers, tabular hours, and uniform pill chips.
 */

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Clock,
  Star,
  Plus,
  BookOpen,
  Users,
  Award,
  Building,
  Zap,
  Shield,
  Leaf,
  Smartphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CPD_ACTIVITY_TEMPLATES, QUICK_ACTIVITY_TEMPLATES } from '@/data/cpd-templates';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { Eyebrow } from '@/components/college/primitives';

const ActivityTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const { addFromTemplate } = useEnhancedCPD();

  const categoryIcons: Record<string, React.ReactNode> = {
    'regulations-standards': <BookOpen className="h-3.5 w-3.5" />,
    'technical-skills': <Zap className="h-3.5 w-3.5" />,
    'safety-health': <Shield className="h-3.5 w-3.5" />,
    'business-commercial': <Building className="h-3.5 w-3.5" />,
    'professional-ethics': <Users className="h-3.5 w-3.5" />,
    'environmental-sustainability': <Leaf className="h-3.5 w-3.5" />,
    'digital-technology': <Smartphone className="h-3.5 w-3.5" />,
    'customer-service': <Award className="h-3.5 w-3.5" />,
  };

  const filteredTemplates = CPD_ACTIVITY_TEMPLATES.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTemplates = filteredTemplates.filter((t) => t.isPopular).slice(0, 6);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUseTemplate = (template: any, additionalHours?: number) => {
    const hours = additionalHours || template.estimatedHours;
    addFromTemplate(template, { hours });
    setSelectedTemplate(null);
  };

  const categories = [
    { value: 'all', label: 'All categories' },
    { value: 'regulations-standards', label: 'Regulations + standards' },
    { value: 'technical-skills', label: 'Technical skills' },
    { value: 'safety-health', label: 'Safety + health' },
    { value: 'business-commercial', label: 'Business + commercial' },
    { value: 'professional-ethics', label: 'Professional ethics' },
    { value: 'environmental-sustainability', label: 'Environmental' },
    { value: 'digital-technology', label: 'Digital technology' },
    { value: 'customer-service', label: 'Customer service' },
  ];

  return (
    <div className="space-y-5">
      {/* Search + select */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!searchTerm && (
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/65 h-4 w-4 pointer-events-none"
              aria-hidden
            />
          )}
          <Input
            placeholder="Search activity templates"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              'h-11 bg-white/[0.04] border-white/[0.10] text-white placeholder:text-white/65 rounded-xl focus-visible:border-elec-yellow/50',
              !searchTerm && 'pl-10'
            )}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-11 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-white text-[13px] focus-visible:border-elec-yellow/50 touch-manipulation"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value} className="bg-[hsl(0_0%_11%)]">
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/[0.04] border border-white/[0.10] rounded-xl p-1">
          <TabsTrigger
            value="popular"
            className="text-[11px] uppercase tracking-[0.14em] font-semibold data-[state=active]:bg-elec-yellow/[0.08] data-[state=active]:text-elec-yellow"
          >
            Popular
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="text-[11px] uppercase tracking-[0.14em] font-semibold data-[state=active]:bg-elec-yellow/[0.08] data-[state=active]:text-elec-yellow"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="quick"
            className="text-[11px] uppercase tracking-[0.14em] font-semibold data-[state=active]:bg-elec-yellow/[0.08] data-[state=active]:text-elec-yellow"
          >
            Quick add
          </TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="space-y-3 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                icon={categoryIcons[template.category]}
                onSelect={setSelectedTemplate}
                onUse={handleUseTemplate}
                showStar
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-3 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                icon={categoryIcons[template.category]}
                onSelect={setSelectedTemplate}
                onUse={handleUseTemplate}
                showStar={template.isPopular}
                wide
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick" className="space-y-3 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_ACTIVITY_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-[13.5px] font-semibold text-white truncate">
                    {template.title}
                  </h4>
                  <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-1.5 py-0.5 tabular-nums shrink-0">
                    {template.estimatedHours}h
                  </span>
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-white/85 flex-1">
                  {template.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleUseTemplate(template)}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-3 py-2 min-h-[36px] touch-manipulation transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Quick add
                </button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedTemplate} onOpenChange={(o) => !o && setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border-white/[0.10]">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedTemplate?.title}</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <TemplateDetailModal template={selectedTemplate} onUse={handleUseTemplate} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const TemplateCard = ({
  template,
  icon,
  onSelect,
  onUse,
  showStar,
  wide,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template: any;
  icon: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (t: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUse: (t: any, h?: number) => void;
  showStar?: boolean;
  wide?: boolean;
}) => (
  <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 flex flex-col">
    <div className="flex items-baseline justify-between gap-2">
      <div className="flex items-baseline gap-1.5">
        <span className="text-elec-yellow self-center">{icon}</span>
        {showStar && (
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 self-center" aria-hidden />
        )}
      </div>
      <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-1.5 py-0.5 tabular-nums">
        {template.estimatedHours}h
      </span>
    </div>
    <h4 className="mt-2 text-[13.5px] font-semibold text-white leading-tight line-clamp-2">
      {template.title}
    </h4>
    <p className={cn('mt-1.5 text-[12px] leading-relaxed text-white/85', !wide && 'line-clamp-2')}>
      {template.description}
    </p>
    <div className="mt-2 flex flex-wrap gap-1">
      <span className="text-[9.5px] uppercase tracking-[0.12em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
        {String(template.category).replace('-', ' ')}
      </span>
      <span className="text-[9.5px] uppercase tracking-[0.12em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
        {String(template.type).replace('-', ' ')}
      </span>
    </div>
    <DialogTrigger asChild>
      <button
        type="button"
        onClick={() => onSelect(template)}
        className={cn(
          'mt-3 inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] rounded-full px-3 py-2 min-h-[36px] touch-manipulation transition-colors',
          wide
            ? 'text-white/85 border border-white/15 hover:border-white/30'
            : 'text-black bg-elec-yellow hover:bg-elec-yellow/90'
        )}
      >
        <Plus className="h-3.5 w-3.5" />
        {wide ? 'View details' : 'Use template'}
      </button>
    </DialogTrigger>
    <button type="button" onClick={() => onUse(template)} className="hidden" />
  </div>
);

const TemplateDetailModal = ({
  template,
  onUse,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUse: (t: any, h?: number) => void;
}) => {
  const [customHours, setCustomHours] = useState<number>(template.estimatedHours);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-1.5">
        <span className="text-[10px] uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
          {String(template.category).replace('-', ' ')}
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
          {String(template.type).replace('-', ' ')}
        </span>
      </div>

      {template.provider && (
        <div>
          <Eyebrow>TYPICAL PROVIDER</Eyebrow>
          <p className="mt-1 text-[13px] text-white">{template.provider}</p>
        </div>
      )}

      <div>
        <Eyebrow>DESCRIPTION</Eyebrow>
        <p className="mt-1 text-[13px] leading-relaxed text-white">{template.description}</p>
      </div>

      {template.learningOutcomes && (
        <div>
          <Eyebrow>LEARNING OUTCOMES</Eyebrow>
          <ol className="mt-2 divide-y divide-white/[0.06]">
            {template.learningOutcomes.map((outcome: string, index: number) => (
              <li key={index} className="py-2 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[12.5px] leading-relaxed text-white">{outcome}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {template.evidenceRequired && (
        <div>
          <Eyebrow>EVIDENCE REQUIRED</Eyebrow>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {template.evidenceRequired.map((evidence: string, index: number) => (
              <li
                key={index}
                className="text-[10px] uppercase tracking-[0.12em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5"
              >
                {String(evidence).replace('-', ' ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-white/65" aria-hidden />
          <label className="text-[11.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
            Hours
          </label>
          <Input
            type="number"
            value={customHours}
            onChange={(e) => setCustomHours(Number(e.target.value))}
            className="w-20 h-9 bg-white/[0.04] border-white/[0.10] text-white tabular-nums focus-visible:border-elec-yellow/50"
            min="0.5"
            max="40"
            step="0.5"
          />
        </div>
        <button
          type="button"
          onClick={() => onUse(template, customHours)}
          className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add to log
        </button>
      </div>
    </div>
  );
};

export default ActivityTemplates;
