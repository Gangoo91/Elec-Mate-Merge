import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'email' | 'tel' | 'textarea' | 'time';
  required?: boolean;
  options?: string[];
  currentValue?: string;
}

export interface FormRegistration {
  formId: string;
  formName: string;
  fields: FormField[];
  actions?: string[];
  onFillField: (field: string, value: string) => void;
  onAction?: (action: string, params: Record<string, unknown>) => void;
  onSubmit: () => void;
  onClear?: () => void;
  onCancel?: () => void;
  onNextStep?: () => void;
}

interface VoiceFormContextType {
  activeForm: FormRegistration | null;
  registerForm: (form: FormRegistration) => void;
  unregisterForm: (formId: string) => void;
  fillField: (field: string, value: string) => boolean;
  executeAction: (action: string, params: Record<string, unknown>) => boolean;
  submitForm: () => boolean;
  clearForm: () => boolean;
  cancelForm: () => boolean;
  nextStep: () => boolean;
  getFormContext: () => string;
}

const VoiceFormContext = createContext<VoiceFormContextType | null>(null);

// Fuzzy match helper - finds best matching field
function fuzzyMatchField(fields: FormField[], searchTerm: string): FormField | undefined {
  const search = searchTerm.toLowerCase().trim();
  
  // First try exact match on name or label
  let match = fields.find(
    (f) => f.name.toLowerCase() === search || f.label.toLowerCase() === search
  );
  if (match) return match;
  
  // Try partial match on label (most common case for voice)
  match = fields.find(
    (f) => f.label.toLowerCase().includes(search) || search.includes(f.label.toLowerCase())
  );
  if (match) return match;
  
  // Try partial match on name
  match = fields.find(
    (f) => f.name.toLowerCase().includes(search) || search.includes(f.name.toLowerCase())
  );
  if (match) return match;
  
  // Try word-by-word matching for multi-word searches
  const searchWords = search.split(/\s+/);
  if (searchWords.length > 1) {
    match = fields.find((f) => {
      const labelWords = f.label.toLowerCase().split(/\s+/);
      return searchWords.some(sw => labelWords.some(lw => lw.includes(sw) || sw.includes(lw)));
    });
    if (match) return match;
  }
  
  // Common voice recognition variations
  const variations: Record<string, string[]> = {
    'client': ['customer', 'client name', 'company'],
    'email': ['e-mail', 'mail', 'email address'],
    'phone': ['telephone', 'phone number', 'mobile', 'contact number'],
    'description': ['desc', 'details', 'notes', 'info'],
    'amount': ['value', 'price', 'cost', 'total'],
    'date': ['when', 'day'],
    'name': ['full name', 'person'],
    'title': ['heading', 'subject', 'job title'],
    'location': ['place', 'address', 'site'],
    'employee': ['worker', 'staff', 'team member'],
    'hours': ['time', 'duration'],
    'rate': ['hourly rate', 'pay rate'],
  };
  
  for (const [canonical, alts] of Object.entries(variations)) {
    if (alts.includes(search) || search === canonical) {
      match = fields.find(
        (f) => f.name.toLowerCase().includes(canonical) || f.label.toLowerCase().includes(canonical)
      );
      if (match) return match;
    }
  }
  
  return undefined;
}

export function VoiceFormProvider({ children }: { children: ReactNode }) {
  const [activeForm, setActiveForm] = useState<FormRegistration | null>(null);

  const registerForm = useCallback((form: FormRegistration) => {
    console.log('[VoiceFormContext] Registering form:', form.formName, 'with', form.fields.length, 'fields');
    setActiveForm(form);
  }, []);

  const unregisterForm = useCallback((formId: string) => {
    setActiveForm((current) => {
      if (current?.formId === formId) {
        console.log('[VoiceFormContext] Unregistering form:', formId);
        return null;
      }
      return current;
    });
  }, []);

  const fillField = useCallback((field: string, value: string): boolean => {
    if (!activeForm) {
      console.log('[VoiceFormContext] No active form to fill');
      return false;
    }
    
    // Use fuzzy matching to find the field
    const matchingField = fuzzyMatchField(activeForm.fields, field);
    
    if (matchingField) {
      console.log('[VoiceFormContext] Filling field:', matchingField.name, 'with:', value);
      activeForm.onFillField(matchingField.name, value);
      return true;
    }
    
    console.log('[VoiceFormContext] Field not found:', field, 'Available fields:', activeForm.fields.map(f => f.label).join(', '));
    return false;
  }, [activeForm]);

  const executeAction = useCallback((action: string, params: Record<string, unknown>): boolean => {
    if (!activeForm?.onAction) {
      console.log('[VoiceFormContext] No active form or action handler');
      return false;
    }
    
    // Check if action is supported (case-insensitive, underscore/dash tolerant)
    const normalizedAction = action.toLowerCase().replace(/-/g, '_');
    const availableAction = activeForm.actions?.find(
      a => a.toLowerCase().replace(/-/g, '_') === normalizedAction
    );
    
    if (!availableAction) {
      console.log('[VoiceFormContext] Action not available:', action, 'Available:', activeForm.actions);
      return false;
    }
    
    console.log('[VoiceFormContext] Executing action:', availableAction, params);
    activeForm.onAction(availableAction, params);
    return true;
  }, [activeForm]);

  const submitForm = useCallback((): boolean => {
    if (!activeForm) {
      console.log('[VoiceFormContext] No active form to submit');
      return false;
    }
    
    console.log('[VoiceFormContext] Submitting form:', activeForm.formName);
    activeForm.onSubmit();
    return true;
  }, [activeForm]);

  const clearForm = useCallback((): boolean => {
    if (!activeForm?.onClear) {
      console.log('[VoiceFormContext] No active form or clear handler');
      return false;
    }
    
    console.log('[VoiceFormContext] Clearing form:', activeForm.formName);
    activeForm.onClear();
    return true;
  }, [activeForm]);

  const cancelForm = useCallback((): boolean => {
    if (!activeForm?.onCancel) {
      console.log('[VoiceFormContext] No active form or cancel handler');
      return false;
    }
    
    console.log('[VoiceFormContext] Cancelling form:', activeForm.formName);
    activeForm.onCancel();
    return true;
  }, [activeForm]);

  const nextStep = useCallback((): boolean => {
    if (!activeForm?.onNextStep) {
      console.log('[VoiceFormContext] No active form or next step handler');
      return false;
    }
    
    console.log('[VoiceFormContext] Moving to next step:', activeForm.formName);
    activeForm.onNextStep();
    return true;
  }, [activeForm]);

  const getFormContext = useCallback((): string => {
    if (!activeForm) {
      return 'No form is currently open.';
    }
    
    const fieldDescriptions = activeForm.fields.map((f) => {
      let desc = `${f.label} (${f.name})`;
      if (f.required) desc += ' [required]';
      if (f.type === 'select' && f.options) {
        desc += ` - options: ${f.options.join(', ')}`;
      }
      if (f.currentValue) {
        desc += ` - current: "${f.currentValue}"`;
      }
      return desc;
    });
    
    let context = `FORM OPEN: "${activeForm.formName}"\nFields:\n${fieldDescriptions.join('\n')}`;
    
    if (activeForm.actions?.length) {
      context += `\nAvailable actions: ${activeForm.actions.join(', ')}`;
    }
    
    return context;
  }, [activeForm]);

  return (
    <VoiceFormContext.Provider
      value={{
        activeForm,
        registerForm,
        unregisterForm,
        fillField,
        executeAction,
        submitForm,
        clearForm,
        cancelForm,
        nextStep,
        getFormContext,
      }}
    >
      {children}
    </VoiceFormContext.Provider>
  );
}

export function useVoiceFormContext() {
  const context = useContext(VoiceFormContext);
  if (!context) {
    throw new Error('useVoiceFormContext must be used within VoiceFormProvider');
  }
  return context;
}

export function useOptionalVoiceFormContext() {
  return useContext(VoiceFormContext);
}
