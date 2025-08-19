import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NormalizedProject {
  title: string;
  summary: string;
  content: string;
  awarded_to: string;
  project_value: string;
  location: string;
  status: string;
  category: string;
  electrical_scope: string;
  technologies: string[];
  date_awarded: string | null;
  tender_deadline: string | null;
  source_url: string;
  external_project_url: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projects, replaceAll = false } = await req.json();
    
    if (!projects || !Array.isArray(projects)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Projects array required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Processing ${projects.length} projects for database update`);

    let insertedCount = 0;
    let updatedCount = 0;
    let errors = 0;

    // If replaceAll is true, mark existing projects as inactive first
    if (replaceAll) {
      const { error: deactivateError } = await supabase
        .from('major_projects')
        .update({ is_active: false })
        .eq('is_active', true);
      
      if (deactivateError) {
        console.error('Error deactivating existing projects:', deactivateError);
      } else {
        console.log('Deactivated existing projects for replacement');
      }
    }

    // Process each project
    for (const project of projects as NormalizedProject[]) {
      try {
        // Validate required fields
        if (!project.title || !project.summary || !project.awarded_to) {
          console.warn('Skipping project with missing required fields:', project.title);
          errors++;
          continue;
        }

        // Check if project already exists (by title and awarded_to)
        const { data: existingProject } = await supabase
          .from('major_projects')
          .select('id, title, awarded_to')
          .eq('title', project.title)
          .eq('awarded_to', project.awarded_to)
          .limit(1)
          .single();

        const projectData = {
          title: project.title.substring(0, 200),
          summary: project.summary.substring(0, 500),
          content: project.content?.substring(0, 2000) || project.summary,
          awarded_to: project.awarded_to.substring(0, 200),
          project_value: project.project_value || 'TBC',
          location: project.location || 'UK',
          status: project.status || 'active',
          category: project.category || 'Infrastructure',
          electrical_scope: project.electrical_scope || 'General Electrical',
          technologies: project.technologies || ['General Electrical'],
          date_awarded: project.date_awarded || new Date().toISOString().split('T')[0],
          tender_deadline: project.tender_deadline,
          source_url: project.source_url,
          external_project_url: project.external_project_url || project.source_url,
          is_active: true,
          updated_at: new Date().toISOString()
        };

        if (existingProject) {
          // Update existing project
          const { error: updateError } = await supabase
            .from('major_projects')
            .update(projectData)
            .eq('id', existingProject.id);

          if (updateError) {
            console.error('Error updating project:', updateError);
            errors++;
          } else {
            updatedCount++;
          }
        } else {
          // Insert new project
          const { error: insertError } = await supabase
            .from('major_projects')
            .insert({
              ...projectData,
              created_at: new Date().toISOString()
            });

          if (insertError) {
            console.error('Error inserting project:', insertError);
            errors++;
          } else {
            insertedCount++;
          }
        }

        // Small delay to avoid overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 10));

      } catch (projectError) {
        console.error('Error processing project:', projectError);
        errors++;
      }
    }

    // Fetch updated projects to return
    const { data: updatedProjects, error: fetchError } = await supabase
      .from('major_projects')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(50);

    console.log(`Database update complete: ${insertedCount} inserted, ${updatedCount} updated, ${errors} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Database updated successfully`,
        statistics: {
          inserted: insertedCount,
          updated: updatedCount,
          errors: errors,
          total: projects.length
        },
        projects: updatedProjects || []
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Update major projects error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Database update failed',
        statistics: {
          inserted: 0,
          updated: 0,
          errors: 1,
          total: 0
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});