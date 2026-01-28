# Plan: Voice Agent Improvements for Schedule of Tests

## Problem Summary

The ElevenLabs voice agent needs improvements based on BS7671 form structure:

1. **Column 3 & 4 incorrect** - Should be "Type of Wiring" and "Reference Method", not circuit types
2. **Circuit naming** - Should support "Circuit 1 - Sockets" format (number + description)
3. **Delete circuit** - Voice command to delete circuits
4. **Test validation** - Flag problematic readings and suggest what to check

---

## BS7671 Column Reference

### Schedule of Circuit Details (Columns 1-16)
| Col | Field | Values |
|-----|-------|--------|
| 1 | Circuit number | 1, 2, 3... |
| 2 | Circuit description | "Lighting", "Ring Final - Sockets", "Cooker" |
| 3 | Type of wiring | A=T&E, B=T+E in conduit, C=T+E in trunking, D=T+E metallic conduit, E=T+E metallic trunking, F=SWA, G=Thermosetting SWA, H=MI, O=Other |
| 4 | Reference method | A, B, C, D, E, F, G (per Table 4A2 of BS7671) |
| 5 | Points served | Number (e.g., 8 for sockets, 12 for lights) |
| 6 | Live size | 1.5, 2.5, 4.0, 6.0, 10, 16 mm² |
| 7 | CPC size | 1.0, 1.5, 2.5, 4.0 mm² |
| 8 | OCPD BS (EN) | "BS EN 60898", "BS EN 61009" |
| 9 | OCPD Type | B, C, D (MCB curves) or A, AC, F (RCD types) |
| 10 | OCPD Rating | 6, 10, 16, 20, 32, 40, 45 A |
| 11 | Breaking capacity | 6, 10 kA |
| 12 | Max Zs | From tables based on device |
| 13-16 | RCD details | BS, Type, IΔn (mA), Rating |

### Schedule of Test Results (Columns 17-31)
| Col | Field | Typical Values |
|-----|-------|----------------|
| 17 | Circuit number | Matches col 1 |
| 18 | r₁ (ring line) | 0.15-0.5 Ω |
| 19 | rₙ (ring neutral) | 0.15-0.5 Ω |
| 20 | r₂ (ring cpc) | 0.3-1.0 Ω |
| 21 | R₁+R₂ | 0.2-1.5 Ω |
| 22 | R₂ | 0.1-1.0 Ω |
| 23 | Test voltage | 250, 500, 1000 V |
| 24 | IR L-L | >2 MΩ (min 1.0) |
| 25 | IR L-E | >2 MΩ (min 1.0) |
| 26 | Polarity | ✓ or ✗ |
| 27 | Zs measured | Must be < Max Zs |
| 28 | RCD time | <300ms (1x), <40ms (5x) |
| 29 | RCD test button | ✓ |
| 30 | AFDD test | ✓ or N/A |
| 31 | Remarks | Free text |

---

## Files to Modify

### 1. `supabase/functions/setup-testing-voice-agent/index.ts`

**Update system prompt with:**

```
## Circuit Naming Convention
When adding circuits, use format: "Circuit [number] - [description]"
Examples:
- "Add circuit 1 sockets" → Circuit 1 - Ring Final Sockets
- "Add circuit 2 lighting" → Circuit 2 - Lighting
- "Add circuit 3 cooker" → Circuit 3 - Cooker

## Type of Wiring Codes (Column 3)
- A = Thermoplastic insulated/sheathed cables (T&E)
- B = Thermoplastic cables in non-metallic conduit
- C = Thermoplastic cables in non-metallic trunking
- D = Thermoplastic cables in metallic conduit
- E = Thermoplastic cables in metallic trunking
- F = Thermoplastic SWA cables
- G = Thermosetting SWA cables
- H = Mineral insulated cables
- O = Other (specify in remarks)

Most domestic = A (twin and earth)

## Reference Method Codes (Column 4)
Per BS7671 Table 4A2:
- A = Enclosed in conduit in thermally insulating wall
- B = Enclosed in conduit on wall or in trunking
- C = Clipped direct (most common for T&E)
- D = In trunking
- E = Free air / cable tray
- F = Enclosed in conduit in floor
- G = Spaced from surface

Most domestic T&E = C (clipped direct)

## Test Value Validation
When test values are entered, check against BS7671 limits:

### Insulation Resistance (Columns 24-25)
- PASS: ≥1.0 MΩ (absolute minimum)
- GOOD: ≥2.0 MΩ (expected)
- FLAG: <1.0 MΩ → "Insulation resistance too low. Check for moisture, damaged insulation, or faulty accessories."

### Earth Fault Loop Impedance Zs (Column 27)
- Compare against Max Zs (column 12)
- PASS: Measured Zs < Max Zs × 0.8 (with 80% rule)
- FLAG: Measured Zs ≥ Max Zs → "Zs exceeds maximum. Check connections, cable route length, or consider larger CPC."

### Continuity R₁+R₂ (Column 21)
- GOOD: <1.0 Ω for most circuits
- FLAG: >1.5 Ω → "High R₁+R₂. Check terminations and cable condition."

### Ring Final Circuits (Columns 18-20)
- r₁ and rₙ should be similar (within 0.05Ω)
- r₂ should be approximately 1.67× r₁
- FLAG: If r₁ ≠ rₙ → "Ring may be broken or have interconnections."

### RCD Trip Time (Column 28)
- At 1×IΔn: Must be <300ms
- At 5×IΔn: Must be <40ms
- FLAG: >300ms → "RCD trip time too slow. Test again or replace RCD."

### Polarity (Column 26)
- Must be ✓ (correct)
- FLAG: ✗ → "DANGER: Incorrect polarity. Do not energise. Check connections at consumer unit and all accessories."

## Delete Circuit Commands
"Delete circuit 3" → Removes circuit 3, renumbers remaining circuits
"Remove the last circuit" → Removes the last circuit
"Delete all circuits" → Clears all (with confirmation)
```

**Add validate_tests action to fill_schedule_of_tests tool:**

```typescript
{
  name: 'action',
  type: 'string',
  enumValues: [
    'add_circuit',
    'update_field',
    'update_multiple_fields',
    'next_circuit',
    'previous_circuit',
    'select_circuit',
    'delete_circuit',
    'get_status',
    'validate_tests',  // NEW - check all test values
    'get_issues'       // NEW - report any flagged issues
  ]
}
```

### 2. `src/components/EICRScheduleOfTests.tsx`

**Add validate_tests action handler:**

```typescript
case 'validate_tests':
case 'get_issues': {
  const issues: string[] = [];

  testResults.forEach((circuit, idx) => {
    const num = idx + 1;

    // Check insulation resistance
    const ir = parseFloat(circuit.insulationLiveEarth || '0');
    if (ir > 0 && ir < 1.0) {
      issues.push(`C${num}: IR ${ir}MΩ too low (<1.0MΩ). Check for moisture/damage.`);
    }

    // Check Zs vs Max Zs
    const zs = parseFloat(circuit.zs || '0');
    const maxZs = parseFloat(circuit.maxZs || '0');
    if (zs > 0 && maxZs > 0 && zs >= maxZs) {
      issues.push(`C${num}: Zs ${zs}Ω exceeds max ${maxZs}Ω. Check cable/connections.`);
    }

    // Check polarity
    if (circuit.polarity === 'Incorrect' || circuit.polarity === '✗') {
      issues.push(`C${num}: INCORRECT POLARITY! Do not energise.`);
    }

    // Check RCD time
    const rcdTime = parseFloat(circuit.rcdOneX || '0');
    if (rcdTime > 300) {
      issues.push(`C${num}: RCD trip ${rcdTime}ms too slow (>300ms).`);
    }

    // Check R1+R2 continuity
    const r1r2 = parseFloat(circuit.r1r2 || '0');
    if (r1r2 > 1.5) {
      issues.push(`C${num}: R1+R2 ${r1r2}Ω high. Check terminations.`);
    }

    // Ring final checks
    if (circuit.circuitType?.toLowerCase().includes('ring')) {
      const r1 = parseFloat(circuit.ringR1 || '0');
      const rn = parseFloat(circuit.ringRn || '0');
      if (r1 > 0 && rn > 0 && Math.abs(r1 - rn) > 0.1) {
        issues.push(`C${num}: Ring r1(${r1}) ≠ rn(${rn}). Check for breaks.`);
      }
    }
  });

  if (issues.length === 0) {
    toast.success('All test values look good!');
    return 'All circuits passed validation. No issues found.';
  }

  const issueList = issues.join('\n');
  toast.warning(`Found ${issues.length} issue(s)`);
  return `Found ${issues.length} issue(s):\n${issueList}`;
}
```

**Update add_circuit to use proper description format:**

```typescript
case 'add_circuit': {
  const circuitType = params.circuit_type as string || 'other';
  const description = params.description as string || '';
  const nextNum = (testResults.length + 1).toString();

  // Create circuit with proper naming
  const newCircuit = createCircuitWithDefaults(circuitType, nextNum, description);

  // Format: "1 - Ring Final Sockets" or "2 - Lighting"
  const circuitDescription = description || getDefaultDescription(circuitType);
  newCircuit.circuitDesignation = `${nextNum} - ${circuitDescription}`;

  // Set default wiring type (A = T&E for domestic)
  newCircuit.wiringType = 'A';

  // Set default reference method (C = clipped direct)
  newCircuit.referenceMethod = 'C';

  setTestResults(prev => [...prev, newCircuit]);
  setSelectedCircuitIndex(testResults.length);
  toast.success(`Added Circuit ${nextNum} - ${circuitDescription}`);
  return `Added circuit ${nextNum} - ${circuitDescription}`;
}
```

### 3. `src/utils/circuitDefaults.ts`

**Add helper function:**

```typescript
export function getDefaultDescription(circuitType: string): string {
  const descriptions: Record<string, string> = {
    'lighting': 'Lighting',
    'ring': 'Ring Final Sockets',
    'radial': 'Radial Sockets',
    'cooker': 'Cooker',
    'shower': 'Shower',
    'immersion': 'Immersion Heater',
    'smoke_alarm': 'Smoke Alarms',
    'ev_charger': 'EV Charger',
    'boiler': 'Boiler/CH',
    'socket': 'Sockets',
    'spur': 'Fused Spur',
    'other': 'Circuit'
  };
  return descriptions[circuitType.toLowerCase()] || 'Circuit';
}
```

---

## Voice Command Examples

### Adding Circuits
- "Add circuit 1 sockets" → Circuit 1 - Ring Final Sockets
- "Add a lighting circuit" → Circuit 2 - Lighting
- "Add circuit 3 as cooker" → Circuit 3 - Cooker
- "Add 6 socket circuits" → Circuits with sequential numbers

### Deleting Circuits
- "Delete circuit 3"
- "Remove circuit 5"
- "Delete the last circuit"

### Updating Wiring Type
- "Set wiring type to A" → Twin & Earth
- "Circuit 3 is SWA" → Type F

### Updating Reference Method
- "Reference method C" → Clipped direct
- "Set reference method to B for circuit 2"

### Test Validation
- "Check my tests"
- "Are there any issues?"
- "Validate the schedule"

### Getting Issues
- "What's wrong with circuit 3?"
- "Any problems?"

---

## Deployment Steps

1. Update `setup-testing-voice-agent/index.ts` with new system prompt
2. Update component handlers with validate_tests action
3. Add getDefaultDescription helper
4. Deploy edge function
5. Trigger agent setup
6. Test in app

