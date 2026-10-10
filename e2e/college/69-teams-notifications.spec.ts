/**
 * Journey 69 — Microsoft Teams notifications, phase 1 (ELE-2056).
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/69-teams-notifications.spec.ts
 *
 * Nothing here posts to a real Teams channel.
 *  1. The card, on its own: Adaptive Card message shape, deep links into the
 *     hub, message, reply and submission text never posted, names switch, the 28 KB cap,
 *     the host allow-list. Then postCard against a LOCAL receiver on
 *     127.0.0.1: one 429 then 200 is retried and delivered; a 404 gives plain
 *     words that never contain the URL.
 *  2. Server rules, rolled back: a tutor cannot connect, cannot read the table
 *     or the URL function; a non-Teams URL is refused; the saved URL never
 *     comes back in any RPC; it lives in Vault; disconnect deletes it.
 *  3. The deployed college-teams-notify function, with Northgate connected to
 *     a Workflows-shaped URL on a host that does not exist (NXDOMAIN): preview
 *     shows exactly the one new inbox item; a tutor cannot send a test; the
 *     cron dispatch (service role, through pg_net) fails to reach the host,
 *     records plain words with no URL, and marks nothing as posted.
 *  4. UI, desktop 1440 and phone 390: the tutor sees the connected state with
 *     only the host, the preview lines, and no change controls; the page never
 *     holds the URL. The admin sheet (settings RPCs intercepted): a non-Teams
 *     link is flagged, a Workflows link is sent once, and the page shows only
 *     the host afterwards.
 * Every row, posted key and vault secret made here is removed.
 */
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import fs from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import {
  KIND_CATEGORY,
  buildInboxCard,
  buildTestCard,
  lineFor,
  postCard,
  teamsUrlOk,
  type InboxItem,
} from '../../supabase/functions/_shared/teamsCard';
import {
  actor,
  admin as adminOnce,
  adminAvailable,
  haveCreds,
  lit,
  signedInPage,
  SUPABASE_URL,
  NORTHGATE,
} from './support';
import { rolledBack } from './trustSupport';

test.setTimeout(240_000);
test.describe.configure({ mode: 'serial' });

function admin<T = Record<string, unknown>>(q: string): T[] {
  for (let i = 0; ; i++) {
    try {
      return adminOnce<T>(q);
    } catch (e) {
      if (i < 3 && /concurrently updated|login role/i.test(String((e as Error).message))) continue;
      throw e;
    }
  }
}

const OUT = process.env.W3_SHOTS;
async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(500);
  if (OUT) {
    fs.mkdirSync(OUT, { recursive: true });
    await page.screenshot({ path: `${OUT}/${name}-${phone ? 'phone' : 'desk'}.png` });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

const FAKE_SECRET = 'E2ESECRETsig0000';
const FAKE_URL = `https://elecmate-e2e-no-such-host-0000.logic.azure.com:443/workflows/e2e/triggers/manual/paths/invoke?api-version=1&sig=${FAKE_SECRET}`;
const FUNC = `${SUPABASE_URL}/functions/v1/college-teams-notify`;

const item = (over: Partial<InboxItem>): InboxItem => ({
  key: 'hours:1',
  kind: 'hours',
  learner: 'Ryan Hughes (fixture)',
  cohort: 'ELEC-L3-2025',
  title: 'Workshop: consumer units',
  detail: '2h · 07 Oct · off-the-job to verify',
  action: 'Verify',
  href: '/college/otj/inbox?entry=abc',
  urgent: false,
  ...over,
});

test('1. Card shape, privacy, links, and a local receiver', async () => {
  const msg = item({
    key: 'message:1',
    kind: 'message',
    detail: 'PRIVATE words from the learner',
    action: 'Reply',
    href: '/college?section=student360&studentId=s1#messages',
  });
  const ev = item({
    key: 'evidence:1',
    kind: 'evidence',
    detail: 'MY SUBMISSION NOTES',
    action: 'Assess',
  });
  const hrs = item({ urgent: true });
  const card = buildInboxCard([hrs, msg, ev], { collegeName: 'Northgate', includeNames: true }) as {
    type: string;
    attachments: Array<{
      contentType: string;
      content: {
        type: string;
        version: string;
        body: Array<{ text: string }>;
        actions: Array<{ url: string }>;
      };
    }>;
  };
  expect(card.type).toBe('message');
  expect(card.attachments[0].contentType).toBe('application/vnd.microsoft.card.adaptive');
  expect(card.attachments[0].content.type).toBe('AdaptiveCard');
  const text = JSON.stringify(card);
  expect(text).not.toContain('PRIVATE words');
  expect(text).not.toContain('MY SUBMISSION NOTES');
  expect(text).toContain('3 new items in the College Hub inbox');
  expect(text).toContain('1 of them is urgent.');
  expect(text).toContain('(https://app.elec-mate.com/college/otj/inbox?entry=abc)');
  expect(text).toContain(
    'https://app.elec-mate.com/college?section=student360&studentId=s1#messages'
  );
  expect(card.attachments[0].content.actions[0].url).toBe(
    'https://app.elec-mate.com/college/inbox'
  );
  expect(lineFor(hrs, true)).toContain('Ryan H.');
  expect(lineFor(hrs, true)).not.toContain('fixture');
  expect(lineFor(hrs, false)).toContain('A learner');
  expect(lineFor(hrs, false)).not.toContain('Ryan');
  expect(lineFor(hrs, false)).not.toContain('ELEC-L3');
  // Every inbox kind has a group; safeguarding never appears in the inbox.
  for (const k of [
    'hours',
    'app_learning',
    'evidence',
    'comment',
    'message',
    'iqa',
    'review',
    'checkin',
    'deadline',
  ])
    expect(KIND_CATEGORY[k], k).toBeTruthy();
  // 40 long items stay under the 28 KB cap (ten listed, the rest counted).
  const many = Array.from({ length: 40 }, (_, i) =>
    item({ key: `hours:${i}`, title: 'x'.repeat(300), detail: 'y'.repeat(300) })
  );
  const big = buildInboxCard(many, { collegeName: 'Northgate', includeNames: true });
  expect(Buffer.byteLength(JSON.stringify(big))).toBeLessThan(28_000);
  expect(JSON.stringify(big)).toContain('And 30 more in the inbox.');
  // Host allow-list: Workflows and legacy connector hosts only.
  expect(teamsUrlOk(FAKE_URL)).toBe(true);
  expect(
    teamsUrlOk(
      'https://default123.12.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/abc/triggers/manual/paths/invoke?sig=x'
    )
  ).toBe(true);
  expect(
    teamsUrlOk('https://contoso.webhook.office.com/webhookb2/abc@def/IncomingWebhook/ghi/jkl')
  ).toBe(true);
  expect(teamsUrlOk('https://evil.example.com/logic.azure.com/abcdefghijklmnopqrstuvwxyz')).toBe(
    false
  );
  expect(teamsUrlOk('http://prod-01.uksouth.logic.azure.com/workflows/abcdefghijklmnop')).toBe(
    false
  );

  // A local receiver: first answer 429, then 200.
  const got: string[] = [];
  let calls = 0;
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      calls++;
      got.push(body);
      if (req.url?.startsWith('/gone')) {
        res.writeHead(404);
        return res.end('not found');
      }
      res.writeHead(calls === 1 ? 429 : 200);
      res.end('1');
    });
  });
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', () => r()));
  const port = (server.address() as AddressInfo).port;
  try {
    const ok = await postCard(`http://127.0.0.1:${port}/hook`, card, fetch, [50, 50]);
    expect(ok).toEqual({ ok: true, status: 200, error: null, attempts: 2 });
    expect(JSON.parse(got[1]).attachments[0].content.body[1].text).toBe(
      '3 new items in the College Hub inbox'
    );
    const gone = await postCard(
      `http://127.0.0.1:${port}/gone?sig=${FAKE_SECRET}`,
      buildTestCard('Northgate', 'Tutor'),
      fetch,
      [50]
    );
    expect(gone.ok).toBe(false);
    expect(gone.status).toBe(404);
    expect(gone.error).toMatch(/no longer recognises the link/);
    expect(gone.error).not.toContain(FAKE_SECRET);
    expect(gone.error).not.toContain('127.0.0.1');
    const unreachable = await postCard(
      `http://127.0.0.1:1/x?sig=${FAKE_SECRET}`,
      card,
      fetch,
      [10]
    );
    expect(unreachable.status).toBe(0);
    expect(unreachable.error).toBe('Teams could not be reached.');
  } finally {
    server.close();
  }
});

test('2. Server rules: managers only, the URL never comes back, Vault holds it', () => {
  test.skip(!adminAvailable(), 'Needs a logged-in Supabase CLI');
  const r = rolledBack(`
do $$
declare
  ng uuid := '${NORTHGATE}';
  tutor uuid := (select id from auth.users where email='founder+collegedemo-tutor@elec-mate.com');
  adm uuid := gen_random_uuid();
  z constant uuid := '00000000-0000-0000-0000-000000000000';
  r text := ''; j json; n int;
begin
  insert into auth.users (id, email, aud, role, instance_id) values (adm, 'teams-admin.e2e@example.com', 'authenticated', 'authenticated', z);
  insert into college_staff (college_id, user_id, name, email, role, status) values (ng, adm, 'E2E Teams admin', 'teams-admin.e2e@example.com', 'admin', 'active');
  perform set_config('request.jwt.claims', json_build_object('sub',tutor,'role','authenticated')::text, true);
  set local role authenticated;
  begin perform college_teams_save(ng, '${FAKE_URL}', true, array['college_hours'], true, true); r := r || 'tutor_save=allowed ';
  exception when others then r := r || 'tutor_save=refused '; end;
  select count(*) into n from college_teams_webhooks; r := r || 'tutor_rows=' || n || ' ';
  begin perform _college_teams_url(ng); r := r || 'tutor_url=allowed ';
  exception when others then r := r || 'tutor_url=denied '; end;
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub',adm,'role','authenticated')::text, true);
  set local role authenticated;
  begin perform college_teams_save(ng, 'https://evil.example.com/hook/abcdefghijklmnopqrstuvwxyz', true, array['college_hours'], true, true); r := r || 'bad_url=allowed ';
  exception when others then r := r || 'bad_url=refused '; end;
  j := college_teams_save(ng, '${FAKE_URL}', true, array['college_hours','college_reviews'], true, false);
  r := r || 'save_leaks=' || (j::text like '%${FAKE_SECRET}%') || ' host=' || (j->>'url_host') || ' ';
  j := college_teams_settings(ng);
  r := r || 'settings_leaks=' || (j::text like '%${FAKE_SECRET}%') || ' groups=' || (select string_agg(x, ',') from json_array_elements_text(j->'categories') x) || ' ';
  j := college_teams_save(ng, null, false, array['college_hours'], false, true);
  r := r || 'kept_url=' || (j->>'url_host' is not null) || ' paused=' || ((j->>'enabled') = 'false') || ' ';
  reset role;
  r := r || 'vault=' || coalesce((_college_teams_url(ng) like '%${FAKE_SECRET}'), false) || ' ';
  perform set_config('request.jwt.claims', json_build_object('sub',adm,'role','authenticated')::text, true);
  set local role authenticated;
  perform college_teams_disconnect(ng);
  reset role;
  select count(*) into n from vault.secrets where name = 'college_teams_webhook_' || ng::text;
  r := r || 'vault_after=' || n;
  raise exception 'RESULT %', r;
end $$;`);
  expect(r).toContain('tutor_save=refused');
  expect(r).toContain('tutor_rows=0');
  expect(r).toContain('tutor_url=denied');
  expect(r).toContain('bad_url=refused');
  expect(r).toContain('save_leaks=false');
  expect(r).toContain('host=elecmate-e2e-no-such-host-0000.logic.azure.com');
  expect(r).toContain('settings_leaks=false');
  expect(r).toContain('groups=college_hours,college_reviews ');
  expect(r).toContain('kept_url=true paused=true');
  expect(r).toContain('vault=true');
  expect(r).toContain('vault_after=0');
});

/** Connects Northgate to the NXDOMAIN URL as the database owner, with every inbox item but one already posted. */
function connectFixture(tutorUserId: string): { keys: string[]; fresh: string } {
  const before = admin<{ n: number }>(
    `select count(*)::int as n from public.college_teams_webhooks where college_id = ${lit(NORTHGATE)}`
  )[0];
  expect(Number(before.n), 'Northgate already has Teams connected: refusing to overwrite it').toBe(
    0
  );
  admin(`
    with s as (select vault.create_secret(${lit(FAKE_URL)}, 'college_teams_webhook_' || ${lit(NORTHGATE)}, 'E2E 69') as id)
    insert into public.college_teams_webhooks (college_id, secret_id, url_host, enabled, categories, quiet_hours, include_names, connected_by, baseline_at)
    select ${lit(NORTHGATE)}::uuid, s.id, 'elecmate-e2e-no-such-host-0000.logic.azure.com', true,
           array['college_marking','college_hours','college_messages','college_reviews'], false, true, ${lit(tutorUserId)}::uuid, now()
      from s`);
  const items = admin<{ k: string; kind: string }>(
    `select i->>'key' as k, i->>'kind' as kind from jsonb_array_elements(public._college_teams_inbox(${lit(NORTHGATE)})->'items') i`
  );
  expect(items.length, 'the fixture inbox has items').toBeGreaterThan(1);
  // Leave one hours item (or the first item) as "new".
  const fresh = (items.find((i) => i.kind === 'hours') ?? items[0]).k;
  const keys = items.map((i) => i.k).filter((k) => k !== fresh);
  admin(
    `insert into public.college_teams_posted (college_id, item_key) select ${lit(NORTHGATE)}::uuid, k from unnest(array[${keys.map(lit).join(',')}]::text[]) k on conflict do nothing`
  );
  return { keys, fresh };
}

function disconnectFixture() {
  admin(`
    delete from vault.secrets where id in (select secret_id from public.college_teams_webhooks where college_id = ${lit(NORTHGATE)});
    delete from public.college_teams_posted where college_id = ${lit(NORTHGATE)};
    delete from public.college_teams_webhooks where college_id = ${lit(NORTHGATE)};
    delete from vault.secrets where name = 'college_teams_webhook_' || ${lit(NORTHGATE)};`);
}

test('3 + 4. Deployed function and the settings card', async ({ browser }) => {
  test.skip(
    !haveCreds() || !adminAvailable(),
    'Needs fixture credentials and a Supabase CLI login'
  );
  const tutor = await actor('tutor');

  // Not connected yet: the card offers nothing to a tutor but says who can.
  {
    const { context, page, errors } = await signedInPage(browser, 'tutor', 'desktop');
    await page.goto('/college?section=collegesettings');
    const card = page.getByTestId('teams-card');
    await expect(card).toBeVisible({ timeout: 45_000 });
    await expect(card).toContainText('Not connected');
    await expect(card).toContainText(
      'Only a college admin or head of department can connect or change Teams.'
    );
    await expect(page.getByTestId('teams-open')).toHaveCount(0);
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  }

  const { fresh } = connectFixture(tutor.userId);
  try {
    const call = async (body: Record<string, unknown>) => {
      const res = await fetch(FUNC, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tutor.session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return { status: res.status, json: (await res.json()) as Record<string, unknown> };
    };
    // Preview: exactly the one new item, deep-linked, no URL anywhere.
    const pv = await call({ action: 'preview', college_id: NORTHGATE });
    expect(pv.status).toBe(200);
    expect(pv.json.baseline).toBe(false);
    // The item left unposted (other sessions may add more to the live inbox meanwhile).
    expect(Number(pv.json.would_post)).toBeGreaterThanOrEqual(1);
    const pvText = JSON.stringify(pv.json);
    expect(pvText).toContain('https://app.elec-mate.com/');
    expect(pvText).not.toContain(FAKE_SECRET);
    expect(pvText).not.toContain('logic.azure.com');
    // A tutor cannot send a test.
    const t = await call({ action: 'test', college_id: NORTHGATE });
    expect(t.status).toBe(403);
    // No caller at all.
    expect((await fetch(FUNC, { method: 'POST', body: '{}' })).status).toBe(401);

    // The cron path (service role via pg_net): the host does not exist, so
    // nothing is delivered, plain words are recorded, nothing is marked.
    const req = admin<{ id: number }>(`select net.http_post(
        url := ${lit(FUNC)},
        headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)),
        body := jsonb_build_object('dispatch', true, 'college_id', ${lit(NORTHGATE)}),
        timeout_milliseconds := 60000) as id`)[0];
    let resp: { status_code: number | null; content: string | null } | undefined;
    for (let i = 0; i < 30 && !resp?.status_code; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      resp = admin<{ status_code: number | null; content: string | null }>(
        `select status_code, content from net._http_response where id = ${Number(req.id)}`
      )[0];
    }
    expect(resp?.status_code, resp?.content ?? 'no response').toBe(200);
    const out = JSON.parse(resp!.content!) as {
      results: Array<{ posted?: number; status?: number }>;
    };
    expect(out.results[0].posted).toBe(0);
    expect(out.results[0].status).toBe(0);
    expect(resp!.content).not.toContain(FAKE_SECRET);
    const row = admin<{ last_status: number; last_error: string; posted: number }>(
      `select w.last_status, w.last_error, (select count(*)::int from public.college_teams_posted p where p.college_id = w.college_id and p.item_key = ${lit(fresh)}) as posted
         from public.college_teams_webhooks w where w.college_id = ${lit(NORTHGATE)}`
    )[0];
    expect(Number(row.last_status)).toBe(0);
    expect(row.last_error).toBe('Teams could not be reached.');
    expect(Number(row.posted), 'a failed post marks nothing').toBe(0);

    // UI as the tutor: connected, host only, preview lines, no controls.
    for (const vp of ['desktop', 'phone'] as const) {
      const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
      await page.goto('/college?section=collegesettings');
      const card = page.getByTestId('teams-card');
      await expect(card).toBeVisible({ timeout: 45_000 });
      await expect(page.getByTestId('teams-summary')).toContainText(
        'elecmate-e2e-no-such-host-0000.logic.azure.com'
      );
      await expect(page.getByTestId('teams-error')).toContainText('Teams could not be reached.');
      await expect(page.getByTestId('teams-open')).toHaveCount(0);
      await expect(page.getByTestId('teams-test')).toHaveCount(0);
      await page.getByTestId('teams-preview').click();
      // At least the item left unposted; other sessions may add more to the live inbox.
      await expect(page.getByTestId('teams-preview-result')).toContainText(
        /The next run would post \d+ new item/,
        { timeout: 30_000 }
      );
      const n = Number(
        ((await page.getByTestId('teams-preview-result').innerText()).match(/post (\d+) new/) ??
          [])[1]
      );
      expect(n).toBeGreaterThanOrEqual(1);
      expect(await page.getByTestId('teams-preview-line').count()).toBeGreaterThanOrEqual(
        Math.min(n, 10)
      );
      expect(await page.content()).not.toContain(FAKE_SECRET);
      await card.scrollIntoViewIfNeeded();
      await shot(page, 'teams-connected', vp === 'phone');
      expect(errors, errors.join('\n')).toEqual([]);
      await context.close();
    }
  } finally {
    disconnectFixture();
  }
  const left = admin<{ n: number }>(
    `select (select count(*) from public.college_teams_webhooks where college_id = ${lit(NORTHGATE)}) + (select count(*) from vault.secrets where name = 'college_teams_webhook_' || ${lit(NORTHGATE)}) + (select count(*) from public.college_teams_posted where college_id = ${lit(NORTHGATE)}) as n`
  )[0];
  expect(Number(left.n)).toBe(0);
});

test('4b. Admin sheet: flags a non-Teams link, sends a Workflows link once, shows only the host', async ({
  browser,
}) => {
  test.skip(!haveCreds(), 'Needs fixture credentials');
  for (const vp of ['desktop', 'phone'] as const) {
    const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
    let connected = false;
    const sent: string[] = [];
    // The settings RPCs are intercepted: this checks the screen, not the
    // database (test 2 proves the database rules).
    await page.route('**/rest/v1/rpc/college_teams_settings', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          connected
            ? {
                connected: true,
                can_manage: true,
                url_host: 'prod-07.uksouth.logic.azure.com',
                enabled: true,
                categories: ['college_hours'],
                quiet_hours: true,
                include_names: false,
                connected_at: new Date().toISOString(),
                connected_by_name: 'E2E admin',
                posted_total: 0,
              }
            : { connected: false, can_manage: true }
        ),
      })
    );
    await page.route('**/rest/v1/rpc/college_teams_save', async (route) => {
      sent.push(route.request().postData() ?? '');
      connected = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          connected: true,
          can_manage: true,
          url_host: 'prod-07.uksouth.logic.azure.com',
          enabled: true,
          categories: ['college_hours'],
          quiet_hours: true,
          include_names: false,
          connected_at: new Date().toISOString(),
          connected_by_name: 'E2E admin',
          posted_total: 0,
        }),
      });
    });
    await page.goto('/college?section=collegesettings');
    await page.getByTestId('teams-open').click();
    await expect(page.getByRole('heading', { name: 'Connect a Teams channel' })).toBeVisible();
    await page.getByTestId('teams-url').fill('https://example.com/hook/abcdefghijklmnopqrstuvwxyz');
    await expect(page.getByTestId('teams-url-hint')).toBeVisible();
    await expect(page.getByTestId('teams-save')).toBeDisabled();
    const good = `https://prod-07.uksouth.logic.azure.com:443/workflows/w/triggers/manual/paths/invoke?api-version=1&sig=${FAKE_SECRET}`;
    await page.getByTestId('teams-url').fill(good);
    await expect(page.getByTestId('teams-url-hint')).toHaveCount(0);
    for (const g of ['college_marking', 'college_messages', 'college_reviews'])
      await page.locator(`#teams-${g}`).click();
    await page.locator('#teams-names').click();
    await shot(page, 'teams-sheet', vp === 'phone');
    await page.getByTestId('teams-save').click();
    await expect(page.getByTestId('teams-summary')).toContainText(
      'prod-07.uksouth.logic.azure.com',
      { timeout: 20_000 }
    );
    expect(sent.length).toBe(1);
    const body = JSON.parse(sent[0]) as Record<string, unknown>;
    expect(body.p_url).toBe(good);
    expect(body.p_categories).toEqual(['college_hours']);
    expect(body.p_include_names).toBe(false);
    expect(await page.content()).not.toContain(FAKE_SECRET);
    await expect(page.getByTestId('teams-test')).toBeVisible();
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  }
});
