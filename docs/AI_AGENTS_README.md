# AI Agents & Modules - Developer Documentation

> **Last Updated**: December 2024  
> **Status**: Production  
> **Critical**: Do not modify agent pipelines without understanding dependencies

---

## Table of Contents

1. [Circuit Designer (Design Consultation Agent 1)](#1-circuit-designer)
2. [Cost Engineer (Design Consultation Agent 2)](#2-cost-engineer)
3. [Installation Specialist (Design Consultation Agent 3)](#3-installation-specialist)
4. [Health & Safety (Design Consultation Agent 4)](#4-health--safety)
5. [Maintenance Specialist (Design Consultation Agent 5)](#5-maintenance-specialist)
6. [AI RAMS Module](#6-ai-rams-module)
7. [AI Assistant](#7-ai-assistant)
8. [Database Tables Reference](#8-database-tables-reference)
9. [Critical Architecture Principles](#9-critical-architecture-principles)

---

## 1. Circuit Designer

**Edge Functions**: `designer-agent-v3`, `design-installation-agent`  
**Frontend**: `src/components/electrician-tools/circuit-designer/`

### Purpose

Generates BS 7671-compliant electrical circuit designs with cable sizing, protection device selection, and installation guidance for UK electrical installations.

### Inputs

```typescript
{
  jobId: string;
  userId: string;
  jobInputs: {
    projectName: string;
    installationType: 'domestic' | 'commercial' | 'industrial';
    supplyType: 'single_phase' | 'three_phase';
    voltage: number;
    earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
    ze: number;
    circuits: Array<{
      name: string;
      circuitType: string;
      loadPower: number;
      cableLength: number;
      installationMethod: string;
    }>;
  };
}
```

### RAG Sources

| Table | Search Method | Purpose |
|-------|---------------|---------|
| `design_knowledge_intelligence` | GIN-indexed keyword search | Cable sizing, BS 7671 tables, formulas |
| `regulations_intelligence` | GIN-indexed keyword search | BS 7671 regulation text |

**Keyword Extraction**: `design-keyword-extractor.ts` generates 50-150+ keywords per job across 12 categories (calculations, cable selection, protection, earthing, diversity, etc.).

### Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: Circuit Designer                     │
├─────────────────────────────────────────────────────────────────┤
│  1. Normalize inputs                                             │
│  2. RAG search (parallel):                                       │
│     - design_knowledge_intelligence (30 results)                 │
│     - regulations_intelligence (15 results)                      │
│  3. AI generation with GPT-5 Mini                                │
│  4. Minimal safety checks:                                       │
│     - Ring final 32A on 2.5mm² (BS 7671 Appendix 15)            │
│     - Socket circuits require RCD/RCBO                           │
│  5. Update job: status='processing', progress=50%                │
│  6. FIRE-AND-FORGET call to design-installation-agent            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (no await)
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 2: Installation Agent                      │
├─────────────────────────────────────────────────────────────────┤
│  1. Read designed circuits from database                         │
│  2. RAG search (parallel):                                       │
│     - regulations_intelligence (installation/testing)            │
│     - practical_work_intelligence (tradeFilter: 'installer')     │
│  3. Generate per-circuit installation guidance                   │
│  4. Update job: status='complete', progress=100%                 │
└─────────────────────────────────────────────────────────────────┘
```

**Execution Characteristics**:
- Model: `gpt-5-mini-2025-08-07`
- Phase 1 Timeout: 90 seconds
- Phase 2 Timeout: 300 seconds
- Cache: 30-day TTL in `circuit_design_cache_v4`
- Pattern: **Fire-and-forget** (Phase 1 doesn't wait for Phase 2)

### Outputs

**Database Updates** (`circuit_design_jobs` table):

```typescript
{
  status: 'complete';
  progress: 100;
  design_data: {
    circuits: Array<{
      circuitNumber: number;
      name: string;
      cableSpec: string;           // e.g., "2.5mm² twin and earth"
      protectionDevice: string;    // e.g., "32A Type B RCBO"
      voltageDrop: number;
      zsCalculated: number;
      maxZs: number;
      complianceStatus: 'pass' | 'warning' | 'fail';
      justification: string;
      expectedTests: { r1r2, zs, insulationResistance };
    }>;
    summary: { totalLoad, diversifiedLoad, mainSwitchRating };
  };
  installation_guidance: {
    circuit_0: { guidance: { safetyConsiderations, materialsRequired, toolsRequired, installationProcedure, testingRequirements } };
    circuit_1: { ... };
  };
}
```

### Integration Notes

| Downstream Component | Dependency |
|---------------------|------------|
| `DesignReviewEditor.tsx` | Displays design results, handles PDF export |
| `generate-circuit-design-pdf` | PDF generation from design data |
| Frontend polling | Uses `status` field to detect completion |

### Warnings / Accuracy Requirements

⚠️ **CRITICAL - Do Not Change**:

1. **Fire-and-forget pattern**: Designer must NOT await Installation Agent response. This prevents HTTP timeout freezes at 90%.

2. **Job status lifecycle**: Phase 1 sets `status='processing'`, only Phase 2 sets `status='complete'`. Premature completion breaks frontend polling.

3. **Ring final exemptions**: 32A/2.5mm² ring finals are exempt from In≤Iz validation per BS 7671 Appendix 15.

4. **Zs values use Cmin=0.95**: All max Zs calculations must use Cmin=0.95 per BS 7671:2018+A2:2022.

5. **Expected test results**: Must be numerical only (no Ω suffix), return `null` not `'N/A'` for missing values.

6. **UK English**: All output must use UK spelling ("earthing" not "grounding", "metres" not "meters").

---

## 2. Cost Engineer

**Edge Function**: `cost-engineer-v3`  
**Frontend**: `src/components/electrician-tools/cost-engineer/`

### Purpose

Generates detailed cost estimates and quotes for electrical work with pricing tiers, material costs, labour breakdown, and profitability analysis.

### Inputs

```typescript
{
  query: string;              // Natural language job description
  region?: string;            // UK region for pricing adjustments
  businessSettings?: {
    hourlyRate: number;
    markupPercentage: number;
    vatRegistered: boolean;
  };
  projectContext?: {
    installationType: string;
    complexity: string;
  };
}
```

### RAG Sources

| Table | Search Method | Purpose |
|-------|---------------|---------|
| `pricing_data` | GIN-indexed keyword search | Material prices, labour rates |
| `practical_work_intelligence` | GIN-indexed keyword search | Task durations, complexity factors |

### Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Cost Engineer V3                            │
├─────────────────────────────────────────────────────────────────┤
│  1. Parse query, extract job type keywords                       │
│  2. RAG search (parallel):                                       │
│     - pricing_data (12 results)                                  │
│     - practical_work_intelligence (8 results)                    │
│  3. AI generation with GPT-5 Mini                                │
│     - max_completion_tokens: 8000                                │
│     - timeout: 150 seconds                                       │
│  4. Return JSON response directly (synchronous)                  │
└─────────────────────────────────────────────────────────────────┘
```

**Execution Characteristics**:
- Model: `gpt-5-mini-2025-08-07` (MANDATORY - never change)
- Timeout: 150 seconds
- Pattern: **Synchronous** (direct JSON response)
- No job queue - immediate response

### Outputs

```typescript
{
  summary: string;
  pricingTiers: {
    budget: { price, description };
    normal: { price, description, recommended: true };
    premium: { price, description };
  };
  costBreakdown: {
    materials: number;
    labour: number;
    overhead: number;
    profit: number;
  };
  materials: Array<{ item, quantity, unitCost, totalCost }>;
  labourTasks: Array<{ task, hours, rate, cost }>;
  risks: Array<{ risk, mitigation, costImpact }>;
  confidence: number;  // 0-1 decimal
}
```

### Integration Notes

| Downstream Component | Dependency |
|---------------------|------------|
| `CostEngineerResults.tsx` | Displays cost breakdown |
| `generate-cost-engineer-pdf` | PDF generation |
| Quote Builder | Can import cost data |

**PDF Payload Architecture**: Frontend `buildPdfPayload()` constructs the exact 20-section JSON structure. Edge function passes directly to PDF Monkey without transformation.

### Warnings / Accuracy Requirements

⚠️ **CRITICAL - Do Not Change**:

1. **GPT-5 Mini only**: User explicitly required `gpt-5-mini-2025-08-07`. Never suggest switching to Lovable AI/Gemini.

2. **Direct pass-through PDF**: Edge function must NOT recalculate frontend values. Frontend is source of truth.

3. **Confidence as decimal**: All confidence values must be 0-1 decimals, not percentages.

4. **Stability over optimisation**: Do not attempt architectural refactors. Incremental changes only.

---

## 3. Installation Specialist

**Edge Function**: `process-installation-method-job`  
**Frontend**: `src/components/electrician-tools/installation-specialist/`

### Purpose

Generates detailed method statements with step-by-step installation procedures, safety requirements, and BS 7671 regulatory references.

### Inputs

```typescript
{
  jobId: string;
  userId: string;
  jobInputs: {
    installationType: string;      // e.g., "Consumer Unit Replacement"
    projectName: string;
    location: string;
    clientName: string;
    additionalRequirements?: string;
  };
}
```

### RAG Sources

| Table | Search Method | Purpose |
|-------|---------------|---------|
| `practical_work_intelligence` | GIN-indexed keyword (25 results) | Installation procedures, tools, materials |
| `regulations_intelligence` | GIN-indexed keyword (15 results) | BS 7671 references |

**Keyword Extraction**: 500+ keywords across 12 categories using `installation-keywords.ts`.

### Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  Installation Specialist                         │
├─────────────────────────────────────────────────────────────────┤
│  1. Check semantic cache (85% similarity threshold)              │
│     - Cache hit: Return cached result immediately                │
│  2. Extract keywords (500+ keyword system)                       │
│  3. RAG search (parallel):                                       │
│     - practical_work_intelligence                                │
│     - regulations_intelligence                                   │
│  4. AI generation with GPT-5 Mini                                │
│     - Tool calling for structured output                         │
│  5. Store in method_data column                                  │
│  6. Update job: status='complete'                                │
│  7. Cache result (30-day TTL)                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Execution Characteristics**:
- Model: `gpt-5-mini-2025-08-07`
- Timeout: 180 seconds
- Cache: 30-day TTL, 85% similarity threshold
- Pattern: **Asynchronous job queue**

### Outputs

**Database Updates** (`installation_method_jobs` table):

```typescript
{
  status: 'complete';
  method_data: {
    executiveSummary: {
      cableType, cableSize, runLength, installationMethod,
      protectiveDevice, voltageDrop, zsRequirement, purpose
    };
    installationSteps: Array<{
      stepNumber: number;
      title: string;
      content: string;
      safety: string;
      toolsRequired: string[];
      materialsNeeded: string[];
      duration: string;
      linkedHazards: string[];      // 2-4 hazards per step
      bsReferences: string[];       // 2-4 BS 7671 refs per step
    }>;
    materialsList: Array<{ description, specification, quantity, unit, notes }>;
    testingRequirements: Array<{ description, regulation, expectedReading, passRange }>;
  };
}
```

### Integration Notes

| Downstream Component | Dependency |
|---------------------|------------|
| `InstallationResults.tsx` | Displays method statement |
| `generate-installation-method-pdf` | PDF generation |
| Frontend polling | Uses `status` field |

### Warnings / Accuracy Requirements

⚠️ **CRITICAL - Do Not Change**:

1. **Column name**: Data stored in `method_data` column, NOT `installation_data`.

2. **Status value**: Must be `'complete'` not `'completed'`.

3. **No AI terminology**: UI must not show "AI-generated", "AI Quality Monitor", etc.

4. **UK English**: All output must use UK spelling.

5. **Semantic cache isolation**: Cache is for Installation Specialist only, not shared with other agents.

---

## 4. Health & Safety

**Edge Function**: `process-health-safety-job`  
**Frontend**: `src/components/electrician-tools/health-safety/`

### Purpose

Generates risk assessments following HSE 5 Steps to Risk Assessment methodology with hazard identification, control measures, PPE requirements, and emergency procedures.

### Inputs

```typescript
{
  jobId: string;
  userId: string;
  jobInputs: {
    workType: string;              // e.g., "Consumer Unit Installation"
    installationType: 'domestic' | 'commercial' | 'industrial';
    projectName: string;
    location: string;
    clientName: string;
    assessmentDate: string;
    reviewDate: string;
  };
}
```

### RAG Sources

| Table | Search Method | Purpose |
|-------|---------------|---------|
| `health_safety_hazards` | GIN-indexed keyword | Pre-defined hazard database |
| `practical_work_intelligence` | GIN-indexed keyword | Work procedures, risks |
| `regulations_intelligence` | GIN-indexed keyword | HSE regulations, BS 7671 safety |

### Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Health & Safety Agent                         │
├─────────────────────────────────────────────────────────────────┤
│  1. Extract work type keywords                                   │
│  2. Load pre-structured hazards from database                    │
│  3. RAG search (parallel):                                       │
│     - health_safety_hazards                                      │
│     - practical_work_intelligence                                │
│     - regulations_intelligence                                   │
│  4. AI generation with GPT-5 Mini                                │
│     - Tool calling for structured output                         │
│     - 4-minute watchdog timeout                                  │
│  5. Validate control measure format                              │
│  6. Update job: status='complete'                                │
└─────────────────────────────────────────────────────────────────┘
```

**Execution Characteristics**:
- Model: `gpt-5-mini-2025-08-07`
- Timeout: 240 seconds (4-minute watchdog)
- Pattern: **Asynchronous job queue**

### Outputs

**Database Updates** (`health_safety_jobs` table):

```typescript
{
  status: 'complete';
  output_data: {
    hazards: Array<{
      name: string;
      description: string;
      likelihood: 1-5;
      severity: 1-5;
      riskRating: number;
      controlMeasures: string;  // MUST use 9-section format
      regulation: string;
    }>;
    ppe: Array<{
      type: string;
      standard: string;
      purpose: string;
      mandatory: boolean;
    }>;
    emergencyProcedures: Array<{
      step: number;
      procedure: string;
    }>;
    notes: string;
  };
}
```

### Integration Notes

| Downstream Component | Dependency |
|---------------------|------------|
| `HealthSafetyResults.tsx` | Displays risk assessment |
| `generate-health-safety-pdf` | PDF generation |
| AI RAMS Module | Orchestrates H&S generation |

### Warnings / Accuracy Requirements

⚠️ **CRITICAL - Do Not Change**:

1. **Control measure format**: MUST use 9-section structured format with headers:
   ```
   PRIMARY ACTION: ... ELIMINATE: ... SUBSTITUTE: ... ENGINEER CONTROLS: ... 
   ADMINISTRATIVE CONTROLS: ... VERIFICATION: ... COMPETENCY REQUIREMENT: ... 
   EQUIPMENT STANDARDS: ... REGULATION: ...
   ```
   PDF parser requires this exact format.

2. **Hazard count requirements**:
   - Domestic: 15-20 hazards
   - Commercial/Industrial: 20-30 hazards

3. **Project metadata flow**: `project_info` and `work_type` from job record must merge with AI output for PDF generation.

4. **White text styling**: All text must use `text-white` or `text-foreground`, not `text-muted-foreground`.

---

## 5. Maintenance Specialist

**Edge Function**: `process-maintenance-method-job`  
**Frontend**: `src/components/electrician-tools/maintenance-specialist/`

### Purpose

Generates maintenance procedures for electrical equipment with schedules, inspection checklists, and UK qualification requirements.

### Inputs

```typescript
{
  jobId: string;
  userId: string;
  jobInputs: {
    equipmentType: string;
    manufacturer?: string;
    model?: string;
    installationDate?: string;
    lastServiceDate?: string;
    operatingEnvironment: string;
    additionalRequirements?: string;
  };
}
```

### RAG Sources

| Table | Search Method | Purpose |
|-------|---------------|---------|
| `maintenance_procedures` | GIN-indexed keyword | Equipment-specific procedures |
| `practical_work_intelligence` | GIN-indexed keyword | Maintenance tasks |
| `regulations_intelligence` | GIN-indexed keyword | BS 7671, manufacturer guidelines |

### Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Maintenance Specialist                         │
├─────────────────────────────────────────────────────────────────┤
│  1. Detect equipment category                                    │
│  2. RAG search for equipment-specific procedures                 │
│  3. AI generation with GPT-4o-mini                               │
│     - Equipment detection                                        │
│     - UK qualification mapping                                   │
│  4. Generate maintenance schedule                                │
│  5. Update job: status='complete'                                │
└─────────────────────────────────────────────────────────────────┘
```

**Execution Characteristics**:
- Model: `gpt-4o-mini` (UNIQUE - different from other agents)
- Timeout: 180 seconds
- Pattern: **Asynchronous job queue**

### Outputs

```typescript
{
  status: 'complete';
  method_data: {
    equipmentSummary: { type, manufacturer, model, age };
    maintenanceSchedule: Array<{
      task: string;
      frequency: string;       // e.g., "Monthly", "Annually"
      procedure: string;
      qualificationRequired: string;  // UK qualification
      estimatedDuration: string;
    }>;
    inspectionChecklist: Array<{ item, criteria, passFailCriteria }>;
    sparePartsRecommendations: Array<{ part, quantity, supplier }>;
    complianceNotes: string;
  };
}
```

### Integration Notes

| Downstream Component | Dependency |
|---------------------|------------|
| `MaintenanceResults.tsx` | Displays maintenance schedule |
| PDF generation | Export maintenance plan |

### Warnings / Accuracy Requirements

⚠️ **CRITICAL - Do Not Change**:

1. **Model exception**: This agent uses `gpt-4o-mini`, not `gpt-5-mini`. Do not change.

2. **UK qualifications**: Must map to UK qualifications (City & Guilds, ECS card levels).

---

## 6. AI RAMS Module

**Edge Function**: `generate-rams`  
**Frontend**: `src/components/electrician-tools/rams/`

### Purpose

Orchestrates parallel generation of Risk Assessment and Method Statement (RAMS) documentation by coordinating Health & Safety and Installation Specialist agents.

### Inputs

```typescript
{
  projectDetails: {
    projectName: string;
    location: string;
    clientName: string;
    startDate: string;
    workDescription: string;
  };
  installationType: string;
  workActivities: string[];
}
```

### RAG Sources

Uses RAG sources from subordinate agents:
- Health & Safety agent RAG sources
- Installation Specialist RAG sources

### Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       AI RAMS Module                             │
├─────────────────────────────────────────────────────────────────┤
│  1. Check 3-layer cache:                                         │
│     Layer 1: Full RAMS cache (exact match)                       │
│     Layer 2: H&S component cache                                 │
│     Layer 3: Method Statement component cache                    │
│                                                                  │
│  2. If cache miss, execute PARALLEL:                             │
│     ┌─────────────────┐    ┌─────────────────┐                  │
│     │  Health & Safety │    │  Installation   │                  │
│     │      Agent       │    │   Specialist    │                  │
│     └────────┬────────┘    └────────┬────────┘                  │
│              │                       │                           │
│              └───────────┬───────────┘                           │
│                          ▼                                       │
│  3. Combine results with graceful degradation                    │
│  4. Cache combined RAMS (30-day TTL)                             │
│  5. Return combined document                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Execution Characteristics**:
- Timeout: 300 seconds (accommodates both sub-agents)
- Cache: 3-layer system with 30-day TTL
- Pattern: **Parallel orchestration** with graceful degradation

### Outputs

```typescript
{
  riskAssessment: {
    hazards: [...];
    ppe: [...];
    emergencyProcedures: [...];
  };
  methodStatement: {
    executiveSummary: {...};
    installationSteps: [...];
    materialsList: [...];
    testingRequirements: [...];
  };
  metadata: {
    generatedAt: string;
    cacheHit: boolean;
    generationTime: number;
  };
}
```

### Integration Notes

| Downstream Component | Dependency |
|---------------------|------------|
| `RAMSResults.tsx` | Displays combined RAMS |
| PDF generation | Combined RAMS document |

### Warnings / Accuracy Requirements

⚠️ **CRITICAL - Do Not Change**:

1. **Parallel execution**: H&S and Installation Specialist MUST run in parallel for performance.

2. **Graceful degradation**: If one agent fails, return partial results from successful agent.

3. **Cache layers**: All 3 cache layers must be checked in order.

---

## 7. AI Assistant

**Edge Function**: `electrician-ai-assistant`  
**Frontend**: `src/components/electrician-tools/ai-tools/`

### Purpose

Multi-purpose AI assistant supporting various modes including visual analysis (photo interpretation), regulations lookup, circuit summaries, and general electrical queries.

### Inputs

```typescript
{
  mode: 'visual' | 'regulations' | 'circuit' | 'general';
  query: string;
  imageBase64?: string;        // For visual mode
  regulationNumber?: string;   // For regulations mode
  circuitData?: object;        // For circuit mode
}
```

### RAG Sources

| Table | Search Method | Purpose |
|-------|---------------|---------|
| `regulations_intelligence` | Direct lookup by number | BS 7671 regulation text |
| `practical_work_intelligence` | GIN-indexed keyword | General electrical knowledge |
| `design_knowledge_intelligence` | GIN-indexed keyword | Design guidance |

### Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       AI Assistant                               │
├─────────────────────────────────────────────────────────────────┤
│  Mode: Visual Analysis                                           │
│  ├─ Use GPT-4o with vision                                       │
│  ├─ Analyse uploaded image                                       │
│  └─ Return observations and recommendations                      │
│                                                                  │
│  Mode: Regulations                                               │
│  ├─ Check if query is regulation number (e.g., "411.3.3")       │
│  ├─ If yes: Direct DB lookup (FAST SHORTCUT)                    │
│  ├─ If no: RAG search + AI interpretation                       │
│  └─ Return regulation text with context                          │
│                                                                  │
│  Mode: Circuit Summary                                           │
│  ├─ Receive circuit design data                                  │
│  ├─ Generate plain-English summary                               │
│  └─ Return formatted summary                                     │
│                                                                  │
│  Mode: General                                                   │
│  ├─ RAG search across knowledge bases                            │
│  ├─ AI response with GPT-4o                                      │
│  └─ Return answer with sources                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Execution Characteristics**:
- Model: `gpt-4o` (with vision capability for visual mode)
- Timeout: 60 seconds
- Pattern: **Synchronous** (direct response)

### Outputs

```typescript
{
  response: string;
  sources?: Array<{
    type: 'regulation' | 'guidance' | 'practical';
    reference: string;
    excerpt: string;
  }>;
  confidence?: number;
  visualAnalysis?: {
    observations: string[];
    concerns: string[];
    recommendations: string[];
  };
}
```

### Integration Notes

| Downstream Component | Dependency |
|---------------------|------------|
| `AIAssistantChat.tsx` | Chat interface |
| `AITooling.tsx` | Tool selector page |

### Warnings / Accuracy Requirements

⚠️ **CRITICAL - Do Not Change**:

1. **Regulation direct lookup**: When query matches regulation pattern (e.g., "411.3.3"), bypass RAG and query DB directly for speed.

2. **Vision model**: Visual mode requires `gpt-4o` with vision, not other models.

---

## 8. Database Tables Reference

### Core Agent Tables

| Table | Primary Agent | Key Columns |
|-------|---------------|-------------|
| `circuit_design_jobs` | Circuit Designer | `design_data`, `installation_guidance`, `status` |
| `cost_engineer_jobs` | Cost Engineer | `output_data`, `status` |
| `installation_method_jobs` | Installation Specialist | `method_data`, `status` |
| `health_safety_jobs` | Health & Safety | `output_data`, `project_info`, `work_type` |
| `maintenance_method_jobs` | Maintenance Specialist | `method_data`, `status` |

### RAG Knowledge Tables

| Table | Content | Search Method |
|-------|---------|---------------|
| `design_knowledge_intelligence` | Cable sizing, BS 7671 tables | GIN-indexed keywords |
| `regulations_intelligence` | BS 7671 regulation text | GIN-indexed keywords + direct lookup |
| `practical_work_intelligence` | Installation procedures, tools | GIN-indexed keywords |
| `health_safety_hazards` | Pre-defined hazard database | GIN-indexed keywords |

### Cache Tables

| Table | TTL | Purpose |
|-------|-----|---------|
| `circuit_design_cache_v4` | 30 days | Full circuit designs |
| `installation_method_cache` | 30 days | Method statements (85% similarity) |
| `circuit_rag_cache` | 7 days | RAG search results |

---

## 9. Critical Architecture Principles

### 1. Fire-and-Forget Pattern
Circuit Designer Phase 1 invokes Phase 2 without awaiting response. This prevents HTTP timeout freezes.

### 2. Direct Pass-Through PDF Architecture
PDF edge functions must NOT recalculate values. Frontend builds exact payload structure; edge function passes directly to PDF Monkey.

### 3. Job Status Lifecycle
```
pending → processing → complete
                    → failed
                    → cancelled
```
Only final agent in pipeline sets `status='complete'`.

### 4. Model Requirements

| Agent | Model | Reason |
|-------|-------|--------|
| Circuit Designer | `gpt-5-mini-2025-08-07` | User requirement |
| Cost Engineer | `gpt-5-mini-2025-08-07` | User requirement - NEVER change |
| Installation Specialist | `gpt-5-mini-2025-08-07` | User requirement |
| Health & Safety | `gpt-5-mini-2025-08-07` | User requirement |
| Maintenance Specialist | `gpt-4o-mini` | Legacy - different model |
| AI Assistant | `gpt-4o` | Vision capability needed |

### 5. UK English Requirement
All agents must output UK English spelling and British electrical terminology:
- "earthing" not "grounding"
- "metres" not "meters"
- "utilise" not "utilize"

### 6. Stability Over Optimisation
User prioritises reliability over performance. Avoid architectural refactors. Make incremental changes only.

---

## Quick Reference: What NOT to Change

| Component | Protected Element | Reason |
|-----------|-------------------|--------|
| Circuit Designer | Fire-and-forget invoke | Prevents 90% freeze |
| Circuit Designer | Zs Cmin=0.95 | BS 7671 compliance |
| Cost Engineer | GPT-5 Mini model | User mandate |
| Cost Engineer | PDF direct pass-through | Data accuracy |
| Installation Specialist | `method_data` column name | DB schema |
| Installation Specialist | `'complete'` status value | Frontend polling |
| Health & Safety | 9-section control measure format | PDF parser requirement |
| All Agents | UK English output | User requirement |

---

*Document maintained by development team. Update when agent behaviour changes.*
