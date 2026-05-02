-- Compliance Phase 6 — policy templates library.
--
-- A read-only catalogue of starter policy markdown that any college can
-- clone-and-customise into their own college_policies row. Templates
-- have NO college_id (shared across the platform); clones land as
-- college_policies with version=0, status='draft' and the requesting
-- staff's college_id, then go through the normal review-and-publish
-- flow. The DSL/Verifier still has to sign off — the template is just
-- the starting scaffold.
--
-- Templates intentionally use placeholders ("[College DSL — to be
-- added]") for college-specific data; cloning is NOT publishing, and
-- the policy editor surfaces these placeholders for completion.

CREATE TABLE IF NOT EXISTS public.policy_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  /** Stable lookup key, e.g. 'safeguarding-fe-2026'. Versions of the
      same conceptual template can share a `lookup_key` prefix. */
  lookup_key text NOT NULL UNIQUE,
  title text NOT NULL,
  /** Matches the college_policies.category enum values. */
  category text NOT NULL CHECK (category IN (
    'safeguarding','prevent','edi','whistleblowing','complaints',
    'code_of_conduct','acceptable_use','disciplinary','health_safety',
    'gdpr','send','assessment','iqa','appeals','rarpa',
    'apprenticeship','quality','other'
  )),
  /** Suggested owner role on clone. NULL = let the cloning college decide. */
  suggested_owner_role text,
  /** True if every staff member should sign on publish (mirrors
      college_policies.requires_acknowledgement). */
  requires_acknowledgement boolean NOT NULL DEFAULT true,
  /** Short list-view summary. */
  summary text NOT NULL,
  /** Full policy markdown — placeholders prefixed [College: ...] for
      college-specific data. Intentionally non-final; the cloning college
      reviews and edits before publishing. */
  content_md text NOT NULL,
  /** Public status — 'live' templates are visible to all colleges,
      'archived' ones stay in the table for audit but aren't shown. */
  status text NOT NULL DEFAULT 'live' CHECK (status IN ('live','archived')),
  /** The UK statutory framework citations the template is grounded in
      (display-only — KCSIE, Prevent duty, UK GDPR, etc). */
  framework_citations text[] DEFAULT ARRAY[]::text[],
  /** Ofsted EIF judgement areas this template addresses (display-only,
      helps colleges plan coverage). */
  ofsted_areas text[] DEFAULT ARRAY[]::text[],
  /** Display rank — lower = appears first in the browser. */
  sort_rank int NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_policy_templates_status_rank
  ON public.policy_templates (status, sort_rank);
CREATE INDEX IF NOT EXISTS idx_policy_templates_category
  ON public.policy_templates (category);

ALTER TABLE public.policy_templates ENABLE ROW LEVEL SECURITY;

-- Read-only for authenticated users — templates are platform-shared.
CREATE POLICY policy_templates_select_authed ON public.policy_templates
  FOR SELECT TO authenticated USING (status = 'live');

-- No INSERT/UPDATE/DELETE policies for app users — templates are managed
-- via migrations / service role only. Adding seed/edit RLS would let any
-- college tamper with the shared catalogue.

DROP TRIGGER IF EXISTS policy_templates_touch ON public.policy_templates;
-- Reuses the existing tg_ac_signoffs_touch_updated function (defined in
-- the assessor-pack migration). Generic "set updated_at = now()".
CREATE TRIGGER policy_templates_touch BEFORE UPDATE ON public.policy_templates
  FOR EACH ROW EXECUTE FUNCTION public.tg_ac_signoffs_touch_updated();

COMMENT ON TABLE public.policy_templates IS
  'Platform-shared starter policy templates. Cloned by colleges into college_policies as v1 drafts; never published directly.';

-- ─────────────────────────────────────────────────────────────────────
-- Seed: 4 short scaffold templates with clear [PLACEHOLDER] markers.
-- Intentionally minimal — colleges should fill in specifics or run the
-- AI author for a richer draft. The point of templates is structural
-- scaffolding, not legal advice; the DSL/Verifier always reviews.
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO public.policy_templates
  (lookup_key, title, category, suggested_owner_role, requires_acknowledgement,
   summary, content_md, framework_citations, ofsted_areas, sort_rank)
VALUES
  (
    'safeguarding-fe-scaffold-v1',
    'Safeguarding & Child Protection Policy',
    'safeguarding',
    'DSL',
    true,
    'Statutory safeguarding framework with DSL/DDSL roles, reporting routes and CPD requirements.',
    '# Safeguarding & Child Protection Policy

> **Note:** This is a starter scaffold. Replace every `[PLACEHOLDER]` with college-specific detail before publishing. The DSL must review and approve before this policy goes live.

## Purpose & Scope

This policy sets out how `[College Name]` discharges its statutory safeguarding duties under Keeping Children Safe in Education (KCSIE) and the Working Together to Safeguard Children framework. It applies to all staff, learners aged under 18, and learners over 18 considered vulnerable adults.

## Definitions

- **Designated Safeguarding Lead (DSL):** `[NAME] — [contact]`
- **Deputy DSLs:** `[NAMES]`
- **At-risk learner:** any learner where there is reason to suspect significant harm

## Roles & Responsibilities

- **Principal:** strategic accountability for safeguarding
- **DSL:** day-to-day decisions, referrals to local authority, record-keeping
- **All staff:** read this policy on induction and annually, recognise indicators of harm, report concerns to the DSL the same day

## Policy Statement

`[College Name]` will:
1. Ensure all staff complete safeguarding induction and annual refresher
2. Maintain confidential records on `[record-keeping system]` for at least 25 years
3. Refer concerns to local authority children''s services within `[timeframe]`
4. Cooperate fully with multi-agency safeguarding arrangements

## Procedure

1. Concern raised → discuss with DSL the same working day
2. DSL records on `[system]`, decides next steps within 24 hours
3. If immediate harm suspected → call 999 / local authority on `[number]`
4. Record outcomes; review monthly

## Records & Reporting

- Concern log: `[system / location]`
- Annual safeguarding return to governing body
- Report to local authority via `[contact]`

## Review & Version Control

Reviewed annually by DSL and approved by governors. Next review: `[DATE]`.

## Related Documents

- KCSIE current version
- `[College Name]` Code of Conduct
- Online Safety Policy
',
    ARRAY['Keeping Children Safe in Education','Working Together to Safeguard Children','Children Act 1989/2004'],
    ARRAY['behaviour and attitudes','personal development','leadership and management'],
    10
  ),
  (
    'prevent-fe-scaffold-v1',
    'Prevent Duty Policy',
    'prevent',
    'Prevent Lead',
    true,
    'Statutory Prevent duty arrangements: staff training, referral routes and Channel cooperation.',
    '# Prevent Duty Policy

> **Note:** Starter scaffold. Replace `[PLACEHOLDER]` markers with college-specific detail and review with the Prevent Lead before publishing.

## Purpose & Scope

This policy sets out how `[College Name]` meets its Prevent duty under the Counter-Terrorism and Security Act 2015. It applies to all staff and learners.

## Roles & Responsibilities

- **Prevent Lead:** `[NAME]` — single point of contact, attends regional Prevent meetings
- **All staff:** complete Prevent training within 4 weeks of induction; report concerns to the Prevent Lead

## Policy Statement

`[College Name]` will:
1. Risk-assess the local Prevent threat landscape annually with the local authority
2. Train all staff on radicalisation indicators
3. Refer concerns to the Channel panel via `[local route]`
4. Embed British values across the curriculum
5. Filter and monitor IT use proportionately under the Acceptable Use Policy

## Procedure

1. Concern raised → discuss with Prevent Lead the same working day
2. Prevent Lead records on `[system]` and decides if Channel referral is appropriate
3. Channel referral made via `[contact]` if appropriate; learner''s consent sought first where safe to do so
4. Record outcome; review at next Prevent meeting

## Records & Reporting

- Concern log: `[system]`
- Termly report to senior leadership
- Annual self-assessment against the Prevent duty

## Review & Version Control

Annual review aligned with KCSIE update cycle. Next review: `[DATE]`.

## Related Documents

- Safeguarding Policy
- Acceptable Use Policy
- Equality, Diversity & Inclusion Policy
',
    ARRAY['Counter-Terrorism and Security Act 2015','Prevent duty guidance for FE'],
    ARRAY['behaviour and attitudes','personal development','leadership and management'],
    20
  ),
  (
    'gdpr-fe-scaffold-v1',
    'Data Protection Policy',
    'gdpr',
    'HR',
    true,
    'UK GDPR compliance: lawful bases, retention, breach reporting and data subject rights.',
    '# Data Protection Policy

> **Note:** Starter scaffold. Customise lawful bases, retention periods and DPO contact before publishing.

## Purpose & Scope

This policy sets out how `[College Name]` processes personal data under UK GDPR and the Data Protection Act 2018. It applies to all staff, learners, applicants and visitors.

## Definitions

- **Data Controller:** `[College Name]`
- **Data Protection Officer (DPO):** `[NAME] — [contact]`
- **Personal data:** any information relating to an identifiable living person

## Roles & Responsibilities

- **DPO:** advises on compliance, handles data subject requests, reports breaches to the ICO
- **Heads of Department:** ensure their teams record processing activities
- **All staff:** complete data protection training annually; report breaches to the DPO immediately

## Policy Statement

`[College Name]` will:
1. Process personal data lawfully, fairly and transparently
2. Identify a lawful basis (typically `[Article 6(1)(e) public task]` for FE provision) for every processing activity
3. Hold data only as long as needed; see `[retention schedule]`
4. Keep data secure with appropriate technical and organisational measures
5. Respect data subject rights: access, rectification, erasure, restriction, portability, objection
6. Report personal data breaches to the ICO within 72 hours where required

## Procedure

1. New processing activity → Data Protection Impact Assessment if high-risk
2. Data subject request → DPO acknowledges within `[5 working days]`, responds within `[1 month]`
3. Breach detected → notify DPO immediately; DPO decides ICO reporting

## Records & Reporting

- Records of processing activity (Article 30): `[system]`
- Subject access request log
- Breach register

## Review & Version Control

Reviewed every 24 months or sooner if law changes. Next review: `[DATE]`.

## Related Documents

- Acceptable Use Policy
- CCTV Policy
- Records Retention Schedule
',
    ARRAY['UK GDPR','Data Protection Act 2018','ICO guidance'],
    ARRAY['leadership and management'],
    30
  ),
  (
    'health-safety-fe-scaffold-v1',
    'Health & Safety Policy',
    'health_safety',
    'H&S Lead',
    true,
    'Workplace H&S statement under the 1974 Act: roles, risk assessments, accident reporting, RIDDOR.',
    '# Health & Safety Policy

> **Note:** Starter scaffold. Replace `[PLACEHOLDER]` markers and align with the college''s actual H&S management arrangements before publishing.

## Purpose & Scope

This is `[College Name]`''s general statement of intent under the Health and Safety at Work etc Act 1974, applying to all staff, learners, contractors and visitors on college premises and on college-arranged activities.

## Roles & Responsibilities

- **Principal:** ultimate accountability for H&S
- **H&S Lead:** `[NAME]` — coordinates risk assessments, accident investigation, RIDDOR
- **Heads of Department:** ensure their areas comply
- **All staff:** follow safe systems of work, report hazards, use PPE provided

## Policy Statement

`[College Name]` will:
1. Provide a safe place of work, safe equipment and safe systems
2. Risk-assess all significant activities; record findings under the Management of Health and Safety at Work Regulations 1999
3. Provide H&S induction to every new starter and refresher annually
4. Investigate accidents and near-misses; report to HSE under RIDDOR where required
5. Maintain first aid provision: `[number]` qualified first-aiders on site
6. Operate emergency procedures (fire, evacuation, lockdown) and test them termly

## Procedure

1. Hazard reported → recorded on `[system]`, owner identified, action set
2. Accident → first aid → recorded on accident book → investigated within `[5 working days]`
3. RIDDOR-reportable injury → reported to HSE within statutory timeframe (`[7 / 10 days]` per category)

## Records & Reporting

- Risk assessment register
- Accident book
- RIDDOR submissions log
- Termly H&S report to senior leadership

## Review & Version Control

Annual review by H&S Lead. Next review: `[DATE]`.

## Related Documents

- Fire Safety Policy
- Lone Working Policy
- Display Screen Equipment Policy
- COSHH arrangements
',
    ARRAY['Health and Safety at Work etc Act 1974','RIDDOR','Management of Health and Safety at Work Regulations 1999'],
    ARRAY['behaviour and attitudes','leadership and management'],
    40
  )
ON CONFLICT (lookup_key) DO NOTHING;
