Scaffold or work with certificate types.

Usage: /cert <action> [type]

Actions:

- `list` — List all certificate types and their status
- `new <type>` — Scaffold a new certificate type

For `new`, follow the EmergencyLightingCertificate.tsx pattern (the reference implementation):

1. Create the page component in `src/pages/inspection/<TypeName>Certificate.tsx`
2. Create form components in `src/components/inspection/<type-name>/`
3. Add the route in `src/routes/InspectionRoutes.tsx`
4. Add report type detection in `src/utils/reportCloud.ts` (prefix matching)
5. Add status calculation for the new type's signature fields
6. Add draft detection in `src/utils/draftStorage.ts`
7. Follow CLAUDE.md design system: eicr-section-card, h-11 touch targets, touch-manipulation, UK English

Reference files to study:

- `src/pages/inspection/EmergencyLightingCertificate.tsx` — full auto-save pattern
- `src/pages/inspection/FireAlarmCertificate.tsx` — multi-signature pattern
- `src/utils/reportCloud.ts` — report type detection + status calc
- `src/utils/draftStorage.ts` — draft recovery
