---
paths:
  - 'src/pages/inspection/**'
  - 'src/components/inspection/**'
  - 'src/utils/reportCloud.ts'
  - 'src/utils/draftStorage.ts'
---

# Certificate System Rules

## Auto-save architecture (NEVER deviate):

1. localStorage save every 10 seconds
2. Cloud sync with 30-second debounce
3. `beforeunload` emergency save
4. `syncNowImmediate` must pass data directly via `dataOverride` — never double-read

## Adding a new certificate type requires ALL of:

1. Page in `src/pages/inspection/<Type>Certificate.tsx`
2. Components in `src/components/inspection/<type-name>/`
3. Route in `src/routes/InspectionRoutes.tsx`
4. Report type prefix detection in `reportCloud.ts`
5. Status calculation with type-specific signature fields
6. Draft detection in `draftStorage.ts`

## Status calculation:

- NEVER use generic `engineerSignature`
- Fire Alarm: `installerSignature` + `commissionerSignature` + `commissioningDate`
- Emergency Lighting: `testerSignature` + `testDate`
- Each type has its own signature fields

## Reference implementation: EmergencyLightingCertificate.tsx
