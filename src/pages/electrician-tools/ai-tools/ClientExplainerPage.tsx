import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Loader2,
  Lightbulb,
  Zap,
  Megaphone,
  ChevronDown,
  Settings2,
  Sparkles,
  Shield,
  BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ClientTypeSelector, {
  ClientType,
} from '@/components/electrician-tools/ai-tools/client-explainer/ClientTypeSelector';
import TemplateSelector, {
  Template,
} from '@/components/electrician-tools/ai-tools/client-explainer/TemplateSelector';
import OutputPanel from '@/components/electrician-tools/ai-tools/client-explainer/OutputPanel';
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
        title: 'Error',
        description: 'Please enter technical notes to explain',
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
        title: 'Success',
        description: 'Client explanation generated successfully',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error generating explanation:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate explanation. Please try again.',
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
    { key: 'includeAnalogy', label: 'Analogies', desc: 'Everyday comparisons', icon: Lightbulb, value: includeAnalogy, onChange: setIncludeAnalogy },
    { key: 'emphasizeSafety', label: 'Safety Focus', desc: 'Highlight concerns', icon: Shield, value: emphasizeSafety, onChange: setEmphasizeSafety },
    { key: 'includeCostInfo', label: 'Costs', desc: 'Pricing context', icon: Zap, value: includeCostInfo, onChange: setIncludeCostInfo },
    { key: 'includeBS7671', label: 'BS 7671', desc: 'Regulation refs', icon: BookOpen, value: includeBS7671, onChange: setIncludeBS7671 },
  ];

  const activeToggleCount = [includeAnalogy, emphasizeSafety, includeCostInfo, includeBS7671].filter(Boolean).length;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician-tools/ai-tooling')}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <Megaphone className="h-4 w-4 text-pink-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Client Explainer</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-4"
      >
        {/* Client Type */}
        <motion.section variants={itemVariants} className="space-y-2.5">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Explaining To
          </h2>
          <ClientTypeSelector selected={clientType} onSelect={setClientType} />
        </motion.section>

        {/* Templates — collapsible */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="w-full flex items-center justify-between rounded-xl bg-white/[0.03] ring-1 ring-white/[0.08] px-4 h-12 touch-manipulation active:bg-white/[0.06] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Lightbulb className="h-4 w-4 text-pink-400" />
              <span className="text-[13px] font-semibold text-white">Templates</span>
              <span className="text-[11px] text-white">Quick-start scenarios</span>
            </div>
            <motion.div animate={{ rotate: showTemplates ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4 text-white" />
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
                <div className="pt-2">
                  <TemplateSelector onSelectTemplate={handleSelectTemplate} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Technical Notes */}
        <motion.section variants={itemVariants} className="space-y-2.5">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Technical Findings
          </h2>
          <Textarea
            placeholder="Describe your electrical findings, test results, work completed, or safety concerns..."
            value={technicalNotes}
            onChange={(e) => setTechnicalNotes(e.target.value)}
            className="min-h-[120px] resize-none text-base rounded-xl border-white/[0.08] focus:border-pink-500 focus:ring-pink-500 bg-white/[0.03] text-white placeholder:text-white"
            style={{ fontSize: '16px' }}
          />
          <p className="text-[11px] text-white px-0.5">
            Include BS 7671 refs, test readings, and safety codes (C1/C2/C3) where applicable.
          </p>
        </motion.section>

        {/* Tone & Settings — inline row */}
        <motion.section variants={itemVariants} className="space-y-2.5">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Tone & Style
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] focus:border-pink-500 focus:ring-pink-500 text-white text-[12px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="reassuring">Reassuring</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={readingLevel} onValueChange={setReadingLevel}>
              <SelectTrigger className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] focus:border-pink-500 focus:ring-pink-500 text-white text-[12px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
              <SelectTrigger
                className={cn(
                  'h-11 rounded-xl bg-white/[0.03] border-white/[0.08] focus:border-pink-500 focus:ring-pink-500 text-white text-[12px]',
                  urgencyLevel === 'high' && 'border-red-500/30',
                  urgencyLevel === 'immediate' && 'border-red-500/50'
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Routine</SelectItem>
                <SelectItem value="medium">Important</SelectItem>
                <SelectItem value="high">Safety</SelectItem>
                <SelectItem value="immediate">Immediate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.section>

        {/* Advanced Options — collapsible */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between rounded-xl bg-white/[0.03] ring-1 ring-white/[0.08] px-4 h-12 touch-manipulation active:bg-white/[0.06] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Settings2 className="h-4 w-4 text-pink-400" />
              <span className="text-[13px] font-semibold text-white">Options</span>
              {activeToggleCount > 0 && (
                <span className="text-[10px] font-bold text-pink-400 bg-pink-500/15 px-1.5 py-0.5 rounded-md">
                  {activeToggleCount}
                </span>
              )}
            </div>
            <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4 text-white" />
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
                <div className="pt-2 grid grid-cols-2 gap-2">
                  {toggleOptions.map(({ key, label, desc, icon: Icon, value, onChange }) => (
                    <button
                      key={key}
                      onClick={() => onChange(!value)}
                      className={cn(
                        'flex items-center gap-2.5 p-3 rounded-xl ring-1 transition-all touch-manipulation active:scale-[0.97]',
                        value
                          ? 'bg-pink-500/15 ring-pink-500/40 shadow-sm shadow-pink-500/10'
                          : 'bg-white/[0.03] ring-white/[0.08]'
                      )}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                          value ? 'bg-pink-500/20 text-pink-400' : 'bg-white/[0.06] text-white'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-[12px] font-semibold text-white">{label}</p>
                        <p className="text-[10px] text-white">{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Generate Button */}
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !technicalNotes.trim()}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-pink-500/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2.5 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2.5 h-5 w-5" />
                Generate Explanation
              </>
            )}
          </Button>
        </motion.div>

        {/* Output */}
        <OutputPanel content={generatedExplanation} settings={getCurrentSettings()} />
      </motion.main>
    </div>
  );
};

export default ClientExplainerPage;
