# Portfolio System + LTI Integration Plan

## Current State Analysis

### What's Done
- **Database**: 11 portfolio assessment tables with RLS policies
- **KSBs**: 35 apprenticeship KSBs seeded (K1-K15, S1-S12, B1-B8)
- **College Hooks**: 5 hooks for portfolio management
- **College UI**: Full assessment hub with review queue, IQA sampling, EPA gateway
- **Student UI**: Submission panel integrated into ApprenticeOJT

### What's Missing
1. **LTI Backend**: Edge functions not implemented (only UI exists)
2. **Staff Roles**: No tutor/assessor/IQA role fields in profiles
3. **Student Assignments**: No data linking tutors to students
4. **LTI Tables**: No platform registrations, launch tracking, user mappings

---

## Implementation Plan

### Phase 1: Database Foundation (Priority: HIGH)

#### 1.1 Add Staff Roles to Profiles
```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS college_role TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS college_id UUID;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_assessor BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_iqa BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS assessor_qualifications TEXT[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS iqa_qualifications TEXT[];
```

#### 1.2 Create LTI Tables
```sql
-- LTI Platform Registrations
CREATE TABLE lti_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  platform_type TEXT NOT NULL, -- 'canvas', 'moodle', 'blackboard', 'other'
  issuer TEXT NOT NULL,
  client_id TEXT NOT NULL,
  deployment_id TEXT,
  auth_login_url TEXT NOT NULL,
  auth_token_url TEXT NOT NULL,
  jwks_url TEXT NOT NULL,
  public_key TEXT,
  private_key TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  college_id UUID REFERENCES colleges(id)
);

-- LTI Launch Sessions
CREATE TABLE lti_launches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID REFERENCES lti_platforms(id),
  user_id UUID REFERENCES profiles(id),
  lti_user_id TEXT NOT NULL,
  context_id TEXT,
  context_label TEXT,
  context_title TEXT,
  roles TEXT[],
  resource_link_id TEXT,
  launch_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- LTI User Mappings (link LTI IDs to Elec-Mate users)
CREATE TABLE lti_user_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID REFERENCES lti_platforms(id),
  lti_user_id TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id),
  email TEXT,
  name TEXT,
  roles TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(platform_id, lti_user_id)
);
```

#### 1.3 Seed Test Data for college_student_assignments
- Create sample tutor/assessor/IQA profiles
- Link students to qualifications
- Create cohort assignments

---

### Phase 2: LTI Edge Functions (Priority: HIGH)

#### 2.1 lti-oidc-init
- Handle OIDC login initiation from LMS
- Generate state token, store in database
- Redirect to platform authorization URL

#### 2.2 lti-launch
- Validate JWT from LMS (RS256 signature)
- Extract LTI claims (user, roles, context)
- Create/update user mapping
- Auto-provision users if enabled
- Create session, redirect to app

#### 2.3 lti-jwks
- Serve public keys for JWT validation
- Support key rotation

#### 2.4 lti-deep-link (optional)
- Content selection for LMS integration

---

### Phase 3: Roster & Grade Sync (Priority: MEDIUM)

#### 3.1 lti-roster-sync
- Implement NRPS (Names and Roles Provisioning Service)
- Pull course membership from LMS
- Auto-create college_student_assignments
- Sync student enrollment status

#### 3.2 lti-grade-sync
- Implement AGS (Assignment and Grade Services)
- Push portfolio grades to LMS gradebook
- Sync assessment results

---

### Phase 4: Role-Based Access (Priority: HIGH)

#### 4.1 Update RLS Policies
- Tutors can view assigned students
- Assessors can review/sign-off portfolios
- IQAs can sample signed-off work
- Students can only see their own data

#### 4.2 Add Role Checks to Hooks
- Verify user role before allowing actions
- Restrict assessment actions to qualified staff

---

### Phase 5: Testing & Validation (Priority: HIGH)

#### 5.1 Create Test Users
- 2 tutors with student assignments
- 2 assessors with review permissions
- 1 IQA for sampling
- 5 students with portfolios

#### 5.2 End-to-End Test Flow
1. Student creates portfolio entries
2. Student submits category for review
3. Assessor reviews and provides feedback
4. Student resubmits if needed
5. Assessor approves and signs off
6. IQA samples and verifies
7. EPA gateway checklist completes
8. Student ready for EPA

---

## Decision Point: LTI vs Direct Auth

### Option A: Full LTI Integration
**Pros:**
- Single sign-on from college LMS
- Automatic roster sync
- Grade passback to LMS
- Industry standard

**Cons:**
- Complex setup per college
- Requires edge functions
- Each LMS has quirks

### Option B: Direct Authentication (Current)
**Pros:**
- Already working
- Simpler for standalone use
- No LMS dependency

**Cons:**
- Manual user creation
- No grade sync
- Separate login required

### Recommendation
**Implement both** - LTI for colleges with LMS, direct auth for standalone users.
The portfolio system should work regardless of authentication method.

---

## Files to Create/Modify

### New Edge Functions
1. `supabase/functions/lti-oidc-init/index.ts`
2. `supabase/functions/lti-launch/index.ts`
3. `supabase/functions/lti-jwks/index.ts`
4. `supabase/functions/lti-roster-sync/index.ts`
5. `supabase/functions/lti-grade-sync/index.ts`

### Database Migrations
1. `add_staff_role_fields.sql`
2. `create_lti_tables.sql`
3. `seed_test_assignments.sql`

### Updated Components
1. `src/hooks/college/useCollegePortfolios.ts` - Add role checks
2. `src/components/college/portfolio/*` - Role-based UI

---

## Timeline Estimate
- Phase 1: Database Foundation - 1 hour
- Phase 2: LTI Edge Functions - 2-3 hours
- Phase 3: Roster & Grade Sync - 1-2 hours
- Phase 4: Role-Based Access - 1 hour
- Phase 5: Testing - 1 hour

**Total: 6-8 hours for full implementation**

---

## Questions for User

1. **LTI Priority**: Do you need LTI working for launch, or is direct auth sufficient for now?
2. **Test Data**: Should I create realistic test users, or just minimal data for development?
3. **LMS Target**: Which LMS will be primary (Canvas, Moodle, Blackboard)?
4. **Grade Sync**: Do you need grades pushed back to LMS, or is Elec-Mate the source of truth?
