/**
 * Centralized Error Handling for Circuit Designer
 */

import { corsHeaders } from '../_shared/deps.ts';

export type ErrorCode = 
  | 'INVALID_INPUT'
  | 'NO_CIRCUITS'
  | 'INCOMPLETE_DESIGN'
  | 'NON_COMPLIANT_DESIGN'
  | 'RAG_SEARCH_FAILED'
  | 'AI_TIMEOUT'
  | 'INVALID_CIRCUITS'
  | 'INTERNAL_ERROR';

export interface DesignError {
  code: ErrorCode;
  userMessage: string;
  technicalDetails?: any;
  recoverySuggestions: string[];
  helpLink?: string;
}

export class CircuitDesignError extends Error {
  constructor(
    public code: ErrorCode,
    public userMessage: string,
    public technicalDetails: any = {},
    public recoverySuggestions: string[] = []
  ) {
    super(userMessage);
    this.name = 'CircuitDesignError';
  }

  toResponse(version: string = 'v3.6.0-timeout-fix'): Response {
    return new Response(
      JSON.stringify({
        version,
        success: false,
        error: this.code,
        message: this.userMessage,
        suggestions: this.recoverySuggestions,
        technicalDetails: this.technicalDetails,
        helpLink: this.getHelpLink()
      }),
      {
        status: this.getStatusCode(),
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  private getStatusCode(): number {
    switch (this.code) {
      case 'INVALID_INPUT':
        return 400;
      case 'NON_COMPLIANT_DESIGN':
      case 'INCOMPLETE_DESIGN':
        return 400;
      case 'AI_TIMEOUT':
      case 'RAG_SEARCH_FAILED':
        return 503;
      case 'INTERNAL_ERROR':
        return 500;
      default:
        return 400;
    }
  }

  private getHelpLink(): string {
    const baseUrl = 'https://docs.lovable.dev/help';
    switch (this.code) {
      case 'INVALID_INPUT':
        return `${baseUrl}/invalid-input`;
      case 'NO_CIRCUITS':
        return `${baseUrl}/no-circuits-generated`;
      case 'NON_COMPLIANT_DESIGN':
        return `${baseUrl}/compliance-errors`;
      default:
        return baseUrl;
    }
  }
}

/**
 * Pre-defined error templates with recovery suggestions
 */
export const ERROR_TEMPLATES = {
  NO_CIRCUITS: (inputCount: number, hasPrompt: boolean): CircuitDesignError => {
    const suggestions = hasPrompt 
      ? [
          'Be more specific: "3 socket rings, 2 lighting circuits, 9.5kW shower"',
          'Mention room types: "kitchen, bathroom, 2 bedrooms"',
          'Include power ratings: "7.2kW cooker, 7kW EV charger"',
          'Or use the manual circuit builder to add circuits one by one'
        ]
      : [
          'Add circuits using the circuit builder',
          'OR describe your installation in the prompt field',
          'Example: "3-bedroom house with kitchen, bathroom, and outdoor lights"'
        ];
        
    return new CircuitDesignError(
      'NO_CIRCUITS',
      hasPrompt 
        ? 'Could not understand your circuit description'
        : 'No circuits to design',
      {
        inputCircuitCount: inputCount,
        hasAdditionalPrompt: hasPrompt
      },
      suggestions
    );
  },

  INCOMPLETE_DESIGN: (missing: string[], received: number, requested: number): CircuitDesignError => {
    return new CircuitDesignError(
      'INCOMPLETE_DESIGN',
      `Design incomplete: ${missing.length} circuits could not be designed`,
      {
        missingCircuits: missing,
        receivedCount: received,
        requestedCount: requested
      },
      [
        'High-power circuits (shower, EV, cooker) need specific details',
        'Provide exact kW ratings (e.g., "9.5kW shower", "7kW EV charger")',
        'Specify cable types for outdoor/industrial circuits',
        'Try designing complex circuits individually'
      ]
    );
  },

  RAG_SEARCH_FAILED: (failedTypes: string[]): CircuitDesignError => {
    return new CircuitDesignError(
      'RAG_SEARCH_FAILED',
      'Unable to retrieve circuit design regulations',
      {
        failedSearches: failedTypes
      },
      [
        'This is a temporary service issue',
        'Try again in a few moments',
        'If the issue persists, contact support'
      ]
    );
  }
};
