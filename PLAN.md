# Business Calculators - Mobile App Enhancement Plan

## Overview

Review and enhance all 15 business calculators to achieve a consistent, native mobile app feel with proper text containment, back navigation, and verified logic.

---

## Current State Assessment

### Good (Already Implemented)
- Shared components (`CalculatorCard`, `CalculatorInput`, `CalculatorResult`, `ResultsGrid`)
- `touch-manipulation` classes on buttons
- `h-12` minimum height inputs (44px touch targets)
- Collapsible sections for advanced options
- Gradient styling consistent with design system

### Issues Identified

| Issue | Affected Files | Priority |
|-------|---------------|----------|
| Missing SmartBackButton | 14 of 15 calculators | High |
| Inconsistent page structure | All | High |
| Text overflow on mobile labels | Several | High |
| Inconsistent container padding | All | Medium |
| Result alignment inconsistencies | Several | Medium |
| Missing max-w-4xl containers | Some | Medium |
| Logic verification needed | All | High |

---

## Files to Modify

| # | File | Changes Required |
|---|------|------------------|
| 1 | `BreakEvenCalculator.tsx` | + Back button, + header, fix padding |
| 2 | `BusinessCostCalculator.tsx` | + Back button, + header, verify layout |
| 3 | `CapacityPlanningTool.tsx` | + Back button, + header, verify layout |
| 4 | `CashFlowPlanner.tsx` | + Back button, + header, verify layout |
| 5 | `CISDRCHelper.tsx` | + Back button, + header, verify layout |
| 6 | `EquipmentROICalculator.tsx` | + Back button, + header, verify layout |
| 7 | `HourlyRateCalculator.tsx` | Already has back button - verify mobile |
| 8 | `JobProfitabilityCalculator.tsx` | + Back button, + header, verify layout |
| 9 | `MinimumChargeCalculator.tsx` | + Back button, + header, verify layout |
| 10 | `PricingStrategyCalculator.tsx` | + Back button, + header, verify layout |
| 11 | `QuoteVarianceTracker.tsx` | + Back button, + header, verify layout |
| 12 | `StaffCostCalculator.tsx` | + Back button, + header, verify layout |
| 13 | `TaxEstimator.tsx` | + Back button, + header, verify layout |
| 14 | `TaxNIEstimator.tsx` | + Back button, + header, verify layout |
| 15 | `VATSchemeComparison.tsx` | + Back button, + header, verify layout |

---

## Standard Page Template

Every calculator should follow this structure:

```tsx
import { SmartBackButton } from "@/components/ui/smart-back-button";

const Calculator = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Header with back button */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl border shrink-0" style={{...}}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                Calculator Title
              </h1>
              <p className="text-sm text-white/60 truncate">Short description</p>
            </div>
          </div>
          <SmartBackButton className="shrink-0" />
        </header>

        {/* Calculator content */}
        <CalculatorCard ...>
          {/* Inputs */}
        </CalculatorCard>

        {/* Results */}
        {calculated && (
          <div className="space-y-4">
            <CalculatorResult ...>
              {/* Results grid */}
            </CalculatorResult>
          </div>
        )}

        {/* Reference sections */}
        <Collapsible ...>
          {/* Reference guide */}
        </Collapsible>
      </div>
    </div>
  );
};
```

---

## Phase 1: Add Back Buttons & Standard Headers

For each calculator missing SmartBackButton:

1. Import SmartBackButton
2. Wrap content in `min-h-screen bg-background`
3. Add `max-w-4xl mx-auto px-4 py-6 space-y-4` container
4. Add standard header with icon, title, description, and back button
5. Ensure title uses `truncate` and `min-w-0` to prevent overflow

---

## Phase 2: Fix Text Overflow Issues

### Label Text Fixes
- Add `truncate` class to any labels that might overflow
- Use `text-sm` or smaller for secondary text
- Ensure grid columns don't squash on mobile

### Input Hint Fixes
- Keep hints short (max 25 chars)
- Use `line-clamp-1` for longer hints

### Result Value Fixes
- Ensure currency values don't wrap
- Use `whitespace-nowrap` for monetary values
- Consider `text-lg` max on mobile for large numbers

---

## Phase 3: Result Alignment Improvements

### ResultsGrid Mobile Handling
- `columns={2}` should become single column on very small screens
- Add responsive gap: `gap-3 sm:gap-4`

### Result Cards
- Consistent padding: `p-3 sm:p-4`
- Centered text for stat cards
- Proper icon alignment with `shrink-0`

---

## Phase 4: Logic Verification Checklist

### Each Calculator Must:
- [ ] Calculate correctly with default values
- [ ] Handle zero/empty inputs gracefully
- [ ] Display correct currency formatting (£X,XXX.XX)
- [ ] Show appropriate VAT handling (if applicable)
- [ ] Reset button clears all state

### Specific Logic Checks:

| Calculator | Key Logic Points |
|------------|------------------|
| HourlyRateCalculator | Utilisation affects billable hours; margin applied correctly |
| BreakEvenCalculator | Break-even = (Labour + Overhead) / Billable hours |
| TaxNIEstimator | 2025/26 UK rates: PA £12,570, Basic 20%, Higher 40%, Class 4 NI 6%/2% |
| VATSchemeComparison | FRS applies to VAT-inclusive turnover |
| MinimumChargeCalculator | First hour includes travel + admin time cost |
| CashFlowPlanner | Monthly projections account for seasonal variation |
| EquipmentROICalculator | ROI = (Gain - Cost) / Cost × 100 |
| StaffCostCalculator | Includes employer NI, pension, overheads |
| JobProfitabilityCalculator | Profit = Revenue - (Labour + Materials + Overhead) |

---

## Phase 5: Visual Polish

### Consistent Gradients
All calculators use `CALCULATOR_CONFIG["business"]` which provides:
- `gradientFrom: "#3b82f6"` (blue-500)
- `gradientTo: "#8b5cf6"` (purple-500)

### Touch Targets
- All buttons: `h-12` minimum (48px)
- All interactive elements: `touch-manipulation`
- Clickable areas: `min-h-[44px] min-w-[44px]`

### Spacing
- Section gaps: `space-y-4`
- Input gaps: `gap-3`
- Card padding: `p-4 sm:p-5`

---

## Implementation Order

1. **HourlyRateCalculator** - Reference (already has back button, verify as template)
2. **BreakEvenCalculator** - Add back button, standardise structure
3. **TaxNIEstimator** - Add back button, verify 2025/26 rates
4. **MinimumChargeCalculator** - Add back button, fix structure
5. **VATSchemeComparison** - Add back button, fix structure
6. **JobProfitabilityCalculator** - Add back button, verify logic
7. **StaffCostCalculator** - Add back button, verify employer costs
8. **CashFlowPlanner** - Add back button, verify projections
9. **CapacityPlanningTool** - Add back button, verify logic
10. **EquipmentROICalculator** - Add back button, verify ROI formula
11. **BusinessCostCalculator** - Add back button, verify totals
12. **PricingStrategyCalculator** - Add back button, verify markup logic
13. **QuoteVarianceTracker** - Add back button, verify variance calc
14. **TaxEstimator** - Add back button, verify vs TaxNIEstimator
15. **CISDRCHelper** - Add back button, verify CIS/DRC rules

---

## Testing Checklist (Per Calculator)

### Mobile (375px viewport)
- [ ] No horizontal scroll
- [ ] All text visible (no overflow/cut-off)
- [ ] Buttons full-width and thumb-friendly
- [ ] Results properly aligned
- [ ] Back button works

### Tablet (768px viewport)
- [ ] Two-column inputs work
- [ ] Results grid displays correctly

### Desktop (1200px viewport)
- [ ] Centered with max-width
- [ ] Two-column layout where appropriate

### Functionality
- [ ] Calculate button works
- [ ] Reset button clears all
- [ ] Results update correctly
- [ ] VAT toggle works (if present)
- [ ] Collapsible sections work

---

## Success Criteria

1. **All 15 calculators have SmartBackButton** in consistent header position
2. **No text overflow** on any mobile viewport (320px+)
3. **All results properly aligned** with consistent styling
4. **All calculations verified** with sample data
5. **Native app feel** - smooth, responsive, thumb-friendly
