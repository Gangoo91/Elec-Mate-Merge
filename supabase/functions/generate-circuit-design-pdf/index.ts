import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const CIRCUIT_DESIGN_TEMPLATE_ID = 'DF1DE972-30B4-45F9-83C0-4CEB4DE90E70';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[CIRCUIT-PDF] Request started');

    if (!PDFMONKEY_API_KEY) {
      console.error('[CIRCUIT-PDF] PDFMONKEY_API_KEY not configured');
      return new Response(
        JSON.stringify({
          success: false,
          useFallback: true,
          error: 'PDFMONKEY_API_KEY not configured',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { design, layout, stats, cost, a4, userId } = await req.json();

    if (!design) {
      return new Response(JSON.stringify({ error: 'Design data is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('[CIRCUIT-PDF] Processing design:', design.projectName);

    // Get user's custom template if configured
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let templateId = CIRCUIT_DESIGN_TEMPLATE_ID;

    if (userId) {
      const { data: template } = await supabase
        .from('pdf_templates')
        .select('*')
        .eq('user_id', userId)
        .eq('type', 'circuit_design')
        .eq('is_active', true)
        .single();

      if (template?.pdf_monkey_template_id) {
        templateId = template.pdf_monkey_template_id;
        console.log('[CIRCUIT-PDF] Using custom template:', templateId);
      }
    }

    // ✨ DIRECT PASS-THROUGH: No fallbacks, no computation, no transformation
    // Frontend sends complete data, we just pass it to PDF Monkey with minimal metadata
    const payload = {
      // === METADATA (only things we add) ===
      generatedDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      date: new Date().toLocaleDateString('en-GB'),
      designReference: `REF-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,

      // === PASS-THROUGH: Everything else comes directly from frontend ===
      projectName: design.projectName,
      location: design.location,
      clientName: design.clientName,
      electricianName: design.electricianName,
      installationType: design.installationType,

      // === SUPPLY (the actual designer output uses `supply`, not
      // `consumerUnit`). Build a synthetic consumerUnit for legacy
      // template compat plus map every flat field the template needs. ===
      voltage: design.supply?.voltage ?? design.consumerUnit?.incomingSupply?.voltage,
      phases:
        (design.supply?.phases ?? design.consumerUnit?.incomingSupply?.phases) === 'single'
          ? 'Single Phase'
          : 'Three Phase',
      voltageDisplay: `${design.supply?.voltage ?? design.consumerUnit?.incomingSupply?.voltage ?? 230}V ${
        (design.supply?.phases ?? design.consumerUnit?.incomingSupply?.phases) === 'single'
          ? 'Single Phase'
          : 'Three Phase'
      }`,
      earthingSystem: design.supply?.earthingSystem ?? design.consumerUnit?.incomingSupply?.earthingSystem,
      ze: design.supply?.ze ?? design.supply?.Ze ?? design.consumerUnit?.incomingSupply?.Ze,
      pscc: design.supply?.pfc ?? design.supply?.pscc ?? design.consumerUnit?.incomingSupply?.incomingPFC,
      mainSwitchRating: design.supply?.mainSwitchRating ?? design.consumerUnit?.mainSwitchRating,
      consumerUnitRating: design.supply?.mainSwitchRating ?? design.consumerUnit?.mainSwitchRating,
      consumerUnit: {
        type: design.consumerUnit?.type ?? 'Consumer unit',
        mainSwitchRating: design.supply?.mainSwitchRating ?? design.consumerUnit?.mainSwitchRating ?? 100,
        ways: design.consumerUnit?.ways ?? design.circuits?.length ?? 0,
        incomingSupply: {
          voltage: design.supply?.voltage ?? design.consumerUnit?.incomingSupply?.voltage ?? 230,
          phases: design.supply?.phases ?? design.consumerUnit?.incomingSupply?.phases ?? 'single',
          earthingSystem: design.supply?.earthingSystem ?? design.consumerUnit?.incomingSupply?.earthingSystem ?? 'TN-S',
          Ze: design.supply?.ze ?? design.supply?.Ze ?? design.consumerUnit?.incomingSupply?.Ze ?? 0,
          incomingPFC: design.supply?.pfc ?? design.supply?.pscc ?? design.consumerUnit?.incomingSupply?.incomingPFC ?? 0,
        },
      },

      // === DESIGN AUDIT (criticReview from designer agent) ===
      criticReview: design.criticReview ?? null,
      auditFindings: Array.isArray(design.criticReview?.findings)
        ? design.criticReview.findings
        : [],
      auditFindingCount: Array.isArray(design.criticReview?.findings)
        ? design.criticReview.findings.length
        : 0,
      auditErrorCount: Array.isArray(design.criticReview?.findings)
        ? design.criticReview.findings.filter((f: any) => f.severity === 'error').length
        : 0,
      auditWarnCount: Array.isArray(design.criticReview?.findings)
        ? design.criticReview.findings.filter((f: any) => f.severity === 'warning').length
        : 0,

      // === COMPLIANCE CONCERNS (failing circuits with reason) ===
      // Only include circuits with an actual concrete reason — non-pass with
      // no reason adds noise (rows of empty bars) and tells the reader nothing.
      failingCircuits: (design.circuits ?? [])
        .map((c: any, i: number) => {
          if (c.complianceStatus === 'pass') return null;
          const reasons: string[] = [];
          if (c.calculations?.zs && c.calculations?.maxZs && c.calculations.zs >= c.calculations.maxZs) {
            reasons.push(`Zs ${c.calculations.zs.toFixed(2)}Ω ≥ max ${c.calculations.maxZs.toFixed(2)}Ω`);
          }
          if (c.calculations?.voltageDrop?.compliant === false) {
            reasons.push(`VD ${c.calculations.voltageDrop.percent?.toFixed(1)}% > limit`);
          }
          if (c.calculations?.Iz && c.protectionDevice?.rating && c.calculations.Iz < c.protectionDevice.rating) {
            reasons.push(`Iz ${c.calculations.Iz.toFixed(0)}A < In ${c.protectionDevice.rating}A`);
          }
          (c.validationIssues ?? []).forEach((v: any) => {
            if (typeof v === 'string') reasons.push(v);
            else if (v?.message) reasons.push(v.message);
          });
          if (reasons.length === 0) return null;
          return {
            circuitNumber: i + 1,
            name: c.name,
            status: c.complianceStatus,
            reasons: reasons.join(' · '),
          };
        })
        .filter(Boolean),

      // === COHERENCE WARNINGS (multi-board issues from layout) ===
      coherenceWarnings: Array.isArray(layout?.warnings) ? layout.warnings : [],

      // === HEADLINE STATS ===
      stats: stats
        ? (() => {
            const total = stats.totalLoad ?? 0;
            const diversified = stats.diversifiedLoad ?? 0;
            // Fallback diversity factor from totals if upstream didn't set it.
            const diversity =
              stats.diversityFactor ?? (total > 0 ? diversified / total : null);
            return {
              totalLoad: total,
              totalLoadKW: (total / 1000).toFixed(1),
              diversifiedLoad: diversified,
              diversifiedLoadKW: (diversified / 1000).toFixed(1),
              diversityFactor: diversity,
              diversityFactorPct:
                diversity !== null && diversity !== undefined
                  ? `${(diversity * 100).toFixed(1)}%`
                  : null,
              totalIb: stats.totalIb?.toFixed?.(1) ?? null,
              passCount: stats.passCount ?? 0,
              reviewCount: stats.reviewCount ?? 0,
              failCount: stats.failCount ?? 0,
              totalCount: stats.totalCount ?? design.circuits?.length ?? 0,
            };
          })()
        : null,

      // === COST TIERS ===
      cost: cost
        ? {
            tier: cost.tier ?? 'standard',
            tierLabel: cost.tierLabel ?? 'Standard',
            tierDescription: cost.tierDescription ?? '',
            grandTotal: cost.grandTotal ?? 0,
            grandTotalGBP: cost.grandTotal
              ? `£${cost.grandTotal.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`
              : null,
            perBoard: Array.isArray(cost.perBoard)
              ? cost.perBoard.map((b: any) => ({
                  boardId: b.boardId,
                  boardName: b.boardName,
                  enclosureCost: b.enclosureCost,
                  mainSwitchCost: b.mainSwitchCost,
                  submainCost: b.submainCost,
                  circuitsTotal: b.circuitsTotal,
                  spdAllowance: b.spdAllowance,
                  total: b.total,
                  totalGBP: b.total
                    ? `£${b.total.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`
                    : null,
                }))
              : [],
          }
        : null,

      // === BS 7671 A4:2026 FEATURES (special-location + protective device summary) ===
      a4Features: Array.isArray(a4?.features) ? a4.features : Array.isArray(a4) ? a4 : [],
      a4FeatureCount: Array.isArray(a4?.features)
        ? a4.features.length
        : Array.isArray(a4)
          ? a4.length
          : 0,

      // === BOARDS (multi-board layout from frontend recommendBoardLayout) ===
      boards: Array.isArray(layout?.boards)
        ? layout.boards.map((b: any, i: number) => {
            // Phase balance: object → readable string.
            const pb = b.phaseBalance;
            let phaseBalanceText: string | null = null;
            if (pb && typeof pb === 'object') {
              const l1 = typeof pb.L1_W === 'number' ? (pb.L1_W / 1000).toFixed(1) : null;
              const l2 = typeof pb.L2_W === 'number' ? (pb.L2_W / 1000).toFixed(1) : null;
              const l3 = typeof pb.L3_W === 'number' ? (pb.L3_W / 1000).toFixed(1) : null;
              const parts: string[] = [];
              if (l1) parts.push(`L1 ${l1}kW`);
              if (l2) parts.push(`L2 ${l2}kW`);
              if (l3) parts.push(`L3 ${l3}kW`);
              if (typeof pb.imbalancePercent === 'number') {
                parts.push(`${pb.imbalancePercent.toFixed(0)}% imbalance`);
              }
              phaseBalanceText = parts.length > 0 ? parts.join(' · ') : null;
            } else if (typeof pb === 'string') {
              phaseBalanceText = pb;
            }

            // SPD: object → "Type X" label, rationale separate.
            const spd = b.spd;
            let spdLabel: string | null = null;
            let spdRationale: string | null = null;
            let spdReg: string | null = null;
            if (spd && typeof spd === 'object') {
              if (spd.required === false) {
                spdLabel = 'Not required';
              } else if (spd.type) {
                spdLabel = String(spd.type);
              }
              if (spd.rationale) spdRationale = String(spd.rationale);
              if (spd.reg) spdReg = String(spd.reg);
            } else if (typeof spd === 'string') {
              spdLabel = spd;
            }

            // Feed-from-parent: keep object shape for the row but format
            // phases as a clean string (or omit) instead of "(three)".
            let feedFromParent = b.feedFromParent ?? null;
            if (feedFromParent && typeof feedFromParent === 'object') {
              const fp = feedFromParent.feedPhases;
              let feedPhasesText: string | null = null;
              if (typeof fp === 'string') {
                if (fp === 'three' || fp === '3') feedPhasesText = '3-phase';
                else if (fp === 'single' || fp === '1') feedPhasesText = '1-phase';
                else feedPhasesText = fp;
              } else if (Array.isArray(fp) && fp.length > 0) {
                feedPhasesText = fp.join('+');
              }
              feedFromParent = { ...feedFromParent, feedPhases: feedPhasesText };
            }

            return {
              id: b.id ?? `board-${i + 1}`,
              name: b.name ?? `Board ${i + 1}`,
              location: b.location ?? '',
              isOrigin: !!b.isOrigin,
              mainSwitchRating: b.mainSwitchRating ?? null,
              phaseBalance: phaseBalanceText,
              zdb: b.zdb ?? null,
              spd: spdLabel,
              spdRationale,
              spdReg,
              feedFromParent,
              circuitIndices: Array.isArray(b.circuitIndices) ? b.circuitIndices : [],
              // Resolve circuit indices into the actual circuit rows for
              // per-board schedule rendering in the template.
              circuits: Array.isArray(b.circuitIndices)
                ? b.circuitIndices
                    .map((idx: number) => design.circuits?.[idx])
                    .filter(Boolean)
                    .map((c: any, j: number) => ({
                      way: j + 1,
                      name: c.name,
                      loadType: c.loadType,
                      cableSize: c.cableSize,
                      cpcSize: c.cpcSize,
                      protectionRating: c.protectionDevice?.rating,
                      protectionType: c.protectionDevice?.type,
                      protectionCurve: c.protectionDevice?.curve,
                      rcdProtected: c.rcdProtected ? 'Yes' : 'No',
                      afddRequired: c.afddRequired ? 'Yes' : 'No',
                      designCurrent: c.calculations?.Ib?.toFixed(1),
                      voltageDropPercent: c.calculations?.voltageDrop?.percent?.toFixed(1),
                      zsActual: c.calculations?.zs?.toFixed(2),
                      complianceStatus: c.complianceStatus ?? 'pass',
                    }))
                : [],
            };
          })
        : [],
      submainFeeds: Array.isArray(layout?.submainFeeds)
        ? layout.submainFeeds.map((f: any) => {
            const fp = f.feedPhases;
            let feedPhasesText: string | null = null;
            if (typeof fp === 'string') {
              if (fp === 'three' || fp === '3') feedPhasesText = '3-phase';
              else if (fp === 'single' || fp === '1') feedPhasesText = '1-phase';
              else feedPhasesText = fp;
            } else if (Array.isArray(fp) && fp.length > 0) {
              feedPhasesText = fp.join('+');
            }
            return { ...f, feedPhases: feedPhasesText };
          })
        : [],
      hasMultipleBoards: Array.isArray(layout?.boards) && layout.boards.length > 1,
      boardCount: Array.isArray(layout?.boards) ? layout.boards.length : 1,

      // Load Assessment (direct from frontend)
      totalLoad: design.totalLoad,
      totalLoadKW: design.totalLoad ? `${(design.totalLoad / 1000).toFixed(1)} kW` : null,
      diversifiedLoad: design.diversifiedLoad,
      diversifiedLoadKW: design.diversifiedLoad
        ? `${(design.diversifiedLoad / 1000).toFixed(1)} kW`
        : null,
      diversityFactor: design.diversityFactor,
      diversityFactorPercent: design.diversityFactor,
      totalDesignCurrent: design.totalDesignCurrent,

      // Diversity Breakdown (direct pass-through)
      diversityBreakdown: design.diversityBreakdown,

      // Circuit counts
      circuitCount: design.circuits?.length || 0,
      totalCircuits: design.circuits?.length || 0,

      // Compliance Status (direct from frontend calculations)
      complianceChecks: design.complianceChecks,
      allCircuitsCompliant: design.complianceChecks?.allCircuitsCompliant,
      complianceStatus: design.complianceChecks?.allCircuitsCompliant
        ? 'All Compliant'
        : 'Issues Found',
      warningCount: design.complianceChecks?.totalWarnings || 0,
      compliantCircuits:
        (design.circuits?.length || 0) - (design.complianceChecks?.criticalIssues || 0),

      // Circuits (direct pass-through with no transformation)
      circuits: (design.circuits || []).map((c: any) => ({
        // Basic Info
        circuitNumber: c.circuitNumber,
        name: c.name,
        loadType: c.loadType,
        loadPower: c.loadPower,
        loadPowerKW: c.loadPower ? (c.loadPower / 1000).toFixed(1) : null,
        phases: c.phases === 'single' ? 'Single Phase' : 'Three Phase',

        // Cable Specification (direct from frontend - NO FALLBACKS)
        cableType: c.cableType,
        cableSize: c.cableSize,
        cpcSize: c.cpcSize,
        cableLength: c.cableLength,
        installationMethod: c.installationMethod,

        // Protection Device
        protectionDevice: c.protectionDevice
          ? `${c.protectionDevice.rating}A Type ${c.protectionDevice.curve} ${c.protectionDevice.type}`
          : null,
        protectionRating: c.protectionDevice?.rating,
        protectionCurve: c.protectionDevice?.curve,
        protectionType: c.protectionDevice?.type,
        protectionKaRating: c.protectionDevice?.kaRating,
        rcdProtected: c.rcdProtected ? 'Yes' : 'No',
        rcdProtectedText: c.rcdProtected ? 'Yes (30mA)' : 'No',
        afddRequired: c.afddRequired ? 'Yes' : 'No',

        // Calculations (direct pass-through)
        designCurrent: c.calculations?.Ib?.toFixed(1),
        designCurrentIb: c.calculations?.Ib?.toFixed(1),
        nominalCurrentIn: c.protectionDevice?.rating,
        cableCapacityIz: c.calculations?.Iz?.toFixed(0),
        deratedCapacity: c.calculations?.deratedCapacity?.toFixed(0),
        safetyMargin:
          typeof c.calculations?.safetyMargin === 'number'
            ? c.calculations.safetyMargin.toFixed(0)
            : null,
        voltageDrop: c.calculations?.voltageDrop
          ? `${c.calculations.voltageDrop.volts?.toFixed(1)}V (${c.calculations.voltageDrop.percent?.toFixed(1)}%)`
          : null,
        voltageDropVolts: c.calculations?.voltageDrop?.volts?.toFixed(1),
        voltageDropPercent: c.calculations?.voltageDrop?.percent?.toFixed(1),
        voltageDropCompliant: c.calculations?.voltageDrop?.compliant ? 'Yes' : 'No',
        zsActual: c.calculations?.zs?.toFixed(2),
        zsMax: c.calculations?.maxZs?.toFixed(2),
        zsCompliant:
          c.calculations?.zs && c.calculations?.maxZs && c.calculations.zs < c.calculations.maxZs
            ? 'Yes'
            : 'No',
        calculations: c.calculations,

        // Compliance Status (direct from Phase 5.5).
        // Default to 'pass' when undefined so status pills don't all
        // fall through to red in the schedule + per-circuit blocks.
        complianceStatus: c.complianceStatus ?? 'pass',
        complianceStatusText:
          c.complianceStatus === 'pass'
            ? '✓ PASS'
            : c.complianceStatus === 'warning'
              ? '⚠ REVIEW'
              : '✗ FAIL',
        complianceStatusColour:
          c.complianceStatus === 'pass'
            ? 'green'
            : c.complianceStatus === 'warning'
              ? 'amber'
              : 'red',
        validationIssues: c.validationIssues || [],
        hasValidationIssues: (c.validationIssues?.length || 0) > 0,

        // Justifications (direct pass-through)
        justifications: c.justifications,
        justificationCable: c.justifications?.cableSize,
        cableSizeJustification: c.justifications?.cableSize,
        justificationProtection: c.justifications?.protection,
        protectionJustification: c.justifications?.protection,
        justificationRcd: c.justifications?.rcd,
        rcdJustification: c.justifications?.rcd,

        // Expected Test Results (direct pass-through)
        expectedTests: c.expectedTests,
        expectedTestResults: c.expectedTestResults,
        expectedR1R2:
          c.expectedTests?.r1r2?.at70C?.toFixed(3) || c.expectedTestResults?.r1r2?.at70C,
        expectedZs: c.expectedTests?.zs?.expected?.toFixed(2) || c.calculations?.zs?.toFixed(2),
        expectedInsulation:
          c.expectedTests?.insulationResistance?.minResistance ||
          c.expectedTestResults?.insulationResistance?.minResistance,

        // Derating Factors (direct pass-through)
        deratingFactors: c.deratingFactors,

        // Fault Current Analysis (direct pass-through)
        faultCurrentAnalysis: c.faultCurrentAnalysis,

        // Earthing Requirements (direct pass-through)
        earthingRequirements: c.earthingRequirements,

        // Installation Guidance — REMOVED from this PDF (now lives
        // in the dedicated Installation Specialist agent + PDF).

        // Special Locations (direct pass-through)
        isSpecialLocation: c.specialLocationCompliance?.isSpecialLocation,
        specialLocationType: c.specialLocationCompliance?.locationType,
        specialLocationRequirements: c.specialLocationCompliance?.requirements?.join('; '),
        specialLocationRegulation: c.specialLocationCompliance?.regulation,

        // Diversity
        diversityFactor: c.diversityFactor ? `${(c.diversityFactor * 100).toFixed(0)}%` : null,
        diversityJustification: c.diversityJustification,

        // Warnings
        warnings: c.warnings?.join('; '),
        hasWarnings: (c.warnings?.length || 0) > 0,
      })),

      // Materials (direct pass-through)
      materials: design.materials,

      // Design Notes (direct pass-through)
      designNotes: design.designNotes,

      // Practical Guidance (direct pass-through)
      practicalGuidance: design.practicalGuidance,

      // Installation Guidance (direct pass-through)
      installationGuidance: design.installationGuidance,

      // Compliance
      complianceStatement: 'BS 7671:2018+A3:2024',
      generationTimestamp: new Date().toISOString(),
    };

    // Log missing data warnings (but don't generate fake data)
    const missingDataWarnings: string[] = [];

    payload.circuits.forEach((c: any, idx: number) => {
      if (!c.cableType) missingDataWarnings.push(`Circuit ${idx + 1}: Missing cableType`);
      if (!c.installationMethod)
        missingDataWarnings.push(`Circuit ${idx + 1}: Missing installationMethod`);
      if (!c.expectedTests && !c.expectedTestResults)
        missingDataWarnings.push(`Circuit ${idx + 1}: Missing expected test results`);
    });

    if (missingDataWarnings.length > 0) {
      console.warn('[CIRCUIT-PDF] Missing data detected:', missingDataWarnings);
    }

    // Validation logging
    console.log('[CIRCUIT-PDF] Payload summary:', {
      projectName: payload.projectName,
      circuitCount: payload.circuits.length,
      totalLoad: payload.totalLoad,
      diversifiedLoad: payload.diversifiedLoad,
      complianceStatus: payload.complianceStatus,
      missingDataCount: missingDataWarnings.length,
    });

    console.log('[CIRCUIT-PDF] Calling PDF Monkey API');

    // Call PDF Monkey API
    const pdfMonkeyResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: templateId,
          status: 'pending',
          payload: payload,
          meta: {
            _filename: `Circuit_Design_${design.projectName?.replace(/\s+/g, '_') || 'Export'}.pdf`,
          },
        },
      }),
    });

    if (!pdfMonkeyResponse.ok) {
      const errorText = await pdfMonkeyResponse.text();
      const isTemplateError =
        pdfMonkeyResponse.status === 422 && errorText.includes('template must exist');

      console.error('[CIRCUIT-PDF] PDF Monkey API error:', pdfMonkeyResponse.status, errorText);

      return new Response(
        JSON.stringify({
          success: false,
          useFallback: true,
          error: isTemplateError
            ? 'PDF template not configured'
            : `PDF Monkey API error: ${pdfMonkeyResponse.status}`,
          reason: isTemplateError ? 'template_missing' : 'api_error',
          details: errorText,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const pdfData = await pdfMonkeyResponse.json();
    console.log('[CIRCUIT-PDF] PDF generation initiated, document ID:', pdfData.document?.id);

    // Poll for completion
    const documentId = pdfData.document?.id;
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      attempts++;

      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
        {
          headers: { Authorization: `Bearer ${PDFMONKEY_API_KEY}` },
        }
      );

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        const status = statusData.document?.status;

        console.log(`[CIRCUIT-PDF] Poll attempt ${attempts}/${maxAttempts}, status: ${status}`);

        if (status === 'success') {
          console.log('[CIRCUIT-PDF] PDF generation complete');
          return new Response(
            JSON.stringify({
              success: true,
              documentId: statusData.document.id,
              downloadUrl: statusData.document.download_url,
              previewUrl: statusData.document.preview_url,
              status: 'success',
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        } else if (status === 'failure') {
          console.error('[CIRCUIT-PDF] PDF generation failed');
          return new Response(
            JSON.stringify({
              success: false,
              useFallback: true,
              error: 'PDF generation failed',
              status: 'failure',
            }),
            {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }
    }

    // Timeout
    console.warn('[CIRCUIT-PDF] PDF generation timed out');
    return new Response(
      JSON.stringify({
        success: false,
        useFallback: true,
        error: 'PDF generation timed out',
        status: 'timeout',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[CIRCUIT-PDF] Error:', error);
    await captureException(error, {
      functionName: 'generate-circuit-design-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({
        success: false,
        useFallback: true,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
