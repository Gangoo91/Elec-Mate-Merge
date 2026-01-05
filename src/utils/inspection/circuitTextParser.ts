import { TestResult } from '@/types/testResult';
import { supabase } from '@/integrations/supabase/client';

export async function parseCircuitText(text: string): Promise<TestResult[]> {
  try {
    const { data, error } = await supabase.functions.invoke('parse-circuits', {
      body: { text }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to parse circuits');
    }

    if (!data || !data.circuits) {
      throw new Error('Invalid response from parser');
    }

    return data.circuits as TestResult[];
  } catch (error) {
    console.error('Parse circuit text error:', error);
    throw error;
  }
}
