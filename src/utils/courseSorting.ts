// Course sorting utilities with robust data parsing

export const parsePrice = (priceString: string): number => {
  if (!priceString || typeof priceString !== 'string') {
    console.log('⚠️ Invalid price string:', priceString);
    return 999999; // Sort invalid prices to end
  }
  
  const str = priceString.toLowerCase();
  console.log('💰 Parsing price:', priceString);
  
  // Handle "contact for pricing" or similar placeholders
  if (str.includes('contact') || str.includes('call') || str.includes('enquire')) {
    console.log('📞 Contact for pricing detected');
    return 999999; // Sort to end
  }
  
  // Extract all numbers from the string
  const numbers = priceString.match(/\d+/g);
  if (!numbers || numbers.length === 0) {
    console.log('🚫 No numbers found in price string');
    return 999999;
  }
  
  // If it's a range (e.g., "£500-£1000"), use the lower bound
  const firstNumber = parseInt(numbers[0]);
  const result = isNaN(firstNumber) ? 999999 : firstNumber;
  console.log('💵 Parsed price result:', result);
  return result;
};

export const parseDuration = (durationString: string): number => {
  if (!durationString || typeof durationString !== 'string') return 999999;
  
  const str = durationString.toLowerCase();
  console.log('🕐 Parsing duration:', durationString);
  
  // Handle "contact provider" or similar placeholders
  if (str.includes('contact') || str.includes('call') || str.includes('enquire')) {
    console.log('📞 Contact for duration detected');
    return 999999;
  }
  
  // Extract number from duration (handle decimals too)
  const numberMatch = str.match(/(\d+(?:\.\d+)?)/);
  if (!numberMatch) {
    console.log('🚫 No numbers found in duration string');
    return 999999;
  }
  
  const number = parseFloat(numberMatch[1]);
  if (isNaN(number)) {
    console.log('🚫 Invalid number in duration');
    return 999999;
  }
  
  let result: number;
  
  // Convert to weeks for standardisation
  if (str.includes('hour')) {
    result = number / (40 * 7); // Assuming 40 hours per week
  } else if (str.includes('day')) {
    result = number / 7; // Days to weeks
  } else if (str.includes('week')) {
    result = number;
  } else if (str.includes('month')) {
    result = number * 4; // Months to weeks
  } else if (str.includes('year')) {
    result = number * 52; // Years to weeks
  } else {
    // Default to treating as weeks
    result = number;
  }
  
  console.log(`⏱️ Parsed duration result: ${durationString} -> ${result} weeks`);
  return result;
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