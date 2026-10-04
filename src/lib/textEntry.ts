import { Capacitor } from '@capacitor/core';

/**
 * Text-entry hints that differ by platform (ELE-1802).
 *
 * On Android, Chromium maps `autocomplete="off"` to the IME's
 * TYPE_TEXT_FLAG_NO_SUGGESTIONS, and Gboard switches glide (swipe) typing and
 * the suggestion strip off for any field carrying it. Every base Input and
 * Textarea in the app set it, so swipe typing was dead across the whole
 * Android app. iOS and desktop browsers treat the attribute as a plain
 * autofill hint with no effect on typing, so they keep it unchanged.
 *
 * `spellcheck` and `autocorrect` are not involved: Chromium only uses them to
 * decide the AUTO_CORRECT flag, which does not affect glide typing.
 *
 * The flip side: with suggestions on, Gboard learns words typed into plain
 * text fields. Password fields in this app are masked TEXT fields (an iOS
 * Safari workaround), so on native Android they switch back to a real
 * `type="password"`, which Chromium reports as a password editor.
 */
export const isAndroidNative = Capacitor.getPlatform() === 'android';

/** Value for `autoComplete` where a field wants autofill off: omitted on Android. */
export const autoCompleteOff: 'off' | undefined = isAndroidNative ? undefined : 'off';
