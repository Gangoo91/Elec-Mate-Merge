/**
 * AIAssistantPanel - Floating AI assistant for CV content generation
 * Provides context-aware suggestions and content improvement
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  X,
  RefreshCw,
  Check,
  Copy,
  ChevronRight,
  Loader2,
  Wand2,
  Lightbulb,
  Zap,
} from "lucide-react";
import { aiPanelVariants, fadeUpVariants } from "./animations/variants";

interface AISuggestion {
  id: string;
  type: "summary" | "skill" | "description" | "improvement";
  content: string;
  confidence?: number;
}

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sectionContext: string;
  currentContent?: string;
  onAcceptSuggestion: (content: string) => void;
  onGenerateSuggestion: (prompt: string) => Promise<string>;
  className?: string;
}

// Quick action prompts
const QUICK_PROMPTS = [
  { id: "improve", label: "Improve Writing", icon: Wand2 },
  { id: "professional", label: "Make Professional", icon: Sparkles },
  { id: "concise", label: "Make Concise", icon: Zap },
  { id: "expand", label: "Add Details", icon: Lightbulb },
];

const AIAssistantPanel = ({
  isOpen,
  onClose,
  sectionContext,
  currentContent = "",
  onAcceptSuggestion,
  onGenerateSuggestion,
  className,
}: AIAssistantPanelProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await onGenerateSuggestion(prompt);
      setSuggestion(result);
    } catch (err) {
      setError("Failed to generate suggestion. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickAction = (actionId: string) => {
    const prompts: Record<string, string> = {
      improve: `Improve this ${sectionContext} content for a professional CV: "${currentContent}"`,
      professional: `Make this ${sectionContext} more professional and impactful: "${currentContent}"`,
      concise: `Make this ${sectionContext} more concise while keeping key points: "${currentContent}"`,
      expand: `Add more relevant details to this ${sectionContext}: "${currentContent}"`,
    };

    handleGenerate(prompts[actionId] || customPrompt);
  };

  const handleAccept = () => {
    if (suggestion) {
      onAcceptSuggestion(suggestion);
      setSuggestion(null);
      onClose();
    }
  };

  const handleCopy = async () => {
    if (suggestion) {
      await navigator.clipboard.writeText(suggestion);
      setCopiedId("suggestion");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleRegenerate = () => {
    if (customPrompt) {
      handleGenerate(customPrompt);
    } else {
      handleGenerate(`Generate professional ${sectionContext} content for an electrician CV`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Panel */}
          <motion.div
            variants={aiPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed right-0 top-0 bottom-0 w-full sm:w-96 z-50",
              "bg-background border-l border-white/10",
              "flex flex-col",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white">AI Assistant</h2>
                  <p className="text-xs text-white/50">{sectionContext}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-lg text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Quick Actions */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/60">Quick Actions</label>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_PROMPTS.map((prompt) => {
                    const Icon = prompt.icon;
                    return (
                      <Button
                        key={prompt.id}
                        variant="outline"
                        onClick={() => handleQuickAction(prompt.id)}
                        disabled={isGenerating || !currentContent}
                        className="h-auto py-3 px-3 border-white/10 hover:bg-purple-500/10 hover:border-purple-500/30 justify-start gap-2"
                      >
                        <Icon className="h-4 w-4 text-purple-400" />
                        <span className="text-xs text-white">{prompt.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Prompt */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/60">Custom Request</label>
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe what you want AI to help with..."
                  className="min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                />
                <Button
                  onClick={() => handleGenerate(customPrompt)}
                  disabled={isGenerating || !customPrompt.trim()}
                  className="w-full bg-purple-500 hover:bg-purple-400 text-white"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>

              {/* Current Content Preview */}
              {currentContent && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/60">Current Content</label>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm text-white/70 line-clamp-4">{currentContent}</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    variants={fadeUpVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                  >
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generated Suggestion */}
              <AnimatePresence>
                {suggestion && (
                  <motion.div
                    variants={fadeUpVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-white/60">
                        AI Suggestion
                      </label>
                      <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300 text-[10px]">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Generated
                      </Badge>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">
                        {suggestion}
                      </p>
                    </div>

                    {/* Suggestion Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={handleAccept}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-medium"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCopy}
                        className="border-white/10 hover:bg-white/10"
                      >
                        {copiedId === "suggestion" ? (
                          <Check className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                        className="border-white/10 hover:bg-white/10"
                      >
                        <RefreshCw
                          className={cn("h-4 w-4", isGenerating && "animate-spin")}
                        />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-medium text-white/60">Pro Tips</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/50">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-purple-400" />
                    Use action verbs to describe achievements
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-purple-400" />
                    Include specific qualifications (18th Edition, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-purple-400" />
                    Quantify results where possible
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIAssistantPanel;
