# Client Selector Implementation Plan

## Problem Identified

The original implementation modified the WRONG files:
- Modified `src/components/inspection-app/eic/EICClientDetailsSection.tsx` but EIC uses `src/components/inspection/eic/EICClientDetailsSection.tsx`
- Modified `src/components/inspection-app/minor-works/WorkDetailsSection.tsx` but Minor Works uses `src/components/minor-works/MWDetailsTab.tsx`

## Correct Files to Modify

| Form | Correct File Path |
|------|------------------|
| **EICR** | `src/components/inspection-app/ClientDetailsSection.tsx` |
| **EIC** | `src/components/inspection/eic/EICClientDetailsSection.tsx` |
| **Minor Works** | `src/components/minor-works/MWDetailsTab.tsx` |

---

## Implementation Steps

### Step 1: Create ClientSelector Component
**File:** `src/components/inspection-app/ClientSelector.tsx`

A reusable component that:
- Shows toggle: "New Client" | "Existing Client"
- When "Existing Client" selected, opens mobile-first bottom sheet (85vh)
- Fetches customers via `useCustomers()` hook with debounced search
- Shows selected customer card with clear/change options
- Emits selected customer to parent for pre-fill

### Step 2: Modify EICR Client Details Section
**File:** `src/components/inspection-app/ClientDetailsSection.tsx`

Changes:
1. Import `ClientSelector` and `Customer` type
2. Add `handleCustomerSelect` function after `handleAlterationsChange`
3. Add `ClientSelector` component after "Client Information" header (line ~59)
4. Pre-fill fields: clientName, clientEmail, clientPhone, clientAddress

### Step 3: Modify EIC Client Details Section
**File:** `src/components/inspection/eic/EICClientDetailsSection.tsx`

Changes:
1. Import `ClientSelector` and `Customer` type
2. Add `handleCustomerSelect` function after `handleSameAddressToggle`
3. Add `ClientSelector` component after "Client Information" header (line ~67)
4. Pre-fill fields: clientName, clientEmail, clientPhone, clientAddress

### Step 4: Modify Minor Works Details Tab
**File:** `src/components/minor-works/MWDetailsTab.tsx`

Changes:
1. Import `ClientSelector` and `Customer` type
2. Add `handleCustomerSelect` function after `getCompletionPercentage`
3. Add `ClientSelector` component after Certificate Number display (line ~80-81)
4. Pre-fill fields: clientName, clientEmail, propertyAddress

---

## Client Field Mappings

| Customer Field | EICR | EIC | Minor Works |
|---------------|------|-----|-------------|
| `name` | clientName | clientName | clientName |
| `email` | clientEmail | clientEmail | clientEmail |
| `phone` | clientPhone | clientPhone | *(not used)* |
| `address` | clientAddress | clientAddress | propertyAddress |

---

## Verification Steps

1. **EIC Form:** Navigate to Inspection > EIC, toggle "Existing Client", search and select a customer, verify fields pre-fill
2. **EICR Form:** Navigate to Inspection > EICR, same test
3. **Minor Works Form:** Navigate to Inspection > Minor Works, same test (note: uses propertyAddress not clientAddress)
