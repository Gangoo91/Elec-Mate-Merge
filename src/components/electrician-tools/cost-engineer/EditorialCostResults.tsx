/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Editorial Cost Results — Phase A rebuild.
 *
 * Replaces the dialog/card-grid `CostAnalysisResults` + `ComprehensiveResultsView`
 * with a cohesive editorial surface that matches the wizard + streaming pages:
 * mobile-flat, no card chrome on mobile, full max-width with scaling gutters,
 * numbered cells, eyebrows, yellow + white headlines with periods, tabular-nums.
 *
 * Keeps the existing PDF payload + Quote Hub handoff intact.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { CostEstimateInputs, REGION_OPTIONS } from '@/types/cost-estimate-inputs';
import { CostEngineerOutput } from '@/utils/cost-to-quote-transformer';
import { storageSetJSONSync } from '@/utils/storage';

interface EditorialCostResultsProps {
  inputs: CostEstimateInputs;
  structuredData: any;
  rawResponse?: string;
  /** Job ID of the currently displayed estimate. Required for refinement. */
  jobId?: string | null;
  /** Parent job ID if this is a refinement (powers the "view original" link). */
  refineOf?: string | null;
  /** Refinement mode used to derive this estimate. */
  refineMode?: 'cheaper' | 'premium' | 'phase' | null;
  /** Parent estimate's structuredData — used to compute the diff headline. */
  parentStructuredData?: any;
  onNewEstimate: () => void;
  /** Trigger a refinement job — parent forwards to cost-engineer endpoint. */
  onRefine?: (mode: 'cheaper' | 'premium' | 'phase') => void;
  /** Switch the view back to the parent (original) estimate. */
  onViewOriginal?: () => void;
  /** Bring user back to the briefing with this estimate's inputs preserved. */
  onEditAndRegenerate?: () => void;
}

const fmtGBP = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(
    isFinite(n) ? n : 0
  );

const fmtGBP2 = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
    isFinite(n) ? n : 0
  );

const round2 = (n: number) => Math.round((n || 0) * 100) / 100;

export const EditorialCostResults = ({
  inputs,
  structuredData,
  rawResponse,
  jobId,
  refineOf,
  refineMode,
  parentStructuredData,
  onNewEstimate,
  onRefine,
  onViewOriginal,
  onEditAndRegenerate,
}: EditorialCostResultsProps) => {
  const navigate = useNavigate();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showQuoteHubConfirm, setShowQuoteHubConfirm] = useState(false);
  const [savingTemplate, setSavingTemplate] = useState(false);
  // Personal win-rate stats. Surfaced as a quiet chip on the recommended
  // tier so the user knows whether their target margin is actually
  // closing. Pulled once when results land; cheap aggregate query.
  const [winStats, setWinStats] = useState<{
    winPct: number;
    decided: number;
  } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('cost_engineer_jobs')
        .select('quote_outcome')
        .not('quote_outcome', 'is', null);
      if (cancelled || !data) return;
      const decided = data.filter((r: any) =>
        ['won', 'lost_too_high', 'lost_too_low', 'lost_other'].includes(r.quote_outcome)
      );
      if (decided.length < 3) return; // Need a small sample before showing.
      const won = decided.filter((r: any) => r.quote_outcome === 'won').length;
      setWinStats({
        winPct: Math.round((won / decided.length) * 100),
        decided: decided.length,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  // Client view hides internal commercial details (margin, profit,
  // break-even, supplier names, source URLs, internal labour rates).
  // The electrician toggles this on when sat next to the customer with
  // the iPad open. Persists in sessionStorage for the duration of the
  // visit so it doesn't flick off on a refinement reload.
  const [clientView, setClientView] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('cost-engineer-client-view') === '1';
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (clientView) sessionStorage.setItem('cost-engineer-client-view', '1');
    else sessionStorage.removeItem('cost-engineer-client-view');
  }, [clientView]);
  // Tier the user has clicked. Defaults to whatever the AI recommended;
  // tap a different tier to override and that becomes the price sent to
  // PDF / Quote Hub.
  const [selectedTierKey, setSelectedTierKey] = useState<'minimum' | 'target' | 'premium'>(
    (structuredData?.recommendedQuote?.tier as 'minimum' | 'target' | 'premium') ?? 'target'
  );

  /* ─── Derive headline numbers ─────────────────────────────── */
  const summary = structuredData?.summary ?? {};
  const materials = structuredData?.materials ?? {};
  const labour = structuredData?.labour ?? {};
  const profitability = structuredData?.profitabilityAnalysis ?? {};
  const confidence = structuredData?.confidence ?? {};
  const risks: any[] = structuredData?.riskAssessment?.risks ?? [];
  const upsells: any[] = structuredData?.upsells ?? [];
  const valueEngineering: string[] = structuredData?.valueEngineering ?? [];
  const liveDeals: any[] = structuredData?.liveDeals ?? [];
  const liveCoupons: any[] = structuredData?.liveCoupons ?? [];
  const complianceFlags: any[] = structuredData?.complianceFlags ?? [];
  const attachmentErrors: Array<{ fileName: string; reason: string }> =
    structuredData?.attachmentErrors ?? [];
  const marginFloorEngaged: boolean = !!structuredData?.recommendedQuote?.marginFloorEngaged;
  // Note: structuredData.bs7671Facets is intentionally NOT rendered. The
  // RAG mechanism is an internal detail; we only show the outcome.

  const totalLabourHours = useMemo(
    () => round2((labour.tasks ?? []).reduce((s: number, t: any) => s + (t.hours || 0), 0)),
    [labour]
  );

  const breakEven = round2(profitability.breakEvenPoint ?? summary.subtotal ?? 0);
  const aiRecommendedTier: string = structuredData?.recommendedQuote?.tier ?? 'target';

  const tierMin = round2(profitability.quoteTiers?.minimum?.price ?? breakEven * 1.2);
  const tierTarget = round2(profitability.quoteTiers?.target?.price ?? breakEven * 1.3);
  const tierPremium = round2(profitability.quoteTiers?.premium?.price ?? breakEven * 1.4);

  // Headline numbers + downstream payloads follow the user's tier
  // selection, falling back to the AI's recommendation on first render.
  const tierAmounts: Record<'minimum' | 'target' | 'premium', number> = {
    minimum: tierMin,
    target: tierTarget,
    premium: tierPremium,
  };
  const recommendedTier = selectedTierKey;
  const recommendedAmount = tierAmounts[selectedTierKey] ?? tierTarget;
  const profit = round2(recommendedAmount - breakEven);
  const margin = round2(recommendedAmount > 0 ? ((recommendedAmount - breakEven) / recommendedAmount) * 100 : 0);
  const profitPerHour = round2(totalLabourHours > 0 ? profit / totalLabourHours : 0);

  const materialsNet = round2(materials.subtotal ?? 0);
  const labourTotal = round2(labour.subtotal ?? 0);
  const overheadsTotal = round2(profitability.jobOverheads?.total ?? 0);
  const contingencyPct = round2(confidence.contingency?.percentage ?? inputs.contingencyPercent);
  const contingencyAmt = round2(((materialsNet + labourTotal) * contingencyPct) / 100);

  /**
   * Risk-driven contingency reasoning. The annotation AI assigns a
   * `contingencyPercent` to each risk; aggregate the top contributors
   * into a plain English explanation so the contingency number is
   * defensible to the customer ("8% because tight loft, pre-war,
   * asbestos likely") rather than feeling arbitrary.
   */
  const contingencyReasons = useMemo(() => {
    if (!Array.isArray(risks) || risks.length === 0) return [] as Array<{ title: string; pct: number }>;
    return risks
      .filter((r: any) => Number(r?.contingencyPercent) > 0)
      .map((r: any) => ({
        title: String(r.title ?? r.risk ?? 'Risk').slice(0, 60),
        pct: round2(Number(r.contingencyPercent)),
      }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 4);
  }, [risks]);

  const matsConfidence = Math.round(confidence.materials?.level ?? 75);
  const matsMatched: number | undefined = confidence.materials?.matched;
  const matsTotal: number | undefined = confidence.materials?.total;
  const labourConfidence = Math.round(confidence.labour?.level ?? 75);
  const avgConfidence = Math.round((matsConfidence + labourConfidence) / 2);

  const regionLabel = REGION_OPTIONS.find((r) => r.value === inputs.region)?.label ?? 'UK average';

  /* ─── Refinement diff (only when viewing a refined estimate) ─── */
  const diff = useMemo(() => {
    if (!refineOf || !parentStructuredData) return null;

    const parentRecommended = round2(
      parentStructuredData?.recommendedQuote?.amount ?? parentStructuredData?.summary?.grandTotal ?? 0
    );
    const parentTotalHours = round2(
      (parentStructuredData?.labour?.tasks ?? []).reduce(
        (s: number, t: any) => s + Number(t.hours ?? 0),
        0
      )
    );
    const parentMaterialsCount = (parentStructuredData?.materials?.items ?? []).length;
    const currentMaterialsCount = (materials.items ?? []).length;

    // Materials added / removed by description (case-insensitive). Not a
    // perfect identity match but good enough to surface what changed.
    const parentDescs = new Set(
      (parentStructuredData?.materials?.items ?? []).map((it: any) =>
        String(it.description ?? '').toLowerCase().trim()
      )
    );
    const currentDescs = new Set(
      (materials.items ?? []).map((it: any) =>
        String(it.description ?? '').toLowerCase().trim()
      )
    );
    const added = (materials.items ?? []).filter(
      (it: any) => !parentDescs.has(String(it.description ?? '').toLowerCase().trim())
    );
    const removed = (parentStructuredData?.materials?.items ?? []).filter(
      (it: any) => !currentDescs.has(String(it.description ?? '').toLowerCase().trim())
    );

    return {
      parentRecommended,
      currentRecommended: recommendedAmount,
      delta: round2(recommendedAmount - parentRecommended),
      deltaPct:
        parentRecommended > 0
          ? round2(((recommendedAmount - parentRecommended) / parentRecommended) * 100)
          : 0,
      hoursDelta: round2(totalLabourHours - parentTotalHours),
      addedCount: added.length,
      removedCount: removed.length,
      itemsCountDelta: currentMaterialsCount - parentMaterialsCount,
      added: added.slice(0, 5),
      removed: removed.slice(0, 5),
    };
  }, [refineOf, parentStructuredData, recommendedAmount, totalLabourHours, materials.items]);

  const refineModeLabel: Record<string, string> = {
    cheaper: 'Cheaper',
    premium: 'Premium',
    phase: 'Phased',
  };

  /* ─── PDF / Quote Hub handlers (kept from old flow) ──────── */
  const buildPdfPayload = () => {
    const calculateTier = (price: number) => ({
      price: round2(price),
      profit: round2(price - breakEven),
      marginPercent: round2(price > 0 ? ((price - breakEven) / price) * 100 : 0),
      profitPerHour: round2(totalLabourHours > 0 ? (price - breakEven) / totalLabourHours : 0),
    });

    return {
      originalRequest: {
        query: rawResponse || '',
        projectName: inputs.projectName,
        clientInfo: [inputs.clientName, inputs.clientContact].filter(Boolean).join(' - '),
        location: inputs.location,
        projectType: inputs.projectType,
        additionalInfo: inputs.notes ?? '',
        timestamp: new Date().toISOString(),
      },
      quoteHero: {
        recommendedPrice: recommendedAmount,
        tier: recommendedTier,
        profit,
        marginPercent: margin,
        profitPerHour,
        confidencePercent: avgConfidence,
        totalLabourHours,
      },
      aiSummary: structuredData?.response || rawResponse || '',
      pricingTiers: {
        workSparse: calculateTier(tierMin),
        normal: { ...calculateTier(tierTarget), recommended: true },
        busyPeriod: calculateTier(tierPremium),
      },
      costBreakdown: {
        materials: {
          net: materialsNet,
          markupPercent: round2(materials.markup ?? inputs.markupPercent),
          total: round2(materialsNet * (1 + (materials.markup ?? inputs.markupPercent) / 100)),
        },
        labour: {
          hours: totalLabourHours,
          rate: round2(totalLabourHours > 0 ? labourTotal / totalLabourHours : 0),
          total: labourTotal,
        },
        overheads: {
          travel: round2(profitability.jobOverheads?.travel ?? 0),
          permits: round2(profitability.jobOverheads?.permitsAndFees ?? 0),
          waste: round2(profitability.jobOverheads?.wasteDisposal ?? 0),
          business: round2(profitability.jobOverheads?.allocatedBusinessOverheads ?? 0),
          total: overheadsTotal,
        },
        contingency: { percent: contingencyPct, amount: contingencyAmt },
        breakEvenPoint: breakEven,
        subtotal: round2(materialsNet + labourTotal + overheadsTotal + contingencyAmt),
      },
      materials: (materials.items ?? []).map((it: any) => ({
        description: it.description || it.item || '',
        quantity: round2(it.quantity || 0),
        unit: it.unit || 'units',
        unitPrice: round2(it.unitPrice || 0),
        total: round2(it.total || 0),
        supplier: it.supplier || 'TBC',
        category: it.category || 'General',
        // New: provenance for the PDF audit trail. Template can opt to
        // render link + freshness + a "Review" badge for unmatched.
        productUrl: it.source?.productUrl ?? '',
        freshness: it.source?.freshness ?? '',
        scrapedAt: it.source?.scrapedAt ?? '',
        sourceTable: it.source?.table ?? 'estimated',
      })),
      labourTasks: (labour.tasks ?? []).map((t: any) => ({
        description: t.description || '',
        hours: round2(t.hours || 0),
        rate: round2(t.rate || 0),
        total: round2(t.total || 0),
        workerType: t.workerType || 'Qualified Electrician',
        // New: phase split (first-fix / second-fix / test-and-cert)
        phase: t.phase || 'second-fix',
      })),
      // New: BS 7671 compliance flags as plain text — no source labels.
      // PDF template can render under a "Compliance notes" section.
      complianceFlags: (structuredData?.complianceFlags ?? []).map((f: any) => ({
        message: f.message ?? '',
        // regulationRef is internal-only audit metadata for if/when
        // a regulator asks. Not normally rendered.
        regulationRef: f.regulationRef ?? '',
      })),
      // New: tier the user actually selected when sending. PDF
      // headline price should reflect this, not the AI default.
      selectedTier: {
        key: selectedTierKey,
        label: tierCells.find((t) => t.key === selectedTierKey)?.label ?? 'Target',
        amount: recommendedAmount,
        marginPercent: margin,
      },
      // New: floor-plan reading summary if a drawing was attached.
      floorplanSummary: structuredData?.floorplan
        ? {
            rooms: structuredData.floorplan.totals?.rooms ?? 0,
            sockets: structuredData.floorplan.totals?.sockets ?? 0,
            lights: structuredData.floorplan.totals?.lights ?? 0,
            confidence: structuredData.floorplan.confidence ?? 0,
          }
        : null,
      jobComplexity: structuredData?.complexity ?? null,
      risks: risks.map((r: any) => ({
        title: r.title || r.risk || '',
        severity: r.severity || 'medium',
        likelihood: r.likelihood || 'possible',
        mitigation: r.mitigation || '',
        contingencyPercent: round2(r.contingencyPercent || 0),
      })),
      pricingConfidence: confidence,
      upsells: upsells.map((u: any) => ({
        opportunity: u.opportunity || '',
        price: round2(u.price || 0),
        winRate: round2(u.winRate > 1 ? u.winRate / 100 : u.winRate),
        isHot: u.isHot || false,
        timing: u.timing || 'now',
        script: u.script || '',
      })),
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '4.0-editorial',
        pdfTemplate: 'cost-engineer-comprehensive',
      },
    };
  };

  const handleExportPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-cost-engineer-pdf', {
        body: buildPdfPayload(),
      });
      if (error) throw error;
      if (data.success && data.downloadUrl) {
        await openOrDownloadPdf(data.downloadUrl, data.filename || 'AI Cost Engineer.pdf');
        toast.success('PDF downloaded');
      } else {
        throw new Error(data.error || 'PDF generation failed');
      }
    } catch (err: any) {
      toast.error('PDF generation failed', { description: err?.message });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  /** Group materials by supplier for the cart export. */
  const materialsBySupplier = useMemo(() => {
    const groups = new Map<string, { supplier: string; lines: any[]; total: number }>();
    (materials.items ?? []).forEach((it: any) => {
      const supplier = it.supplier || 'Unmatched';
      if (!groups.has(supplier)) {
        groups.set(supplier, { supplier, lines: [], total: 0 });
      }
      const g = groups.get(supplier)!;
      g.lines.push(it);
      g.total += Number(it.total ?? 0);
    });
    return Array.from(groups.values()).sort((a, b) => b.total - a.total);
  }, [materials.items]);

  /**
   * Build a cart CSV (compatible with most supplier upload tools) and
   * trigger a download. We keep one row per item with quantity, name,
   * SKU/URL — the user can paste that into Screwfix's cart upload, CEF's
   * order tool, or just print it as a picking list.
   */
  const handleExportMaterials = (filterSupplier?: string) => {
    const items = (materials.items ?? []).filter(
      (it: any) => !filterSupplier || it.supplier === filterSupplier
    );
    if (items.length === 0) {
      toast.info('No matched materials to export');
      return;
    }
    const header = ['Quantity', 'Unit', 'Description', 'Supplier', 'Unit Price', 'Total', 'Product URL'];
    const rows = items.map((it: any) => [
      String(it.quantity ?? ''),
      String(it.unit ?? ''),
      String(it.description ?? '').replace(/"/g, '""'),
      String(it.supplier ?? ''),
      it.unitPrice ? Number(it.unitPrice).toFixed(2) : '',
      it.total ? Number(it.total).toFixed(2) : '',
      String(it.source?.productUrl ?? ''),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${c}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const supplierTag = filterSupplier ? `-${filterSupplier.replace(/\s+/g, '-').toLowerCase()}` : '';
    const projectTag = (inputs.projectName || 'estimate').replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40);
    a.href = url;
    a.download = `cost-engineer${supplierTag}-${projectTag}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Materials list exported${filterSupplier ? ` for ${filterSupplier}` : ''}`);
  };

  /**
   * Save the current inputs as a template. Lightweight prompt for a
   * name (defaults to project name); stored in cost_engineer_templates
   * for the user to apply on future briefings.
   */
  const handleSaveAsTemplate = async () => {
    const defaultName = inputs.projectName?.trim() || 'Untitled template';
    const name = window.prompt('Save as template — give it a memorable name', defaultName);
    if (!name || !name.trim()) return;
    setSavingTemplate(true);
    try {
      const { error } = await supabase.from('cost_engineer_templates').insert({
        name: name.trim().slice(0, 80),
        inputs: inputs as any,
        source_job_id: jobId ?? null,
      });
      if (error) throw error;
      toast.success('Template saved', {
        description: `Apply "${name.trim()}" from the briefing page next time.`,
      });
    } catch (err: any) {
      toast.error('Could not save template', { description: err?.message });
    } finally {
      setSavingTemplate(false);
    }
  };

  const confirmSendToQuoteHub = () => {
    if (!structuredData) {
      toast.error('No data to transfer');
      return;
    }
    const costOutput: CostEngineerOutput = {
      materials: (materials.items ?? []).map((it: any) => ({
        item: it.description || it.item || 'Material',
        quantity: it.quantity || 1,
        unitPrice: it.unitPrice || 0,
        supplier: it.supplier || 'TBC',
        total: it.total || (it.quantity || 0) * (it.unitPrice || 0),
      })),
      labour: {
        hours: totalLabourHours,
        rate: round2(totalLabourHours > 0 ? labourTotal / totalLabourHours : 50),
        total: labourTotal,
      },
      // Send the user's SELECTED tier price as the quote total — not the
      // break-even. Quote Hub treats this as the headline price the
      // client will see on the formal quotation.
      totalCost: recommendedAmount,
      vatAmount: summary.vat,
      breakdown: {
        materialsTotal: materialsNet,
        labourTotal,
      },
      valueEngineering,
    };
    const sessionId = `cost-transfer-${Date.now()}`;
    // Use the app's storage helper so Quote Builder (which reads via
    // storageGetJSONSync) finds the payload. Raw sessionStorage.setItem
    // writes to a different keystore on Capacitor and the read returns
    // null — that's what was eating the transfer silently.
    storageSetJSONSync(sessionId, {
      costData: costOutput,
      selectedTier: { key: selectedTierKey, amount: recommendedAmount, marginPercent: margin },
      projectContext: {
        projectName: inputs.projectName,
        description: rawResponse || '',
        location: inputs.location,
        projectType: inputs.projectType,
      },
    });
    toast.success(`Transferring ${tierCells.find((t) => t.key === selectedTierKey)?.label} tier to Quote Hub`);
    navigate(`/electrician/quote-builder/create?costSessionId=${sessionId}`);
  };

  /* ─── Render ──────────────────────────────────────────────── */
  const tierCells: Array<{
    key: 'minimum' | 'target' | 'premium';
    label: string;
    amount: number;
    isSelected: boolean;
    isAiRecommended: boolean;
  }> = [
    {
      key: 'minimum',
      label: 'Competitive',
      amount: tierMin,
      isSelected: selectedTierKey === 'minimum',
      isAiRecommended: aiRecommendedTier === 'minimum',
    },
    {
      key: 'target',
      label: 'Target',
      amount: tierTarget,
      isSelected: selectedTierKey === 'target',
      isAiRecommended: aiRecommendedTier === 'target',
    },
    {
      key: 'premium',
      label: 'Busy period',
      amount: tierPremium,
      isSelected: selectedTierKey === 'premium',
      isAiRecommended: aiRecommendedTier === 'premium',
    },
  ];

  return (
    <div className="bg-elec-dark min-h-screen pb-32 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky editorial header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4">
            <button
              type="button"
              onClick={onNewEstimate}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              New estimate
            </button>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 hidden sm:inline">
                Cost Engineer
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {inputs.projectName}
              </h1>
            </div>
            <div className="hidden sm:inline-flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 font-medium">
                BS 7671:2018+A4:2026
              </span>
              <span className="h-3 w-px bg-white/10" aria-hidden />
            </div>
            <button
              type="button"
              onClick={() => setClientView((v) => !v)}
              aria-pressed={clientView}
              className={cn(
                'text-[11px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap rounded-full px-2.5 py-0.5 border transition-colors touch-manipulation',
                clientView
                  ? 'bg-elec-yellow text-black border-elec-yellow'
                  : 'text-white/70 border-white/15 hover:border-white/30 hover:text-white'
              )}
            >
              {clientView ? 'Client view · on' : 'Client view'}
            </button>
            {!clientView && (
              <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-400 font-semibold">
                Complete
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 space-y-9 sm:space-y-12">
        {/* HERO ─────────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <Eyebrow>
              {refineOf
                ? `REFINED ESTIMATE${refineMode ? ` · ${refineModeLabel[refineMode] ?? refineMode}` : ''}`
                : 'QUOTE READY'}
            </Eyebrow>
            {refineOf && onViewOriginal && (
              <button
                type="button"
                onClick={onViewOriginal}
                className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation underline-offset-4 hover:underline"
              >
                View original →
              </button>
            )}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[34px] sm:text-[44px] lg:text-[52px] font-semibold tracking-tight leading-[1.05] text-white"
          >
            <span className="text-elec-yellow tabular-nums">{fmtGBP(recommendedAmount)}</span>
            <span className="text-white/40"> · </span>
            <span className="text-white">recommended.</span>
          </motion.h2>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-2xl">
            {regionLabel} pricing · {totalLabourHours.toFixed(1)} labour hours · margin{' '}
            {margin.toFixed(1)}% · profit per hour {fmtGBP2(profitPerHour)}.
          </p>
          {/* VAT breakdown — quiet sub-line so the user sees subtotal vs incl-VAT */}
          {summary.vat !== undefined && (
            <div className="text-[11.5px] text-white/55 tabular-nums flex flex-wrap gap-x-3 gap-y-0.5">
              <span>
                Subtotal{' '}
                <span className="text-white/75">{fmtGBP2(recommendedAmount)}</span>
              </span>
              {summary.vat > 0 && (
                <>
                  <span className="text-white/30">·</span>
                  <span>
                    VAT 20%{' '}
                    <span className="text-white/75">
                      {fmtGBP2(round2(recommendedAmount * 0.2))}
                    </span>
                  </span>
                  <span className="text-white/30">·</span>
                  <span>
                    Total inc VAT{' '}
                    <span className="text-white/85">
                      {fmtGBP2(round2(recommendedAmount * 1.2))}
                    </span>
                  </span>
                </>
              )}
              {summary.vat === 0 && (
                <>
                  <span className="text-white/30">·</span>
                  <span className="text-white/55">No VAT applied</span>
                </>
              )}
            </div>
          )}
        </section>

        {/* Refinement strip — internal sales tool, hidden in client view. */}
        {onRefine && jobId && !clientView && (
          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow>REFINE</Eyebrow>
              <span className="text-[11px] text-white/55">
                Generates a new estimate based on this one
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => onRefine('cheaper')}
                className="group bg-[hsl(0_0%_10%)] border border-white/[0.10] hover:border-elec-yellow/40 rounded-2xl p-4 text-left transition-colors active:scale-[0.99] touch-manipulation"
              >
                <div className="text-[14px] font-semibold text-white">Make it cheaper</div>
                <div className="mt-1 text-[12px] text-white/60 leading-snug">
                  Value-grade swaps and customer-supplied options. Drop the optional bits.
                </div>
              </button>
              <button
                type="button"
                onClick={() => onRefine('premium')}
                className="group bg-[hsl(0_0%_10%)] border border-white/[0.10] hover:border-elec-yellow/40 rounded-2xl p-4 text-left transition-colors active:scale-[0.99] touch-manipulation"
              >
                <div className="text-[14px] font-semibold text-white">Make it premium</div>
                <div className="mt-1 text-[12px] text-white/60 leading-snug">
                  MK Logic, brushed brass, RCBOs throughout, SPD, smart fittings.
                </div>
              </button>
              <button
                type="button"
                onClick={() => onRefine('phase')}
                className="group bg-[hsl(0_0%_10%)] border border-white/[0.10] hover:border-elec-yellow/40 rounded-2xl p-4 text-left transition-colors active:scale-[0.99] touch-manipulation"
              >
                <div className="text-[14px] font-semibold text-white">Phase across visits</div>
                <div className="mt-1 text-[12px] text-white/60 leading-snug">
                  Split into first-fix and second-fix visits to spread cost / VAT.
                </div>
              </button>
            </div>
          </section>
        )}

        {/* Headline strip ─────────────────────────────── */}
        {/* Hidden in client view — break-even / profit / margin are
            commercial internals the customer shouldn't see. */}
        {!clientView && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
            <HeadlineCell label="Break-even" value={fmtGBP(breakEven)} tone="white" />
            <HeadlineCell label="Profit" value={fmtGBP(profit)} tone="yellow" />
            <HeadlineCell label="Margin" value={`${margin.toFixed(1)}%`} tone="white" />
            <HeadlineCell label="Confidence" value={`${avgConfidence}%`} tone="white" />
          </section>
        )}

        {/* Refinement diff strip — only on refined views, never client. */}
        {diff && !clientView && (
          <section className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-elec-yellow/20 sm:rounded-2xl py-4 px-4 sm:p-5">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                vs Original
              </span>
              <span className="text-[11px] text-white/55 tabular-nums">
                Was {fmtGBP(diff.parentRecommended)} → now {fmtGBP(diff.currentRecommended)}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-px bg-black border border-white/[0.06] rounded-xl overflow-hidden">
              <DiffCell
                label="Total"
                value={`${diff.delta >= 0 ? '+' : '−'}${fmtGBP(Math.abs(diff.delta))}`}
                tone={diff.delta < 0 ? 'good' : diff.delta > 0 ? 'warn' : 'neutral'}
              />
              <DiffCell
                label="Change"
                value={`${diff.deltaPct >= 0 ? '+' : ''}${diff.deltaPct.toFixed(1)}%`}
                tone={diff.deltaPct < 0 ? 'good' : diff.deltaPct > 0 ? 'warn' : 'neutral'}
              />
              <DiffCell
                label="Hours"
                value={`${diff.hoursDelta >= 0 ? '+' : ''}${diff.hoursDelta.toFixed(1)}h`}
                tone="neutral"
              />
              <DiffCell
                label="Items"
                value={`+${diff.addedCount} / −${diff.removedCount}`}
                tone="neutral"
              />
            </div>
            {(diff.added.length > 0 || diff.removed.length > 0) && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
                {diff.added.length > 0 && (
                  <div>
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-400/80 mb-1">
                      Added
                    </div>
                    <ul className="space-y-1">
                      {diff.added.map((it: any, i: number) => (
                        <li key={i} className="text-white/75 leading-snug truncate">
                          + {it.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {diff.removed.length > 0 && (
                  <div>
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400/80 mb-1">
                      Removed
                    </div>
                    <ul className="space-y-1">
                      {diff.removed.map((it: any, i: number) => (
                        <li key={i} className="text-white/75 leading-snug truncate">
                          − {it.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Warnings strip — scanned PDFs, margin floor, etc */}
        {(attachmentErrors.length > 0 || marginFloorEngaged) && (
          <section className="space-y-2">
            {marginFloorEngaged && (
              <div className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-amber-400/40 sm:rounded-2xl py-4 px-4 sm:p-4 flex items-start gap-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400 shrink-0 mt-0.5">
                  Margin floor
                </span>
                <div className="text-[12.5px] text-white/85 leading-snug">
                  Your target margin was below your minimum margin policy — quote pushed up to the
                  minimum-margin tier. Review your business settings to fix.
                </div>
              </div>
            )}
            {attachmentErrors.map((e, i) => (
              <div
                key={i}
                className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-amber-400/40 sm:rounded-2xl py-4 px-4 sm:p-4 flex items-start gap-3"
              >
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400 shrink-0 mt-0.5">
                  Attachment
                </span>
                <div className="text-[12.5px] text-white/85 leading-snug flex-1">
                  <span className="font-semibold text-white">{e.fileName}</span> — {e.reason}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 01 BRIEFING RECAP ──────────────────────────── */}
        <Section
          number="01"
          eyebrow="BRIEFING"
          title="What you asked for."
          aside={
            inputs.attachments.length > 0
              ? `${inputs.attachments.length} attachment${inputs.attachments.length === 1 ? '' : 's'}`
              : undefined
          }
        >
          <div className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-white/[0.10] sm:rounded-2xl py-4 px-4 sm:p-5 space-y-3">
            <p className="text-[13.5px] leading-relaxed text-white/80 whitespace-pre-wrap">
              {inputs.description}
            </p>
            {(inputs.projectType || inputs.location) && (
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-white border border-white/15 bg-white/[0.04] rounded-full px-2.5 py-0.5 capitalize">
                  {inputs.projectType}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/[0.06] rounded-full px-2.5 py-0.5">
                  {regionLabel}
                </span>
                {inputs.location && (
                  <span className="text-[11px] text-white/65 truncate">{inputs.location}</span>
                )}
              </div>
            )}
            {inputs.attachments.length > 0 && (
              <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Attachments referenced
                </div>
                <ul className="space-y-1">
                  {inputs.attachments.map((a, i) => (
                    <li key={a.id} className="text-[12.5px] text-white/75 flex items-baseline gap-2">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-white/45 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate">{a.fileName}</span>
                      <span className="text-white/40 text-[11px] uppercase tracking-[0.14em]">
                        {a.kind}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>

        {/* 02 PRICING TIERS ────────────────────────── */}
        <Section
          number="02"
          eyebrow="PRICING TIERS"
          title="Three-tier quote."
          aside="Tap a tier to select"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tierCells.map((tier) => (
              <button
                key={tier.key}
                type="button"
                onClick={() => setSelectedTierKey(tier.key)}
                aria-pressed={tier.isSelected}
                className={cn(
                  'group relative bg-[hsl(0_0%_10%)] border rounded-2xl p-5 text-left transition-all touch-manipulation',
                  'hover:border-white/25 active:scale-[0.99]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
                  tier.isSelected
                    ? 'border-elec-yellow shadow-[0_0_0_1px_rgb(250_204_21_/_0.4)]'
                    : 'border-white/[0.10]'
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className={cn(
                      'text-[10.5px] font-semibold uppercase tracking-[0.18em]',
                      tier.isSelected ? 'text-elec-yellow' : 'text-white/55'
                    )}
                  >
                    {tier.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {tier.isAiRecommended && !tier.isSelected && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 border border-white/15 rounded-full px-1.5 py-0.5">
                        AI pick
                      </span>
                    )}
                    {tier.isSelected && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.06] rounded-full px-1.5 py-0.5">
                        Selected
                      </span>
                    )}
                    {/* Win-rate chip — only on target tier when we have
                        enough data. Hidden in client view (commercial). */}
                    {!clientView && tier.key === 'target' && winStats && (
                      <span
                        className={cn(
                          'text-[10px] font-semibold uppercase tracking-[0.18em] border rounded-full px-1.5 py-0.5',
                          winStats.winPct >= 50
                            ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/[0.06]'
                            : 'text-amber-400 border-amber-400/30 bg-amber-400/[0.06]'
                        )}
                        title={`Based on your last ${winStats.decided} decided quotes`}
                      >
                        {winStats.winPct}% wins
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={cn(
                    'mt-2 text-[28px] sm:text-[32px] font-semibold tracking-tight tabular-nums',
                    tier.isSelected ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {fmtGBP(tier.amount)}
                </div>
                {!clientView && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11.5px]">
                    <div>
                      <div className="text-white/50 uppercase tracking-[0.14em] text-[10px] font-semibold">
                        Profit
                      </div>
                      <div className="text-white tabular-nums">
                        {fmtGBP(tier.amount - breakEven)}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/50 uppercase tracking-[0.14em] text-[10px] font-semibold">
                        Margin
                      </div>
                      <div className="text-white tabular-nums">
                        {tier.amount > 0
                          ? (((tier.amount - breakEven) / tier.amount) * 100).toFixed(1)
                          : '0.0'}
                        %
                      </div>
                    </div>
                  </div>
                )}
                {clientView && (
                  <div className="mt-2 text-[11.5px] text-white/55">
                    {tier.key === 'minimum'
                      ? 'Best value — covers the essentials.'
                      : tier.key === 'target'
                        ? 'Recommended balance.'
                        : 'Premium spec.'}
                  </div>
                )}
              </button>
            ))}
          </div>
        </Section>

        {/* 03 MATERIALS ──────────────────────────── */}
        <Section
          number="03"
          eyebrow="MATERIALS"
          title="Line items."
          aside={`${(materials.items ?? []).length} items · ${fmtGBP(materialsNet)} net`}
        >
          <div className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-white/[0.08] sm:rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3 border-b border-white/[0.06] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
              <div className="col-span-5">Item</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-2 text-right">Unit £</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {(materials.items ?? []).map((it: any, i: number) => {
                const src = it.source ?? null;
                const isLive = src?.table === 'marketplace_products';
                const productUrl: string | null = isLive ? src.productUrl : null;
                const freshness: string | null = isLive ? src.freshness : null;
                return (
                  <div
                    key={i}
                    className="px-4 sm:px-5 py-3 sm:grid sm:grid-cols-12 sm:gap-3 sm:items-baseline"
                  >
                    <div className="sm:col-span-5">
                      <div className="text-[14px] font-medium text-white">
                        {it.description || it.item}
                      </div>
                      <div className="text-[11px] text-white/55 flex flex-wrap items-center gap-1.5 mt-0.5">
                        <span>{it.category ?? 'General'}</span>
                        {/* Supplier + freshness + review chips are
                            internal trust signals — hidden in client view. */}
                        {!clientView && it.supplier && (
                          <>
                            <span className="text-white/30">·</span>
                            {productUrl ? (
                              <a
                                href={productUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-elec-yellow/80 hover:text-elec-yellow underline-offset-2 hover:underline touch-manipulation"
                              >
                                {it.supplier}
                              </a>
                            ) : (
                              <span>{it.supplier}</span>
                            )}
                          </>
                        )}
                        {!clientView && freshness && (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] border border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-400/80 rounded-full px-1.5 py-0.5">
                            {freshness}
                          </span>
                        )}
                        {!clientView && !isLive && src?.table === 'estimated' && (
                          <span className="inline-flex items-center text-[10px] uppercase tracking-[0.14em] border border-amber-400/40 bg-amber-400/[0.06] text-amber-400 rounded-full px-1.5 py-0.5">
                            Review
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:text-right text-[12.5px] tabular-nums text-white/75 mt-1 sm:mt-0">
                      <span className="sm:hidden text-white/50">Qty: </span>
                      {it.quantity} {it.unit}
                    </div>
                    <div className="sm:col-span-2 sm:text-right text-[12.5px] tabular-nums text-white/75">
                      <span className="sm:hidden text-white/50">Unit: </span>
                      {fmtGBP2(it.unitPrice ?? 0)}
                    </div>
                    <div className="sm:col-span-3 sm:text-right text-[14px] font-semibold tabular-nums text-elec-yellow">
                      {fmtGBP2(it.total ?? 0)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-5 py-3 border-t border-white/[0.06] flex justify-between text-[12px] text-white/65">
              <span className="uppercase tracking-[0.18em] text-[10px] font-semibold">Subtotal</span>
              <span className="tabular-nums font-semibold text-white">{fmtGBP2(materialsNet)}</span>
            </div>
          </div>
        </Section>

        {/* 04 LABOUR ──────────────────────────── */}
        <Section
          number="04"
          eyebrow="LABOUR"
          title="Tasks & hours."
          aside={`${totalLabourHours.toFixed(1)} h · ${fmtGBP(labourTotal)}`}
        >
          <div className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-white/[0.08] sm:rounded-2xl overflow-hidden">
            {(['first-fix', 'second-fix', 'test-and-cert'] as const).map((phase) => {
              const phaseTasks = (labour.tasks ?? []).filter(
                (t: any) => (t.phase ?? 'second-fix') === phase
              );
              if (phaseTasks.length === 0) return null;
              const phaseHours = phaseTasks.reduce(
                (s: number, t: any) => s + Number(t.hours ?? 0),
                0
              );
              const phaseTotal = phaseTasks.reduce(
                (s: number, t: any) => s + Number(t.total ?? 0),
                0
              );
              const phaseLabel: Record<typeof phase, string> = {
                'first-fix': 'First fix',
                'second-fix': 'Second fix',
                'test-and-cert': 'Test & cert',
              };
              return (
                <div key={phase}>
                  <div className="px-4 sm:px-5 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-baseline justify-between gap-3">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                      {phaseLabel[phase]}
                    </span>
                    <span className="text-[11px] tabular-nums text-white/55">
                      {phaseHours.toFixed(1)} h · {fmtGBP2(phaseTotal)}
                    </span>
                  </div>
                  <div className="divide-y divide-white/[0.06]">
                    {phaseTasks.map((t: any, i: number) => (
                      <div
                        key={i}
                        className="px-4 sm:px-5 py-3 sm:grid sm:grid-cols-12 sm:gap-3 sm:items-baseline"
                      >
                        <div className="sm:col-span-6">
                          <div className="text-[14px] font-medium text-white">{t.description}</div>
                          <div className="text-[11px] text-white/50">
                            {t.workerType ?? 'Qualified electrician'}
                          </div>
                        </div>
                        <div className="sm:col-span-2 sm:text-right text-[12.5px] tabular-nums text-white/75 mt-1 sm:mt-0">
                          <span className="sm:hidden text-white/50">Hours: </span>
                          {round2(t.hours ?? 0)}h
                        </div>
                        <div className="sm:col-span-2 sm:text-right text-[12.5px] tabular-nums text-white/75">
                          <span className="sm:hidden text-white/50">Rate: </span>
                          {fmtGBP2(t.rate ?? 0)}/h
                        </div>
                        <div className="sm:col-span-2 sm:text-right text-[14px] font-semibold tabular-nums text-elec-yellow">
                          {fmtGBP2(t.total ?? 0)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="px-5 py-3 border-t border-white/[0.06] flex justify-between text-[12px] text-white/65">
              <span className="uppercase tracking-[0.18em] text-[10px] font-semibold">Subtotal</span>
              <span className="tabular-nums font-semibold text-white">{fmtGBP2(labourTotal)}</span>
            </div>
          </div>
        </Section>

        {/* 05 OVERHEADS ──────────────────────────── */}
        <Section number="05" eyebrow="OVERHEADS & CONTINGENCY" title="Job costs.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ['Travel', profitability.jobOverheads?.travel],
              ['Permits & fees', profitability.jobOverheads?.permitsAndFees],
              ['Waste disposal', profitability.jobOverheads?.wasteDisposal],
              ['Allocated business overheads', profitability.jobOverheads?.allocatedBusinessOverheads],
            ].map(([label, value]) => (
              <div key={String(label)} className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  {label}
                </div>
                <div className="mt-1 text-[16px] font-semibold tabular-nums text-white">
                  {fmtGBP2(Number(value) || 0)}
                </div>
              </div>
            ))}
            <div className="bg-[hsl(0_0%_10%)] border border-elec-yellow/40 rounded-2xl p-4 sm:col-span-2">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                    Contingency
                  </div>
                  <div className="text-[12px] text-white/60 mt-0.5">
                    {contingencyPct}% of materials + labour
                  </div>
                </div>
                <div className="text-[20px] font-semibold tabular-nums text-elec-yellow">
                  {fmtGBP2(contingencyAmt)}
                </div>
              </div>
              {contingencyReasons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-elec-yellow/20">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60 mb-1.5">
                    Why this much
                  </div>
                  <ul className="space-y-1">
                    {contingencyReasons.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-baseline gap-2 text-[12px] text-white/80 leading-snug"
                      >
                        <span className="text-elec-yellow tabular-nums shrink-0 w-10">
                          +{r.pct.toFixed(1)}%
                        </span>
                        <span className="flex-1">{r.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* 06 CONFIDENCE — internal trust dashboard, hidden in client view. */}
        {!clientView && (
        <Section
          number="06"
          eyebrow="CONFIDENCE"
          title="How sure are we?"
          aside={
            matsMatched !== undefined && matsTotal !== undefined
              ? `${matsMatched} of ${matsTotal} materials matched`
              : undefined
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ConfidenceCell
              label="Materials"
              value={matsConfidence}
              caption={
                matsMatched !== undefined && matsTotal !== undefined
                  ? `${matsMatched}/${matsTotal} priced live`
                  : undefined
              }
            />
            <ConfidenceCell label="Labour" value={labourConfidence} />
            <ConfidenceCell label="Overall" value={avgConfidence} highlight />
          </div>
        </Section>
        )}

        {/* 07 RISK ──────────────────────────── */}
        {risks.length > 0 && (
          <Section number="07" eyebrow="RISK" title="What could blow the price.">
            <div className="space-y-3">
              {risks.map((r: any, i: number) => {
                const sev = String(r.severity || 'medium').toLowerCase();
                const tone =
                  sev === 'critical' || sev === 'high'
                    ? 'border-red-500/40 text-red-400'
                    : sev === 'low'
                      ? 'border-emerald-500/30 text-emerald-400'
                      : 'border-amber-500/40 text-amber-400';
                return (
                  <div
                    key={i}
                    className={cn('bg-[hsl(0_0%_10%)] border rounded-2xl p-4', tone)}
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-white/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={cn('text-[10.5px] uppercase tracking-[0.18em] font-semibold', tone)}>
                        {sev}
                      </span>
                    </div>
                    <div className="mt-1 text-[14.5px] font-semibold text-white">{r.title || r.risk}</div>
                    {r.mitigation && (
                      <div className="mt-1 text-[12.5px] text-white/70 leading-snug">
                        Mitigation: {r.mitigation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* 08 UPSELLS ──────────────────────────── */}
        {upsells.length > 0 && (
          <Section number="08" eyebrow="UPSELLS" title="Worth offering.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {upsells.map((u: any, i: number) => {
                const winRate = u.winRate > 1 ? u.winRate : Math.round((u.winRate || 0) * 100);
                return (
                  <div
                    key={i}
                    className={cn(
                      'bg-[hsl(0_0%_10%)] border rounded-2xl p-4',
                      u.isHot ? 'border-elec-yellow/60' : 'border-white/[0.10]'
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14.5px] font-semibold text-white">{u.opportunity}</span>
                      <span className="text-[14px] font-semibold tabular-nums text-elec-yellow">
                        +{fmtGBP(u.price ?? 0)}
                      </span>
                    </div>
                    <div className="mt-1 text-[11.5px] text-white/55 tabular-nums">
                      Win rate {winRate}% · timing: {u.timing ?? 'now'}
                    </div>
                    {u.script && (
                      <div className="mt-2 text-[12px] text-white/75 leading-snug italic">"{u.script}"</div>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* 09 COMPLIANCE FLAGS ───────────────────── */}
        {complianceFlags.length > 0 && (
          <Section
            number="09"
            eyebrow="COMPLIANCE"
            title="What to flag with the client."
            aside="BS 7671:2018+A4:2026"
          >
            <div className="space-y-2">
              {complianceFlags.map((flag: any, i: number) => (
                <div
                  key={i}
                  className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 flex items-start gap-3"
                >
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-white/45 shrink-0 mt-0.5 w-7">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="text-[13px] text-white/85 leading-snug flex-1">{flag.message}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 10 LIVE DEALS ─────────────────────────── */}
        {liveDeals.length > 0 && (
          <Section number="10" eyebrow="LIVE DEALS" title="Active discounts right now.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {liveDeals.map((d: any) => (
                <a
                  key={d.id}
                  href={d.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[hsl(0_0%_10%)] border border-elec-yellow/30 hover:border-elec-yellow/60 rounded-2xl p-4 transition-colors active:scale-[0.99] touch-manipulation"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[13.5px] font-semibold text-white truncate">
                      {d.productName}
                    </span>
                    {d.discountPercentage && (
                      <span className="text-[12px] font-semibold tabular-nums text-elec-yellow shrink-0">
                        {Math.round(d.discountPercentage)}% off
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[11.5px] text-white/55 tabular-nums">
                    {d.supplier} · {d.dealPrice ? fmtGBP2(d.dealPrice) : 'see price'}
                  </div>
                </a>
              ))}
            </div>
          </Section>
        )}

        {/* 11 COUPONS ────────────────────────────── */}
        {liveCoupons.length > 0 && (
          <Section number="11" eyebrow="COUPONS" title="Verified codes you can use.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {liveCoupons.map((c: any) => (
                <div
                  key={`${c.supplierSlug}-${c.code}`}
                  className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[14px] font-semibold tabular-nums text-elec-yellow">
                      {c.code}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-[0.18em] text-white/55">
                      {c.supplier}
                    </span>
                  </div>
                  {c.description && (
                    <div className="mt-1 text-[12px] text-white/70 leading-snug">{c.description}</div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 12 ORDER MATERIALS — internal procurement tool, hidden in client view. */}
        {!clientView && materialsBySupplier.filter((g) => g.supplier !== 'Unmatched' && g.total > 0).length > 0 && (
          <Section
            number="12"
            eyebrow="ORDER LIST"
            title="Send to your supplier."
            aside="Download a CSV per supplier — paste straight into their cart"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {materialsBySupplier
                .filter((g) => g.supplier !== 'Unmatched' && g.total > 0)
                .map((g) => (
                  <button
                    key={g.supplier}
                    type="button"
                    onClick={() => handleExportMaterials(g.supplier)}
                    className="bg-[hsl(0_0%_10%)] border border-white/[0.10] hover:border-elec-yellow/40 rounded-2xl p-4 text-left transition-colors active:scale-[0.99] touch-manipulation"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] font-semibold text-white">{g.supplier}</span>
                      <span className="text-[13px] tabular-nums text-elec-yellow">
                        {fmtGBP2(g.total)}
                      </span>
                    </div>
                    <div className="mt-1 text-[11.5px] text-white/55 tabular-nums">
                      {g.lines.length} item{g.lines.length === 1 ? '' : 's'} · download CSV
                    </div>
                  </button>
                ))}
            </div>
            <button
              type="button"
              onClick={() => handleExportMaterials()}
              className="mt-3 h-11 px-4 bg-[hsl(0_0%_10%)] border border-white/[0.10] hover:border-white/25 rounded-xl text-[13px] font-medium text-white transition-colors active:scale-[0.99] touch-manipulation"
            >
              Download all materials (one CSV)
            </button>
          </Section>
        )}

        {/* ACTION STRIP ─────────────────────────────── */}
        <section className="space-y-3 pt-4">
          <Eyebrow>ACTIONS</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setShowQuoteHubConfirm(true)}
              className="h-12 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation transition-colors"
            >
              Send to Quote Hub
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              disabled={isGeneratingPDF}
              className="h-12 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.10] text-white text-[13px] font-medium hover:border-white/20 disabled:opacity-50 active:scale-[0.98] touch-manipulation transition-colors"
            >
              {isGeneratingPDF ? 'Generating…' : 'Download PDF'}
            </button>
            <button
              type="button"
              onClick={onNewEstimate}
              className="h-12 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.10] text-white text-[13px] font-medium hover:border-white/20 active:scale-[0.98] touch-manipulation transition-colors"
            >
              New estimate
            </button>
          </div>
          {/* Secondary actions — saving as a template + edit/regenerate
              are repeat-business and daily-QoL features so they live as
              quieter ghost buttons under the main strip. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSaveAsTemplate}
              disabled={savingTemplate}
              className="h-11 rounded-xl bg-transparent border border-white/[0.08] text-white/80 text-[13px] font-medium hover:border-white/20 hover:text-white disabled:opacity-50 active:scale-[0.98] touch-manipulation transition-colors"
            >
              {savingTemplate ? 'Saving…' : 'Save as template'}
            </button>
            {onEditAndRegenerate && (
              <button
                type="button"
                onClick={onEditAndRegenerate}
                className="h-11 rounded-xl bg-transparent border border-white/[0.08] text-white/80 text-[13px] font-medium hover:border-white/20 hover:text-white active:scale-[0.98] touch-manipulation transition-colors"
              >
                Edit brief &amp; regenerate
              </button>
            )}
          </div>
        </section>
      </main>

      <ConfirmationDialog
        open={showQuoteHubConfirm}
        onOpenChange={setShowQuoteHubConfirm}
        onConfirm={confirmSendToQuoteHub}
        title={`Send ${tierCells.find((t) => t.key === selectedTierKey)?.label} tier?`}
        description={`Transfers ${fmtGBP(recommendedAmount)} (${margin.toFixed(1)}% margin) to Quote Builder where you can finalise and send the formal quotation.`}
        confirmText="Continue to Quote Hub"
        cancelText="Cancel"
      />
    </div>
  );
};

/* ─── Sub-components ───────────────────────────── */

const DiffCell = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'good' | 'warn' | 'neutral';
}) => (
  <div className="bg-[hsl(0_0%_10%)] px-3 py-3 sm:px-4 sm:py-3.5">
    <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
      {label}
    </div>
    <div
      className={cn(
        'mt-1 text-[14px] sm:text-[15px] font-semibold tabular-nums',
        tone === 'good' && 'text-emerald-400',
        tone === 'warn' && 'text-amber-400',
        tone === 'neutral' && 'text-white'
      )}
    >
      {value}
    </div>
  </div>
);

const HeadlineCell = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'yellow' | 'white';
}) => (
  <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">{label}</div>
    <div
      className={cn(
        'mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums',
        tone === 'yellow' ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {value}
    </div>
  </div>
);

const Section = ({
  number,
  eyebrow,
  title,
  aside,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  aside?: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-4 sm:space-y-5">
    <div className="flex items-baseline justify-between gap-3 flex-wrap">
      <div className="space-y-1">
        <Eyebrow>
          {number} · {eyebrow}
        </Eyebrow>
        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
          {title}
        </h3>
      </div>
      {aside && (
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/55 tabular-nums">{aside}</span>
      )}
    </div>
    {children}
  </section>
);

const ConfidenceCell = ({
  label,
  value,
  highlight,
  caption,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  caption?: string;
}) => (
  <div
    className={cn(
      'bg-[hsl(0_0%_10%)] border rounded-2xl p-4 space-y-3',
      highlight ? 'border-elec-yellow/40' : 'border-white/[0.10]'
    )}
  >
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</span>
      <span
        className={cn(
          'text-[20px] font-semibold tabular-nums',
          highlight ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}%
      </span>
    </div>
    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className={cn('h-full rounded-full', highlight ? 'bg-elec-yellow' : 'bg-white/40')}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
    {caption && <div className="text-[10.5px] tabular-nums text-white/45">{caption}</div>}
  </div>
);
