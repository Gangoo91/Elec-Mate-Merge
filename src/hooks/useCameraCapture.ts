/**
 * useCameraCapture — open the rear camera, grab a still, always let go.
 *
 * Extracted after the same twelve lines were copy-pasted into four AI tool
 * pages and all four were broken in the same way:
 *
 *   const stream = await getUserMedia(...)
 *   if (videoRef.current) {          // ← null on the first tap …
 *     videoRef.current.srcObject = stream;
 *     setIsCameraActive(true);       // … so this never runs
 *   }
 *
 * The <video> holding that ref only mounts once the flag is true, so the flag
 * could never be set from inside the guard. Every tap acquired a MediaStream,
 * showed nothing, and leaked it — on a real device, the camera light coming on
 * and staying on. Fixing it four times is what made this worth extracting; the
 * point of a hook here is that there is now one place for it to be wrong.
 *
 * The order that works:
 *   acquire → set state → attach in an effect once the element exists →
 *   stop every track on close AND on unmount.
 *
 * Usage:
 *   const camera = useCameraCapture({ onError: () => toast(...) });
 *   ...
 *   {camera.isActive
 *     ? <video ref={camera.videoRef} autoPlay playsInline muted />
 *     : <button onClick={camera.start}>Camera</button>}
 *   <canvas ref={camera.canvasRef} className="hidden" />
 */

import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  /** Called when permission is refused or no camera is available. */
  onError?: (error: unknown) => void;
  /** `environment` is the rear camera — right for every one of these tools. */
  facingMode?: 'environment' | 'user';
  /** JPEG quality for the captured still. */
  quality?: number;
}

export interface CameraCapture {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isActive: boolean;
  start: () => Promise<void>;
  stop: () => void;
  /** Grab the current frame. Resolves null if the camera isn't running. */
  capture: (filename?: string) => Promise<File | null>;
}

export function useCameraCapture({
  onError,
  facingMode = 'environment',
  quality = 0.9,
}: Options = {}): CameraCapture {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
      // State FIRST — the <video> does not exist until this flips.
      setStream(media);
      setIsActive(true);
    } catch (error) {
      onError?.(error);
    }
  }, [facingMode, onError]);

  // Attach once the element is on the page.
  useEffect(() => {
    if (isActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [isActive, stream]);

  /*
   * The single place tracks are stopped: whenever the stream we hold is
   * replaced or dropped, and on unmount. Navigating away mid-capture used to
   * leave the camera running on the device.
   */
  useEffect(() => {
    if (!stream) return;
    return () => stream.getTracks().forEach((track) => track.stop());
  }, [stream]);

  const stop = useCallback(() => {
    setStream(null);
    setIsActive(false);
  }, []);

  const capture = useCallback(
    (filename = 'capture.jpg') =>
      new Promise<File | null>((resolve) => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !video.videoWidth) {
          resolve(null);
          return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0);
        canvas.toBlob(
          (blob) => {
            resolve(blob ? new File([blob], filename, { type: 'image/jpeg' }) : null);
            stop();
          },
          'image/jpeg',
          quality
        );
      }),
    [quality, stop]
  );

  return { videoRef, canvasRef, isActive, start, stop, capture };
}

export default useCameraCapture;
