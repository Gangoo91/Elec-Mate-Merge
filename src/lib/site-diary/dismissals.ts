/**
 * Per-user, per-device "not this one" choices for the diary's Needs you list:
 * an entry that isn't for the portfolio, a question that's meant to stay
 * private. Without them the list nagged about the same rows forever.
 */
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

export type DismissKind = 'portfolio' | 'question';

const key = (uid: string, kind: DismissKind) => `elec-mate-diary-dismiss:${kind}:${uid}`;

export function getDismissed(uid: string | null | undefined, kind: DismissKind): Set<string> {
  if (!uid) return new Set();
  return new Set(storageGetJSONSync<string[]>(key(uid, kind), []));
}

export function addDismissed(uid: string | null | undefined, kind: DismissKind, id: string) {
  if (!uid) return;
  const set = getDismissed(uid, kind);
  set.add(id);
  storageSetJSONSync(key(uid, kind), [...set].slice(-500));
}
