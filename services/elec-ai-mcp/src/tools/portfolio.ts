/**
 * Portfolio — create shareable portfolio pages from completed work
 */

import type { UserContext } from '../auth.js';
import { createClient } from '@supabase/supabase-js';

/**
 * Create a shareable portfolio page from a completed job.
 * Generates a public link the electrician can share with prospects.
 */
export async function createPortfolioPage(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const projectId = args.project_id as string;
  const jobId = args.job_id as string;
  const description = args.description as string;
  const photoUrls = args.photo_urls as string[];

  if (!projectId && !jobId && !description) {
    return { error: 'project_id, job_id, or description is required' };
  }

  let title = '';
  let jobDescription = '';
  let location = '';
  let clientName = '';
  let value = 0;

  // Get job/project details
  if (projectId) {
    const { data: project } = await supabase
      .from('spark_projects')
      .select('title, description, location, estimated_value, customers(name)')
      .eq('id', projectId)
      .single();
    if (project) {
      title = (project.title as string) || '';
      jobDescription = (project.description as string) || '';
      location = (project.location as string) || '';
      clientName =
        ((project.customers as unknown as Record<string, unknown>)?.name as string) || '';
      value = Number(project.estimated_value || 0);
    }
  } else if (jobId) {
    const { data: job } = await supabase
      .from('employer_jobs')
      .select('title, description, location, value, client')
      .eq('id', jobId)
      .single();
    if (job) {
      title = (job.title as string) || '';
      jobDescription = (job.description as string) || '';
      location = (job.location as string) || '';
      value = Number(job.value || 0);
    }
  }

  if (description) jobDescription = description;
  if (!title) title = 'Completed Electrical Work';

  // Strip house number from location for privacy
  const publicLocation = location.replace(/^\d+\s*/, '').replace(/,\s*$/, '');

  // Get any photos attached to this entity
  let photos: string[] = photoUrls || [];
  if (photos.length === 0 && (projectId || jobId)) {
    const { data: entityPhotos } = await supabase
      .from('entity_photos')
      .select('photo_url')
      .or(projectId ? `linked_project_id.eq.${projectId}` : `linked_job_id.eq.${jobId}`)
      .limit(6);
    photos = (entityPhotos || []).map((p) => p.photo_url as string).filter(Boolean);
  }

  // Get electrician's profile for branding
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_name, phone')
    .eq('id', user.userId)
    .single();

  const businessName =
    (profile?.business_name as string) || (profile?.full_name as string) || 'Qualified Electrician';
  const contactPhone = (profile?.phone as string) || '';

  // Create portfolio entry in storage as HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | ${businessName}</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #fff; }
h1 { font-size: 1.5rem; color: #facc15; }
.meta { color: #9ca3af; font-size: 0.9rem; margin-bottom: 1rem; }
.desc { line-height: 1.6; margin-bottom: 1.5rem; }
.photos { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 1.5rem; }
.photos img { width: 100%; border-radius: 8px; }
.cta { background: #facc15; color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; }
.footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #333; color: #9ca3af; font-size: 0.8rem; }
</style>
</head>
<body>
<h1>${title}</h1>
<div class="meta">${publicLocation ? `📍 ${publicLocation}` : ''} | ${businessName}</div>
<div class="desc">${jobDescription}</div>
${photos.length > 0 ? `<div class="photos">${photos.map((p) => `<img src="${p}" alt="Work photo">`).join('')}</div>` : ''}
${contactPhone ? `<a href="tel:${contactPhone}" class="cta">Call for a Quote</a>` : ''}
<div class="footer">
<p>Work completed by ${businessName} — qualified and certified electrician.</p>
<p>Powered by Elec-Mate</p>
</div>
</body>
</html>`;

  // Upload to Supabase storage
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return { error: 'Storage not configured' };

  const adminClient = createClient(
    process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co',
    serviceKey
  );

  const fileName = `portfolio-${user.userId}-${Date.now()}.html`;
  const { error: uploadError } = await adminClient.storage
    .from('visual-uploads')
    .upload(fileName, html, { contentType: 'text/html', upsert: false });

  if (uploadError) return { error: `Upload failed: ${uploadError.message}` };

  const { data: urlData } = adminClient.storage.from('visual-uploads').getPublicUrl(fileName);

  return {
    success: true,
    portfolio_url: urlData.publicUrl,
    title,
    location: publicLocation,
    photos_included: photos.length,
    note: 'Share this link with prospects on social media, WhatsApp, or your website. The page is mobile-friendly and branded with your business name.',
  };
}
