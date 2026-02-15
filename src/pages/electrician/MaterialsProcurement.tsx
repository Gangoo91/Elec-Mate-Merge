import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Zap,
  FileText,
  Search,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProcurementEngine } from '@/hooks/useProcurementEngine';
import { ProcurementInputSheet } from '@/components/procurement/ProcurementInputSheet';
import { OptimisedBasketSummary } from '@/components/procurement/OptimisedBasketSummary';
import { ItemComparisonTable } from '@/components/procurement/ItemComparisonTable';
import type { ProcurementStep, ParsedMaterialItem } from '@/types/procurement';

const STEP_INFO: Record<
  ProcurementStep,
  { label: string; icon: typeof FileText; description: string }
> = {
  idle: { label: 'Ready', icon: FileText, description: 'Paste text or take a photo to begin' },
  parsing_photo: {
    label: 'Reading Photo',
    icon: FileText,
    description: 'AI is extracting materials from your photo...',
  },
  parsing_text: {
    label: 'Parsing List',
    icon: FileText,
    description: 'Identifying materials and quantities...',
  },
  comparing_prices: {
    label: 'Comparing Prices',
    icon: Search,
    description: 'Searching 6 suppliers for best prices...',
  },
  done: {
    label: 'Complete',
    icon: CheckCircle2,
    description: 'Price comparison ready',
  },
  error: {
    label: 'Error',
    icon: FileText,
    description: 'Something went wrong',
  },
};

function ProgressSteps({ currentStep }: { currentStep: ProcurementStep }) {
  const steps: ProcurementStep[] = ['parsing_text', 'comparing_prices', 'done'];
  const currentIdx = steps.indexOf(currentStep);

  // For photo flow, treat parsing_photo same as parsing_text
  const adjustedIdx =
    currentStep === 'parsing_photo' ? 0 : currentIdx;

  return (
    <div className="flex items-center gap-2 py-4">
      {steps.map((step, i) => {
        const info = STEP_INFO[step];
        const isActive = i === adjustedIdx;
        const isDone = i < adjustedIdx || currentStep === 'done';

        return (
          <div key={step} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : isActive
                      ? 'bg-elec-yellow text-black animate-pulse'
                      : 'bg-white/[0.05] text-white'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <info.icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-elec-yellow' : isDone ? 'text-green-400' : 'text-white'
                }`}
              >
                {info.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px flex-1 ${isDone ? 'bg-green-500' : 'bg-white/[0.1]'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Smart Procurement page — compare prices across 6 suppliers
 * Route: /electrician/materials/procurement
 */
export default function MaterialsProcurement() {
  const location = useLocation();
  const locationState = location.state as {
    items?: ParsedMaterialItem[];
    preloadText?: string;
  } | null;
  const preloadedItems = locationState?.items;
  const preloadText = locationState?.preloadText;

  const {
    step,
    error,
    parsedItems,
    comparison,
    processPhoto,
    processText,
    processItems,
    reset,
  } = useProcurementEngine();

  const [inputCollapsed, setInputCollapsed] = useState(false);

  // Auto-process preloaded items or text on mount
  const [hasProcessedPreload, setHasProcessedPreload] = useState(false);
  if (!hasProcessedPreload) {
    if (preloadedItems) {
      setHasProcessedPreload(true);
      processItems(preloadedItems);
    } else if (preloadText) {
      setHasProcessedPreload(true);
      processText(preloadText);
    }
  }

  const isProcessing = step === 'parsing_photo' || step === 'parsing_text' || step === 'comparing_prices';
  const hasResults = step === 'done' && comparison;

  return (
    <div className="bg-background pb-20 sm:pb-8 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/electrician/materials">
            <Button
              variant="ghost"
              size="sm"
              className="mb-3 -ml-2 touch-manipulation h-10 text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Materials Marketplace
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-500/20 rounded-xl">
              <BarChart3 className="h-7 w-7 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Smart Procurement</h1>
              <p className="text-white text-sm">
                Compare prices across 6 suppliers instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* Input section — collapsible after results */}
        {hasResults ? (
          <button
            onClick={() => setInputCollapsed(!inputCollapsed)}
            className="w-full flex items-center justify-between p-3 bg-white/[0.03] border border-white/[0.08] rounded-xl touch-manipulation"
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium text-white">
                {parsedItems.length} items compared
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">New comparison</span>
              {inputCollapsed ? (
                <ChevronDown className="h-4 w-4 text-white" />
              ) : (
                <ChevronUp className="h-4 w-4 text-white" />
              )}
            </div>
          </button>
        ) : null}

        {(!hasResults || !inputCollapsed) && !preloadedItems && !preloadText && (
          <ProcurementInputSheet
            onSubmitText={processText}
            onSubmitPhoto={processPhoto}
            isProcessing={isProcessing}
          />
        )}

        {/* Progress steps */}
        {isProcessing && <ProgressSteps currentStep={step} />}

        {/* Processing description */}
        {isProcessing && (
          <div className="text-center py-4">
            <p className="text-sm text-white">{STEP_INFO[step].description}</p>
            {parsedItems.length > 0 && step === 'comparing_prices' && (
              <p className="text-xs text-white mt-2">
                Searching prices for {parsedItems.length} items...
              </p>
            )}
          </div>
        )}

        {/* Error state */}
        {step === 'error' && error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-sm text-red-400 font-medium mb-2">Something went wrong</p>
            <p className="text-sm text-white">{error}</p>
            <Button
              onClick={reset}
              variant="outline"
              className="mt-3 h-10 touch-manipulation"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Results */}
        {hasResults && comparison && (
          <div className="space-y-4">
            {/* Optimised basket summary */}
            <OptimisedBasketSummary basket={comparison.optimised_basket} />

            {/* Per-item comparison */}
            <ItemComparisonTable items={comparison.items} />
          </div>
        )}
      </div>
    </div>
  );
}
