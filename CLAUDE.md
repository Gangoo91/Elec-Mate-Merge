# Elec-Mate 2.0

UK electrical certification & apprentice training platform. React/Vite/TypeScript/Tailwind/Supabase.

## Language
**UK English only**: analyse, colour, centre, organisation, licence, programme, metre

## Design System

### Form Sections (EICR Pattern)
```tsx
<div className="eicr-section-card">
  <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <SectionHeader title="..." icon={Icon} isOpen={isOpen} color="amber-500" />
    <CollapsibleContent>
      <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
```

### Section Headers
```tsx
// Simple (with colored dot)
<h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
  Title
</h3>

// Gradient (for important sections)
<div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 rounded-lg px-4 py-3">
  <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
    Title
  </h3>
</div>
```

### Form Controls
```tsx
// Input
<Input className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500" />

// Select
<SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
<SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">

// Checkbox
<Checkbox className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black" />

// Textarea
<Textarea className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500" />
```

### Tool Sheets (AI Features, Scanners)
```tsx
// 85vh bottom sheet, not full page
<Sheet open={true} onOpenChange={...}>
  <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
    <div className="flex flex-col h-full bg-background">
```

### Colors
| Element | Classes |
|---------|---------|
| Primary accent | `elec-yellow`, `bg-elec-yellow` |
| Input focus | `border-yellow-500 focus:ring-yellow-500` |
| Card background | `bg-elec-gray`, `bg-card/50` |
| Dot indicators | `bg-yellow-400`, `bg-blue-400`, `bg-green-400`, `bg-purple-400` |
| Alerts | `border-orange-500/30 bg-orange-500/10 text-orange-300` |

## Study Centre Structure

```
src/pages/study-centre/
├── apprentice/           # Apprentice hub (Level 2/3 courses)
├── upskilling/          # CPD courses for qualified electricians
└── college/             # College tutor dashboard
```

### Course Module Pattern
```tsx
// Each module: ModuleX.tsx with sections as child routes
// Sections: ModuleXSectionY.tsx
// Subsections: subsectionZ.tsx (numbered content pages)
```

## Key Directories
- `src/components/inspection-app/` - EICR/EIC forms
- `src/components/testing/` - Board scanner, schedule of tests
- `src/components/electrician-tools/` - Calculators, site safety
- `src/pages/study-centre/` - All learning content
- `supabase/functions/` - Edge functions

## Mobile
- Touch targets: `h-11` minimum (44px)
- Always add `touch-manipulation` to interactive elements
- Use `hidden sm:block` to hide non-essential elements on mobile
- Bottom padding for fixed footers: `pb-20 sm:pb-4`

## Git Repository
- **Repository:** `Gangoo91/Elec-Mate-Merge`
- **Branch:** `main`
- **All commits push to:** `origin main` (elec-mate-merge)
- Always push changes to this repo when asked

## Supabase Architecture

### Frontend Auth & User Data
- **Project:** `jtwygbeceundfgnkirof`
- **URL:** `https://jtwygbeceundfgnkirof.supabase.co`
- **Purpose:** User authentication, profiles, user-specific data
- **client.ts points here**

### Backend Edge Functions & RAG Data (elec-mate)
- **Project:** `cjjlpiyfzvhffkfyszgh`
- **URL:** `https://cjjlpiyfzvhffkfyszgh.supabase.co`
- **Purpose:** All AI edge functions, RAG embeddings, pricing data
- **Has:** OpenAI API key (GPT-5-mini), all edge functions deployed
- **Deploy edge functions here:** `--project-ref cjjlpiyfzvhffkfyszgh`

### Edge Function Deployment
```bash
SUPABASE_ACCESS_TOKEN=sbp_7b34e1898aec791530c65e44070eae652ac94933 npx supabase functions deploy <function-name> --project-ref cjjlpiyfzvhffkfyszgh
```

### Key Edge Functions (on elec-mate)
- `create-cost-engineer-job` / `process-cost-engineer-job` - AI Cost Engineer
- `health-safety-v3` / `create-health-safety-job` - AI RAMS
- `designer-agent-v3` / `create-circuit-design-job` - Circuit Designer
- `installer-v3` - Installation guidance
- `commissioning-v3` - Commissioning specialist

### RAG Tables (on elec-mate)
- `pricing_embeddings` - Trade pricing data
- `practical_work_intelligence` - Labour timing data
- `design_knowledge` - Circuit design patterns
