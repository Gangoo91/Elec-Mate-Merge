import { supabase } from '@/integrations/supabase/client';

/**
 * Save a certificate PDF to permanent Supabase Storage.
 * PDFMonkey URLs expire after 7 days, so we download the PDF and store it permanently.
 *
 * @param pdfUrl - The temporary URL from PDFMonkey
 * @param userId - The authenticated user's ID
 * @param reportId - The report ID for the certificate
 * @param certificateNumber - Optional certificate number for friendlier filenames
 * @returns The permanent public URL and storage path
 */
export async function saveCertificatePdf(
  pdfUrl: string,
  userId: string,
  reportId: string,
  certificateNumber?: string
): Promise<{ permanentUrl: string; storagePath: string }> {
  // Download PDF from temporary PDFMonkey URL
  const response = await fetch(pdfUrl);
  if (!response.ok) {
    throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`);
  }

  const blob = await response.blob();

  // Generate filename - sanitise certificate number for filesystem safety
  const sanitisedCertNumber = certificateNumber
    ? certificateNumber.replace(/[^a-zA-Z0-9-_]/g, '_')
    : reportId;
  const filename = `${sanitisedCertNumber}.pdf`;
  const storagePath = `${userId}/${filename}`;

  // Upload to Supabase Storage with upsert to handle re-generation
  const { error: uploadError } = await supabase.storage
    .from('certificates')
    .upload(storagePath, blob, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) {
    console.error('[certificate-pdf-storage] Upload failed:', uploadError);
    throw new Error(`Failed to upload PDF to storage: ${uploadError.message}`);
  }

  // Get permanent public URL
  const { data: { publicUrl } } = supabase.storage
    .from('certificates')
    .getPublicUrl(storagePath);

  console.log('[certificate-pdf-storage] PDF saved permanently:', { storagePath, publicUrl });

  return { permanentUrl: `${publicUrl}?v=${Date.now()}`, storagePath };
}

/**
 * Get a permanent URL for a stored certificate PDF.
 *
 * @param storagePath - The storage path (e.g., "user_id/cert_number.pdf")
 * @returns The public URL for the PDF
 */
export function getCertificatePdfUrl(storagePath: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from('certificates')
    .getPublicUrl(storagePath);

  return publicUrl;
}

/**
 * Check if a certificate PDF exists in permanent storage.
 *
 * @param userId - The user's ID
 * @param certificateNumber - The certificate number
 * @returns Whether the PDF exists in storage
 */
export async function certificatePdfExists(
  userId: string,
  certificateNumber: string
): Promise<boolean> {
  const sanitisedCertNumber = certificateNumber.replace(/[^a-zA-Z0-9-_]/g, '_');
  const storagePath = `${userId}/${sanitisedCertNumber}.pdf`;

  const { data, error } = await supabase.storage
    .from('certificates')
    .list(userId, {
      search: `${sanitisedCertNumber}.pdf`,
    });

  if (error) {
    console.error('[certificate-pdf-storage] Error checking PDF existence:', error);
    return false;
  }

  return data && data.length > 0;
}

/**
 * Delete a certificate PDF from permanent storage.
 *
 * @param storagePath - The storage path to delete
 * @returns Whether deletion was successful
 */
export async function deleteCertificatePdf(storagePath: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from('certificates')
    .remove([storagePath]);

  if (error) {
    console.error('[certificate-pdf-storage] Error deleting PDF:', error);
    return false;
  }

  return true;
}
