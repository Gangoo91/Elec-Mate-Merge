-- 20260303_apprentice_tables.sql
-- Creates 11 missing tables for apprentice/study tools
-- 5 user-specific (RLS: auth.uid() = user_id) + 6 reference (authenticated can SELECT)

-- ═══════════════════════════════════════════════════════════════════
-- USER-SPECIFIC TABLES
-- ═══════════════════════════════════════════════════════════════════

-- flashcards — spaced repetition study cards
CREATE TABLE IF NOT EXISTS flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  front text NOT NULL,
  back text NOT NULL,
  topic text,
  next_review timestamptz DEFAULT now(),
  ease_factor numeric DEFAULT 2.5,
  times_reviewed int DEFAULT 0,
  last_reviewed_at timestamptz,
  confidence_level int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "flashcards_select" ON flashcards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "flashcards_insert" ON flashcards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "flashcards_update" ON flashcards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "flashcards_delete" ON flashcards FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_flashcards_user_id ON flashcards(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_next_review ON flashcards(user_id, next_review);

-- exam_results — mock exam score history
CREATE TABLE IF NOT EXISTS exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_type text,
  score int,
  total_questions int,
  passed boolean,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exam_results_select" ON exam_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "exam_results_insert" ON exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "exam_results_update" ON exam_results FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "exam_results_delete" ON exam_results FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON exam_results(user_id);

-- learning_progress — course/module completion tracking
CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course text,
  module text,
  completion_percentage numeric DEFAULT 0,
  last_accessed timestamptz,
  time_spent_minutes int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "learning_progress_select" ON learning_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "learning_progress_insert" ON learning_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "learning_progress_update" ON learning_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "learning_progress_delete" ON learning_progress FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_learning_progress_user_id ON learning_progress(user_id);

-- ojt_hours — off-the-job training logging
CREATE TABLE IF NOT EXISTS ojt_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  hours numeric NOT NULL,
  activity text NOT NULL,
  evidence_url text,
  supervisor_name text,
  supervisor_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ojt_hours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ojt_hours_select" ON ojt_hours FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ojt_hours_insert" ON ojt_hours FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ojt_hours_update" ON ojt_hours FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "ojt_hours_delete" ON ojt_hours FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_ojt_hours_user_id ON ojt_hours(user_id);

-- mood_checkins — wellbeing tracking (highest sensitivity)
CREATE TABLE IF NOT EXISTS mood_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood int NOT NULL CHECK (mood >= 1 AND mood <= 10),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mood_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mood_checkins_select" ON mood_checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mood_checkins_insert" ON mood_checkins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mood_checkins_update" ON mood_checkins FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "mood_checkins_delete" ON mood_checkins FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_mood_checkins_user_id ON mood_checkins(user_id);

-- ═══════════════════════════════════════════════════════════════════
-- REFERENCE TABLES (authenticated users can SELECT)
-- ═══════════════════════════════════════════════════════════════════

-- toolbox_guides — study guide library
CREATE TABLE IF NOT EXISTS toolbox_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  topic text,
  content text,
  difficulty text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE toolbox_guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "toolbox_guides_select" ON toolbox_guides FOR SELECT USING (auth.role() = 'authenticated');

-- learning_videos — curated video library
CREATE TABLE IF NOT EXISTS learning_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text,
  topic text,
  duration_minutes int,
  thumbnail_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE learning_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "learning_videos_select" ON learning_videos FOR SELECT USING (auth.role() = 'authenticated');

-- wellbeing_resources — mental health resources and crisis contacts
CREATE TABLE IF NOT EXISTS wellbeing_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text,
  url text,
  is_crisis boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wellbeing_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wellbeing_resources_select" ON wellbeing_resources FOR SELECT USING (auth.role() = 'authenticated');

-- safety_scenarios — interactive safety case studies
CREATE TABLE IF NOT EXISTS safety_scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  topic text,
  difficulty text,
  scenario_data jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE safety_scenarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "safety_scenarios_select" ON safety_scenarios FOR SELECT USING (auth.role() = 'authenticated');

-- apprentice_rights — wages, rights, and support info
CREATE TABLE IF NOT EXISTS apprentice_rights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  content text,
  source_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE apprentice_rights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "apprentice_rights_select" ON apprentice_rights FOR SELECT USING (auth.role() = 'authenticated');

-- career_pathways — progression and salary data
CREATE TABLE IF NOT EXISTS career_pathways (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  level text,
  salary_range text,
  requirements text,
  progression_options jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE career_pathways ENABLE ROW LEVEL SECURITY;
CREATE POLICY "career_pathways_select" ON career_pathways FOR SELECT USING (auth.role() = 'authenticated');
