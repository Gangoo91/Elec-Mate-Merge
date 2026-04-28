-- Tutors and apprentices both need scoped read/write on the messaging tables.
-- Reuses the canonical helpers is_the_student(uuid) and
-- is_staff_at_students_college(uuid) already defined for student_ac_coverage.
--
-- These policies coexist with prior "threads: staff read|write" /
-- "messages: staff read|write" policies (PERMISSIVE — any one passing grants
-- access). Adding them explicitly closes the messaging RLS gap that was
-- causing tutors to hit "row doesn't exist" on thread INSERT.

-- ════════════════════════════════ THREADS ════════════════════════════════

DROP POLICY IF EXISTS "apprentice reads own threads" ON public.student_message_threads;
CREATE POLICY "apprentice reads own threads"
ON public.student_message_threads FOR SELECT TO authenticated
USING (public.is_the_student(student_id));

DROP POLICY IF EXISTS "staff reads threads at college" ON public.student_message_threads;
CREATE POLICY "staff reads threads at college"
ON public.student_message_threads FOR SELECT TO authenticated
USING (public.is_staff_at_students_college(student_id));

DROP POLICY IF EXISTS "apprentice inserts own thread" ON public.student_message_threads;
CREATE POLICY "apprentice inserts own thread"
ON public.student_message_threads FOR INSERT TO authenticated
WITH CHECK (public.is_the_student(student_id));

DROP POLICY IF EXISTS "staff inserts thread at college" ON public.student_message_threads;
CREATE POLICY "staff inserts thread at college"
ON public.student_message_threads FOR INSERT TO authenticated
WITH CHECK (public.is_staff_at_students_college(student_id));

DROP POLICY IF EXISTS "apprentice updates own thread" ON public.student_message_threads;
CREATE POLICY "apprentice updates own thread"
ON public.student_message_threads FOR UPDATE TO authenticated
USING (public.is_the_student(student_id))
WITH CHECK (public.is_the_student(student_id));

DROP POLICY IF EXISTS "staff updates thread at college" ON public.student_message_threads;
CREATE POLICY "staff updates thread at college"
ON public.student_message_threads FOR UPDATE TO authenticated
USING (public.is_staff_at_students_college(student_id))
WITH CHECK (public.is_staff_at_students_college(student_id));

-- ════════════════════════════════ MESSAGES ═══════════════════════════════

DROP POLICY IF EXISTS "apprentice reads own thread messages" ON public.student_messages;
CREATE POLICY "apprentice reads own thread messages"
ON public.student_messages FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.student_message_threads t
    WHERE t.id = student_messages.thread_id
      AND public.is_the_student(t.student_id)
  )
);

DROP POLICY IF EXISTS "staff reads college thread messages" ON public.student_messages;
CREATE POLICY "staff reads college thread messages"
ON public.student_messages FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.student_message_threads t
    WHERE t.id = student_messages.thread_id
      AND public.is_staff_at_students_college(t.student_id)
  )
);

DROP POLICY IF EXISTS "apprentice posts in own thread" ON public.student_messages;
CREATE POLICY "apprentice posts in own thread"
ON public.student_messages FOR INSERT TO authenticated
WITH CHECK (
  sender_kind = 'student'
  AND EXISTS (
    SELECT 1 FROM public.student_message_threads t
    WHERE t.id = student_messages.thread_id
      AND public.is_the_student(t.student_id)
  )
);

DROP POLICY IF EXISTS "staff posts in college thread" ON public.student_messages;
CREATE POLICY "staff posts in college thread"
ON public.student_messages FOR INSERT TO authenticated
WITH CHECK (
  sender_kind = 'tutor'
  AND EXISTS (
    SELECT 1 FROM public.student_message_threads t
    WHERE t.id = student_messages.thread_id
      AND public.is_staff_at_students_college(t.student_id)
  )
);

DROP POLICY IF EXISTS "apprentice updates own thread messages" ON public.student_messages;
CREATE POLICY "apprentice updates own thread messages"
ON public.student_messages FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.student_message_threads t
    WHERE t.id = student_messages.thread_id
      AND public.is_the_student(t.student_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.student_message_threads t
    WHERE t.id = student_messages.thread_id
      AND public.is_the_student(t.student_id)
  )
);

DROP POLICY IF EXISTS "staff updates college thread messages" ON public.student_messages;
CREATE POLICY "staff updates college thread messages"
ON public.student_messages FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.student_message_threads t
    WHERE t.id = student_messages.thread_id
      AND public.is_staff_at_students_college(t.student_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.student_message_threads t
    WHERE t.id = student_messages.thread_id
      AND public.is_staff_at_students_college(t.student_id)
  )
);
