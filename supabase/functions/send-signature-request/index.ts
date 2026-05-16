import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildSignatureRequestEmail } from '../_shared/email-templates/signature-request.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface SignatureEmailRequest {
  signatureRequestId: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Signature Request Email | Started:', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { signatureRequestId } = (await req.json()) as SignatureEmailRequest;

    if (!signatureRequestId) {
      throw new Error('signatureRequestId is required');
    }

    // Fetch the signature request
    const { data: request, error: fetchError } = await supabase
      .from('signature_requests')
      .select('*')
      .eq('id', signatureRequestId)
      .single();

    if (fetchError || !request) {
      throw new Error('Signature request not found');
    }

    // Fetch the sender's profile separately
    const { data: senderProfile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', request.user_id)
      .single();

    if (!request.signer_email) {
      throw new Error('No email address for signer');
    }

    if (!request.access_token) {
      throw new Error('No access token - cannot generate signing link');
    }

    const senderName = senderProfile?.full_name || 'Your Electrician';
    const siteUrl = Deno.env.get('SITE_URL') || 'https://elec-mate.com';
    const signingUrl = `${siteUrl}/sign/${request.access_token}`;

    console.log(`Sending signature request email to: ${request.signer_email}`);

    // Fetch company profile so the email matches the shared design.
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', request.user_id)
      .single();

    const companyName = companyProfile?.company_name || senderName;
    const sigPayload = buildSignatureRequestEmail({
      company: {
        name: companyName,
        logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
        primaryColor: companyProfile?.primary_color || null,
        email: companyProfile?.company_email || senderProfile?.email || null,
        phone: companyProfile?.company_phone || null,
        website: companyProfile?.company_website || null,
        address: companyProfile?.company_address || null,
        vatNumber: companyProfile?.vat_number || null,
        registrationNumber: companyProfile?.company_registration || null,
      },
      signerName: request.signer_name,
      documentTitle: request.document_title,
      documentType: request.document_type,
      senderName,
      message: request.message,
      signingUrl,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=signature_request&id=${signatureRequestId}`,
    });

    const sender = clientFacingSender({
      companyName,
      companyEmail: companyProfile?.company_email,
      userEmail: senderProfile?.email,
    });

    // Send email via Resend (Brevo) — DMARC-aligned sender.
    const { data: emailData, error: emailError } = await resend.emails.send({
      ...sender,
      to: [request.signer_email],
      subject: sigPayload.subject,
      html: sigPayload.html,
      text: htmlToPlainText(sigPayload.html),
    });

    if (emailError) {
      console.error('Resend API error:', emailError);
      throw emailError;
    }

    console.log('Signature request email sent successfully:', emailData?.id);

    // Update status to Sent
    await supabase
      .from('signature_requests')
      .update({ status: 'Sent', updated_at: new Date().toISOString() })
      .eq('id', signatureRequestId);

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent', emailId: emailData?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in send-signature-request:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
