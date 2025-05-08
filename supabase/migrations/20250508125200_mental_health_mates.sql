
-- Create mental health mates table
CREATE TABLE IF NOT EXISTS public.mental_health_mates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  status TEXT DEFAULT 'Available' NOT NULL CHECK (status IN ('Available', 'Busy', 'Unavailable')),
  availability_schedule JSONB,
  specialization TEXT,
  bio TEXT,
  UNIQUE(user_id)
);

-- Add RLS policy to protect the mental_health_mates table
ALTER TABLE public.mental_health_mates ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all mental health mates entries
CREATE POLICY "Allow authenticated users to view mental health mates" 
  ON public.mental_health_mates 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Allow users to insert their own entries
CREATE POLICY "Allow users to insert their own mental health mate entry"
  ON public.mental_health_mates
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own entries
CREATE POLICY "Allow users to update their own mental health mate entry"
  ON public.mental_health_mates
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create messages table for mental health conversations
CREATE TABLE IF NOT EXISTS public.mental_health_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  read BOOLEAN DEFAULT FALSE NOT NULL
);

-- Add RLS policy to protect the mental_health_messages table
ALTER TABLE public.mental_health_messages ENABLE ROW LEVEL SECURITY;

-- Allow users to read messages where they are the sender or receiver
CREATE POLICY "Allow users to view their own messages"
  ON public.mental_health_messages
  FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Allow users to insert messages where they are the sender
CREATE POLICY "Allow users to insert their own messages"
  ON public.mental_health_messages
  FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Create function to update mental_health_mate status
CREATE OR REPLACE FUNCTION public.update_mental_health_mate_status(p_status TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO public.mental_health_mates (user_id, status)
  VALUES (auth.uid(), p_status)
  ON CONFLICT (user_id) 
  DO UPDATE SET status = p_status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS mental_health_mates_user_id_idx ON public.mental_health_mates(user_id);
CREATE INDEX IF NOT EXISTS mental_health_messages_sender_receiver_idx ON public.mental_health_messages(sender_id, receiver_id);

-- Add mental health notifications system
CREATE TABLE IF NOT EXISTS public.mental_health_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  read BOOLEAN DEFAULT FALSE NOT NULL
);

-- Add RLS policy to protect the mental_health_notifications table
ALTER TABLE public.mental_health_notifications ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own notifications
CREATE POLICY "Allow users to view their own mental health notifications"
  ON public.mental_health_notifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Enable real-time for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.mental_health_mates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mental_health_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mental_health_notifications;

-- Set replica identity for these tables to enable realtime updates
ALTER TABLE public.mental_health_mates REPLICA IDENTITY FULL;
ALTER TABLE public.mental_health_messages REPLICA IDENTITY FULL;
ALTER TABLE public.mental_health_notifications REPLICA IDENTITY FULL;
