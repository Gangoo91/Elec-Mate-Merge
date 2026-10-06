-- ELE-1949 part 3: /briefing-sign/:token let anyone with the link sign as any
-- named team member (and since this morning's roster match, that signature was
-- linked to the member's record). Also the link's expires_at was read but never
-- enforced.
-- Now (employer briefings):
--   * a team member who has an Elec-Mate account must be signed in AS THEMSELVES
--     to sign under their name — otherwise error code 'sign_in_required';
--   * team members without an account, and guests, can still sign by link;
--   * expired links are refused.
-- The electrician-side team_briefings branch is unchanged except for expiry.
CREATE OR REPLACE FUNCTION public.sign_briefing_by_token(token_param text, signer_name text, signature_data text, signer_company text DEFAULT NULL::text, client_ip text DEFAULT NULL::text, client_user_agent text DEFAULT NULL::text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_briefing_id UUID;
  v_is_active BOOLEAN;
  v_expires_at TIMESTAMPTZ;
  v_current_signatures JSONB;
  v_new_signature JSONB;
  v_matched_attendee UUID;
  v_matched_user UUID;
  v_roster_employee UUID;
  v_roster_user UUID;
BEGIN
  SELECT bt.briefing_id, bt.is_active, bt.expires_at
  INTO v_briefing_id, v_is_active, v_expires_at
  FROM briefing_signing_tokens bt
  WHERE bt.public_token = token_param;

  IF v_briefing_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Invalid or expired signing link');
  END IF;

  IF NOT v_is_active THEN
    RETURN json_build_object('success', false, 'error', 'This signing link has been deactivated');
  END IF;

  IF v_expires_at IS NOT NULL AND v_expires_at < now() THEN
    RETURN json_build_object('success', false, 'error', 'This signing link has expired. Ask for a new one.');
  END IF;

  IF coalesce(trim(signer_name), '') = '' OR coalesce(signature_data, '') = '' THEN
    RETURN json_build_object('success', false, 'error', 'Name and signature are required');
  END IF;

  -- Team briefing store (electrician side) — unchanged.
  IF EXISTS (SELECT 1 FROM team_briefings WHERE id = v_briefing_id) THEN
    -- Site Safety session, 6 Oct: a cancelled briefing can no longer be signed.
    IF EXISTS (SELECT 1 FROM team_briefings WHERE id = v_briefing_id AND status = 'cancelled') THEN
      RETURN json_build_object('success', false, 'error', 'This briefing was cancelled, so it can no longer be signed.');
    END IF;

    SELECT COALESCE(tb.attendee_signatures, '[]'::jsonb)
    INTO v_current_signatures
    FROM team_briefings tb
    WHERE tb.id = v_briefing_id;

    v_new_signature := jsonb_build_object(
      'name', signer_name,
      'signature', signature_data,
      'company', signer_company,
      'signed_at', now()::text,
      'ip_address', client_ip,
      'user_agent', client_user_agent,
      'signed_via', 'remote_link'
    );

    UPDATE team_briefings
    SET attendee_signatures = v_current_signatures || jsonb_build_array(v_new_signature),
        updated_at = now()
    WHERE id = v_briefing_id;

    UPDATE team_briefings
    SET attendees = (
      SELECT jsonb_agg(
        CASE
          WHEN (elem->>'name') = signer_name AND (elem->>'signature') IS NULL
          THEN elem || jsonb_build_object('signature', signature_data, 'timestamp', now()::text)
          ELSE elem
        END
      )
      FROM jsonb_array_elements(attendees) elem
    )
    WHERE id = v_briefing_id
      AND attendees IS NOT NULL
      AND jsonb_typeof(attendees) = 'array';

    RETURN json_build_object(
      'success', true,
      'message', 'Signature recorded successfully',
      'signer_name', signer_name,
      'signed_at', now()::text
    );
  END IF;

  -- Employer briefing store
  IF EXISTS (SELECT 1 FROM briefings WHERE id = v_briefing_id) THEN
    -- 1. A pre-added attendee who hasn't signed yet, matched by roster name.
    SELECT ba.id, ee.user_id INTO v_matched_attendee, v_matched_user
    FROM briefing_attendees ba
    JOIN employer_employees ee ON ee.id = ba.employee_id
    WHERE ba.briefing_id = v_briefing_id
      AND ba.signature_url IS NULL
      AND lower(trim(ee.name)) = lower(trim(signer_name))
    LIMIT 1;

    IF v_matched_attendee IS NOT NULL THEN
      IF v_matched_user IS NOT NULL AND v_matched_user IS DISTINCT FROM auth.uid() THEN
        RETURN json_build_object('success', false, 'code', 'sign_in_required',
          'error', 'Sign in to Elec-Mate as ' || trim(signer_name) || ' to sign under that name.');
      END IF;
      UPDATE briefing_attendees
      SET signature_url = signature_data,
          acknowledged = true,
          acknowledged_at = now(),
          signed_via = CASE WHEN auth.uid() IS NOT NULL THEN 'remote_link_signed_in' ELSE 'remote_link' END,
          device_info = client_user_agent,
          updated_at = now()
      WHERE id = v_matched_attendee;
    ELSE
      -- 2. Not pre-added, but an ACTIVE member of the briefing owner's roster.
      SELECT ee.id, ee.user_id INTO v_roster_employee, v_roster_user
      FROM briefings b
      JOIN employer_employees ee ON ee.employer_id = b.user_id
      WHERE b.id = v_briefing_id
        AND lower(coalesce(ee.status, '')) = 'active'
        AND lower(trim(ee.name)) = lower(trim(signer_name))
        AND NOT EXISTS (
          SELECT 1 FROM briefing_attendees x
          WHERE x.briefing_id = v_briefing_id AND x.employee_id = ee.id
        )
      ORDER BY ee.created_at
      LIMIT 1;

      IF v_roster_employee IS NOT NULL THEN
        IF v_roster_user IS NOT NULL AND v_roster_user IS DISTINCT FROM auth.uid() THEN
          RETURN json_build_object('success', false, 'code', 'sign_in_required',
            'error', 'Sign in to Elec-Mate as ' || trim(signer_name) || ' to sign under that name.');
        END IF;
        INSERT INTO briefing_attendees (briefing_id, employee_id, signature_url, acknowledged, acknowledged_at, signed_via, device_info)
        VALUES (v_briefing_id, v_roster_employee, signature_data, true, now(),
                CASE WHEN auth.uid() IS NOT NULL THEN 'remote_link_signed_in' ELSE 'remote_link' END,
                client_user_agent);
      ELSE
        -- 3. Genuine guest (subcontractor, visitor).
        INSERT INTO briefing_attendees (briefing_id, guest_name, guest_company, signature_url, acknowledged, acknowledged_at, signed_via, device_info)
        VALUES (v_briefing_id, trim(signer_name), nullif(trim(signer_company), ''), signature_data, true, now(), 'remote_link', client_user_agent);
      END IF;
    END IF;

    RETURN json_build_object(
      'success', true,
      'message', 'Signature recorded successfully',
      'signer_name', signer_name,
      'signed_at', now()::text
    );
  END IF;

  RETURN json_build_object('success', false, 'error', 'Briefing not found');
END;
$function$;
