/**
 * Automation tools — proactive business intelligence
 * send_payment_reminder, get_job_weather, suggest_upsell, transcribe_voice_note, delete_client
 */

import type { UserContext } from '../auth.js';

/**
 * Send a pre-due payment reminder (friendly, before overdue).
 * Different tone from invoice chasing — this is a courtesy heads-up.
 */
export async function sendPaymentReminder(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const invoiceId = args.invoice_id as string;

  if (!invoiceId) return { error: 'invoice_id is required' };

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('id, client_data, total, invoice_number, due_date, status, payment_link')
    .eq('id', invoiceId)
    .single();

  if (error || !invoice) return { error: 'Invoice not found' };
  if (invoice.status === 'paid') return { error: 'Invoice already paid' };

  const clientName = (invoice.client_data as Record<string, unknown>)?.name || 'there';
  const dueDate = invoice.due_date ? new Date(invoice.due_date as string).toLocaleDateString('en-GB') : 'soon';
  const payLink = invoice.payment_link || '';

  const draft = `Hi ${clientName}, just a friendly reminder that invoice ${invoice.invoice_number} for £${Number(invoice.total).toFixed(2)} is due on ${dueDate}.${payLink ? ` You can pay here: ${payLink}` : ''} Thanks!`;

  return {
    success: true,
    draft_message: draft,
    invoice_number: invoice.invoice_number,
    amount: invoice.total,
    due_date: invoice.due_date,
    client_name: clientName,
    note: 'This is a pre-due reminder (courtesy). Approve before sending.',
  };
}

/**
 * Get weather forecast for a job location on a specific date.
 * Uses Google Weather API via the existing getWeather function.
 */
export async function getJobWeather(args: Record<string, unknown>, user: UserContext) {
  const postcode = args.postcode as string;
  const date = args.date as string;

  if (!postcode) return { error: 'postcode is required' };

  // Use wttr.in — free, no API key, reliable
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(postcode)}?format=j1`);
    if (!res.ok) return { error: 'Weather lookup failed' };
    const data = (await res.json()) as Record<string, any>;
    const current = data.current_condition?.[0];
    const forecast = data.weather?.[0];

    return {
      success: true,
      postcode,
      date: date || 'today',
      weather: {
        temperature: `${current?.temp_C || '?'}°C`,
        feels_like: `${current?.FeelsLikeC || '?'}°C`,
        description: current?.weatherDesc?.[0]?.value || 'Unknown',
        rain_chance: `${forecast?.hourly?.[4]?.chanceofrain || '?'}%`,
        wind: `${current?.windspeedMiles || '?'}mph ${current?.winddir16Point || ''}`,
        sunrise: forecast?.astronomy?.[0]?.sunrise || '',
        sunset: forecast?.astronomy?.[0]?.sunset || '',
      },
    };
  } catch {
    return { error: 'Weather service unavailable' };
  }
}

/**
 * Analyse a client's history and suggest upsell opportunities.
 * Looks for: repeat cert renewals, missing services, annual contract potential.
 */
export async function suggestUpsell(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const clientId = args.client_id as string;

  if (!clientId) return { error: 'client_id is required' };

  // Get client details
  const { data: client } = await supabase
    .from('customers')
    .select('id, name, email, phone')
    .eq('id', clientId)
    .single();

  if (!client) return { error: 'Client not found' };

  // Get their certificates (last 24 months)
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  const { data: certs } = await supabase
    .from('reports')
    .select('id, report_type, status, created_at')
    .eq('client_name', client.name)
    .gte('created_at', twoYearsAgo.toISOString());

  // Get their invoices
  const { data: invoices } = await supabase
    .from('invoices')
    .select('id, total, status, created_at')
    .eq('client_data->>name', client.name)
    .gte('created_at', twoYearsAgo.toISOString());

  const certCount = certs?.length || 0;
  const invoiceTotal = invoices?.reduce((sum, inv) => sum + Number(inv.total || 0), 0) || 0;
  const certTypes = [...new Set(certs?.map((c) => c.report_type) || [])];

  const suggestions: { type: string; message: string; potential_value: string }[] = [];

  // 3+ certs = annual contract candidate
  if (certCount >= 3) {
    suggestions.push({
      type: 'annual_contract',
      message: `${client.name} has had ${certCount} certificates in 2 years. Offer an annual maintenance contract at a 15% discount vs one-offs.`,
      potential_value: `£${Math.round(invoiceTotal * 0.85)} annual contract`,
    });
  }

  // Has EICR but no PAT
  if (certTypes.includes('eicr') && !certTypes.includes('pat-testing')) {
    suggestions.push({
      type: 'cross_sell',
      message: `${client.name} has an EICR but no PAT testing on record. Offer a bundled PAT test.`,
      potential_value: '£150-250 per visit',
    });
  }

  // Has domestic work but no EV charger
  if (certTypes.some((t) => ['eicr', 'eic', 'minor-works'].includes(t)) && !certTypes.includes('ev-charging')) {
    suggestions.push({
      type: 'ev_upsell',
      message: `${client.name} is a domestic client. Ask if they're considering an EV charger — high-margin work.`,
      potential_value: '£800-1500 per install',
    });
  }

  // Has fire alarm but no emergency lighting
  if (certTypes.includes('fire-alarm') && !certTypes.includes('emergency-lighting')) {
    suggestions.push({
      type: 'compliance_upsell',
      message: `${client.name} has fire alarm certification but no emergency lighting on record. These usually go together for compliance.`,
      potential_value: '£300-600 per install',
    });
  }

  // Good client, no referral asked
  if (invoiceTotal > 1000) {
    suggestions.push({
      type: 'referral',
      message: `${client.name} has spent £${Math.round(invoiceTotal)} with you. Ask for a referral or Google review.`,
      potential_value: 'Referral = new client',
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      type: 'maintain_relationship',
      message: `No specific upsell for ${client.name} right now. Send a seasonal check-in to stay top of mind.`,
      potential_value: 'Relationship maintenance',
    });
  }

  return {
    success: true,
    client_name: client.name,
    cert_count: certCount,
    total_spend: `£${Math.round(invoiceTotal)}`,
    cert_types: certTypes,
    suggestions,
  };
}

/**
 * Transcribe a voice note using OpenAI Whisper API directly.
 */
export async function transcribeVoiceNote(args: Record<string, unknown>, _user: UserContext) {
  const audioUrl = args.audio_url as string;
  const audioBase64 = args.audio_base64 as string;

  if (!audioUrl && !audioBase64) return { error: 'audio_url or audio_base64 is required' };

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) return { error: 'OpenAI API key not configured for voice transcription' };

  try {
    let audioBlob: Blob;

    if (audioUrl) {
      const res = await fetch(audioUrl);
      if (!res.ok) return { error: 'Failed to download audio' };
      audioBlob = await res.blob();
    } else {
      const raw = audioBase64.replace(/^data:audio\/\w+;base64,/, '');
      const buffer = Buffer.from(raw, 'base64');
      audioBlob = new Blob([buffer], { type: 'audio/ogg' });
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'voice.ogg');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${openaiKey}` },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.text();
      return { error: `Whisper API error: ${res.status} - ${err}` };
    }

    const data = await res.json() as { text: string };
    return {
      success: true,
      transcript: data.text || '',
      language: 'en',
    };
  } catch {
    return { error: 'Voice transcription failed. Try sending a text message instead.' };
  }
}

/**
 * Delete a customer and optionally their associated data.
 */
export async function deleteClient(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const clientId = args.client_id as string;
  const confirmName = args.confirm_name as string;

  if (!clientId) return { error: 'client_id is required' };
  if (!confirmName) return { error: 'confirm_name is required — type the client name to confirm deletion' };

  // Verify client exists and name matches
  const { data: client } = await supabase
    .from('customers')
    .select('id, name')
    .eq('id', clientId)
    .single();

  if (!client) return { error: 'Client not found' };
  if (client.name.toLowerCase() !== confirmName.toLowerCase()) {
    return { error: `Name mismatch. You said "${confirmName}" but client is "${client.name}". Type the exact name to confirm.` };
  }

  // Check for linked records
  const { count: quoteCount } = await supabase
    .from('quotes')
    .select('id', { count: 'exact', head: true })
    .eq('client_data->>name', client.name);

  const { count: invoiceCount } = await supabase
    .from('invoices')
    .select('id', { count: 'exact', head: true })
    .eq('client_data->>name', client.name);

  if ((quoteCount || 0) > 0 || (invoiceCount || 0) > 0) {
    return {
      warning: `${client.name} has ${quoteCount || 0} quotes and ${invoiceCount || 0} invoices. These will NOT be deleted — only the customer record. Proceed?`,
      client_id: clientId,
      client_name: client.name,
      needs_final_confirm: true,
    };
  }

  // Delete
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', clientId);

  if (error) return { error: `Failed to delete: ${error.message}` };

  return {
    success: true,
    deleted: client.name,
    message: `${client.name} has been deleted from your customer list.`,
  };
}
