// Phase 7: Quality Assurance Layer
// Validates responses for correctness, compliance, and quality

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  confidence: number;
}

export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  category: 'technical' | 'regulatory' | 'clarity' | 'safety';
  message: string;
  suggestion?: string;
}

export function validateResponse(
  response: string,
  userQuery: string,
  context: any
): ValidationResult {
  const issues: ValidationIssue[] = [];
  let confidence = 1.0;

  // Check 1: Did we actually answer the question?
  if (!responseAddressesQuery(response, userQuery)) {
    issues.push({
      severity: 'error',
      category: 'clarity',
      message: 'Response may not directly address user query',
      suggestion: 'Regenerate with explicit focus on user question'
    });
    confidence -= 0.3;
  }

  // Check 2: BS 7671 regulation citations
  if (containsTechnicalInfo(response) && !containsRegulations(response)) {
    issues.push({
      severity: 'warning',
      category: 'regulatory',
      message: 'Technical response lacks BS 7671 regulation citations',
      suggestion: 'Add regulation references for compliance'
    });
    confidence -= 0.1;
  }

  // Check 3: Safety warnings where appropriate
  if (containsLiveWorkMention(response) && !containsSafetyWarning(response)) {
    issues.push({
      severity: 'error',
      category: 'safety',
      message: 'Live work mentioned without safety warning',
      suggestion: 'Add appropriate safety warnings'
    });
    confidence -= 0.2;
  }

  // Check 4: Mathematical consistency
  if (containsCalculations(response)) {
    const mathIssues = validateCalculations(response);
    issues.push(...mathIssues);
    if (mathIssues.length > 0) confidence -= 0.2;
  }

  // Check 5: Response completeness
  if (response.length < 50) {
    issues.push({
      severity: 'warning',
      category: 'clarity',
      message: 'Response may be too brief',
      suggestion: 'Provide more detail or explanation'
    });
    confidence -= 0.1;
  }

  return {
    isValid: issues.filter(i => i.severity === 'error').length === 0,
    issues,
    confidence: Math.max(0, confidence)
  };
}

function responseAddressesQuery(response: string, query: string): boolean {
  const queryKeywords = extractKeywords(query);
  const responseText = response.toLowerCase();
  
  // At least 40% of query keywords should appear in response
  const matchingKeywords = queryKeywords.filter(kw => responseText.includes(kw));
  return matchingKeywords.length / queryKeywords.length >= 0.4;
}

function extractKeywords(text: string): string[] {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'what', 'how', 'why', 'when', 'where', 'can', 'could', 'should', 'would', 'i', 'you', 'my', 'your'];
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
}

function containsTechnicalInfo(response: string): boolean {
  const technicalTerms = ['cable', 'mcb', 'rcbo', 'amp', 'volt', 'circuit', 'earth', 'fault', 'protection'];
  return technicalTerms.some(term => response.toLowerCase().includes(term));
}

function containsRegulations(response: string): boolean {
  return /reg\s*\d{3}/i.test(response) || 
         /bs\s*7671/i.test(response) ||
         /regulation\s*\d{3}/i.test(response);
}

function containsLiveWorkMention(response: string): boolean {
  const liveWorkTerms = ['live test', 'energised', 'powered up', 'live circuit', 'while live'];
  return liveWorkTerms.some(term => response.toLowerCase().includes(term));
}

function containsSafetyWarning(response: string): boolean {
  const safetyTerms = ['safe', 'caution', 'warning', 'danger', 'isolate', 'lock off', 'permit to work'];
  return safetyTerms.some(term => response.toLowerCase().includes(term));
}

function containsCalculations(response: string): boolean {
  return /\d+\s*[×x]\s*\d+/.test(response) || 
         /\d+\s*÷\s*\d+/.test(response) ||
         /\d+\.\d+\s*(amp|volt|watt|mm)/i.test(response);
}

function validateCalculations(response: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  // Check for common calculation errors
  // This is simplified - in production would use a math parser
  
  // Check voltage drop calculations
  if (response.includes('voltage drop') && response.includes('%')) {
    const percentMatch = response.match(/(\d+\.?\d*)%/);
    if (percentMatch) {
      const percent = parseFloat(percentMatch[1]);
      if (percent > 5 && !response.toLowerCase().includes('exceed')) {
        issues.push({
          severity: 'error',
          category: 'technical',
          message: `Voltage drop ${percent}% exceeds 5% limit but not flagged`,
          suggestion: 'Highlight regulation non-compliance'
        });
      }
    }
  }

  return issues;
}
