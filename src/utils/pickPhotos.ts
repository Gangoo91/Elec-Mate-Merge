import { Capacitor } from '@capacitor/core';

/**
 * "Take a photo" vs "Choose from photos" — actually different things (ELE-1642).
 *
 * Andrew, testing the pre-purchase survey on a phone: *"Take a photo and choose
 * from photos do the same thing — take a photo should open a native phone
 * camera etc, especially on mobile."*
 *
 * He was right, and my earlier reasoning was wrong. On ELE-1110 `capture` had
 * to come OFF a picker because it removes the photo library — so I left it off
 * BOTH buttons here and argued camera-first could be carried by which button
 * was bigger. On a phone that is simply two identical buttons.
 *
 * The fix is not to put `capture` on both, it is to route them differently:
 *
 *  • **native (Capacitor)** — `Camera.getPhoto` with `CameraSource.Camera` or
 *    `CameraSource.Photos`. Preferred over a web `<input capture>` because
 *    WKWebView handles that inconsistently. Same call the Elec-ID document
 *    camera already makes.
 *  • **web** — one input carrying `capture="environment"` for the camera and a
 *    plain one for the library. Two inputs, never one shared.
 *
 * 🔴 So `capture` is only ever set on the input the CAMERA button owns. The
 * library button keeps a bare `accept="image/*"`, which is what preserves
 * access to photos already on the device.
 *
 * ── 🔴 WHY @capacitor/camera IS IMPORTED LAZILY ───────────────────────────
 * A static `import { Camera } from '@capacitor/camera'` at the top of this file
 * took the WHOLE APP DOWN on web: *"Bootstrap timeout: React did not mount
 * within 8 seconds. Native plugin init may be blocking."* This module is reached
 * from the EICR schedule, so it lands in the main bundle and its plugin
 * registration ran during boot. The dynamic import below keeps it out of the
 * startup path entirely — it is only ever loaded on a device, on a tap.
 */

/**
 * A function, not a module-level constant.
 *
 * Evaluating `Capacitor.isNativePlatform()` at import time is the same class of
 * mistake as the static plugin import: it makes a boot-time decision out of
 * something only needed on a click.
 */
export const isNativeApp = (): boolean => Capacitor.isNativePlatform();

/**
 * Native capture. Returns `null` on web, or when the user backs out — the
 * caller then falls through to its own file input.
 *
 * Never throws: a cancelled camera is the commonest outcome and is not an error.
 */
export async function nativePickPhoto(source: 'camera' | 'library'): Promise<File | null> {
  if (!isNativeApp()) return null;
  try {
    /* 🔴 Loaded here, never at module scope — see the header. */
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: source === 'camera' ? CameraSource.Camera : CameraSource.Photos,
      quality: 90,
      /* Straight to the capture UI — a "camera or library?" prompt here would
         reintroduce exactly the ambiguity this exists to remove. */
      allowEditing: false,
    });
    if (!photo?.base64String) return null;
    const res = await fetch(`data:image/jpeg;base64,${photo.base64String}`);
    const blob = await res.blob();
    return new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
  } catch (err) {
    /* Cancellation lands here too — nothing to report. */
    console.warn('[pickPhotos] native capture ended without a photo:', err);
    return null;
  }
}
