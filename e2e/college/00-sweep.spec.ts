/**
 * Runs first: removes anything an earlier, crashed run left on the fixture
 * learner (rows marked "E2E·" and older than ten minutes). Never fails the
 * suite on its own; skips where there is no admin cleanup path.
 */
import { test } from '@playwright/test';
import { actor, adminAvailable, haveCreds, learnerRoll, sweepStale } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('sweep rows left by an earlier run', async () => {
  test.skip(!adminAvailable(), 'No Supabase CLI login / SUPABASE_ACCESS_TOKEN');
  const l = await actor('learner');
  const roll = await learnerRoll();
  sweepStale(l.userId, roll.id);
});
