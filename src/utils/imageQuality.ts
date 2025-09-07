export interface ImageQualityResult {
  overall: number; // 0-1 score
  blur: number;
  exposure: number;
  contrast: number;
  issues: string[];
  recommendations: string[];
}

export const checkImageQuality = async (file: File): Promise<ImageQualityResult> => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      if (!ctx) {
        resolve({
          overall: 0.5,
          blur: 0.5,
          exposure: 0.5,
          contrast: 0.5,
          issues: ['Unable to analyze image'],
          recommendations: ['Retake the photo']
        });
        return;
      }

      // Set canvas size
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Calculate metrics
      const blur = calculateBlurScore(data, canvas.width, canvas.height);
      const exposure = calculateExposureScore(data);
      const contrast = calculateContrastScore(data);
      
      // Determine issues and recommendations
      const issues: string[] = [];
      const recommendations: string[] = [];
      
      if (blur < 0.6) {
        issues.push('Image appears blurry');
        recommendations.push('Hold camera steady and ensure proper focus');
      }
      
      if (exposure < 0.4) {
        issues.push('Image is underexposed');
        recommendations.push('Increase lighting or adjust camera settings');
      } else if (exposure > 0.9) {
        issues.push('Image is overexposed');
        recommendations.push('Reduce lighting or adjust camera settings');
      }
      
      if (contrast < 0.5) {
        issues.push('Low contrast');
        recommendations.push('Improve lighting conditions for better detail');
      }
      
      // Calculate overall score
      const overall = (blur * 0.4 + exposure * 0.3 + contrast * 0.3);
      
      resolve({
        overall,
        blur,
        exposure,
        contrast,
        issues,
        recommendations
      });
    };
    
    img.onerror = () => {
      resolve({
        overall: 0,
        blur: 0,
        exposure: 0,
        contrast: 0,
        issues: ['Failed to load image'],
        recommendations: ['Try capturing again']
      });
    };
    
    img.src = URL.createObjectURL(file);
  });
};

const calculateBlurScore = (data: Uint8ClampedArray, width: number, height: number): number => {
  // Simple Laplacian variance for blur detection
  let sum = 0;
  let count = 0;
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      
      // Convert to grayscale
      const gray = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
      
      // Sample every 10th pixel for performance
      if (count % 10 === 0) {
        // Laplacian kernel
        const laplacian = Math.abs(
          -gray + 
          data[((y-1) * width + x) * 4] * 0.299 +
          data[((y+1) * width + x) * 4] * 0.299 +
          data[(y * width + (x-1)) * 4] * 0.299 +
          data[(y * width + (x+1)) * 4] * 0.299
        );
        
        sum += laplacian;
      }
      count++;
    }
  }
  
  const variance = sum / (count / 10);
  // Normalize to 0-1 range (threshold determined empirically)
  return Math.min(variance / 150, 1);
};

const calculateExposureScore = (data: Uint8ClampedArray): number => {
  let sum = 0;
  const pixelCount = data.length / 4;
  
  // Calculate average brightness
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    sum += brightness;
  }
  
  const avgBrightness = sum / pixelCount;
  
  // Score based on how close to ideal brightness (around 128)
  const ideal = 128;
  const distance = Math.abs(avgBrightness - ideal);
  return Math.max(0, 1 - (distance / ideal));
};

const calculateContrastScore = (data: Uint8ClampedArray): number => {
  const brightnesses: number[] = [];
  
  // Sample brightness values
  for (let i = 0; i < data.length; i += 40) { // Sample every 10th pixel
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    brightnesses.push(brightness);
  }
  
  if (brightnesses.length < 2) return 0.5;
  
  // Calculate standard deviation as contrast measure
  const mean = brightnesses.reduce((a, b) => a + b) / brightnesses.length;
  const variance = brightnesses.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / brightnesses.length;
  const stdDev = Math.sqrt(variance);
  
  // Normalize to 0-1 range (good contrast typically has stdDev > 30)
  return Math.min(stdDev / 50, 1);
};