/**
 * Journey 35 — one qualification, and disagreements are visible (ELE-1866).
 *
 * The resolver applies "college course first, learner's own choice second".
 * When the two differ, the tutor sees it in Student 360's Needs you. This
 * temporarily switches the fixture learner's own active choice to a different
 * qualification, checks the tutor sees the mismatch, then puts it back.
 */
import { test, expect } from '@playwright/test';
import { actor, haveCreds, learnerRoll, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('a course mismatch shows in Needs you, and the resolver keeps the college course', async ({ browser }) => {
  test.setTimeout(2 * 60_000);
  const l = await actor('learner');
  const t = await actor('tutor');
  const roll = await learnerRoll();
  const uid = l.session.user.id;

  const before = (await t.db.rpc('resolve_learner_qualification' as never, { p_student_id: roll.id } as never))
    .data as unknown as { code: string; source: string; diverges_from_selection: boolean };
  expect(before.source).toBe('college_course');

  const { data: original } = await l.db
    .from('user_qualification_selections')
    .select('id, qualification_id, is_active')
    .eq('user_id', uid);
  const { data: other } = await l.db
    .from('qualifications')
    .select('id, code')
    .neq('code', before.code)
    .not('code', 'is', null)
    .limit(1)
    .single();
  expect(other, 'another qualification to pick').toBeTruthy();

  const created: string[] = [];
  try {
    // Make the other qualification the learner's own active choice.
    await l.db.from('user_qualification_selections').update({ is_active: false }).eq('user_id', uid);
    const { data: ins, error } = await l.db
      .from('user_qualification_selections')
      .insert({ user_id: uid, qualification_id: (other as { id: string }).id, is_active: true })
      .select('id')
      .single();
    expect(error).toBeNull();
    created.push((ins as { id: string }).id);

    const after = (await t.db.rpc('resolve_learner_qualification' as never, { p_student_id: roll.id } as never))
      .data as unknown as { code: string; diverges_from_selection: boolean; selection_code: string };
    expect(after.code, 'the college course still wins').toBe(before.code);
    expect(after.diverges_from_selection).toBe(true);

    const { context, page, errors } = await signedInPage(browser, 'tutor');
    await page.goto(`/college?section=student360&studentId=${roll.id}`);
    await expect(page.getByText('Two different courses')).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(`Only ${before.code} counts`)).toBeVisible();
    expect(errors).toEqual([]);
    await context.close();
  } finally {
    for (const id of created) await l.db.from('user_qualification_selections').delete().eq('id', id);
    for (const row of (original ?? []) as Array<{ id: string; is_active: boolean }>)
      await l.db.from('user_qualification_selections').update({ is_active: row.is_active }).eq('id', row.id);
  }
  const restored = (await t.db.rpc('resolve_learner_qualification' as never, { p_student_id: roll.id } as never))
    .data as unknown as { diverges_from_selection: boolean };
  expect(restored.diverges_from_selection, 'put back as it was').toBe(before.diverges_from_selection);
});
