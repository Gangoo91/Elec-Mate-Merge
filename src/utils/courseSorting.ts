// Course sorting utilities with robust data parsing

export const parsePrice = (priceString: string): number => {
  if (!priceString || typeof priceString !== 'string') return 999999; // Sort invalid prices to end
  
  const str = priceString.toLowerCase();
  
  // Handle "contact for pricing" or similar placeholders
  if (str.includes('contact') || str.includes('call') || str.includes('enquire')) {
    return 999999; // Sort to end
  }
  
  // Extract all numbers from the string
  const numbers = priceString.match(/\d+/g);
  if (!numbers || numbers.length === 0) return 999999;
  
  // If it's a range (e.g., "£500-£1000"), use the lower bound
  const firstNumber = parseInt(numbers[0]);
  return isNaN(firstNumber) ? 999999 : firstNumber;
};

export const parseDuration = (durationString: string): number => {
  if (!durationString || typeof durationString !== 'string') return 999999;
  
  const str = durationString.toLowerCase();
  
  // Handle "contact provider" or similar placeholders
  if (str.includes('contact') || str.includes('call') || str.includes('enquire')) {
    return 999999;
  }
  
  // Extract number from duration
  const numberMatch = str.match(/(\d+)/);
  if (!numberMatch) return 999999;
  
  const number = parseInt(numberMatch[1]);
  if (isNaN(number)) return 999999;
  
  // Convert to weeks for standardisation
  if (str.includes('day')) return number / 7; // Days to weeks
  if (str.includes('week')) return number;
  if (str.includes('month')) return number * 4; // Months to weeks
  if (str.includes('year')) return number * 52; // Years to weeks
  
  // Default to the number as weeks
  return number;
};

export const parseDate = (dateString: string | string[]): Date => {
  if (!dateString) return new Date(9999, 11, 31); // Far future for invalid dates
  
  // Handle array of dates - use first valid date
  const dateToCheck = Array.isArray(dateString) ? dateString[0] : dateString;
  
  if (!dateToCheck || typeof dateToCheck !== 'string') {
    return new Date(9999, 11, 31);
  }
  
  const str = dateToCheck.toLowerCase();
  
  // Handle "contact provider" or similar placeholders
  if (str.includes('contact') || str.includes('call') || str.includes('enquire') || str.includes('tbc')) {
    return new Date(9999, 11, 31);
  }
  
  // Try to parse as date
  const parsedDate = new Date(dateToCheck);
  
  // Check if date is valid
  if (isNaN(parsedDate.getTime())) {
    return new Date(9999, 11, 31);
  }
  
  return parsedDate;
};

export const getNumericRating = (rating: number | string): number => {
  if (typeof rating === 'number') return rating;
  if (typeof rating === 'string') {
    const parsed = parseFloat(rating);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const getDemandScore = (demand: string): number => {
  const demandOrder = { 
    "high": 3, 
    "medium": 2, 
    "low": 1 
  };
  
  if (!demand || typeof demand !== 'string') return 0;
  
  const normalised = demand.toLowerCase();
  return demandOrder[normalised as keyof typeof demandOrder] || 0;
};

export const getFutureProofingScore = (score: number | string): number => {
  if (typeof score === 'number') return score;
  if (typeof score === 'string') {
    const parsed = parseFloat(score);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};