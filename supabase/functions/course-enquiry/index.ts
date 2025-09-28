import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface CourseEnquiryRequest {
  courseId: string;
  courseTitle: string;
  courseProvider: string;
  enquirerName: string;
  enquirerEmail: string;
  enquirerPhone?: string;
  message?: string;
  preferredStartDate?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    let userId = null;
    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    const enquiryData: CourseEnquiryRequest = await req.json();
    
    console.log('Processing course enquiry:', {
      courseId: enquiryData.courseId,
      provider: enquiryData.courseProvider,
      enquirer: enquiryData.enquirerEmail
    });

    // Insert enquiry into database
    const { data: enquiry, error: insertError } = await supabase
      .from('course_enquiries')
      .insert({
        user_id: userId,
        course_id: enquiryData.courseId,
        course_title: enquiryData.courseTitle,
        course_provider: enquiryData.courseProvider,
        enquirer_name: enquiryData.enquirerName,
        enquirer_email: enquiryData.enquirerEmail,
        enquirer_phone: enquiryData.enquirerPhone,
        message: enquiryData.message,
        preferred_start_date: enquiryData.preferredStartDate ? new Date(enquiryData.preferredStartDate) : null,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error('Failed to save enquiry');
    }

    console.log('✅ Course enquiry saved successfully:', enquiry.id);

    // TODO: Add email notification to course provider
    // This would require integrating with Resend or similar email service
    
    return new Response(JSON.stringify({
      success: true,
      enquiryId: enquiry.id,
      message: 'Your enquiry has been submitted successfully. The course provider will contact you soon.'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in course enquiry function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit enquiry'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});