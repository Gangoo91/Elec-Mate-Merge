-- ============================================================
-- College Parent / Guardian Portal (16-19 learners)
-- ============================================================
-- ELE-932 (J3). Stores parent contact details + magic-link tokens for
-- a no-login weekly digest. Honours opt-in/opt-out (GDPR).
-- ============================================================

CREATE TABLE IF NOT EXISTS public.college_parent_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.college_students(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  relationship TEXT,                         -- 'parent' | 'guardian' | 'carer' | 'other'

  opted_in_at TIMESTAMPTZ,
  opted_out_at TIMESTAMPTZ,
  opt_in_method TEXT,                        -- 'enrolment_form' | 'self_serve' | 'tutor_added'

  digest_frequency TEXT NOT NULL DEFAULT 'weekly'
    CHECK (digest_frequency IN ('weekly', 'fortnightly', 'monthly', 'never')),
  digest_last_sent_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE (student_id, email)
);

CREATE INDEX IF NOT EXISTS idx_parent_contacts_college ON public.college_parent_contacts(college_id);
CREATE INDEX IF NOT EXISTS idx_parent_contacts_student ON public.college_parent_contacts(student_id);
CREATE INDEX IF NOT EXISTS idx_parent_contacts_email ON public.college_parent_contacts(email);

ALTER TABLE public.college_parent_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parent_contacts_select" ON public.college_parent_contacts
  FOR SELECT USING (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "parent_contacts_insert" ON public.college_parent_contacts
  FOR INSERT WITH CHECK (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "parent_contacts_update" ON public.college_parent_contacts
  FOR UPDATE USING (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "parent_contacts_delete" ON public.college_parent_contacts
  FOR DELETE USING (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

-- 2. Magic-link tokens (no auth required for parents to view their digest)
CREATE TABLE IF NOT EXISTS public.college_parent_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_contact_id UUID NOT NULL REFERENCES public.college_parent_contacts(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  purpose TEXT NOT NULL DEFAULT 'digest_view'
    CHECK (purpose IN ('digest_view', 'opt_out', 'verify_email')),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_parent_tokens_lookup
  ON public.college_parent_tokens(token) WHERE used_at IS NULL;

ALTER TABLE public.college_parent_tokens ENABLE ROW LEVEL SECURITY;

-- Tokens are only accessed through edge functions (service role). Deny user access.
CREATE POLICY "parent_tokens_deny_all" ON public.college_parent_tokens
  FOR ALL USING (false) WITH CHECK (false);

-- 3. Digest send log (idempotency / audit)
CREATE TABLE IF NOT EXISTS public.college_parent_digest_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_contact_id UUID NOT NULL REFERENCES public.college_parent_contacts(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.college_students(id) ON DELETE CASCADE,
  iso_week TEXT NOT NULL,
  payload JSONB NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  brevo_message_id TEXT,
  status TEXT NOT NULL DEFAULT 'sent'
    CHECK (status IN ('sent', 'bounced', 'opened', 'clicked', 'unsubscribed', 'failed')),
  UNIQUE (parent_contact_id, iso_week)
);

CREATE INDEX IF NOT EXISTS idx_parent_digest_log_student ON public.college_parent_digest_log(student_id);
CREATE INDEX IF NOT EXISTS idx_parent_digest_log_iso_week ON public.college_parent_digest_log(iso_week);

ALTER TABLE public.college_parent_digest_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parent_digest_log_select" ON public.college_parent_digest_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND (
        s.user_id = auth.uid()
        OR _ch_same_college(s.college_id)
      )
    )
  );

DROP TRIGGER IF EXISTS trg_parent_contacts_updated_at ON public.college_parent_contacts;
CREATE TRIGGER trg_parent_contacts_updated_at
  BEFORE UPDATE ON public.college_parent_contacts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
