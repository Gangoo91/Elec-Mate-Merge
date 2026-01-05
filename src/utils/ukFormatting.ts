export function formatUKPostcode(input: string): string {
  if (!input) return '';
  
  // Remove all spaces and convert to uppercase
  const cleaned = input.replace(/\s+/g, '').toUpperCase();
  
  // UK postcode should be 5-7 characters
  if (cleaned.length < 5 || cleaned.length > 7) {
    return input.toUpperCase();
  }
  
  // Add space before last 3 characters
  return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
}

export function formatUKPhone(input: string): string {
  if (!input) return '';
  
  // Convert spoken words to numbers
  let cleaned = input
    .toLowerCase()
    .replace(/oh/g, '0')
    .replace(/zero/g, '0')
    .replace(/one/g, '1')
    .replace(/two/g, '2')
    .replace(/three/g, '3')
    .replace(/four/g, '4')
    .replace(/five/g, '5')
    .replace(/six/g, '6')
    .replace(/seven/g, '7')
    .replace(/eight/g, '8')
    .replace(/nine/g, '9')
    .replace(/[^0-9]/g, '');
  
  // Ensure starts with 0
  if (cleaned && !cleaned.startsWith('0')) {
    cleaned = '0' + cleaned;
  }
  
  return cleaned;
}

export function formatAddress(input: string): string {
  if (!input) return '';
  
  // Split by comma or detect postcode pattern
  const postcodePattern = /([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})/i;
  const match = input.match(postcodePattern);
  
  if (match) {
    const postcode = formatUKPostcode(match[1]);
    let addressWithoutPostcode = input.replace(match[0], '').trim();
    
    // Remove trailing comma
    addressWithoutPostcode = addressWithoutPostcode.replace(/,\s*$/, '');
    
    // Split remaining address by comma
    const parts = addressWithoutPostcode.split(',').map(part => 
      part.trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    );
    
    // Combine with postcode
    return [...parts, postcode].filter(Boolean).join('\n');
  }
  
  // Fallback: capitalize each word
  return input
    .split(',')
    .map(part => part.trim())
    .map(part => 
      part.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    )
    .join('\n');
}

export function normalizeVoiceNumber(input: string): string {
  if (!input) return '';
  
  const numberWords: { [key: string]: string } = {
    'zero': '0', 'oh': '0',
    'one': '1', 'two': '2', 'three': '3',
    'four': '4', 'five': '5', 'six': '6',
    'seven': '7', 'eight': '8', 'nine': '9',
    'ten': '10', 'eleven': '11', 'twelve': '12',
    'thirteen': '13', 'fourteen': '14', 'fifteen': '15',
    'sixteen': '16', 'seventeen': '17', 'eighteen': '18',
    'nineteen': '19', 'twenty': '20', 'thirty': '30',
    'forty': '40', 'fifty': '50', 'sixty': '60',
    'seventy': '70', 'eighty': '80', 'ninety': '90',
    'hundred': '100', 'thousand': '1000'
  };
  
  let result = input.toLowerCase();
  
  // Replace number words with digits
  Object.entries(numberWords).forEach(([word, digit]) => {
    result = result.replace(new RegExp(`\\b${word}\\b`, 'g'), digit);
  });
  
  // Extract just numbers and decimal points
  const numbers = result.match(/[\d.]+/g);
  if (numbers && numbers.length > 0) {
    return numbers.join('');
  }
  
  return input;
}

export function validateUKPostcode(postcode: string): boolean {
  const pattern = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
  return pattern.test(postcode);
}

export function validateUKPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s+/g, '');
  return /^0[17]\d{9}$/.test(cleaned) || /^0\d{10}$/.test(cleaned);
}
