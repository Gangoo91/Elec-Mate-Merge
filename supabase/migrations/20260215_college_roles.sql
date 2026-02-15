-- College Roles & Access Control
-- Adds role validation functions and college enrollment infrastructure.
-- profiles.college_id and profiles.college_role already exist in the DB.

-- ============================================
-- 1. Role check function
-- ============================================
CREATE OR REPLACE FUNCTION is_college_staff(p_user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = p_user_id
    AND college_id IS NOT NULL
    AND college_role IS NOT NULL
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION is_college_staff(UUID) IS
  'Returns true if the user has a college_id and college_role set on their profile.';

-- ============================================
-- 2. Colleges table (if not exists)
-- ============================================
CREATE TABLE IF NOT EXISTS public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,              -- short invite code for staff/students
  address TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

-- Everyone can read colleges (needed for enrollment flows)
DROP POLICY IF EXISTS "Colleges are viewable by everyone" ON public.colleges;
CREATE POLICY "Colleges are viewable by everyone"
  ON public.colleges
  FOR SELECT
  USING (true);

-- Only college staff can update their college
DROP POLICY IF EXISTS "College staff can update their college" ON public.colleges;
CREATE POLICY "College staff can update their college"
  ON public.colleges
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = colleges.id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

-- ============================================
-- 3. College invite codes table
-- ============================================
CREATE TABLE IF NOT EXISTS public.college_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  invite_code TEXT NOT NULL UNIQUE,
  invite_type TEXT NOT NULL CHECK (invite_type IN ('staff', 'student')),
  role_to_assign TEXT,               -- for staff invites: 'tutor', 'assessor', etc.
  max_uses INTEGER,                  -- NULL = unlimited
  use_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_college_invites_code ON public.college_invites(invite_code) WHERE is_active = true;

ALTER TABLE public.college_invites ENABLE ROW LEVEL SECURITY;

-- Anyone can read invites (needed to validate codes during enrollment)
DROP POLICY IF EXISTS "Invites are readable" ON public.college_invites;
CREATE POLICY "Invites are readable"
  ON public.college_invites
  FOR SELECT
  USING (true);

-- College admins can manage invites
DROP POLICY IF EXISTS "College admins can manage invites" ON public.college_invites;
CREATE POLICY "College admins can manage invites"
  ON public.college_invites
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_invites.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

-- ============================================
-- 4. RPC: Accept college invite
-- ============================================
CREATE OR REPLACE FUNCTION accept_college_invite(p_invite_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invite RECORD;
  v_user_id UUID;
  v_college_name TEXT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('error', 'Not authenticated');
  END IF;

  -- Find valid invite
  SELECT * INTO v_invite
  FROM college_invites
  WHERE invite_code = p_invite_code
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now())
    AND (max_uses IS NULL OR use_count < max_uses);

  IF v_invite IS NULL THEN
    RETURN jsonb_build_object('error', 'Invalid or expired invite code');
  END IF;

  -- Get college name
  SELECT name INTO v_college_name FROM colleges WHERE id = v_invite.college_id;

  IF v_invite.invite_type = 'staff' THEN
    -- Set college role on profile
    UPDATE profiles
    SET college_id = v_invite.college_id,
        college_role = COALESCE(v_invite.role_to_assign, 'tutor')
    WHERE id = v_user_id;
  ELSIF v_invite.invite_type = 'student' THEN
    -- Create student assignment (if not already enrolled)
    IF NOT EXISTS (
      SELECT 1 FROM college_student_assignments
      WHERE student_id = v_user_id AND college_id = v_invite.college_id
    ) THEN
      INSERT INTO college_student_assignments (student_id, college_id, college_name, qualification_id, start_date)
      SELECT v_user_id, v_invite.college_id, v_college_name, q.id, CURRENT_DATE
      FROM user_qualification_selections uqs
      JOIN qualifications q ON q.id = uqs.qualification_id
      WHERE uqs.user_id = v_user_id AND uqs.is_active = true
      LIMIT 1;

      -- If no qualification selected, insert with a placeholder
      IF NOT FOUND THEN
        INSERT INTO college_student_assignments (student_id, college_id, college_name, qualification_id, start_date)
        SELECT v_user_id, v_invite.college_id, v_college_name, (SELECT id FROM qualifications LIMIT 1), CURRENT_DATE;
      END IF;
    END IF;
  END IF;

  -- Increment use count
  UPDATE college_invites SET use_count = use_count + 1 WHERE id = v_invite.id;

  RETURN jsonb_build_object(
    'success', true,
    'college_name', v_college_name,
    'invite_type', v_invite.invite_type,
    'role', v_invite.role_to_assign
  );
END;
$$;

COMMENT ON FUNCTION accept_college_invite(TEXT) IS
  'Allows authenticated users to accept a college invite code. Sets college_id/role for staff or creates assignment for students.';

-- ============================================
-- 5. RPC: Generate college invite code
-- ============================================
CREATE OR REPLACE FUNCTION generate_college_invite_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    code := code || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;
