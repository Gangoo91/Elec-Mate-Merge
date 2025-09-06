import { useState, useEffect, useCallback } from 'react';
import { Quote } from '@/types/quote';

const QUOTES_STORAGE_KEY = 'elec-mate-quotes';

export const useQuoteStorage = () => {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);

  // Load quotes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(QUOTES_STORAGE_KEY);
      if (stored) {
        const parsedQuotes = JSON.parse(stored);
        console.log('Loading quotes from localStorage:', parsedQuotes.length);
        
        const quotes = parsedQuotes.map((quote: any) => ({
          ...quote,
          createdAt: new Date(quote.createdAt),
          updatedAt: new Date(quote.updatedAt),
          expiryDate: new Date(quote.expiryDate),
        }));
        
        setSavedQuotes(quotes);
        console.log('Quotes loaded successfully:', quotes.length);
      }
    } catch (error) {
      console.error('Error loading quotes from storage:', error);
      // Clear corrupted data
      localStorage.removeItem(QUOTES_STORAGE_KEY);
    }
  }, []);

  // Save a new quote
  const saveQuote = useCallback((quote: Quote) => {
    try {
      // Serialize dates properly for localStorage
      const serializedQuote = {
        ...quote,
        createdAt: quote.createdAt.toISOString(),
        updatedAt: quote.updatedAt.toISOString(),
        expiryDate: quote.expiryDate.toISOString(),
      };
      
      const updatedQuotes = [quote, ...savedQuotes.filter(q => q.id !== quote.id)];
      setSavedQuotes(updatedQuotes);
      
      // Save serialized version to localStorage
      const serializedQuotes = updatedQuotes.map(q => ({
        ...q,
        createdAt: q.createdAt.toISOString(),
        updatedAt: q.updatedAt.toISOString(),
        expiryDate: q.expiryDate.toISOString(),
      }));
      
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(serializedQuotes));
      console.log('Quote saved successfully:', quote.id);
      return true;
    } catch (error) {
      console.error('Error saving quote:', error);
      return false;
    }
  }, [savedQuotes]);

  // Delete a quote
  const deleteQuote = useCallback((quoteId: string) => {
    try {
      const updatedQuotes = savedQuotes.filter(q => q.id !== quoteId);
      setSavedQuotes(updatedQuotes);
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updatedQuotes));
      return true;
    } catch (error) {
      console.error('Error deleting quote:', error);
      return false;
    }
  }, [savedQuotes]);

  // Get quote statistics
  const getQuoteStats = useCallback(() => {
    const pending = savedQuotes.filter(q => q.status === 'draft').length;
    const sent = savedQuotes.filter(q => q.status === 'sent').length;
    const approved = savedQuotes.filter(q => q.status === 'approved').length;
    
    // Calculate this month's total
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const monthlyTotal = savedQuotes
      .filter(q => q.createdAt >= thisMonth)
      .reduce((total, quote) => total + (quote.total || 0), 0);

    return {
      pending,
      sent,
      approved,
      monthlyTotal,
      totalQuotes: savedQuotes.length
    };
  }, [savedQuotes]);

  return {
    savedQuotes,
    saveQuote,
    deleteQuote,
    getQuoteStats,
  };
};