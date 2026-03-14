-- Add read_at column for persistent read tracking
ALTER TABLE public.push_notification_log
  ADD COLUMN IF NOT EXISTS read_at timestamptz;

-- Users can update their own rows (to set read_at)
CREATE POLICY "Users can update their own push log"
  ON public.push_notification_log FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own push logs (for "Clear all")
CREATE POLICY "Users can delete their own push log"
  ON public.push_notification_log FOR DELETE
  USING (auth.uid() = user_id);
