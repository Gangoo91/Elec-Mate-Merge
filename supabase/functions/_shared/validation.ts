/**
 * Request Validation Framework
 * Provides runtime schema validation using Zod
 */

import { ValidationError } from './errors.ts';

// Note: Using a lightweight validation approach to avoid external deps issues
// Can upgrade to Zod if Deno import stability improves

/**
 * Message Schema
 */
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Agent Request Schema
 */
export interface AgentRequest {
  messages: Message[];
  currentDesign?: any;
  conversationalMode?: boolean;
  selectedAgents?: string[];
  targetAgent?: string;
}

/**
 * Validate Message
 */
function validateMessage(msg: any): msg is Message {
  if (!msg || typeof msg !== 'object') return false;
  if (!['user', 'assistant', 'system'].includes(msg.role)) return false;
  if (typeof msg.content !== 'string' || msg.content.length === 0) return false;
  return true;
}

/**
 * Validate Agent Request
 */
export function validateAgentRequest(data: any): AgentRequest {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Request body must be an object');
  }

  // Validate messages array
  if (!Array.isArray(data.messages)) {
    throw new ValidationError('messages must be an array');
  }

  if (data.messages.length === 0) {
    throw new ValidationError('messages array cannot be empty');
  }

  // Validate each message
  const invalidMessages = data.messages.filter((msg: any) => !validateMessage(msg));
  if (invalidMessages.length > 0) {
    throw new ValidationError('Invalid message format', {
      invalidCount: invalidMessages.length,
      example: invalidMessages[0]
    });
  }

  // Validate optional fields
  if (data.conversationalMode !== undefined && typeof data.conversationalMode !== 'boolean') {
    throw new ValidationError('conversationalMode must be a boolean');
  }

  if (data.selectedAgents !== undefined) {
    if (!Array.isArray(data.selectedAgents)) {
      throw new ValidationError('selectedAgents must be an array');
    }
    const invalidAgents = data.selectedAgents.filter((a: any) => typeof a !== 'string');
    if (invalidAgents.length > 0) {
      throw new ValidationError('selectedAgents must contain only strings');
    }
  }

  if (data.targetAgent !== undefined && typeof data.targetAgent !== 'string') {
    throw new ValidationError('targetAgent must be a string');
  }

  return data as AgentRequest;
}

/**
 * Validate Request Body Exists
 */
export async function getRequestBody(req: Request): Promise<any> {
  try {
    const body = await req.json();
    if (!body) {
      throw new ValidationError('Request body is required');
    }
    return body;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw new ValidationError('Invalid JSON in request body');
  }
}

/**
 * Common Field Validators
 */
export const validators = {
  email: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  uuid: (id: string): boolean => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  },
  
  notEmpty: (str: string): boolean => {
    return typeof str === 'string' && str.trim().length > 0;
  },
  
  inRange: (num: number, min: number, max: number): boolean => {
    return typeof num === 'number' && num >= min && num <= max;
  }
};
