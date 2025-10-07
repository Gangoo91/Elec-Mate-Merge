# Complete Project Integration System

This system integrates all AI agents to generate complete project documentation from a single consultation.

## Overview

The Complete Project Export System unifies outputs from all specialist agents (Designer, Cost Engineer, Installer, Health & Safety) into a cohesive set of documentation:

- **EIC Schedule of Tests** (95% pre-filled, BS 7671 compliant)
- **RAMS Document** (5x5 risk matrix, HSE-compliant)
- **Method Statement** (step-by-step procedures with safety requirements)
- **Quote** (materials + labour breakdown)

## Components

### 1. Transformer Utilities

#### `rams-transformer.ts`
Converts Installer Agent output into formal Method Statements:
- Maps installation steps to method statement steps
- Extracts safety requirements and PPE
- Calculates step durations and risk levels
- Links equipment and qualifications

#### `installer-to-rams-mapper.ts`
Extracts hazards from installation procedures and generates RAMS:
- Identifies implicit hazards (work at height, electrical, manual handling, etc.)
- Maps hazards to 5x5 risk assessments
- Applies BS 7671 and HSE standard controls
- Calculates residual risk after controls

#### `hs-to-rams-transformer.ts`
Transforms Health & Safety Agent output into RAMS format:
- Converts 5x5 risk matrix to RAMS risks
- Maps hazards to enhanced hazard database
- Includes PPE requirements and emergency procedures
- Links ACOP citations

#### `cost-to-quote-transformer.ts`
Converts Cost Engineer output into Quote Builder format:
- Transforms material breakdowns into quote items
- Categorizes materials (cables, protection devices, accessories, etc.)
- Adds labour estimates with hourly rates
- Calculates overheads, profit margins, and VAT

### 2. Unified Export System (`project-export.ts`)

Central orchestration function that:
- Collects outputs from all agents
- Generates all project documentation
- Saves to database with linked IDs
- Returns complete ProjectExport object

```typescript
interface ProjectExport {
  eicSchedule?: EICScheduleOfTests;
  rams?: RAMSData;
  methodStatement?: MethodStatementData;
  quote?: Partial<Quote>;
  sourceConversation: string;
  exportedAt: string;
}
```

### 3. Database Schema

New `project_exports` table links all generated documents:
- `conversation_id`: Links to Install Planner session
- `eic_schedule_id`: Links to EIC schedules table
- `quote_id`: Links to quotes table
- `rams_data`: JSONB field for RAMS document
- `method_statement_data`: JSONB field for Method Statement

RLS policies ensure user isolation.

## Usage

### In Install Planner

Click "Export Complete Project" button after consultation with agents:

1. System extracts agent outputs from conversation
2. Generates EIC schedule from circuit data
3. Creates Method Statement from installer steps
4. Generates RAMS from H&S risk assessments
5. Creates Quote from cost breakdown
6. Saves all documents with linked IDs
7. Shows success toast with generated documents list

### Agent Data Sources

- **Designer Agent** → EIC Schedule (circuits, cable sizes, protection devices)
- **Installer Agent** → Method Statement (installation steps, safety requirements)
- **Health & Safety Agent** → RAMS (risk assessments, hazards, controls)
- **Cost Engineer Agent** → Quote (materials, labour, project total)

## Benefits

### For Users
- **Zero duplicate entry**: AI pre-fills all forms
- **BS 7671 compliance**: Regulatory citations throughout
- **Consistent data**: Single source of truth
- **Time savings**: 4-5 documents in seconds

### For System
- **Cross-selling**: Users see value in all modules
- **Data accuracy**: Linked documents share common data
- **Professional output**: Cohesive project documentation
- **Unified workflow**: Install Planner becomes the hub

## Technical Details

### Calculations

**Cable Sizing** (BS 7671 Appendix 4):
- Based on design current and installation method
- Applies correction factors (temperature, grouping)
- Ensures current-carrying capacity > design current

**Risk Assessment** (HSE 5x5 Matrix):
- Likelihood (1-5): How likely the hazard occurs
- Severity (1-5): Potential harm if it occurs
- Risk Rating = Likelihood × Severity
- Residual Risk: After control measures applied

**Cost Estimation**:
- Real-time pricing from embedded database
- Labour rates by worker type
- Overheads and profit margins configurable
- VAT calculation (20% standard rate)

### Data Flow

```
Install Planner Consultation
           ↓
   Agent Outputs Collected
           ↓
    ┌──────┴──────┐
    ↓      ↓      ↓      ↓
  EIC   RAMS   Method  Quote
           ↓
  project_exports table
  (links all documents)
```

## Future Enhancements

1. **PDF Generation**: Auto-generate PDFs for all documents
2. **Email Distribution**: Send documents to clients/team
3. **Version Control**: Track document revisions
4. **Template Library**: Pre-configured templates by job type
5. **Integration APIs**: Connect to project management tools

## Dependencies

- `uuid`: Generate unique IDs for RAMS risks and method steps
- Supabase: Database storage and RLS
- Toast notifications: User feedback

## Notes

- Uses temporary `as any` casting for Supabase calls until types regenerate
- Simplified agent output extraction from messages (future: structured agent responses)
- Client details optional (only generates quote if provided)
- All exports require authenticated user
