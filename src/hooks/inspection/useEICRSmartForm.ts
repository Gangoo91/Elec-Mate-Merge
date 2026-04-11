/**
 * useEICRSmartForm — Cross-field intelligence for EICR forms
 *
 * Provides smart suggestions, validation warnings, and auto-cascading
 * based on BS 7671:2018+A3:2024 requirements.
 *
 * Verified against regulations_intelligence RAG tables and BS 7671 Zs tables.
 */

import { useMemo, useCallback } from 'react';

interface SmartWarning {
  field: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  regulation?: string;
}

interface SmartSuggestion {
  field: string;
  value: string;
  reason: string;
}

// BS 7671 Table 54.8 — Minimum main bonding conductor size
// Based on supply cable CSA (cross-sectional area)
const MIN_BONDING_FOR_SUPPLY: Record<string, number> = {
  '16': 10,  // 16mm² supply → min 10mm² bonding
  '25': 10,  // 25mm² supply → min 10mm² bonding
  '35': 10,  // 35mm² supply → min 10mm² bonding
  '50': 25,  // 50mm² supply → min 25mm² bonding (half supply)
  '70': 35,  // 70mm² supply → min 35mm² bonding
  '95': 50,  // 95mm² supply → min 50mm² bonding
};

// Intake cable max fuse coordination (approximate)
const CABLE_MAX_FUSE: Record<string, number> = {
  '16': 63,
  '25': 100,
  '35': 125,
  '50': 160,
  '70': 200,
  '95': 250,
};

export function useEICRSmartForm(formData: any, onUpdate?: (field: string, value: any) => void) {

  // Generate warnings based on current form state
  const warnings = useMemo<SmartWarning[]>(() => {
    const w: SmartWarning[] = [];

    // 1. TT earthing without RCD
    if (formData.earthingArrangement === 'TT' && formData.rcdMainSwitch !== 'yes') {
      w.push({
        field: 'rcdMainSwitch',
        message: 'TT systems require RCD protection on all circuits',
        severity: 'error',
        regulation: 'Reg 411.5.2',
      });
    }

    // 2. TT earthing with wrong RCD rating
    if (formData.earthingArrangement === 'TT' && formData.rcdMainSwitch === 'yes' && !formData.rcdRating) {
      w.push({
        field: 'rcdRating',
        message: 'Select RCD rating — 30mA recommended for TT',
        severity: 'warning',
        regulation: 'Reg 411.5.2',
      });
    }

    // 3. Intake cable vs main fuse coordination
    if (formData.intakeCableSize && formData.mainSwitchRating) {
      const cableSize = formData.intakeCableSize.replace('mm²', '').replace('mm', '').trim();
      const fuseRating = parseInt(formData.mainSwitchRating);
      const maxFuse = CABLE_MAX_FUSE[cableSize];
      if (maxFuse && fuseRating > maxFuse) {
        w.push({
          field: 'intakeCableSize',
          message: `${cableSize}mm² cable may be undersized for ${fuseRating}A device (max ~${maxFuse}A)`,
          severity: 'warning',
          regulation: 'Reg 433.1',
        });
      }
    }

    // 4. Bonding conductor size validation (Table 54.8)
    if (formData.intakeCableSize && formData.mainBondingSize && formData.mainBondingSize !== 'none' && formData.mainBondingSize !== 'custom') {
      const supplyCable = formData.intakeCableSize.replace('mm²', '').replace('mm', '').trim();
      const bondingSize = parseInt(formData.mainBondingSize);
      const minBonding = MIN_BONDING_FOR_SUPPLY[supplyCable];
      if (minBonding && bondingSize < minBonding) {
        w.push({
          field: 'mainBondingSize',
          message: `${bondingSize}mm² bonding may be undersized for ${supplyCable}mm² supply (min ${minBonding}mm²)`,
          severity: 'warning',
          regulation: 'Table 54.8',
        });
      }
    }

    // 5. Board ways vs circuits
    if (formData.distributionBoards && formData.scheduleOfTests) {
      const boards = formData.distributionBoards as any[];
      const circuits = formData.scheduleOfTests as any[];
      boards?.forEach((board: any) => {
        if (board.totalWays) {
          const boardCircuits = circuits?.filter((c: any) => c.boardId === board.id || (!c.boardId && board.order === 0));
          if (boardCircuits && boardCircuits.length > board.totalWays) {
            w.push({
              field: `board-${board.id}`,
              message: `${board.name}: ${boardCircuits.length} circuits but only ${board.totalWays} ways`,
              severity: 'warning',
            });
          }
        }
      });
    }

    // 6. PME without proper bonding
    if (formData.supplyPME === 'yes' && formData.bondingCompliance !== 'satisfactory') {
      w.push({
        field: 'bondingCompliance',
        message: 'PME installations require satisfactory main bonding',
        severity: 'warning',
        regulation: 'Reg 411.4.2',
      });
    }

    // 7. Ze reading too high for earthing system
    if (formData.externalZe && formData.earthingArrangement) {
      const ze = parseFloat(formData.externalZe);
      const maxZe: Record<string, number> = { 'TN-S': 0.8, 'TN-C-S': 0.35, 'TN-C': 0.35, 'TT': 200, 'IT': 200 };
      const max = maxZe[formData.earthingArrangement];
      if (max && ze > max) {
        w.push({
          field: 'externalZe',
          message: `Ze reading (${ze}Ω) exceeds typical maximum for ${formData.earthingArrangement} (${max}Ω)`,
          severity: 'warning',
          regulation: 'Table 4Ab',
        });
      }
    }

    return w;
  }, [
    formData.earthingArrangement,
    formData.rcdMainSwitch,
    formData.rcdRating,
    formData.intakeCableSize,
    formData.mainSwitchRating,
    formData.mainBondingSize,
    formData.supplyPME,
    formData.bondingCompliance,
    formData.distributionBoards,
    formData.scheduleOfTests,
    formData.externalZe,
  ]);

  // Generate smart suggestions
  const suggestions = useMemo<SmartSuggestion[]>(() => {
    const s: SmartSuggestion[] = [];

    // Ze → Ipf calculation
    if (formData.externalZe && !formData.prospectiveFaultCurrent) {
      const ze = parseFloat(formData.externalZe);
      if (ze > 0) {
        const ipf = Math.round(230 / ze);
        s.push({
          field: 'prospectiveFaultCurrent',
          value: String(ipf > 1000 ? (ipf / 1000).toFixed(1) : ipf),
          reason: `Estimated from Ze: 230V ÷ ${ze}Ω = ${ipf > 1000 ? (ipf / 1000).toFixed(1) + 'kA' : ipf + 'A'}`,
        });
      }
    }

    // TT → suggest 30mA RCD
    if (formData.earthingArrangement === 'TT' && formData.rcdMainSwitch === 'yes' && !formData.rcdRating) {
      s.push({
        field: 'rcdRating',
        value: '30mA',
        reason: 'TT systems typically use 30mA RCD (Reg 411.5.2)',
      });
    }

    return s;
  }, [
    formData.externalZe,
    formData.prospectiveFaultCurrent,
    formData.earthingArrangement,
    formData.rcdMainSwitch,
    formData.rcdRating,
  ]);

  // Get warnings for a specific field
  const getWarningsForField = useCallback((field: string) => {
    return warnings.filter((w) => w.field === field);
  }, [warnings]);

  // Auto-apply earthing → RCD suggestion
  const applyEarthingSuggestions = useCallback((earthingType: string) => {
    if (!onUpdate) return;
    if (earthingType === 'TT') {
      onUpdate('rcdMainSwitch', 'yes');
      onUpdate('rcdRating', '30mA');
    }
    if (earthingType === 'TN-S' || earthingType === 'TN-C-S') {
      onUpdate('earthElectrodeType', 'n/a');
    }
    if (earthingType === 'TN-C-S') {
      onUpdate('supplyPME', 'yes');
    }
  }, [onUpdate]);

  return {
    warnings,
    suggestions,
    getWarningsForField,
    applyEarthingSuggestions,
    hasWarnings: warnings.length > 0,
    hasCritical: warnings.some((w) => w.severity === 'error'),
  };
}

export default useEICRSmartForm;
