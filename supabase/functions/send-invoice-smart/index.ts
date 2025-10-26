/**
 * Send Invoice Smart
 * Sends invoices using user's connected email account (Gmail/Outlook)
 * Includes rate limiting, token refresh, retry logic
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, RateLimitError, ExternalAPIError } from '../_shared/errors.ts';
import { decryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { encode as encodeBase64 } from 'https://deno.land/std@0.168.0/encoding/base64.ts';

const DAILY_RATE_LIMIT = 100;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentType, quoteId, invoiceId, to, subject, body, attachmentBase64, attachmentFilename, preferExistingPdf } = await req.json();

    // Validate document type (optional - defaults to 'invoice')
    const type = documentType || 'invoice';
    
    if (type !== 'quote' && type !== 'invoice') {
      throw new ValidationError('documentType must be "quote" or "invoice"');
    }

    // Validate we have either quote or invoice ID if no manual email details provided
    if (!to && !quoteId && !invoiceId) {
      throw new ValidationError('Either documentId or manual email details required');
    }

    console.log(`📧 Send request - Type: ${type}, preferExistingPdf: ${preferExistingPdf}`);

    // Email validation happens after document data extraction (line 256)

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Get active email config
    const { data: configs, error: configError } = await supabase
      .from('user_email_configs')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (configError || !configs || configs.length === 0) {
      throw new ValidationError('No email account connected. Please connect Gmail or Outlook in Settings.');
    }

    const config = configs[0];

    // If document ID provided, fetch document data and generate email
    let emailTo = to?.trim();
    let emailSubject = subject;
    let emailBody = body;
    let pdfAttachment = attachmentBase64;
    let pdfFilename = attachmentFilename;

    if (quoteId || invoiceId) {
      const docId = quoteId || invoiceId;
      const docType = quoteId ? 'quote' : 'invoice';
      
      // Fetch document data
      const { data: doc, error: docError } = await supabase
        .from(docType === 'quote' ? 'quotes' : 'quotes')
        .select('*')
        .eq('id', docId)
        .eq('user_id', user.id)
        .single();

      if (docError || !doc) {
        throw new ValidationError(`${docType} not found`);
      }

      // Fetch company profile
      const { data: company } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Check if we should use existing PDF or generate fresh
      let pdfDownloadUrl: string | null = null;
      let documentId: string | null = null;

      if (preferExistingPdf && doc.pdf_document_id) {
        console.log('📄 Attempting to use existing PDF...');
        
        // Check if PDF is current
        const pdfIsCurrent = doc.pdf_generated_at && 
                            new Date(doc.pdf_generated_at) >= new Date(doc.updated_at);

        if (pdfIsCurrent) {
          // Try to get download URL from existing document
          const statusResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/generate-pdf-monkey`, {
            method: 'POST',
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ documentId: doc.pdf_document_id, mode: 'status' })
          });
          
          const statusData = await statusResponse.json();
          if (statusData?.downloadUrl) {
            pdfDownloadUrl = statusData.downloadUrl;
            documentId = doc.pdf_document_id;
            console.log('✅ Using existing PDF');
          }
        }
      }

      // If no existing PDF or preferExistingPdf is false, generate fresh
      if (!pdfDownloadUrl) {
        console.log('📄 Generating fresh PDF...');

        const pdfResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/generate-pdf-monkey`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quote: doc,
            companyProfile: company,
            invoice_mode: doc.invoice_raised === true || docType === 'invoice',
            force_regenerate: true
          })
        });

        const pdfData = await pdfResponse.json();
        pdfDownloadUrl = pdfData?.downloadUrl;
        documentId = pdfData?.documentId;

        // Poll for PDF if not immediately available (max 90 seconds)
        if (!pdfDownloadUrl && documentId) {
          console.log('⏳ Polling for PDF download URL...');
          for (let i = 0; i < 45; i++) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const statusResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/generate-pdf-monkey`, {
              method: 'POST',
              headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ documentId, mode: 'status' })
            });
            const statusData = await statusResponse.json();
            if (statusData?.downloadUrl) {
              pdfDownloadUrl = statusData.downloadUrl;
              break;
            }
          }
        }

        if (!pdfDownloadUrl) {
          throw new ValidationError('Failed to generate PDF - please try again');
        }

        // Update quote record with PDF metadata
        if (documentId) {
          const newVersion = (doc.pdf_version || 0) + 1;
          await supabase
            .from('quotes')
            .update({
              pdf_document_id: documentId,
              pdf_generated_at: new Date().toISOString(),
              pdf_version: newVersion
            })
            .eq('id', docId);
        }

        console.log('✅ Fresh PDF generated');
      }

      // Download PDF as binary data for attachment
      console.log('📥 Downloading PDF for email attachment...');
    const pdfFileResponse = await fetch(pdfDownloadUrl);
    if (!pdfFileResponse.ok) {
      throw new ExternalAPIError('PDF Monkey', 'Failed to download generated PDF');
    }
    const pdfArrayBuffer = await pdfFileResponse.arrayBuffer();
    
    // Convert PDF to base64 in chunks to avoid stack overflow
    const uint8Array = new Uint8Array(pdfArrayBuffer);
    const chunkSize = 8192; // Process 8KB at a time
    let binaryString = '';
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
      binaryString += String.fromCharCode.apply(null, Array.from(chunk));
    }
    pdfAttachment = btoa(binaryString);
    pdfFilename = `${docType}_${doc.quote_number || docId}.pdf`;
    console.log(`✅ PDF downloaded: ${pdfArrayBuffer.byteLength} bytes, filename: ${pdfFilename}`);

      // Parse client data
      const clientData = typeof doc.client_data === 'string' 
        ? JSON.parse(doc.client_data) 
        : doc.client_data;

    // Get or create public token for Accept/Decline functionality
    let publicToken: string | null = null;
    if (docType === 'quote') {
      // Try to get existing token
      const { data: quoteView } = await supabase
        .from('quote_views')
        .select('public_token, expires_at, view_count')
        .eq('quote_id', docId)
        .eq('is_active', true)
        .maybeSingle();
      
      if (quoteView?.public_token) {
        publicToken = quoteView.public_token;
        console.log(`📧 Using existing public token for quote ${doc.quote_number}`);
      } else {
        // Create new token if none exists (enables one-click accept/reject)
        const newToken = crypto.randomUUID();
        const expiryDate = doc.expiry_date 
          ? new Date(doc.expiry_date).toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days default
        
        const { error: insertError } = await supabase
          .from('quote_views')
          .insert({
            quote_id: docId,
            public_token: newToken,
            is_active: true,
            view_count: 0,
            expires_at: expiryDate
          });
        
        if (!insertError) {
          publicToken = newToken;
          console.log(`✅ Created new public token for quote ${doc.quote_number}: ${newToken}`);
        } else {
          console.error('❌ Failed to create public token:', insertError);
        }
      }
      
      console.log(`📧 Public token for quote ${doc.quote_number}:`, publicToken ? 'Available ✓' : 'Not available ✗');
    }
      
      const jobDetails = doc.job_details 
        ? (typeof doc.job_details === 'string' ? JSON.parse(doc.job_details) : doc.job_details)
        : {};

      // Set recipient - only use DB email if not provided by caller
      if (!emailTo) {
        emailTo = (clientData?.email || '').trim();
        if (!emailTo) {
          throw new ValidationError('Client email not found in document');
        }
      }

      // Generate subject and body based on document type
      const companyName = company?.company_name || 'ElecMate Professional';
      const companyPhone = company?.company_phone || '';
      const companyEmail = company?.company_email || config.email_address;
      
      if (docType === 'quote') {
        const validityDate = doc.expiry_date 
          ? new Date(doc.expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

        const quoteDate = doc.created_at 
          ? new Date(doc.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
          : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

        // Build Accept/Decline URLs
        const baseUrl = 'https://jtwygbeceundfgnkirof.supabase.co';
        const acceptUrl = publicToken 
          ? `${baseUrl}/functions/v1/quote-action?token=${publicToken}&action=accept`
          : '#';
        const rejectUrl = publicToken 
          ? `${baseUrl}/functions/v1/quote-action?token=${publicToken}&action=reject`
          : '#';

        emailSubject = `Quote ${doc.quote_number} from ${companyName}`;
        emailBody = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Quote from ${companyName}</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 680px; width: 100%; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 48px 48px; text-align: center; border-bottom: 1px solid #e5e7eb;">
                        ${company?.logo_url 
                          ? `<img src="${company.logo_url}" alt="${companyName}" style="max-width: 200px; height: auto; margin-bottom: 32px; display: block; margin-left: auto; margin-right: auto;">` 
                          : `<div style="font-size: 32px; font-weight: 700; color: #0f172a; margin-bottom: 32px; letter-spacing: -0.8px;">${companyName}</div>`
                        }
                        
                        <!-- Blue-accented quote number badge -->
                        <div style="display: inline-block; background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%); padding: 16px 40px; border-radius: 10px; border: 2px solid #3b82f6; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);">
                          <div style="font-size: 11px; color: #1e40af; font-weight: 600; letter-spacing: 1.2px; margin-bottom: 6px; text-transform: uppercase;">Quotation</div>
                          <div style="font-size: 30px; font-weight: 800; color: #1e40af; letter-spacing: -0.5px;">#${doc.quote_number}</div>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Main content -->
                    <tr>
                      <td style="padding: 48px 48px 32px 48px;">
                        <h1 style="margin: 0 0 32px 0; font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -0.6px; line-height: 1.2;">Your Quotation</h1>
                        
                        <p style="margin: 0 0 12px 0; font-size: 16px; color: #0f172a; line-height: 1.6;">Dear <strong style="font-weight: 600;">${clientData?.name || 'Valued Client'}</strong>,</p>
                        
                        <p style="margin: 0 0 32px 0; font-size: 15px; color: #475569; line-height: 1.8;">Thank you for your enquiry. Please find below our detailed quotation for <strong style="color: #0f172a; font-weight: 600;">${jobDetails?.title || jobDetails?.description || 'your electrical project'}</strong>. A comprehensive PDF breakdown is attached to this email.</p>
                      </td>
                    </tr>
                    
                    <!-- Quote details card -->
                    <tr>
                      <td style="padding: 0 48px 32px 48px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 2px solid #e2e8f0; border-left: 4px solid #3b82f6; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);">
                          <tr>
                            <td style="padding: 32px 36px 24px 36px;">
                              
                              <!-- Quote metadata -->
                              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                  <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                                    <table role="presentation" style="width: 100%;">
                                      <tr>
                                        <td style="font-size: 14px; color: #64748b; font-weight: 600;">Quote Reference</td>
                                        <td style="font-size: 16px; color: #0f172a; font-weight: 700; text-align: right; letter-spacing: -0.2px;">${doc.quote_number}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                                    <table role="presentation" style="width: 100%;">
                                      <tr>
                                        <td style="font-size: 14px; color: #64748b; font-weight: 600;">Issue Date</td>
                                        <td style="font-size: 16px; color: #0f172a; font-weight: 600; text-align: right;">${quoteDate}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 16px 0; border-bottom: 2px solid #f1f5f9;">
                                    <table role="presentation" style="width: 100%;">
                                      <tr>
                                        <td style="font-size: 14px; color: #64748b; font-weight: 600;">Valid Until</td>
                                        <td style="font-size: 16px; color: #dc2626; font-weight: 700; text-align: right;">${validityDate}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              
                              <!-- Total amount with blue gradient -->
                              <div style="margin-top: 24px; padding: 32px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; text-align: center; border: 2px solid #3b82f6; box-shadow: 0 2px 12px rgba(59, 130, 246, 0.12);">
                                <div style="font-size: 13px; color: #1e40af; font-weight: 700; letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase;">Total Amount</div>
                                <div style="font-size: 48px; font-weight: 800; color: #0f172a; letter-spacing: -1.5px; line-height: 1;">£${(doc.total || 0).toFixed(2)}</div>
                                <div style="font-size: 13px; color: #1e40af; margin-top: 10px; font-weight: 600;">Including VAT where applicable</div>
                              </div>
                              
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Call to action buttons -->
                    <tr>
                      <td style="padding: 0 48px 32px 48px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 0 0 12px 0;">
                              <a href="${acceptUrl}" style="display: block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-align: center; padding: 20px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 17px; letter-spacing: 0.3px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);">
                                ✓ Accept This Quote
                              </a>
                              <div style="text-align: center; font-size: 13px; color: #64748b; margin-top: 10px; font-weight: 500;">One-click approval • No forms required</div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0;">
                              <a href="${rejectUrl}" style="display: block; background-color: transparent; color: #64748b; text-align: center; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; border: 1px solid #cbd5e1;">
                                Not suitable at this time
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    ${!publicToken ? `
                    <!-- Fallback Warning -->
                    <tr>
                      <td style="padding: 0 48px 24px 48px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(to right, #fef3c7 0%, #fde68a 100%); border-radius: 10px; border: 2px solid #f59e0b; overflow: hidden;">
                          <tr>
                            <td style="padding: 20px 24px;">
                              <div style="font-size: 14px; color: #92400e; line-height: 1.6;">
                                <strong style="font-size: 15px; display: block; margin-bottom: 6px;">⚠️ Alternative Response Method</strong>
                                The quick-response buttons above are temporarily unavailable. Please reply to this email directly to confirm your acceptance or send us a message to discuss the quote.
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    ` : ''}
                    
                    <!-- Blue-tinted PDF attachment notice -->
                    <tr>
                      <td style="padding: 0 48px 32px 48px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%); border-radius: 10px; border: 2px solid #3b82f6; overflow: hidden; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);">
                          <tr>
                            <td style="padding: 24px 28px;">
                              <table role="presentation" style="width: 100%;">
                                <tr>
                                  <td style="width: 56px; padding-right: 20px; vertical-align: top;">
                                    <div style="width: 52px; height: 52px; background-color: #dbeafe; border-radius: 10px; text-align: center; line-height: 52px; border: 2px solid #3b82f6;">
                                      <span style="font-size: 26px;">📄</span>
                                    </div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <div style="font-size: 16px; color: #1e40af; font-weight: 700; margin-bottom: 6px; letter-spacing: -0.2px;">Detailed Quotation Attached</div>
                                    <div style="font-size: 14px; color: #64748b; line-height: 1.7; font-weight: 500;">A comprehensive PDF breakdown including all labour, materials, and terms is attached to this email for your records.</div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Closing message and contact -->
                    <tr>
                      <td style="padding: 0 48px 40px 48px;">
                        <p style="margin: 0 0 28px 0; font-size: 15px; color: #475569; line-height: 1.8;">Should you have any questions or wish to discuss this quotation further, please don't hesitate to contact us directly. We're here to help.</p>
                        
                        <!-- Contact information card with blue accent -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(to bottom, #eff6ff 0%, #f8fafc 100%); border: 2px solid #93c5fd; border-radius: 10px;">
                          <tr>
                            <td style="padding: 28px;">
                              <div style="font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 16px; letter-spacing: -0.3px;">Contact Information</div>
                              
                              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                ${companyPhone ? `
                                <tr>
                                  <td style="padding: 8px 0;">
                                    <div style="font-size: 14px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Phone</div>
                                    <a href="tel:${companyPhone}" style="font-size: 16px; color: #0f172a; text-decoration: none; font-weight: 600;">${companyPhone}</a>
                                  </td>
                                </tr>
                                ` : ''}
                                ${companyEmail ? `
                                <tr>
                                  <td style="padding: 8px 0;">
                                    <div style="font-size: 14px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Email</div>
                                    <a href="mailto:${companyEmail}" style="font-size: 16px; color: #0f172a; text-decoration: none; font-weight: 600;">${companyEmail}</a>
                                  </td>
                                </tr>
                                ` : ''}
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 28px 0 0 0; font-size: 15px; color: #0f172a; line-height: 1.6;">
                          Kind regards,<br>
                          <strong style="font-size: 18px; font-weight: 700; letter-spacing: -0.3px;">${companyName}</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background: linear-gradient(to bottom, #fafafa 0%, #f5f5f5 100%); padding: 28px 40px; border-top: 2px solid #e5e7eb; text-align: center;">
                        
                        <!-- Quote validity reminder -->
                        <div style="font-size: 13px; color: #64748b; line-height: 1.7; margin-bottom: 12px;">
                          <strong style="color: #0f172a;">Quote Validity:</strong> This quotation is valid until <strong style="color: #0f172a;">${validityDate}</strong>
                        </div>
                        
                        <!-- Legal disclaimer -->
                        <div style="font-size: 12px; color: #94a3b8; line-height: 1.7; margin-bottom: 16px;">
                          This quotation is subject to our terms and conditions. All electrical work will be carried out to current UK wiring regulations (BS7671:2018+A2:2022). VAT registration details available upon request.
                        </div>
                        
                        <!-- Minimal powered by -->
                        <div style="padding-top: 16px; border-top: 1px solid #e5e7eb;">
                          <div style="font-size: 11px; color: #94a3b8;">
                            Powered by ElecMate
                          </div>
                        </div>
                        
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `;
      } else {
        // Set PDF filename based on document type
        pdfFilename = `Invoice_${doc.invoice_number || doc.quote_number}.pdf`;
        
        emailSubject = `Invoice ${doc.invoice_number || doc.quote_number} - Payment Due from ${companyName}`;
        emailBody = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice ${doc.invoice_number || doc.quote_number}</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <!-- Main Container -->
                  <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #1e3a8a; padding: 40px 30px; text-align: center;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="text-align: center;">
                              ${company?.logo_url ? `<img src="${company.logo_url}" alt="${companyName}" style="max-width: 120px; height: auto; margin-bottom: 20px;">` : `<div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">${companyName}</div>`}
                              <div style="font-size: 14px; color: rgba(255, 255, 255, 0.8); margin-bottom: 20px;">Professional Electrical Services</div>
                              <div style="display: inline-block; background-color: #dc2626; color: #ffffff; padding: 8px 20px; border-radius: 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 8px;">INVOICE</div>
                              <div style="font-size: 24px; font-weight: 700; color: #ffffff; margin-top: 8px;">#${doc.invoice_number || doc.quote_number}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Amount Due - Prominent -->
                    <tr>
                      <td style="padding: 0;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
                          <tr>
                            <td style="padding: 30px; text-align: center;">
                              <div style="font-size: 14px; color: rgba(255, 255, 255, 0.9); font-weight: 500; letter-spacing: 1px; margin-bottom: 8px;">AMOUNT DUE</div>
                              <div style="font-size: 48px; font-weight: 700; color: #ffffff; line-height: 1;">£${(doc.total || 0).toFixed(2)}</div>
                              ${doc.invoice_due_date ? `
                                <div style="margin-top: 12px; padding: 8px 16px; background-color: rgba(255, 255, 255, 0.2); border-radius: 20px; display: inline-block; font-size: 13px; color: #ffffff;">
                                  ⏰ Payment Due: ${new Date(doc.invoice_due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                              ` : ''}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px 0; font-size: 16px; color: #1f2937; line-height: 1.6;">Dear <strong>${clientData?.name || 'Valued Client'}</strong>,</p>
                        <p style="margin: 0 0 30px 0; font-size: 15px; color: #4b5563; line-height: 1.6;">Thank you for your business. Please find attached your invoice for the completed electrical work. Payment is kindly requested by the due date shown above.</p>

                        <!-- Invoice Details Card -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 24px;">
                              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                      <tr>
                                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">📄 Invoice Number</td>
                                        <td style="font-size: 14px; color: #1f2937; font-weight: 600; text-align: right;">${doc.invoice_number || doc.quote_number}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                      <tr>
                                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">📅 Invoice Date</td>
                                        <td style="font-size: 14px; color: #1f2937; font-weight: 600; text-align: right;">${doc.invoice_date ? new Date(doc.invoice_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                ${doc.invoice_due_date ? `
                                <tr>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                      <tr>
                                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">⏰ Due Date</td>
                                        <td style="font-size: 14px; color: #dc2626; font-weight: 700; text-align: right;">${new Date(doc.invoice_due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                ` : ''}
                                ${doc.work_completion_date ? `
                                <tr>
                                  <td style="padding: 10px 0;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                      <tr>
                                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">✅ Work Completed</td>
                                        <td style="font-size: 14px; color: #1f2937; font-weight: 600; text-align: right;">${new Date(doc.work_completion_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                ` : ''}
                              </table>
                            </td>
                          </tr>
                        </table>

                        ${doc.settings?.paymentTerms || company?.payment_terms ? `
                        <!-- Payment Terms -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 20px;">
                              <div style="font-size: 14px; color: #92400e; font-weight: 700; margin-bottom: 8px;">💳 PAYMENT TERMS</div>
                              <div style="font-size: 14px; color: #78350f; line-height: 1.6;">${doc.settings?.paymentTerms || company?.payment_terms}</div>
                            </td>
                          </tr>
                        </table>
                        ` : ''}

                        ${doc.invoice_notes ? `
                        <!-- Invoice Notes -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 6px; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 20px;">
                              <div style="font-size: 14px; color: #1e40af; font-weight: 700; margin-bottom: 8px;">📝 ADDITIONAL NOTES</div>
                              <div style="font-size: 14px; color: #1e3a8a; line-height: 1.6;">${doc.invoice_notes}</div>
                            </td>
                          </tr>
                        </table>
                        ` : ''}

                        <!-- PDF Attachment Notice -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f0fdf4; border: 2px dashed #10b981; border-radius: 8px; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 20px; text-align: center;">
                              <div style="font-size: 16px; color: #065f46; font-weight: 600; margin-bottom: 4px;">📎 Invoice_${doc.invoice_number || doc.quote_number}.pdf</div>
                              <div style="font-size: 13px; color: #047857;">Complete invoice details attached as PDF</div>
                            </td>
                          </tr>
                        </table>

                        <p style="margin: 0 0 20px 0; font-size: 14px; color: #4b5563; line-height: 1.6;">If you have any questions regarding this invoice or need to discuss payment arrangements, please don't hesitate to contact us.</p>

                        <p style="margin: 0; font-size: 15px; color: #1f2937; line-height: 1.6;">
                          Best regards,<br>
                          <strong style="font-size: 16px;">${companyName}</strong><br>
                          ${companyPhone ? `<span style="color: #6b7280;">📞 ${companyPhone}</span><br>` : ''}
                          ${companyEmail ? `<span style="color: #6b7280;">✉️ ${companyEmail}</span>` : ''}
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 24px 30px; border-top: 1px solid #e5e7eb;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="text-align: center;">
                              <div style="font-size: 13px; color: #6b7280; margin-bottom: 8px;">⚡ Invoice generated by ElecMate Professional Suite</div>
                              <div style="font-size: 11px; color: #9ca3af;">This is an official invoice. Please retain for your records.</div>
                            </td>
                          </tr>
                        </table>
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

      // PDF is now generated and attached automatically
    }

    if (!emailTo || !emailSubject || !emailBody) {
      throw new ValidationError('Email details incomplete');
    }

    // Normalize email - extract from "Name <email@domain>" format if needed
    emailTo = emailTo.trim();
    const emailMatch = emailTo.match(/<(.+?)>/);
    if (emailMatch) {
      emailTo = emailMatch[1].trim();
    }

    if (!isValidEmail(emailTo)) {
      throw new ValidationError(`Invalid email address: ${emailTo || 'empty'}`);
    }

    // Check rate limit
    const now = new Date();
    const resetAt = new Date(config.rate_limit_reset_at || now);

    if (now >= resetAt) {
      // Reset daily counter
      await supabase
        .from('user_email_configs')
        .update({
          daily_sent_count: 0,
          rate_limit_reset_at: new Date(now.setHours(24, 0, 0, 0)).toISOString(),
        })
        .eq('id', config.id);
      
      config.daily_sent_count = 0;
    }

    if (config.daily_sent_count >= DAILY_RATE_LIMIT) {
      throw new RateLimitError(`Daily email limit reached (${DAILY_RATE_LIMIT}/day). Resets at midnight UTC.`);
    }

    // Check if token needs refresh (within 5 minutes of expiry)
    const tokenExpiresAt = new Date(config.token_expires_at);
    const needsRefresh = tokenExpiresAt.getTime() - Date.now() < 5 * 60 * 1000;

    if (needsRefresh) {
      console.log('🔄 Token expiring soon, refreshing...');
      
      const refreshResponse = await supabase.functions.invoke('refresh-email-token', {
        body: { configId: config.id },
      });

      if (refreshResponse.error) {
        throw new ValidationError('Failed to refresh token. Please reconnect your email account.');
      }

      // Refetch updated config
      const { data: updatedConfig } = await supabase
        .from('user_email_configs')
        .select('*')
        .eq('id', config.id)
        .single();

      if (updatedConfig) {
        config.encrypted_access_token = updatedConfig.encrypted_access_token;
      }
    }

    // Decrypt access token
    const accessToken = await decryptToken(config.encrypted_access_token!);

    // Send email based on provider
    if (config.email_provider === 'gmail') {
      await withRetry(
        () => withTimeout(
          sendGmailEmail(accessToken, emailTo, emailSubject, emailBody, pdfAttachment, pdfFilename),
          Timeouts.STANDARD,
          'Gmail send'
        ),
        RetryPresets.STANDARD
      );
    } else {
      await withRetry(
        () => withTimeout(
          sendOutlookEmail(accessToken, emailTo, emailSubject, emailBody, pdfAttachment, pdfFilename),
          Timeouts.STANDARD,
          'Outlook send'
        ),
        RetryPresets.STANDARD
      );
    }

    // Update counters
    await supabase
      .from('user_email_configs')
      .update({
        daily_sent_count: (config.daily_sent_count || 0) + 1,
        total_sent_count: (config.total_sent_count || 0) + 1,
        last_sent_at: new Date().toISOString(),
      })
      .eq('id', config.id);

    console.log(`✅ Email sent successfully`, {
      user_id: user.id,
      provider: config.email_provider,
      type: type,
      to: emailTo,
      count: config.daily_sent_count + 1,
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        dailyCount: config.daily_sent_count + 1,
        dailyLimit: DAILY_RATE_LIMIT,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});

async function sendGmailEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
) {
  const email = createRFC822Email(to, subject, body, attachmentBase64, attachmentFilename);
  
  // UTF-8 safe base64url encoding
  const bytes = new TextEncoder().encode(email);
  const base64 = encodeBase64(bytes);
  const base64Email = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: base64Email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ExternalAPIError('Gmail', error);
  }

  return await response.json();
}

async function sendOutlookEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
) {
  const message: any = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: body,
      },
      toRecipients: [{ emailAddress: { address: to } }],
    },
  };

  if (attachmentBase64 && attachmentFilename) {
    message.message.attachments = [{
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: attachmentFilename,
      contentBytes: attachmentBase64,
    }];
  }

  const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ExternalAPIError('Outlook', error);
  }
}

function createRFC822Email(
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
): string {
  const boundary = '----=_Part_' + Date.now();
  
  let email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
  ];

  if (attachmentBase64 && attachmentFilename) {
    email.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
    email.push('');
    email.push(`--${boundary}`);
    email.push('Content-Type: text/html; charset=UTF-8');
    email.push('');
    email.push(body);
    email.push('');
    email.push(`--${boundary}`);
    email.push(`Content-Type: application/pdf; name="${attachmentFilename}"`);
    email.push('Content-Transfer-Encoding: base64');
    email.push(`Content-Disposition: attachment; filename="${attachmentFilename}"`);
    email.push('');
    email.push(attachmentBase64);
    email.push(`--${boundary}--`);
  } else {
    email.push('Content-Type: text/html; charset=UTF-8');
    email.push('');
    email.push(body);
  }

  return email.join('\r\n');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
