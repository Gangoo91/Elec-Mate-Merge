import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { signatureRequestId } = await req.json() as SignatureEmailRequest;

    if (!signatureRequestId) {
      throw new Error("signatureRequestId is required");
    }

    // Fetch the signature request
    const { data: request, error: fetchError } = await supabase
      .from("signature_requests")
      .select("*")
      .eq("id", signatureRequestId)
      .single();

    if (fetchError || !request) {
      throw new Error("Signature request not found");
    }

    // Fetch the sender's profile separately
    const { data: senderProfile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", request.user_id)
      .single();

    if (!request.signer_email) {
      throw new Error("No email address for signer");
    }

    if (!request.access_token) {
      throw new Error("No access token - cannot generate signing link");
    }

    const senderName = senderProfile?.full_name || "Your Electrician";
    const siteUrl = Deno.env.get("SITE_URL") || "https://elec-mate.com";
    const signingUrl = `${siteUrl}/sign/${request.access_token}`;

    console.log(`Sending signature request email to: ${request.signer_email}`);

    // Generate email HTML
    const emailHtml = generateSignatureEmailHTML({
      signerName: request.signer_name,
      documentTitle: request.document_title,
      documentType: request.document_type,
      senderName,
      message: request.message,
      signingUrl,
    });

    // Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `Elec-Mate <noreply@elec-mate.com>`,
      to: [request.signer_email],
      subject: `Signature Required: ${request.document_title}`,
      html: emailHtml,
      reply_to: senderProfile?.email || undefined,
    });

    if (emailError) {
      console.error("Resend API error:", emailError);
      throw emailError;
    }

    console.log("Signature request email sent successfully:", emailData?.id);

    // Update status to Sent
    await supabase
      .from("signature_requests")
      .update({ status: "Sent", updated_at: new Date().toISOString() })
      .eq("id", signatureRequestId);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent", emailId: emailData?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-signature-request:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

interface EmailTemplateData {
  signerName: string;
  documentTitle: string;
  documentType: string | null;
  senderName: string;
  message: string | null;
  signingUrl: string;
}

function generateSignatureEmailHTML(data: EmailTemplateData): string {
  const { signerName, documentTitle, documentType, senderName, message, signingUrl } = data;
  const firstName = signerName.split(" ")[0] || "there";
  const logoUrl = "https://elec-mate.com/logo.jpg";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signature Required</title>
  <style>
    @media only screen and (max-width: 480px) {
      .main-container { padding: 16px !important; }
      .content-padding { padding: 24px 20px !important; }
      .cta-button { padding: 16px 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0a0a0a;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td class="main-container" style="padding: 32px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1a1a1a 0%, #141414 100%); border-radius: 24px; overflow: hidden; border: 1px solid #2a2a2a;">

          <!-- Header -->
          <tr>
            <td class="content-padding" style="padding: 32px 24px 24px; text-align: center;">
              <img src="${logoUrl}" alt="Elec-Mate" width="60" height="60" style="display: block; margin: 0 auto 16px; border-radius: 12px;" />
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                Signature Required
              </h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td class="content-padding" style="padding: 0 24px 24px;">
              <div style="background: #1e1e1e; border-radius: 16px; padding: 24px; border: 1px solid #333333;">
                <p style="margin: 0 0 12px; font-size: 16px; color: #ffffff;">
                  Hi ${firstName},
                </p>
                <p style="margin: 0 0 20px; font-size: 15px; color: #a3a3a3; line-height: 1.6;">
                  <strong style="color: #ffffff;">${senderName}</strong> has requested your signature on:
                </p>

                <!-- Document Details -->
                <div style="background: #141414; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                  <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #fbbf24;">
                    ${documentTitle}
                  </p>
                  ${documentType ? `<p style="margin: 0; font-size: 13px; color: #888888;">${documentType}</p>` : ""}
                </div>

                ${message ? `
                <p style="margin: 0 0 20px; font-size: 14px; color: #888888; font-style: italic; padding-left: 12px; border-left: 2px solid #333;">
                  "${message}"
                </p>
                ` : ""}

                <!-- CTA Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td>
                      <a href="${signingUrl}" class="cta-button" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center;">
                        Review &amp; Sign Document
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Security Note -->
          <tr>
            <td class="content-padding" style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 12px; color: #666666; text-align: center;">
                This is a secure signing link. Only use if you recognise the sender.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0a0a0a; border-top: 1px solid #222222;">
              <p style="margin: 0; font-size: 12px; color: #525252;">
                Powered by Elec-Mate &middot; Secure Digital Signatures
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

serve(handler);
