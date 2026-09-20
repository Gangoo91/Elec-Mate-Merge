/**
 * Response Enrichment Layer
 * Adds metadata for optimal UI rendering
 */

import type { RegulationResult } from './cross-encoder-reranker.ts';
import type { ConfidenceMetrics } from './confidence-scorer.ts';
import { calculateConfidence } from './confidence-scorer.ts';

export interface EnrichedResponse {
  // Core content (structured or narrative)
  response: string | any;
  
  // Display optimization
  enrichment: {
    displayHints: {
      primaryView: 'narrative' | 'structured' | 'tabular';
      expandableSections: string[];
      highlightTerms: string[];
    };
    interactiveElements: Array<{
      type: 'regulation-tooltip' | 'calculation-breakdown';
      id: string;
      data: any;
    }>;
  };
  
  // Enhanced citations with confidence
  citations: Array<{
    regulation_number: string;
    section: string;
    content: string;
    confidence: ConfidenceMetrics;
    relevanceToQuery: string;
    interactiveTooltip: string; // Rich HTML for tooltip
  }>;
  
  // UI rendering instructions
  rendering: {
    layout: 'single-column' | 'two-column' | 'tabbed';
    priority: 'design-first' | 'regulations-first' | 'guidance-first';
    callouts: Array<{
      type: 'warning' | 'tip' | 'info';
      content: string;
      placement: 'top' | 'inline' | 'bottom';
    }>;
  };
}

/**
 * Extract key terms to highlight in UI
 */
function extractKeyTerms(response: string, entities: any): string[] {
  const terms: string[] = [];
  
  // Add circuit-specific terms (validate strings only)
  if (entities.loadType && typeof entities.loadType === 'string') {
    terms.push(entities.loadType.replace('_', ' '));
  }
  if (entities.location && typeof entities.location === 'string') {
    terms.push(entities.location);
  }
  
  // Add common electrical terms
  const commonTerms = ['voltage drop', 'earth fault', 'cable', 'MCB', 'RCD', 'RCBO'];
  for (const term of commonTerms) {
    if (response.toLowerCase().includes(term.toLowerCase())) {
      terms.push(term);
    }
  }
  
  // ✅ Filter to ensure only valid strings are returned
  return terms.filter(t => typeof t === 'string' && t.trim().length > 0);
}

/**
 * Build rich tooltip HTML for regulation
 */
function buildRichTooltip(reg: RegulationResult, confidence: ConfidenceMetrics): string {
  return `
    <div class="space-y-2">
      <div class="font-semibold text-elec-yellow">${reg.regulation_number}</div>
      <div class="text-sm">${reg.section}</div>
      <div class="text-xs text-gray-400 mt-2">${reg.content.substring(0, 200)}...</div>
      <div class="mt-3 pt-2 border-t border-gray-700">
        <div class="text-xs">
          <div class="font-medium mb-1">Confidence Score: ${Math.round(confidence.overall * 100)}%</div>
          <div class="text-gray-400">${confidence.reasoning}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Build interactive elements for response
 */
function buildInteractiveElements(aiResponse: any): Array<any> {
  const elements: Array<any> = [];
  
  // Add calculation breakdowns if present
  if (aiResponse.calculations) {
    elements.push({
      type: 'calculation-breakdown',
      id: 'voltage-drop',
      data: aiResponse.calculations.voltageDrop
    });
  }
  
  return elements;
}

/**
 * Enrich response with metadata for optimal UI rendering
 */
export function enrichResponse(
  aiResponse: any,
  ragResults: RegulationResult[],
  queryType: string,
  entities: any
): EnrichedResponse {
  // Determine optimal display mode
  const primaryView = queryType === 'design' ? 'structured' : 'narrative';
  
  // Extract terms to highlight
  const highlightTerms = extractKeyTerms(
    typeof aiResponse === 'string' ? aiResponse : aiResponse.summary || '', 
    entities
  );
  
  // Build interactive tooltips for each cited regulation
  const enrichedCitations = ragResults.map(reg => {
    const confidence = calculateConfidence(reg, entities.toString(), entities);
    
    return {
      regulation_number: reg.regulation_number,
      section: reg.section,
      content: reg.content,
      confidence,
      relevanceToQuery: confidence.reasoning,
      interactiveTooltip: buildRichTooltip(reg, confidence)
    };
  });
  
  // Identify sections that should be collapsible
  const expandableSections: string[] = [];
  if (typeof aiResponse === 'object') {
    if (aiResponse.regulations) expandableSections.push('regulations');
    if (aiResponse.practicalGuidance) expandableSections.push('practicalGuidance');
    if (aiResponse.testingProcedure) expandableSections.push('testingProcedure');
  }
  
  // Add visual callouts for warnings/tips
  const callouts: Array<any> = [];
  if (aiResponse.warnings && aiResponse.warnings.length > 0) {
    callouts.push({
      type: 'warning',
      content: aiResponse.warnings.join('; '),
      placement: 'top'
    });
  }
  
  return {
    response: aiResponse,
    enrichment: {
      displayHints: {
        primaryView,
        expandableSections,
        highlightTerms
      },
      interactiveElements: buildInteractiveElements(aiResponse)
    },
    citations: enrichedCitations,
    rendering: {
      layout: 'two-column',
      priority: 'design-first',
      callouts
    }
  };
}
