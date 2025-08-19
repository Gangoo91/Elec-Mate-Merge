-- Add URL columns to major_projects table to store real Firecrawl extraction URLs
ALTER TABLE public.major_projects 
ADD COLUMN source_url text,
ADD COLUMN external_project_url text;

-- Add index for source_url for better performance
CREATE INDEX idx_major_projects_source_url ON public.major_projects(source_url);

-- Add comment to explain the columns
COMMENT ON COLUMN public.major_projects.source_url IS 'Original source page URL where project was found via Firecrawl';
COMMENT ON COLUMN public.major_projects.external_project_url IS 'Direct link to individual project details page when available';