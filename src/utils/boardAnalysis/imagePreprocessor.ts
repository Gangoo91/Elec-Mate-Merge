/**
 * Image Preprocessing Utilities for AI Board Scanner
 *
 * Provides canvas-based image enhancement for better AI analysis accuracy.
 * Includes contrast enhancement, sharpening, and region extraction.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ImageQualityResult {
  ok: boolean;
  brightness: number;
  contrast: number;
  sharpness: number;
  issue?: string;
  suggestion?: string;
}

export interface ProcessedImage {
  dataUrl: string;
  width: number;
  height: number;
  originalSize: number;
  processedSize: number;
  enhancements: string[];
}

export interface ImageRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

// ============================================================================
// QUALITY ASSESSMENT
// ============================================================================

/**
 * Analyzes image quality for AI processing suitability
 */
export async function assessImageQuality(dataUrl: string): Promise<ImageQualityResult> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve({ ok: true, brightness: 128, contrast: 50, sharpness: 50 });
        return;
      }

      // Sample center region
      const sampleSize = Math.min(300, img.width, img.height);
      canvas.width = sampleSize;
      canvas.height = sampleSize;

      const x = Math.max(0, (img.width - sampleSize) / 2);
      const y = Math.max(0, (img.height - sampleSize) / 2);
      ctx.drawImage(img, x, y, sampleSize, sampleSize, 0, 0, sampleSize, sampleSize);

      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const pixels = imageData.data;

      // Calculate brightness
      let totalBrightness = 0;
      let totalContrast = 0;
      let prevBrightness = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const brightness = (r + g + b) / 3;
        totalBrightness += brightness;

        if (i > 0) {
          totalContrast += Math.abs(brightness - prevBrightness);
        }
        prevBrightness = brightness;
      }

      const pixelCount = (sampleSize * sampleSize);
      const avgBrightness = totalBrightness / pixelCount;
      const avgContrast = totalContrast / pixelCount;

      // Calculate sharpness (Laplacian variance)
      const sharpness = calculateSharpness(ctx, sampleSize);

      // Determine quality
      let ok = true;
      let issue: string | undefined;
      let suggestion: string | undefined;

      if (avgBrightness < 40) {
        ok = false;
        issue = 'Image too dark - circuit labels may be unreadable';
        suggestion = 'Turn on room lights or use torch/flash';
      } else if (avgBrightness > 230) {
        ok = false;
        issue = 'Image overexposed - details washed out';
        suggestion = 'Reduce lighting or avoid direct glare on board';
      } else if (avgContrast < 5) {
        ok = false;
        issue = 'Image appears blurry or out of focus';
        suggestion = 'Hold phone steady, tap screen to focus on MCB labels';
      } else if (sharpness < 100) {
        issue = 'Image slightly soft - AI will attempt enhancement';
        suggestion = 'For best results, ensure focus on circuit labels';
      }

      resolve({
        ok,
        brightness: Math.round(avgBrightness),
        contrast: Math.round(avgContrast * 10),
        sharpness: Math.round(sharpness),
        issue,
        suggestion
      });
    };

    img.onerror = () => {
      resolve({ ok: true, brightness: 128, contrast: 50, sharpness: 50 });
    };

    img.src = dataUrl;
  });
}

function calculateSharpness(ctx: CanvasRenderingContext2D, size: number): number {
  const imageData = ctx.getImageData(0, 0, size, size);
  const gray = new Float32Array(size * size);

  // Convert to grayscale
  for (let i = 0; i < imageData.data.length; i += 4) {
    const idx = i / 4;
    gray[idx] = 0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2];
  }

  // Laplacian kernel
  let variance = 0;
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const idx = y * size + x;
      const laplacian = gray[idx - size] + gray[idx + size] + gray[idx - 1] + gray[idx + 1] - 4 * gray[idx];
      variance += laplacian * laplacian;
    }
  }

  return variance / ((size - 2) * (size - 2));
}

// ============================================================================
// IMAGE ENHANCEMENT
// ============================================================================

/**
 * Enhances image for better AI analysis
 * - Increases contrast for text clarity
 * - Applies subtle sharpening
 * - Optimizes compression
 */
export async function enhanceImageForAI(
  dataUrl: string,
  options: {
    maxDimension?: number;
    quality?: number;
    enhanceContrast?: boolean;
    sharpen?: boolean;
  } = {}
): Promise<ProcessedImage> {
  const {
    maxDimension = 1800,
    quality = 0.82,
    enhanceContrast = true,
    sharpen = true
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Calculate dimensions
      let { width, height } = img;
      const originalSize = dataUrl.length * 0.75 / 1024 / 1024; // Approximate MB

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height / width) * maxDimension;
          width = maxDimension;
        } else {
          width = (width / height) * maxDimension;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Apply enhancements
      const enhancements: string[] = [];

      if (enhanceContrast) {
        ctx.filter = 'contrast(1.15) brightness(1.05)';
        enhancements.push('contrast');
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Apply sharpening via unsharp mask
      if (sharpen) {
        applyUnsharpMask(ctx, width, height, 0.6, 1);
        enhancements.push('sharpen');
      }

      // Compress
      const processedDataUrl = canvas.toDataURL('image/jpeg', quality);
      const processedSize = processedDataUrl.length * 0.75 / 1024 / 1024;

      resolve({
        dataUrl: processedDataUrl,
        width: Math.round(width),
        height: Math.round(height),
        originalSize,
        processedSize,
        enhancements
      });
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

/**
 * Applies unsharp mask for edge enhancement
 */
function applyUnsharpMask(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
  radius: number
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Simple box blur for the mask
  const blurred = new Uint8ClampedArray(data.length);
  const r = Math.ceil(radius);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let rSum = 0, gSum = 0, bSum = 0, count = 0;

      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = Math.min(width - 1, Math.max(0, x + dx));
          const ny = Math.min(height - 1, Math.max(0, y + dy));
          const idx = (ny * width + nx) * 4;
          rSum += data[idx];
          gSum += data[idx + 1];
          bSum += data[idx + 2];
          count++;
        }
      }

      const idx = (y * width + x) * 4;
      blurred[idx] = rSum / count;
      blurred[idx + 1] = gSum / count;
      blurred[idx + 2] = bSum / count;
      blurred[idx + 3] = data[idx + 3];
    }
  }

  // Apply unsharp mask: original + amount * (original - blurred)
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, data[i] + amount * (data[i] - blurred[i])));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + amount * (data[i + 1] - blurred[i + 1])));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + amount * (data[i + 2] - blurred[i + 2])));
  }

  ctx.putImageData(imageData, 0, 0);
}

// ============================================================================
// REGION EXTRACTION
// ============================================================================

/**
 * Splits image into quadrants for focused analysis
 * Useful for large boards where individual circuit labels need attention
 */
export async function splitIntoQuadrants(dataUrl: string): Promise<ProcessedImage[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const quadrants: ProcessedImage[] = [];
      const { width, height } = img;

      const regions: ImageRegion[] = [
        { x: 0, y: 0, width: width / 2, height: height / 2, label: 'top-left' },
        { x: width / 2, y: 0, width: width / 2, height: height / 2, label: 'top-right' },
        { x: 0, y: height / 2, width: width / 2, height: height / 2, label: 'bottom-left' },
        { x: width / 2, y: height / 2, width: width / 2, height: height / 2, label: 'bottom-right' }
      ];

      for (const region of regions) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) continue;

        canvas.width = region.width;
        canvas.height = region.height;

        ctx.drawImage(
          img,
          region.x, region.y, region.width, region.height,
          0, 0, region.width, region.height
        );

        const regionDataUrl = canvas.toDataURL('image/jpeg', 0.85);

        quadrants.push({
          dataUrl: regionDataUrl,
          width: region.width,
          height: region.height,
          originalSize: dataUrl.length * 0.75 / 1024 / 1024 / 4,
          processedSize: regionDataUrl.length * 0.75 / 1024 / 1024,
          enhancements: [`region:${region.label}`]
        });
      }

      resolve(quadrants);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

/**
 * Extracts a specific region from an image
 */
export async function extractRegion(
  dataUrl: string,
  region: ImageRegion
): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      canvas.width = region.width;
      canvas.height = region.height;

      // Apply contrast enhancement for region
      ctx.filter = 'contrast(1.2) brightness(1.05)';

      ctx.drawImage(
        img,
        region.x, region.y, region.width, region.height,
        0, 0, region.width, region.height
      );

      const regionDataUrl = canvas.toDataURL('image/jpeg', 0.88);

      resolve({
        dataUrl: regionDataUrl,
        width: region.width,
        height: region.height,
        originalSize: dataUrl.length * 0.75 / 1024 / 1024,
        processedSize: regionDataUrl.length * 0.75 / 1024 / 1024,
        enhancements: ['region-extract', 'contrast']
      });
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

// ============================================================================
// COMPRESSION UTILITIES
// ============================================================================

/**
 * Compresses image to target size while maintaining quality
 */
export async function compressToSize(
  dataUrl: string,
  targetSizeMB: number,
  minQuality: number = 0.5
): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      let { width, height } = img;
      let quality = 0.9;
      let result: string = dataUrl;

      // Iteratively reduce quality/size
      while (quality >= minQuality) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        result = canvas.toDataURL('image/jpeg', quality);

        const sizeMB = result.length * 0.75 / 1024 / 1024;

        if (sizeMB <= targetSizeMB) {
          break;
        }

        // Reduce quality or dimensions
        if (quality > 0.6) {
          quality -= 0.1;
        } else {
          width *= 0.9;
          height *= 0.9;
          quality = 0.8;
        }
      }

      resolve({
        dataUrl: result,
        width: Math.round(width),
        height: Math.round(height),
        originalSize: dataUrl.length * 0.75 / 1024 / 1024,
        processedSize: result.length * 0.75 / 1024 / 1024,
        enhancements: ['compressed']
      });
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

/**
 * Calculates base64 data URL size in MB
 */
export function getDataUrlSizeMB(dataUrl: string): number {
  const base64 = dataUrl.split(',')[1] || dataUrl;
  return (base64.length * 0.75) / (1024 * 1024);
}

// ============================================================================
// THREE-PHASE BOARD DETECTION
// ============================================================================

/**
 * Analyzes image to detect three-phase board characteristics
 */
export async function detectThreePhaseBoard(dataUrl: string): Promise<{
  isLikelyThreePhase: boolean;
  confidence: number;
  indicators: string[];
}> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve({ isLikelyThreePhase: false, confidence: 0, indicators: [] });
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Analyze aspect ratio - 3P boards tend to be wider or have 3 distinct rows
      const aspectRatio = img.width / img.height;
      const indicators: string[] = [];
      let score = 0;

      // Wide boards (>2:1) or tall boards (>1:2) suggest 3P
      if (aspectRatio > 2 || aspectRatio < 0.5) {
        score += 0.3;
        indicators.push('Aspect ratio suggests multiple phases');
      }

      // Large boards (>2MP) are often commercial 3P
      if (img.width * img.height > 2000000) {
        score += 0.2;
        indicators.push('Large board size');
      }

      // Check for red/yellow/blue color presence (phase indicators)
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const colorCounts = analyzePhaseColors(imageData);

      if (colorCounts.hasRedYellowBlue) {
        score += 0.4;
        indicators.push('Phase color indicators detected (R/Y/B)');
      }

      resolve({
        isLikelyThreePhase: score > 0.5,
        confidence: Math.min(1, score),
        indicators
      });
    };

    img.onerror = () => {
      resolve({ isLikelyThreePhase: false, confidence: 0, indicators: [] });
    };

    img.src = dataUrl;
  });
}

function analyzePhaseColors(imageData: ImageData): { hasRedYellowBlue: boolean } {
  const data = imageData.data;
  let redCount = 0;
  let yellowCount = 0;
  let blueCount = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Red detection (phase L1)
    if (r > 180 && g < 80 && b < 80) redCount++;

    // Yellow detection (phase L2)
    if (r > 180 && g > 150 && b < 80) yellowCount++;

    // Blue detection (phase L3)
    if (r < 80 && g < 80 && b > 150) blueCount++;
  }

  const totalPixels = data.length / 4;
  const threshold = totalPixels * 0.001; // 0.1% of pixels

  return {
    hasRedYellowBlue: redCount > threshold && yellowCount > threshold && blueCount > threshold
  };
}
