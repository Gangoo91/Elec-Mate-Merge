/**
 * ClientExplainerPage — editorial Client Explainer screen.
 *
 * Drops the pink/rose gradient chrome and per-toggle icons. Editorial
 * eyebrows, type-led chips, gradient-surface cards, elec-yellow CTA.
 * All logic preserved (template select, generate via edge function,
 * output panel).
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Loader2, ChevronDown } from 'lucide-react';
import ClientTypeSelector, {
  ClientType,
} from '@/components/electrician-tools/ai-tools/client-explainer/ClientTypeSelector';
import TemplateSelector, {
  Template,
} from '@/components/electrician-tools/ai-tools/client-explainer/TemplateSelector';
import OutputPanel from '@/components/electrician-tools/ai-tools/client-explainer/OutputPanel';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const ClientExplainerPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [technicalNotes, setTechnicalNotes] = useState('');
  const [tone, setTone] = useState('professional');
  const [readingLevel, setReadingLevel] = useState('standard');
  const [clientType, setClientType] = useState<ClientType>('homeowner');
  const [urgencyLevel, setUrgencyLevel] = useState('medium');
  const [includeAnalogy, setIncludeAnalogy] = useState(true);
  const [includeCostInfo, setIncludeCostInfo] = useState(false);
  const [emphasizeSafety, setEmphasizeSafety] = useState(true);
  const [includeBS7671, setIncludeBS7671] = useState(false);
  const [generatedExplanation, setGeneratedExplanation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSelectTemplate = (template: Template) => {
    setTechnicalNotes(template.sample);
    switch (template.urgency) {
      case 'high':
        setTone('urgent');
        setEmphasizeSafety(true);
        break;
      case 'medium':
        setTone('professional');
        break;
      case 'low':
        setTone('friendly');
        break;
    }
    setUrgencyLevel(template.urgency);
    setShowTemplates(false);
  };

  const handleGenerate = async () => {
    if (!technicalNotes.trim()) {
      toast({
        title: 'Add technical notes',
        description: 'Type or pick a template before generating.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-electrical-report', {
        body: {
          template: 'client-explainer',
          formData: {
            technicalNotes,
            tone,
            readingLevel,
            clientType,
            urgencyLevel,
            includeAnalogy,
            includeCostInfo,
            emphasizeSafety,
            includeBS7671,
          },
        },
      });

      if (error) throw error;

      setGeneratedExplanation(data.report);
      toast({
        title: 'Explanation ready',
        description: 'Plain-English copy generated.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error generating explanation:', error);
      toast({
        title: 'Generation failed',
        description: 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getCurrentSettings = () => ({
    tone,
    readingLevel,
    clientType,
    includeAnalogy,
    emphasizeSafety,
    includeCostInfo,
  });

  const toggleOptions = [
    {
      key: 'includeAnalogy',
      label: 'Analogies',
      desc: 'Everyday comparisons',
      value: includeAnalogy,
      onChange: setIncludeAnalogy,
    },
    {
      key: 'emphasizeSafety',
      label: 'Safety focus',
      desc: 'Highlight concerns clearly',
      value: emphasizeSafety,
      onChange: setEmphasizeSafety,
    },
    {
      key: 'includeCostInfo',
      label: 'Costs',
      desc: 'Pricing context',
      value: includeCostInfo,
      onChange: setIncludeCostInfo,
    },
    {
      key: 'includeBS7671',
      label: 'BS 7671',
      desc: 'Regulation references',
      value: includeBS7671,
      onChange: setIncludeBS7671,
    },
  ];

  const activeToggleCount = [includeAnalogy, emphasizeSafety, includeCostInfo, includeBS7671].filter(
    Boolean
  ).length;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <button
              type="button"
              onClick={() => navigate('/electrician-tools/ai-tooling')}
              aria-label="Back"
              className="text-white/85 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center touch-manipulation transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Eyebrow>CLIENT EXPLAINER</Eyebrow>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 sm:px-6 pt-6 pb-6 space-y-7 max-w-5xl mx-auto"
      >
        {/* Hero */}
        <motion.section variants={itemVariants} className="space-y-2">
          <Eyebrow>WHAT IT DOES</Eyebrow>
          <h1 className="text-[28px] sm:text-[36px] font-semibold tracking-tight leading-[1.05]">
            <span className="text-elec-yellow">Plain</span>{' '}
            <span className="text-white">English. Every time.</span>
          </h1>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/85 max-w-2xl">
            Translate test results, EICR codes, design notes and safety findings into clear
            client-ready copy. Pick the audience, tone and depth — get the right voice every time.
          </p>
        </motion.section>

        {/* 01 — Audience */}
        <motion.section variants={itemVariants} className="space-y-3">
          <Eyebrow>01 · EXPLAIN TO</Eyebrow>
          <ClientTypeSelector selected={clientType} onSelect={setClientType} />
        </motion.section>

        {/* 02 — Templates */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="w-full flex items-center justify-between rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-white/[0.20] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] px-5 py-4 touch-manipulation transition-colors"
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                02
              </span>
              <div className="text-left">
                <span className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/65">
                  TEMPLATES
                </span>
                <span className="block text-[13.5px] font-semibold text-white">
                  Quick-start scenarios
                </span>
              </div>
            </div>
            <motion.div animate={{ rotate: showTemplates ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4 text-white/65" aria-hidden />
            </motion.div>
          </button>

          <AnimatePresence>
            {showTemplates && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <TemplateSelector onSelectTemplate={handleSelectTemplate} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 03 — Notes */}
        <motion.section variants={itemVariants} className="space-y-3">
          <Eyebrow>03 · TECHNICAL FINDINGS</Eyebrow>
          <Textarea
            placeholder="Test results, work completed, EICR codes (C1/C2/C3), safety concerns…"
            value={technicalNotes}
            onChange={(e) => setTechnicalNotes(e.target.value)}
            className="min-h-[140px] resize-none text-[14px] rounded-2xl border-white/[0.10] focus-visible:border-elec-yellow/50 bg-white/[0.04] text-white placeholder:text-white/65"
            style={{ fontSize: '16px' }}
          />
          <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 px-0.5">
            Cited refs (BS 7671) + test readings make the explainer sharper.
          </p>
        </motion.section>

        {/* 04 — Tone + style */}
        <motion.section variants={itemVariants} className="space-y-3">
          <Eyebrow>04 · TONE + STYLE</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="h-11 rounded-xl bg-white/[0.04] border-white/[0.10] focus-visible:border-elec-yellow/50 text-white text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(0_0%_11%)] border-white/[0.10]">
                <SelectItem value="professional" className="text-white hover:bg-white/10">
                  Professional
                </SelectItem>
                <SelectItem value="friendly" className="text-white hover:bg-white/10">
                  Friendly
                </SelectItem>
                <SelectItem value="reassuring" className="text-white hover:bg-white/10">
                  Reassuring
                </SelectItem>
                <SelectItem value="urgent" className="text-white hover:bg-white/10">
                  Urgent
                </SelectItem>
                <SelectItem value="technical" className="text-white hover:bg-white/10">
                  Technical
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={readingLevel} onValueChange={setReadingLevel}>
              <SelectTrigger className="h-11 rounded-xl bg-white/[0.04] border-white/[0.10] focus-visible:border-elec-yellow/50 text-white text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(0_0%_11%)] border-white/[0.10]">
                <SelectItem value="simple" className="text-white hover:bg-white/10">
                  Simple
                </SelectItem>
                <SelectItem value="standard" className="text-white hover:bg-white/10">
                  Standard
                </SelectItem>
                <SelectItem value="technical" className="text-white hover:bg-white/10">
                  Technical
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
              <SelectTrigger
                className={cn(
                  'h-11 rounded-xl bg-white/[0.04] border-white/[0.10] focus-visible:border-elec-yellow/50 text-white text-[13px]',
                  urgencyLevel === 'high' && 'border-amber-500/40',
                  urgencyLevel === 'immediate' && 'border-red-500/50'
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(0_0%_11%)] border-white/[0.10]">
                <SelectItem value="low" className="text-white hover:bg-white/10">
                  Routine
                </SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-white/10">
                  Important
                </SelectItem>
                <SelectItem value="high" className="text-white hover:bg-white/10">
                  Safety
                </SelectItem>
                <SelectItem value="immediate" className="text-white hover:bg-white/10">
                  Immediate
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.section>

        {/* 05 — Options */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-white/[0.20] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] px-5 py-4 touch-manipulation transition-colors"
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                05
              </span>
              <div className="text-left">
                <span className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/65">
                  OPTIONS
                </span>
                <span className="block text-[13.5px] font-semibold text-white">
                  Fine-tune the output
                </span>
              </div>
              {activeToggleCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold tabular-nums text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-full">
                  {activeToggleCount}
                </span>
              )}
            </div>
            <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4 text-white/65" aria-hidden />
            </motion.div>
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ul className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {toggleOptions.map((opt) => (
                    <li key={opt.key}>
                      <button
                        type="button"
                        onClick={() => opt.onChange(!opt.value)}
                        className={cn(
                          'w-full text-left flex items-baseline justify-between gap-3 rounded-xl px-4 py-3 border transition-colors touch-manipulation',
                          opt.value
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        <div className="min-w-0">
                          <p
                            className={cn(
                              'text-[13px] font-semibold',
                              opt.value ? 'text-elec-yellow' : 'text-white'
                            )}
                          >
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-white/65">{opt.desc}</p>
                        </div>
                        <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold shrink-0">
                          {opt.value ? 'On' : 'Off'}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Generate */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !technicalNotes.trim()}
            className="w-full text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-5 py-4 min-h-[52px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>Generate explanation →</>
            )}
          </button>
        </motion.div>

        {/* Output */}
        <OutputPanel content={generatedExplanation} settings={getCurrentSettings()} />
      </motion.main>
    </div>
  );
};

export default ClientExplainerPage;
