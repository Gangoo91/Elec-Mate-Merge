# Apprentice OJT Portfolio System - Complete Redesign Plan

## Executive Summary

This document outlines the complete redesign of the portfolio system to make it **assessment-ready** for all 15 qualifications requiring portfolio evidence.

---

## Current State Analysis

### What You Already Have (Database)

| Resource | Count | Status |
|----------|-------|--------|
| Qualifications requiring portfolio | 15 | Defined |
| Portfolio categories with criteria | 63 | Defined |
| Learning outcomes mapped | ~250+ | Defined |
| Assessment criteria defined | ~300+ | Defined |

### Qualifications in Your System

| Awarding Body | Qualification | Code | Categories |
|---------------|---------------|------|------------|
| **City & Guilds** | Electrotechnical (Apprenticeship) | 5357 | 3 |
| **City & Guilds** | NVQ Installing Electrotechnical | 2357 | 2 |
| **City & Guilds** | Experienced Worker | 2346-03 | 1 |
| **City & Guilds** | T Level BSE Electrical | 8202 | 5 |
| **City & Guilds** | BSE Installer Apprenticeship | 3529 | 10 |
| **City & Guilds** | MOET Apprenticeship | MOET | 5 |
| **EAL** | Installation/Maintenance Apprenticeship | 603/3895/8 | 3 |
| **EAL** | Electrotechnical (Installation) NVQ | 603/3929/9 | 4 |
| **EAL** | Electrotechnical (Maintenance) NVQ | 603/3928/7 | 4 |
| **EAL** | Experienced Worker | 603/4027/6 | 4 |
| **EAL** | T Level BSE Electrical | 603/5933/7 | 5 |
| **EAL** | BSE Installer Apprenticeship | 603/5806/9 | 4 |
| **EAL** | BSE Craftsperson | 603/0149/3 | 4 |
| **EAL** | AM2 Gateway | 600/4337/4 | 4 |
| **ECS** | Experienced Worker | ELEC-EXP-WORKER | 8 |

### Critical Gaps Identified

1. **College uses MOCK DATA** - Not connected to real student portfolios
2. **No submission workflow** - Students can't formally submit for assessment
3. **No KSB mapping** - Evidence not linked to apprenticeship standard KSBs
4. **No assessor sign-off** - No digital signatures or formal approval
5. **No IQA sampling** - No internal quality assurance process
6. **No EPA gateway** - No readiness checklist for End Point Assessment

---

## Phase 1: Database Schema Additions

### New Tables Required

```sql
-- 1. KSB (Knowledge, Skills, Behaviours) Reference Table
CREATE TABLE apprenticeship_ksbs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    qualification_id UUID REFERENCES qualifications(id),
    ksb_type TEXT NOT NULL CHECK (ksb_type IN ('knowledge', 'skill', 'behaviour')),
    ksb_code TEXT NOT NULL,  -- e.g., K1, K2, S1, S2, B1, B2
    title TEXT NOT NULL,
    description TEXT,
    assessment_method TEXT[], -- ['portfolio', 'observation', 'professional_discussion']
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Evidence to KSB Mapping
CREATE TABLE evidence_ksb_mapping (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_item_id UUID REFERENCES portfolio_items(id) ON DELETE CASCADE,
    ksb_id UUID REFERENCES apprenticeship_ksbs(id),
    mapping_status TEXT DEFAULT 'pending' CHECK (mapping_status IN ('pending', 'verified', 'rejected')),
    assessor_verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES profiles(id),
    verified_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Portfolio Submissions (Unit/Category Level)
CREATE TABLE portfolio_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id),
    qualification_id UUID REFERENCES qualifications(id),
    category_id UUID REFERENCES qualification_categories(id),

    -- Submission tracking
    status TEXT DEFAULT 'draft' CHECK (status IN (
        'draft',           -- Student working on it
        'submitted',       -- Submitted for review
        'under_review',    -- Assessor reviewing
        'feedback_given',  -- Assessor provided feedback, needs rework
        'resubmitted',     -- Student resubmitted after feedback
        'approved',        -- Assessor approved
        'signed_off',      -- Formally signed off
        'iqa_sampled',     -- Selected for IQA
        'iqa_verified'     -- IQA verified
    )),

    submitted_at TIMESTAMPTZ,
    submitted_by UUID REFERENCES profiles(id),

    -- Assessor review
    assessor_id UUID REFERENCES profiles(id),
    reviewed_at TIMESTAMPTZ,
    assessor_feedback TEXT,
    grade TEXT, -- Pass/Merit/Distinction or competent/not yet competent

    -- Sign-off
    signed_off_at TIMESTAMPTZ,
    assessor_signature_id UUID,

    -- IQA
    iqa_sampled BOOLEAN DEFAULT FALSE,
    iqa_sampled_at TIMESTAMPTZ,
    iqa_verified_by UUID REFERENCES profiles(id),
    iqa_verified_at TIMESTAMPTZ,
    iqa_feedback TEXT,

    -- Metadata
    submission_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Digital Signatures
CREATE TABLE portfolio_signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES portfolio_submissions(id),
    signer_id UUID NOT NULL REFERENCES profiles(id),
    signer_role TEXT NOT NULL CHECK (signer_role IN (
        'student',
        'employer',
        'assessor',
        'iqa',
        'eqa'
    )),
    signature_type TEXT NOT NULL CHECK (signature_type IN (
        'declaration',      -- Student declares work is their own
        'witness',          -- Employer witnesses competence
        'assessment',       -- Assessor confirms competence
        'verification',     -- IQA verifies quality
        'sampling'          -- EQA sampling confirmation
    )),
    signature_data TEXT,    -- Could be typed name, drawn signature base64, etc.
    ip_address INET,
    user_agent TEXT,
    signed_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(submission_id, signer_role, signature_type)
);

-- 5. Coverage Matrix (Track what's been evidenced)
CREATE TABLE unit_coverage_matrix (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id),
    qualification_id UUID REFERENCES qualifications(id),
    category_id UUID REFERENCES qualification_categories(id),

    -- Progress tracking
    total_criteria INTEGER NOT NULL DEFAULT 0,
    evidenced_criteria INTEGER NOT NULL DEFAULT 0,
    verified_criteria INTEGER NOT NULL DEFAULT 0,
    completion_percentage INTEGER GENERATED ALWAYS AS (
        CASE WHEN total_criteria = 0 THEN 0
        ELSE (verified_criteria * 100 / total_criteria)
        END
    ) STORED,

    -- Status
    status TEXT DEFAULT 'not_started' CHECK (status IN (
        'not_started',
        'in_progress',
        'ready_for_review',
        'under_review',
        'complete'
    )),

    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EPA Gateway Checklist
CREATE TABLE epa_gateway_checklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id),
    qualification_id UUID REFERENCES qualifications(id),

    -- Gateway requirements
    portfolio_complete BOOLEAN DEFAULT FALSE,
    portfolio_signed_off_at TIMESTAMPTZ,

    ojt_hours_complete BOOLEAN DEFAULT FALSE,
    ojt_hours_total DECIMAL(10,2) DEFAULT 0,
    ojt_hours_required DECIMAL(10,2) DEFAULT 400, -- 20% of ~2000 hours

    english_level2 BOOLEAN DEFAULT FALSE,
    maths_level2 BOOLEAN DEFAULT FALSE,

    employer_declaration BOOLEAN DEFAULT FALSE,
    employer_declaration_at TIMESTAMPTZ,
    employer_id UUID REFERENCES profiles(id),

    training_provider_declaration BOOLEAN DEFAULT FALSE,
    training_provider_declaration_at TIMESTAMPTZ,
    training_provider_id UUID REFERENCES profiles(id),

    -- Gateway meeting
    gateway_meeting_date DATE,
    gateway_meeting_notes TEXT,
    gateway_passed BOOLEAN DEFAULT FALSE,
    gateway_passed_at TIMESTAMPTZ,

    -- EPA booking
    epa_booked BOOLEAN DEFAULT FALSE,
    epa_booking_date DATE,
    epa_provider TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Assessor Observations (for practical assessments)
CREATE TABLE assessor_observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id),
    assessor_id UUID NOT NULL REFERENCES profiles(id),
    qualification_id UUID REFERENCES qualifications(id),
    category_id UUID REFERENCES qualification_categories(id),

    observation_date DATE NOT NULL,
    location TEXT,
    activity_description TEXT NOT NULL,

    -- What was observed
    ksbs_observed UUID[], -- Array of KSB IDs
    criteria_met TEXT[],  -- Array of criteria codes

    -- Assessment
    outcome TEXT CHECK (outcome IN ('competent', 'not_yet_competent', 'deferred')),
    feedback TEXT,
    areas_for_development TEXT,

    -- Signatures
    student_signature_id UUID REFERENCES portfolio_signatures(id),
    assessor_signature_id UUID REFERENCES portfolio_signatures(id),

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Witness Testimonies (employer confirmation)
CREATE TABLE witness_testimonies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id),
    witness_id UUID REFERENCES profiles(id),

    -- Witness details (if not in system)
    witness_name TEXT NOT NULL,
    witness_role TEXT,
    witness_company TEXT,
    witness_email TEXT,
    witness_phone TEXT,

    -- Testimony details
    testimony_date DATE NOT NULL,
    activity_description TEXT NOT NULL,
    skills_demonstrated TEXT[],
    ksbs_evidenced UUID[],

    testimony_text TEXT NOT NULL,

    -- Verification
    verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES profiles(id),
    verified_at TIMESTAMPTZ,

    -- Linked portfolio item
    portfolio_item_id UUID REFERENCES portfolio_items(id),

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. College-Student Link (for tutors to see student portfolios)
CREATE TABLE college_student_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL, -- College/training provider organization
    student_id UUID NOT NULL REFERENCES profiles(id),
    tutor_id UUID REFERENCES profiles(id),
    assessor_id UUID REFERENCES profiles(id),
    iqa_id UUID REFERENCES profiles(id),

    qualification_id UUID REFERENCES qualifications(id),
    cohort_name TEXT,
    start_date DATE,
    expected_end_date DATE,

    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'withdrawn', 'on_break')),

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(college_id, student_id, qualification_id)
);
```

### RLS Policies Required

```sql
-- Students can view/edit their own submissions
-- Tutors can view students assigned to them
-- Assessors can review and sign off
-- IQA can sample and verify
-- Employers can provide witness testimonies
```

---

## Phase 2: Connect College to Real Data

### Replace CollegeContext Mock Data

**Current (Mock):**
```typescript
// src/contexts/CollegeContext.tsx
const [portfolios, setPortfolios] = useState<CollegePortfolio[]>(mockPortfolios);
```

**New (Supabase):**
```typescript
// Create new hooks:
// src/hooks/college/useCollegePortfolios.ts
// src/hooks/college/useStudentAssignments.ts
// src/hooks/college/usePortfolioSubmissions.ts
```

### New College Hooks Structure

```
src/hooks/college/
├── useCollegePortfolios.ts      # Fetch all student portfolios for tutor
├── useStudentAssignments.ts     # Student-tutor-assessor links
├── usePortfolioSubmissions.ts   # Submission workflow
├── useAssessorActions.ts        # Review, feedback, sign-off
├── useIQASampling.ts            # IQA sampling and verification
├── useEPAGateway.ts             # Gateway checklist management
└── index.ts                     # Barrel export
```

---

## Phase 3: Student Portfolio UI Redesign

### New Student Portfolio Structure

```
/apprentice/portfolio
├── Overview Dashboard
│   ├── Gateway Progress Ring (% complete)
│   ├── Units Status Cards
│   ├── Recent Activity
│   └── Action Required Alerts
│
├── Units & Coverage
│   ├── Unit List with Progress Bars
│   ├── Coverage Matrix View (criteria grid)
│   ├── Click unit → See evidence mapped
│   └── Gap Analysis (what's missing)
│
├── Evidence Management
│   ├── All Evidence List (filterable)
│   ├── Add New Evidence
│   │   ├── Upload files
│   │   ├── Link to units/criteria
│   │   ├── Add reflection
│   │   └── Request witness testimony
│   └── Evidence Detail View
│
├── Submissions
│   ├── Ready to Submit (units complete)
│   ├── Under Review (awaiting feedback)
│   ├── Needs Rework (with feedback)
│   └── Signed Off (complete)
│
├── EPA Gateway
│   ├── Checklist Status
│   ├── Missing Requirements
│   ├── Declaration Forms
│   └── Book EPA (when ready)
│
└── Export & Reports
    ├── Full Portfolio PDF
    ├── Unit-specific exports
    └── Progress reports
```

### Key UI Components to Build

```
src/components/apprentice/portfolio-v2/
├── PortfolioDashboard/
│   ├── GatewayProgressRing.tsx
│   ├── UnitsStatusGrid.tsx
│   ├── RecentActivityFeed.tsx
│   └── ActionRequiredAlerts.tsx
│
├── CoverageMatrix/
│   ├── CoverageMatrixView.tsx
│   ├── CriteriaCell.tsx
│   ├── UnitProgressBar.tsx
│   └── GapAnalysisPanel.tsx
│
├── Evidence/
│   ├── EvidenceUploader.tsx
│   ├── EvidenceCard.tsx
│   ├── EvidenceDetailDialog.tsx
│   ├── KSBLinkingPanel.tsx
│   └── WitnessRequestForm.tsx
│
├── Submissions/
│   ├── SubmissionWorkflow.tsx
│   ├── SubmitForReviewDialog.tsx
│   ├── FeedbackPanel.tsx
│   └── SignatureCapture.tsx
│
├── Gateway/
│   ├── GatewayChecklist.tsx
│   ├── DeclarationForm.tsx
│   └── EPABookingPanel.tsx
│
└── Export/
    ├── PortfolioExport.tsx
    └── ReportGenerator.tsx
```

---

## Phase 4: Tutor/Assessor Review UI

### College Portfolio Review Structure

```
/college/portfolios
├── Review Queue
│   ├── Pending Reviews (sorted by date)
│   ├── My Students (assigned to me)
│   ├── All Students (admin view)
│   └── Filters (status, qualification, date)
│
├── Student Portfolio View
│   ├── Student Header (name, qualification, progress)
│   ├── Coverage Matrix (read-only)
│   ├── Evidence Gallery
│   ├── Submission History
│   └── Assessment Actions
│
├── Assessment Actions
│   ├── Review Evidence
│   ├── Provide Feedback
│   ├── Accept/Reject Evidence
│   ├── Request Rework
│   ├── Sign Off Unit
│   └── Record Observation
│
└── IQA Panel (for IQA role)
    ├── Sampling Queue
    ├── Select Sample
    ├── Verify Quality
    └── IQA Reports
```

### Key College Components to Build

```
src/components/college/portfolio-review/
├── ReviewQueue/
│   ├── ReviewQueueList.tsx
│   ├── ReviewQueueFilters.tsx
│   └── ReviewQueueStats.tsx
│
├── StudentPortfolioView/
│   ├── StudentPortfolioHeader.tsx
│   ├── CoverageMatrixReadOnly.tsx
│   ├── EvidenceGallery.tsx
│   └── SubmissionTimeline.tsx
│
├── Assessment/
│   ├── AssessmentPanel.tsx
│   ├── FeedbackForm.tsx
│   ├── SignOffDialog.tsx
│   ├── ObservationRecorder.tsx
│   └── AssessorSignature.tsx
│
└── IQA/
    ├── IQASamplingQueue.tsx
    ├── IQAVerificationForm.tsx
    └── IQAReportGenerator.tsx
```

---

## Phase 5: Implementation Order

### Sprint 1: Database & Core Infrastructure (Week 1-2)

| Task | Priority | Est. Hours |
|------|----------|------------|
| Create all new database tables | Critical | 4 |
| Set up RLS policies | Critical | 4 |
| Create college_student_assignments seeding | High | 2 |
| Build useCollegePortfolios hook | Critical | 4 |
| Build usePortfolioSubmissions hook | Critical | 4 |
| Connect PortfolioSection to real data | Critical | 4 |

### Sprint 2: Student Submission Flow (Week 3-4)

| Task | Priority | Est. Hours |
|------|----------|------------|
| Build CoverageMatrixView component | Critical | 6 |
| Build SubmitForReviewDialog | Critical | 4 |
| Build FeedbackPanel (view feedback) | High | 3 |
| Add submission workflow to existing UI | Critical | 4 |
| Build unit_coverage_matrix calculations | High | 4 |

### Sprint 3: Assessor Review Flow (Week 5-6)

| Task | Priority | Est. Hours |
|------|----------|------------|
| Build ReviewQueueList component | Critical | 4 |
| Build AssessmentPanel | Critical | 6 |
| Build FeedbackForm | Critical | 4 |
| Build SignOffDialog with signature | High | 4 |
| Add real-time updates (subscription) | Medium | 4 |

### Sprint 4: IQA & Gateway (Week 7-8)

| Task | Priority | Est. Hours |
|------|----------|------------|
| Build IQASamplingQueue | High | 4 |
| Build IQAVerificationForm | High | 4 |
| Build GatewayChecklist component | Critical | 6 |
| Build DeclarationForm | High | 4 |
| Build EPABookingPanel | Medium | 3 |

### Sprint 5: Polish & Export (Week 9-10)

| Task | Priority | Est. Hours |
|------|----------|------------|
| Improve PortfolioExport for assessment | High | 6 |
| Build comprehensive reports | Medium | 4 |
| Mobile responsiveness | Medium | 4 |
| Testing & bug fixes | Critical | 8 |
| Documentation | Medium | 4 |

---

## KSB Reference Data (To Be Populated)

### Installation Electrician Standard (ST0152) - Core KSBs

Based on [Skills England](https://skillsengland.education.gov.uk/apprenticeship-standards/installation-electrician-maintenance-electrician/):

**Knowledge (K):**
- K1: Termination and connection of conductors, cables, and cords
- K2: Preparation and installation of wiring systems
- K3: Inspection, testing, commissioning, and certification
- K4: Diagnosing and correcting electrical faults
- K5: Electrical principles for design, installation, maintenance
- K6: Planning and selection for installation
- K7: Overseeing and organizing work environment
- K8: Health & Safety legislation and Working at Height
- K9: BS 7671 and related codes of practice
- K10: Building Safety Act requirements

**Skills (S):**
- S1: Install wiring systems safely and correctly
- S2: Terminate and connect cables/conductors
- S3: Inspect, test, and commission installations
- S4: Diagnose and rectify faults
- S5: Apply electrical principles to work
- S6: Plan and select installation methods
- S7: Organize work environment and resources

**Behaviours (B):**
- B1: Work reliably without close supervision
- B2: Accept responsibility for own work
- B3: Use effective communication methods
- B4: Maintain and enhance competence
- B5: Work safely and promote safety culture

---

## Portfolio Evidence Requirements by Category

### Minimum Evidence Requirements (Based on Research)

| Category | Min. Evidence Items | Evidence Types Required |
|----------|--------------------|-----------------------|
| Health & Safety | 5 | Risk assessments, toolbox talks, safe isolation |
| Job Evidence | 8-10 | Photos, descriptions across domestic/commercial |
| Test & Inspection | 5 | Test sheets, certificates, instrument evidence |
| Witness Statements | 5 | Signed supervisor confirmations |
| Reflective Accounts | 4 | Written reflections on learning |
| Drawings & Planning | 4 | Calculations, schematics, drawings |
| CPD/Progress Log | 3 | Training records, review meetings |
| Communication | 3 | Team work, customer interaction evidence |
| Evidence Mapping | 1 | Complete KSB mapping document |

---

## Assessment Workflow State Machine

```
                                    ┌─────────────────┐
                                    │                 │
                    ┌──────────────►│  FEEDBACK_GIVEN │
                    │               │                 │
                    │               └────────┬────────┘
                    │                        │
                    │ Needs                  │ Student
                    │ Rework                 │ Resubmits
                    │                        ▼
┌─────────┐    ┌────┴─────┐    ┌────────────────────┐
│         │    │          │    │                    │
│  DRAFT  ├───►│ SUBMITTED├───►│   UNDER_REVIEW     │
│         │    │          │    │                    │
└─────────┘    └──────────┘    └─────────┬──────────┘
    │                                    │
    │                                    │ Approved
    │                                    ▼
    │                          ┌────────────────────┐
    │                          │                    │
    │                          │     APPROVED       │
    │                          │                    │
    │                          └─────────┬──────────┘
    │                                    │
    │                                    │ Assessor Signs
    │                                    ▼
    │                          ┌────────────────────┐
    │                          │                    │
    │                          │    SIGNED_OFF      │
    │                          │                    │
    │                          └─────────┬──────────┘
    │                                    │
    │                                    │ IQA Selects
    │                                    ▼
    │                          ┌────────────────────┐
    │                          │                    │
    │                          │   IQA_SAMPLED      │
    │                          │                    │
    │                          └─────────┬──────────┘
    │                                    │
    │                                    │ IQA Verifies
    │                                    ▼
    │                          ┌────────────────────┐
    │                          │                    │
    └─────────────────────────►│   IQA_VERIFIED     │
                               │                    │
                               └────────────────────┘
```

---

## Next Steps

1. **Approve this plan** - Review and confirm the approach
2. **Create database migrations** - Build all new tables
3. **Start with Sprint 1** - Core infrastructure first
4. **Iterate with feedback** - Regular check-ins as we build

---

## Sources

- [City & Guilds 5357 Handbook v1.6 (Sept 2025)](https://www.cityandguilds.com/-/media/productdocuments/building_services_engineering/electrical_installation/5357/5357-23-and--94-version-2-app-standard-registered-after-04,-d-,09,-d-,2023/centre_documents/5357-23_electrotechnical_qualification_qualification_handbook_v1-6-pdf.pdf)
- [EAL Level 3 Advanced Diploma](https://eal.org.uk/qualifications/eal-level-3-advanced-diploma-in-electrical-installation)
- [Installation Electrician Standard ST0152](https://skillsengland.education.gov.uk/apprenticeship-standards/installation-electrician-maintenance-electrician/)
- [EAL Electrotechnical Qualification Manual](https://assets-us-01.kc-usercontent.com/da3e2b8a-f498-0050-c097-1c7a05f428b8/5917c3fa-166c-47a0-abce-959e19e8b353/EAL-NET-QM-Issue%205.pdf)
