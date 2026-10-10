import { toast } from 'sonner';

/** The one wording for "it's on the phone, it will go" (ELE-1828). */
export const QUEUED_DETAIL = 'Saved on this phone. It will send by itself when you have signal.';

/** e.g. queuedToast('Clocked in to Smith Road') → title + the saved-on-this-phone line. */
export function queuedToast(title: string) {
  toast(title, { description: QUEUED_DETAIL, duration: 5000 });
}
