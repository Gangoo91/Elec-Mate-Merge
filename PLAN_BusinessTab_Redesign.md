# Plan: BusinessTab Complete Redesign

## Current State Analysis

### Two Separate Business Pages
1. **BusinessTab.tsx** (Settings > Business tab) - Basic form with:
   - Company Details (name, address, phone, email, etc.)
   - Registration & Certification (scheme, number, expiry)
   - Worker Rates (5 worker types)
   - Testing Instruments (add/remove list)
   - Branding (logo, colours)
   - Single "Save Business Settings" button at bottom

2. **Profile.tsx** (/profile route) - "Business Profile" page with modular cards:
   - ProfileHeader (avatar, name, Elec-ID, subscription tier)
   - ContactDetailsCard (email, phone, company email)
   - BusinessDetailsCard (company name, address, postcode, phone)
   - QualificationsCard (ECS card, registration scheme)
   - PaymentBankingCard (Stripe Connect, bank details)
   - AccountingConnectorsCard (Xero, QuickBooks, etc.)
   - BrandingCard (logo, signature, colours)
   - WorkerRatesCard
   - InspectorDetailsCard
   - TestingInstrumentsCard
   - QuoteSettingsCard
   - ProfileFooter

### Problems
- **Duplicate functionality** across two pages
- **BusinessTab is a basic form** - doesn't match native app feel
- **Profile page has all the features** but is a separate route, not in Settings
- **No T&Cs** mentioned in plan (user confirmed they don't have T&Cs)
- **Inconsistent UX** - one page has cards, one has form sections

---

## Proposed Solution

### Delete the separate Profile page and consolidate everything into BusinessTab

The BusinessTab should become the **single source of truth** for all business settings, using the **card-based modular design** from Profile.tsx but adapted to work within the Settings tabs.

---

## Implementation Plan

### Phase 1: Restructure BusinessTab with Card Components

Replace the current form-based BusinessTab with a card-based layout using the existing profile card components.

**New BusinessTab Structure:**
```
BusinessTab
├── ProfileHeader (company avatar, name, Elec-ID badge)
├── Two-column grid (responsive):
│   ├── Left Column:
│   │   ├── ContactDetailsCard
│   │   ├── BusinessDetailsCard
│   │   ├── WorkerRatesCard
│   │   ├── TestingInstrumentsCard
│   │   └── InspectorDetailsCard
│   └── Right Column:
│       ├── PaymentBankingCard (Stripe + Bank details)
│       ├── AccountingConnectorsCard
│       ├── QualificationsCard
│       ├── QuoteSettingsCard
│       └── BrandingCard
```

### Phase 2: Adapt Card Components for Settings Context

The existing card components in `/components/profile/` are designed for the Profile page. We'll:
1. **Import and reuse them directly** in BusinessTab
2. Pass the same props (companyProfile, onSave, isLoading)
3. Remove the Profile.tsx page and route

### Phase 3: Wire Up All Functionality

Each card already has its own edit sheet/modal. Ensure:
- PaymentBankingCard includes Stripe Connect status & dashboard link
- AccountingConnectorsCard shows connection status for Xero/QuickBooks/Sage
- All cards call `saveCompanyProfile` from `useCompanyProfile` hook
- Data persists and refreshes correctly

### Phase 4: Delete Redundant Files

After BusinessTab is complete:
1. Delete `/src/pages/Profile.tsx`
2. Remove `/profile` route from router
3. Optionally consolidate card components if they're only used here

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/settings/BusinessTab.tsx` | **Rewrite** - Use card components |
| `src/pages/Profile.tsx` | **Delete** after migration |
| `src/App.tsx` or router file | **Remove** `/profile` route |

## Files to Reuse (no changes needed)

These existing card components will be imported into BusinessTab:
- `src/components/profile/ProfileHeader.tsx`
- `src/components/profile/ContactDetailsCard.tsx`
- `src/components/profile/BusinessDetailsCard.tsx`
- `src/components/profile/PaymentBankingCard.tsx`
- `src/components/profile/AccountingConnectorsCard.tsx`
- `src/components/profile/QualificationsCard.tsx`
- `src/components/profile/WorkerRatesCard.tsx`
- `src/components/profile/InspectorDetailsCard.tsx`
- `src/components/profile/TestingInstrumentsCard.tsx`
- `src/components/profile/QuoteSettingsCard.tsx`
- `src/components/profile/BrandingCard.tsx`

---

## UI/UX Design

### Mobile-First Card Layout
- Single column on mobile
- Two columns on desktop (lg breakpoint)
- Each card is tappable with chevron indicator
- Edit sheets slide up from bottom (85vh height)
- Native iOS-style animations

### Card Design Pattern (matching existing)
```
┌─Card─────────────────────────────────────────────┐
│ ● Card Title                               [>]   │
├──────────────────────────────────────────────────┤
│ [icon] LABEL                                     │
│        Value                                     │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤
│ [icon] LABEL                                     │
│        Value                           [badge]   │
└──────────────────────────────────────────────────┘
```

### Key Features to Include
1. **Stripe Connect** - Show connection status, link to Stripe Dashboard
2. **Bank Details** - Account name, sort code, account number
3. **Accounting Integrations** - Xero, QuickBooks, Sage connections
4. **Company Details** - All registration info
5. **Worker Rates** - Hourly rates for pricing
6. **Testing Instruments** - Calibration tracking
7. **Branding** - Logo, colours, signature
8. **Quote Settings** - Validity, deposit %, warranty

---

## What's NOT Included (per user request)
- Terms & Conditions (user confirmed they don't have T&Cs)

---

## Verification Checklist

After implementation:
- [ ] BusinessTab displays all company info in card format
- [ ] Each card opens edit sheet when tapped
- [ ] Stripe Connect shows connection status
- [ ] Bank details can be viewed/edited
- [ ] Accounting software shows connection status
- [ ] All data saves correctly via useCompanyProfile
- [ ] Data persists after navigation
- [ ] Profile.tsx page is deleted
- [ ] /profile route is removed
- [ ] No duplicate business settings pages exist
- [ ] Mobile responsive (single column)
- [ ] Desktop responsive (two columns)
