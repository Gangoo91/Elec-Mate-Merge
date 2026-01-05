-- Create client portal invites table
CREATE TABLE public.client_portal_invites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  client_email TEXT,
  client_name TEXT NOT NULL,
  access_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  permissions JSONB NOT NULL DEFAULT '{"view_progress": true, "view_photos": true, "view_timeline": true, "can_message": true, "can_signoff": false}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed_at TIMESTAMP WITH TIME ZONE
);

-- Create client messages table
CREATE TABLE public.client_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  message TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'contractor')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Create client signoffs table
CREATE TABLE public.client_signoffs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  stage TEXT NOT NULL,
  signature_data TEXT NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  client_name TEXT NOT NULL,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.client_portal_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_signoffs ENABLE ROW LEVEL SECURITY;

-- RLS policies for client_portal_invites (public access for token validation)
CREATE POLICY "Allow public read by token" ON public.client_portal_invites
  FOR SELECT USING (true);

CREATE POLICY "Allow all insert" ON public.client_portal_invites
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all update" ON public.client_portal_invites
  FOR UPDATE USING (true);

-- RLS policies for client_messages
CREATE POLICY "Allow public access to messages" ON public.client_messages
  FOR ALL USING (true) WITH CHECK (true);

-- RLS policies for client_signoffs
CREATE POLICY "Allow public access to signoffs" ON public.client_signoffs
  FOR ALL USING (true) WITH CHECK (true);

-- Indexes for performance
CREATE INDEX idx_portal_invites_token ON public.client_portal_invites(access_token);
CREATE INDEX idx_portal_invites_job ON public.client_portal_invites(job_id);
CREATE INDEX idx_client_messages_token ON public.client_messages(access_token);
CREATE INDEX idx_client_signoffs_job ON public.client_signoffs(job_id);