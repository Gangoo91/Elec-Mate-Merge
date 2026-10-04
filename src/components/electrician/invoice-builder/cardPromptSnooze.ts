/**
 * Per-device snooze for the card payments prompt (ELE-1705). A convenience,
 * so storage failing just means the prompt shows again.
 */
const SNOOZE_KEY = 'elecmate:card-prompt-snoozed-at';
const SNOOZE_DAYS = 14;

/** Per-device snooze — a convenience, so storage failing just means it shows. */
export function cardPromptSnoozed(): boolean {
  try {
    const at = Number(localStorage.getItem(SNOOZE_KEY) || 0);
    return at > 0 && Date.now() - at < SNOOZE_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

export function snoozeCardPrompt(): void {
  try {
    localStorage.setItem(SNOOZE_KEY, String(Date.now()));
  } catch {
    /* private mode — it will simply show again next time */
  }
}
