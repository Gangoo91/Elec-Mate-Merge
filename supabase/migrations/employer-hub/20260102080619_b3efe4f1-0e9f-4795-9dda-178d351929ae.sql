-- Knowledge documents table for RAG support
CREATE TABLE public.knowledge_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'policy', 'pricing', 'technical', 'client', 'procedure', 'template'
  content TEXT NOT NULL,
  summary TEXT,
  metadata JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;

-- Public read access for voice assistant queries
CREATE POLICY "Knowledge documents are publicly readable"
  ON public.knowledge_documents
  FOR SELECT
  USING (true);

-- Add updated_at trigger
CREATE TRIGGER update_knowledge_documents_updated_at
  BEFORE UPDATE ON public.knowledge_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for category searches
CREATE INDEX idx_knowledge_documents_category ON public.knowledge_documents(category);

-- Insert some starter documents
INSERT INTO public.knowledge_documents (title, category, content, summary, tags) VALUES
  ('Company Overview', 'policy', 'We are an electrical contracting company specialising in commercial and domestic electrical installations. Our team consists of qualified electricians with ECS cards and relevant certifications. We prioritise safety, quality, and customer satisfaction.', 'Basic company information and values', ARRAY['company', 'overview', 'values']),
  ('Pricing Guidelines', 'pricing', 'Standard daywork rates: Electrician £45-55/hr, Apprentice £18-25/hr, Supervisor £55-65/hr. Material markup: 20-30%. Quoted work should include 15-25% margin. Emergency callout: 1.5x standard rates. Weekend work: 1.5x weekday rates.', 'Standard pricing and rates for work', ARRAY['pricing', 'rates', 'daywork', 'markup']),
  ('Tender Assessment Criteria', 'procedure', 'When assessing tenders, consider: 1) Current team capacity and commitments, 2) Project complexity vs team skills, 3) Historical win rate for similar projects, 4) Client payment history, 5) Required certifications, 6) Travel distance and logistics. For teams under 10 people, focus on smaller jobs (under £50k) with quick turnaround.', 'How to evaluate tender opportunities', ARRAY['tender', 'assessment', 'bidding', 'capacity']),
  ('Safety Priorities', 'policy', 'All work must comply with BS 7671 and current IET regulations. Risk assessments and method statements (RAMS) required before starting any job. Minimum PPE: safety boots, hi-vis, hard hat on construction sites. Report all incidents within 24 hours. Near misses are learning opportunities.', 'Key safety requirements and procedures', ARRAY['safety', 'compliance', 'rams', 'ppe']);