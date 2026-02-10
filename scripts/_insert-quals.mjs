/**
 * Inserts qualification data via the insert-qualification-data edge function.
 * Uses service role key (available in edge function) to bypass RLS.
 * Reads from /tmp/qual-data.json (parsed by ingest-qualification-pdfs.ts)
 */
import fs from 'fs';

const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

const QUAL_CODES = ['5357', '2357', '2346-03', '8202', '610/3907/X'];

async function callEdgeFunction(body) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/insert-qualification-data`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`Edge function error: ${data.error || res.statusText}`);
  }
  return data;
}

async function main() {
  // Read parsed data
  const rows = JSON.parse(fs.readFileSync('/tmp/qual-data.json', 'utf8'));
  console.log(`Loaded ${rows.length} rows from /tmp/qual-data.json`);

  // Delete existing data for these qualification codes
  for (const code of QUAL_CODES) {
    console.log(`Deleting existing ${code} data...`);
    try {
      const result = await callEdgeFunction({ action: 'delete', qualification_code: code });
      console.log(`  Deleted ${code}: OK`);
    } catch (err) {
      console.error(`  Error deleting ${code}:`, err.message);
    }
  }

  // Group by qualification code
  const byQual = {};
  for (const row of rows) {
    if (!byQual[row.qualification_code]) byQual[row.qualification_code] = [];
    byQual[row.qualification_code].push(row);
  }

  // Insert in batches of 50
  for (const [qualCode, qualRows] of Object.entries(byQual)) {
    console.log(`\nInserting ${qualRows.length} rows for ${qualCode}...`);
    let inserted = 0;

    for (let i = 0; i < qualRows.length; i += 50) {
      const batch = qualRows.slice(i, i + 50);
      try {
        await callEdgeFunction({ action: 'insert', rows: batch });
        inserted += batch.length;
        process.stdout.write(`  Batch ${Math.floor(i / 50) + 1}: ${inserted}/${qualRows.length}\r`);
      } catch (err) {
        console.error(`\n  Error inserting batch ${Math.floor(i / 50) + 1}:`, err.message);
      }
    }
    console.log(`  Inserted ${inserted}/${qualRows.length} rows`);
  }

  // Verify
  console.log('\n=== Verification ===');
  for (const code of QUAL_CODES) {
    try {
      const result = await callEdgeFunction({ action: 'count', qualification_code: code });
      console.log(`  ${code}: ${result.count} rows`);
    } catch (err) {
      console.error(`  Error counting ${code}:`, err.message);
    }
  }
}

main().catch(console.error);
