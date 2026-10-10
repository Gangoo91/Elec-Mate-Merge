/**
 * college-ilr-return (ELE-2087): an ILR 2026/27 XML file for a college and a
 * return period, checked against the published 2026/27 XSD and a stated subset
 * of the published validation rules (v4, 10 Sep 2026), with what to fix per
 * learner in plain English.
 *
 * POST { college_id, period: 'R01'..'R14', learner_ids?: uuid[], serial_no?: '01'..'99' }
 * Auth: the caller's JWT. college_ilr_return_rows() checks the 'exports'
 * capability and logs the read in college_data_access_log.
 *
 * We never say the file is "DfE validated": the response says what it was
 * checked against. Submit learner data runs the full rules on upload.
 * Sources and the rule list: supabase/functions/_shared/ilr/2627/README.md
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { periodFor, RETURN_PERIODS } from '../_shared/ilr/2627/codes.ts';
import { toFileModel, toXml, type IlrSource } from '../_shared/ilr/2627/build.ts';
import { runRules } from '../_shared/ilr/2627/rules.ts';
import { explainSchemaError, validateIlrXml } from '../_shared/ilr/2627/validate.ts';
import {
  ILR_2627_RULES_FILE,
  ILR_2627_RULES_SHA256,
  ILR_2627_RULES_VERSION,
  PUBLISHED_RULES,
} from '../_shared/ilr/2627/rules-meta.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  try {
    const auth = req.headers.get('Authorization');
    if (!auth) return json({ error: 'Sign in first.' }, 401);
    const db = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_ANON_KEY') as string,
      {
        global: { headers: { Authorization: auth } },
        auth: { persistSession: false },
      }
    );
    const { data: who } = await db.auth.getUser();
    if (!who?.user) return json({ error: 'Sign in first.' }, 401);

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return json({ error: 'Send JSON.' }, 400);
    }
    const collegeId = String(body.college_id ?? '');
    const code = String(body.period ?? '').toUpperCase();
    const period = periodFor(code);
    const serial = String(body.serial_no ?? '01').trim();
    const ids = Array.isArray(body.learner_ids)
      ? (body.learner_ids as unknown[]).map(String)
      : null;
    if (!UUID.test(collegeId)) return json({ error: 'college_id is required.' }, 400);
    if (!period)
      return json(
        {
          error: `Choose a return period: ${RETURN_PERIODS[0].code} to ${RETURN_PERIODS.at(-1)!.code}.`,
        },
        400
      );
    if (!/^[0-9]{1,2}$/.test(serial))
      return json({ error: 'The serial number is 1 or 2 digits.' }, 400);
    if (ids && (ids.length > 5000 || ids.some((x) => !UUID.test(x))))
      return json({ error: 'learner_ids must be learner ids.' }, 400);

    const { data, error } = await db.rpc('college_ilr_return_rows', {
      p_college: collegeId,
      p_period: period.code,
      p_learners: ids,
    });
    if (error) return json({ error: error.message }, error.code === '42501' ? 403 : 400);
    const src = data as IlrSource;

    const file = toFileModel(src, period, { serialNo: serial });
    const out = toXml(file);
    const schema = validateIlrXml(out.xml);
    const run = runRules(file, { nation: src.college?.nation ?? null });

    const nameOf = new Map(file.learners.map((l) => [l.learnerId, l.name]));
    const schemaErrors = schema.errors.map((e) => {
      const hitL =
        e.line == null
          ? undefined
          : out.learnerLines.find((r) => e.line! >= r.from && e.line! <= r.to);
      return {
        ...e,
        ...explainSchemaError(e.message),
        learner_id: hitL?.learnerId ?? null,
        learner_name: hitL ? (nameOf.get(hitL.learnerId) ?? null) : null,
      };
    });

    const learners = file.learners.map((l) => {
      const mine = run.issues.filter((i) => i.learnerId === l.learnerId);
      return {
        learner_id: l.learnerId,
        name: l.name,
        learn_ref_number: l.LearnRefNumber,
        uln: l.ULN,
        errors: mine.filter((i) => i.severity === 'Error').length,
        warnings: mine.filter((i) => i.severity === 'Warning').length,
        schema_errors: schemaErrors.filter((e) => e.learner_id === l.learnerId).length,
        assumed: l.assumed,
        planned_otj_hours: l.info.plannedOtjHours,
        verified_otj_hours: l.info.verifiedOtjHours,
      };
    });
    const errors = run.issues.filter((i) => i.severity === 'Error').length;
    const warnings = run.issues.filter((i) => i.severity === 'Warning').length;
    const published = PUBLISHED_RULES.filter((r) => r.status !== 'Deleted').length;

    return json({
      period,
      file_name: out.fileName,
      prepared_at: file.preparedAt.toISOString(),
      xml: out.xml,
      schema: { valid: schema.valid, errors: schemaErrors, ...schema.schema },
      rules: {
        version: ILR_2627_RULES_VERSION,
        file: ILR_2627_RULES_FILE,
        sha256: ILR_2627_RULES_SHA256,
        published,
        implemented: run.implemented,
        implemented_count: run.implemented.length,
        elec_mate_checks: run.elecMateChecks,
      },
      issues: run.issues,
      learners,
      out_of_scope: file.outOfScope,
      summary: {
        learners: file.learners.length,
        with_errors: learners.filter((l) => l.errors > 0 || l.schema_errors > 0).length,
        errors,
        warnings,
        schema_valid: schema.valid,
        ready: schema.valid && errors === 0,
      },
      statement: `Checked against the published 2026/27 schema and ${run.implemented.length} validation rules, out of the ${published} in the ILR Validation Rules 2026 to 2027, ${ILR_2627_RULES_VERSION}. This is not a DfE validation: Submit learner data runs every rule when you upload the file.`,
    });
  } catch (e) {
    console.error('college-ilr-return', e);
    return json({ error: (e as Error).message ?? 'Something went wrong.' }, 500);
  }
});
