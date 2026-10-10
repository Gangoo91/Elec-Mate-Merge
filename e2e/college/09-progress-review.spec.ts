/**
 * Journey 9 — a progress review the tutor booked shows on the learner's side.
 *
 * READ-ONLY: the demo fixture already carries a booked review, and booking
 * another would trip the "one review in flight" rules and notify the employer
 * contact. The test reads the booking as the tutor and checks both screens
 * agree on the day.
 */
import { test, expect } from '@playwright/test';
import { actor, haveCreds, learnerRoll, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('the booked review is on the tutor board and on the learner home', async ({ browser }) => {
  const t = await actor('tutor');
  const roll = await learnerRoll();
  const { data } = await t.db
    .from('college_tripartite_reviews')
    .select('id, scheduled_at, status')
    .eq('student_id', roll.id)
    .gte('scheduled_at', new Date().toISOString())
    .neq('status', 'cancelled')
    .order('scheduled_at', { ascending: true })
    .limit(1);
  const review = (data ?? [])[0] as { scheduled_at: string } | undefined;
  test.skip(
    !review,
    'No upcoming review on the fixture learner (run scripts/college-demo/refresh_northgate_demo.sql)'
  );

  const day = new Date(review!.scheduled_at).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/London',
  }); // e.g. "Tue 20 Oct"

  const tutor = await signedInPage(browser, 'tutor');
  await tutor.page.goto('/college/reviews');
  const row = tutor.page.getByText('Demo Learner (fixture)').first();
  await expect(row).toBeVisible();
  await expect(
    tutor.page.getByText(new RegExp(`Booked(?: late)?(?: ·)? ${day}`)).first()
  ).toBeVisible();

  const learner = await signedInPage(browser, 'learner');
  await learner.page.goto('/apprentice/college-plan');
  await expect(learner.page.getByText('Progress reviews').first()).toBeVisible();
  await expect(learner.page.getByText(new RegExp(day)).first()).toBeVisible();
});
