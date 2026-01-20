# Cost Engineer Business Settings - Input Clearing Fix

## Problem

In the Business Settings dialog, users cannot clear the first digit or zero from number input fields. When they try to delete all characters, the field immediately reverts to `0`.

**Root Cause:** The onChange handlers use `Number(e.target.value) || 0` which:
- Converts empty string `""` to `0` (since `Number("") === 0` is falsy)
- Prevents users from having a temporarily empty field while typing

**Affected File:** `src/components/electrician-tools/cost-engineer/BusinessSettingsDialog.tsx`

**All 14 affected fields:**
- Van Costs, Tool Depreciation, Business Insurance, Admin Costs, Marketing
- Electrician Rate, Apprentice Rate, Target Personal Income
- Minimum/Target/Premium Profit Margins
- Travel per Job, Permits/Parking, Waste Disposal

---

## Solution

Use string state for input display values and only convert to numbers when valid. This allows empty fields while typing.

### Approach: Track raw input strings separately

1. **Add string state for input values:**
```tsx
const [inputValues, setInputValues] = useState<Record<string, string>>({});
```

2. **Initialize from settings on mount/open:**
```tsx
useEffect(() => {
  if (open) {
    setInputValues({
      'monthlyOverheads.vanCosts': settings.monthlyOverheads.vanCosts.toString(),
      'monthlyOverheads.toolDepreciation': settings.monthlyOverheads.toolDepreciation.toString(),
      // ... etc for all 14 fields
    });
  }
}, [open, settings]);
```

3. **Create helper for input props:**
```tsx
const getInputProps = (path: string, category: keyof BusinessSettings, field: string) => ({
  value: inputValues[path] ?? (settings[category] as any)[field].toString(),
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty string for typing
    setInputValues(prev => ({ ...prev, [path]: val }));
    // Update settings only if valid number
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setSettings(prev => ({
        ...prev,
        [category]: { ...(prev[category] as any), [field]: num }
      }));
    }
  },
  onBlur: () => {
    // Normalize empty/invalid to 0 on blur
    const val = inputValues[path];
    if (val === '' || val === undefined || isNaN(parseFloat(val))) {
      setInputValues(prev => ({ ...prev, [path]: '0' }));
      setSettings(prev => ({
        ...prev,
        [category]: { ...(prev[category] as any), [field]: 0 }
      }));
    }
  }
});
```

4. **Update each MobileInput:**

**Before:**
```tsx
<MobileInput
  label="Van Costs"
  hint="Lease, fuel, insurance"
  type="number"
  inputMode="decimal"
  unit="£"
  value={settings.monthlyOverheads.vanCosts.toString()}
  onChange={(e) => setSettings({
    ...settings,
    monthlyOverheads: { ...settings.monthlyOverheads, vanCosts: Number(e.target.value) || 0 }
  })}
/>
```

**After:**
```tsx
<MobileInput
  label="Van Costs"
  hint="Lease, fuel, insurance"
  type="number"
  inputMode="decimal"
  unit="£"
  {...getInputProps('monthlyOverheads.vanCosts', 'monthlyOverheads', 'vanCosts')}
/>
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/electrician-tools/cost-engineer/BusinessSettingsDialog.tsx` | Add inputValues state, getInputProps helper, update all 14 inputs |

---

## Implementation Steps

1. Add `inputValues` state after existing state declarations
2. Add `useEffect` to initialize inputValues when dialog opens
3. Add `getInputProps` helper function
4. Update all 14 MobileInput components to use the helper
5. Test all fields can be cleared and typed into

---

## Testing

1. Open Cost Engineer → Business Settings
2. Click on "Van Costs" field (default: 450)
3. Select all text and delete - should allow empty field
4. Type new number - should update
5. Click away (blur) - empty field should become 0
6. Repeat for all 14 fields
7. Save and reload - values should persist correctly

---

## Verification

```bash
npm run build  # No TypeScript errors
npm run dev    # Test manually
```
