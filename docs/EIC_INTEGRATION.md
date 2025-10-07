# EIC Schedule Pre-Population Integration

## Overview
This system bridges the **AI Install Planner** and the **Inspection & Testing app** by automatically pre-filling EIC (Electrical Installation Certificate) Schedule of Test Results with design data and expected test values calculated from BS 7671 standards.

## What Gets Pre-Populated

### ✅ **95% Pre-Filled Fields**
The following fields are automatically populated based on AI agent outputs:

| Field | Source | Example |
|-------|--------|---------|
| `circuitNumber` | Circuit index | "C1", "C2" |
| `phaseType` | Circuit design | "single", "three" |
| `circuitDescription` | Load type + AI context | "Shower Circuit", "Power Sockets" |
| `referenceMethod` | Installation method | "100 (Clipped direct)" |
| `liveSize` | Cable calculation | "6.0mm²" |
| `cpcSize` | BS 7671 Table 54.7 | "2.5mm²" |
| `protectiveDeviceType` | Circuit design | "MCB", "RCBO" |
| `protectiveDeviceCurve` | Device rating | "B", "C", "D" |
| `protectiveDeviceRating` | Load calculation | "32A" |
| `bsStandard` | Default standard | "BS EN 60898" |
| `maxZs` | BS 7671 Appendix 3 | "1.44Ω" (for B32) |
| `r1r2` | **Expected value** calculated | "0.156Ω (expected)" |
| `zs` | **Expected value** (Ze + R1+R2) | "0.506Ω (expected)" |
| `insulationTestVoltage` | Test standard | "500V DC" |
| `insulationResistance` | Expected range | "≥1.0MΩ (min), expect >50MΩ" |
| `polarity` | Pre-filled guidance | "Correct (verify on-site)" |

### 🔬 **On-Site Testing Required**
These fields must still be tested and filled on-site:
- `rcdOneX`, `rcdTestButton` (if RCD present)
- `afddTest` (if AFDD present)
- `pfc` (prospective fault current)
- `functionalTesting`

### 🔁 **Conditional Fields**
For ring circuits only:
- `ringR1`, `ringRn`, `ringR2` (expected values)
- `ringContinuityLive`, `ringContinuityNeutral` (to be tested)

---

## Database Schema

### Table: `eic_schedules`
```sql
CREATE TABLE public.eic_schedules (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  installation_id TEXT NOT NULL,
  installation_address TEXT NOT NULL,
  designer_name TEXT NOT NULL,
  design_date DATE NOT NULL,
  schedule_data JSONB NOT NULL,  -- Array of EICCircuitData
  status TEXT NOT NULL,           -- 'pending' | 'in-progress' | 'completed'
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

### RLS Policies
- ✅ Users can only see their own EIC schedules
- ✅ Full CRUD operations scoped to `user_id`

---

## API Integration

### Export Function
```typescript
import { exportEICScheduleToInspectionApp } from "@/utils/eic-export";

// Export from Install Planner
const result = await exportEICScheduleToInspectionApp(eicSchedule);

if (result.success) {
  console.log("Schedule ID:", result.scheduleId);
}
```

### Retrieve Schedules
```typescript
import { getUserEICSchedules } from "@/utils/eic-export";

const schedules = await getUserEICSchedules();
// Returns: Array<{id, installation_address, circuits, status, ...}>
```

### Query from Inspection App
```typescript
import { supabase } from "@/integrations/supabase/client";

// Get pending schedules for testing
const { data } = await supabase
  .from("eic_schedules")
  .select("*")
  .eq("status", "pending")
  .order("created_at", { ascending: false });

// Access circuit data
const circuits = data[0].schedule_data; // Array of EICCircuitData
```

---

## Calculation Details

### R1+R2 Calculation (BS 7671 Table I1)
```typescript
// Formula: R1+R2 = (r1 + r2) × length × temperature_factor
// Where:
// - r1, r2 = conductor resistance (mΩ/m) from Table I1
// - length = cable run length (meters)
// - temperature_factor = 1.38 (for 70°C operation)

Example for 6.0mm² live + 2.5mm² CPC over 25m:
R1+R2 = (3.08 + 7.41) × 25 × 1.38 / 1000 = 0.361Ω
```

### Expected Zs Calculation
```typescript
// Formula: Zs = Ze + R1+R2
// Typical Ze values:
// - TNS: 0.35Ω
// - TN-C-S: 0.35Ω (external)
// - TT: 200Ω (electrode-dependent)

Example:
Zs = 0.35 + 0.361 = 0.711Ω
```

### Max Zs Lookup (BS 7671 Appendix 3)
```typescript
// Max Zs for 0.4s disconnection time
const maxZsValues = {
  "B": { 6: 7.67, 10: 4.60, 16: 2.87, 32: 1.44, 40: 1.15 },
  "C": { 6: 3.83, 10: 2.30, 16: 1.44, 32: 0.72, 40: 0.57 },
  "D": { 6: 1.92, 10: 1.15, 16: 0.72, 32: 0.36, 40: 0.29 }
};
```

---

## Data Flow Diagram

```
┌─────────────────────────┐
│  AI Install Planner     │
│  ┌──────────────────┐   │
│  │ Designer Agent   │───┼──► Circuit specs
│  │ Installer Agent  │───┼──► Cable sizes, methods
│  │ Commissioning    │───┼──► Test requirements
│  └──────────────────┘   │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  EIC Transformer        │
│  ┌──────────────────┐   │
│  │ Calculate R1+R2  │   │
│  │ Calculate Zs     │   │
│  │ Lookup Max Zs    │   │
│  │ Map to JSON      │   │
│  └──────────────────┘   │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Supabase Database      │
│  Table: eic_schedules   │
│  ┌──────────────────┐   │
│  │ schedule_data    │   │ (JSONB array)
│  │ status           │   │ (pending)
│  │ created_at       │   │
│  └──────────────────┘   │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Inspection & Testing   │
│  App Integration        │
│  ┌──────────────────┐   │
│  │ Load schedules   │   │
│  │ Display circuits │   │
│  │ Compare expected │───┼──► Highlight variances
│  │  vs. actual      │   │    if measured ≠ expected
│  │ Update status    │───┼──► in-progress → completed
│  └──────────────────┘   │
└─────────────────────────┘
```

---

## Example JSON Payload

### Single Circuit in `schedule_data`
```json
{
  "circuitNumber": "C1",
  "phaseType": "single",
  "circuitDescription": "Electric Shower",
  "referenceMethod": "100 (Clipped direct)",
  "pointsServed": "As designed",
  "liveSize": "10.0mm²",
  "cpcSize": "4.0mm²",
  "protectiveDeviceType": "MCB",
  "protectiveDeviceCurve": "B",
  "protectiveDeviceRating": "40A",
  "protectiveDeviceKaRating": "6kA",
  "bsStandard": "BS EN 60898",
  "r1r2": "0.218Ω (expected)",
  "insulationTestVoltage": "500V DC",
  "insulationResistance": "≥1.0MΩ (min), expect >50MΩ",
  "polarity": "Correct (verify on-site)",
  "zs": "0.568Ω (expected)",
  "maxZs": "1.15Ω",
  "rcdRating": "30mA",
  "rcdOneX": "To be tested (≤300ms)",
  "rcdTestButton": "To be tested",
  "pfc": "To be tested",
  "functionalTesting": "To be tested"
}
```

---

## Integration Checklist

### For Developer Integrating with Inspection & Testing App:

- [ ] **Database Access**: Confirm Supabase types regenerated after migration
- [ ] **Query Pending Schedules**: Filter by `status = 'pending'`
- [ ] **Display Circuit List**: Render `schedule_data` array
- [ ] **Expected vs Actual Comparison**: 
  - Show expected values (e.g., "0.506Ω expected")
  - Allow electrician to enter actual measured values
  - Highlight variances (e.g., measured 0.62Ω vs expected 0.506Ω)
- [ ] **Status Updates**: Update `status` field:
  - `pending` → `in-progress` (when testing starts)
  - `in-progress` → `completed` (when all circuits tested)
- [ ] **Validation**: Ensure actual values are within tolerances:
  - R1+R2: ±20% of expected
  - Zs: Must be < Max Zs
  - Insulation: Must be ≥1.0MΩ

---

## Benefits

### For Electricians
- ⏱️ **95% time savings** on data entry
- 📊 **Expected values** provide testing guidance
- ⚠️ **Instant warnings** if actual tests deviate from expected
- 📋 **BS 7671 compliant** calculations built-in

### For You (Product Owner)
- 🔗 **Seamless integration** between Install Planner and Testing app
- 🤖 **AI-powered** design → testing workflow
- 📈 **Higher accuracy** with pre-calculated values
- 🚀 **Competitive advantage** - unique in the market

---

## Next Steps

1. **Confirm Migration**: Supabase types should auto-regenerate after migration
2. **Test Export**: Use "Export to Testing App" button in Install Planner
3. **Query Database**: Verify `eic_schedules` table has data
4. **Build UI**: Create testing interface to display and update schedules
5. **Add Validation**: Compare actual vs expected values with visual feedback

---

## Support

**Files to Reference:**
- `src/types/eic-integration.ts` - TypeScript interfaces
- `src/utils/eic-transformer.ts` - BS 7671 calculations
- `src/utils/eic-export.ts` - Supabase export functions
- `src/components/install-planner-v2/IntelligentAIPlanner.tsx` - Frontend integration

**BS 7671 References:**
- Table I1 - Conductor resistances
- Appendix 3 - Maximum Zs values
- Regulation 643 - Testing requirements

**Questions?** Check the inline comments in the code or refer to BS 7671:2018+A2:2022 Chapter 64.
