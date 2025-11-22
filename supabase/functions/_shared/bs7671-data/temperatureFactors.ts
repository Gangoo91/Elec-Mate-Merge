// BS 7671 Table 4B1 - Temperature correction factors
export function getTemperatureFactor(ambientTemp: number, rating: '70C' | '90C'): number {
  const factors70C: Record<number, number> = {
    25: 1.03, 30: 1.00, 35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.50
  };
  
  const factors90C: Record<number, number> = {
    25: 1.04, 30: 1.02, 35: 1.00, 40: 0.96, 45: 0.93, 50: 0.89, 55: 0.85, 60: 0.80, 65: 0.76, 70: 0.71, 75: 0.65, 80: 0.58
  };
  
  const table = rating === '90C' ? factors90C : factors70C;
  
  // Find nearest temperature
  const temps = Object.keys(table).map(Number).sort((a, b) => a - b);
  const nearestTemp = temps.reduce((prev, curr) => 
    Math.abs(curr - ambientTemp) < Math.abs(prev - ambientTemp) ? curr : prev
  );
  
  return table[nearestTemp] || 1.0;
}

// BS 7671 Table 4C1 - Grouping factors
export function getGroupingFactor(circuitCount: number): number {
  if (circuitCount <= 1) return 1.0;
  if (circuitCount === 2) return 0.80;
  if (circuitCount === 3) return 0.70;
  if (circuitCount <= 5) return 0.65;
  if (circuitCount <= 9) return 0.60;
  return 0.55; // 10+ circuits
}
