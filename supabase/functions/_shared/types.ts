// TypeScript strict mode fixes for edge functions
// This file provides common type fixes and utilities

// Fix for unknown error types in catch blocks
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
}

// Fix for array type annotations
export type AnyArray = any[];

// Fix for object with string index
export type StringIndexedObject = Record<string, any>;

// Common FireCrawl response type
export interface FireCrawlResponse {
  success: boolean;
  data?: {
    markdown?: string;
    extract?: any;
    [key: string]: any;
  };
  error?: string;
}

export {};