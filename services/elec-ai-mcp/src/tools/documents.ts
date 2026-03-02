/**
 * Document tools — generate_shareable_link
 * Maps to: Supabase storage signed URLs via edge function
 */

import type { UserContext } from '../auth.js';
import { callEdgeFunction } from '../lib/edge-function.js';

export async function generateShareableLink(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.document_id !== 'string') {
    throw new Error('document_id is required');
  }
  if (
    args.document_type !== 'certificate' &&
    args.document_type !== 'quote' &&
    args.document_type !== 'invoice'
  ) {
    throw new Error('document_type must be "certificate", "quote", or "invoice"');
  }

  const result = await callEdgeFunction('generate-temporary-pdf-link', user.jwt, {
    document_id: args.document_id,
    document_type: args.document_type,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
