/**
 * Centralised keyboard event guards for preventing shortcuts in typing contexts
 * 
 * This utility provides consistent typing context detection across the application
 * to ensure keyboard shortcuts don't interfere with user input in forms and editable fields.
 */

/**
 * Check if an element is editable (input, textarea, contenteditable, etc.)
 */
export const isEditable = (el: HTMLElement | null | undefined): boolean => {
  if (!el) return false;
  
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement ||
    el.isContentEditable ||
    el.matches('[contenteditable="true"], input, textarea, select, [role="textbox"]') ||
    !!el.closest('[contenteditable="true"], input, textarea, select, [role="textbox"]')
  );
};

/**
 * Check if we're in a typing context where shortcuts should be disabled
 * This includes:
 * - Input fields, textareas, selects
 * - Contenteditable elements
 * - Elements with .prevent-shortcuts class
 * - Form contexts
 * - Radix UI Select triggers and comboboxes
 */
export const isTypingContext = (target?: EventTarget | null): boolean => {
  const element = target as HTMLElement | null;
  const activeElement = document.activeElement as HTMLElement | null;
  
  // Check the event target
  if (element && (
    isEditable(element) ||
    element.closest('.prevent-shortcuts') ||
    element.closest('form, [role="form"]') ||
    element.closest('[role="combobox"], [data-radix-select-trigger]')
  )) {
    return true;
  }
  
  // Check the currently focused element
  if (activeElement && (
    isEditable(activeElement) ||
    activeElement.closest('.prevent-shortcuts') ||
    activeElement.closest('form, [role="form"]') ||
    activeElement.closest('[role="combobox"], [data-radix-select-trigger]')
  )) {
    return true;
  }
  
  return false;
};

/**
 * Check if an element is a form control
 * Special-case checkbox/radio so we never prevent default ticking behaviour
 */
export const isFormControl = (el: HTMLElement | null | undefined): boolean => {
  if (!el) return false;
  
  if (el instanceof HTMLInputElement) {
    const type = el.type.toLowerCase();
    // Don't treat checkboxes/radios as typing contexts - they need Space for toggling
    return !['checkbox', 'radio', 'button', 'submit', 'reset', 'file'].includes(type);
  }
  
  return el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement;
};

/**
 * Check if Space key should be allowed (for accessibility)
 * Returns true if Space should trigger default behaviour (e.g., for buttons, checkboxes)
 */
export const shouldAllowSpaceDefault = (target?: EventTarget | null): boolean => {
  const element = target as HTMLElement | null;
  if (!element) return false;
  
  // Allow Space for buttons, checkboxes, radios when focused
  if (element instanceof HTMLButtonElement) return true;
  if (element instanceof HTMLInputElement) {
    const type = element.type.toLowerCase();
    if (['checkbox', 'radio', 'button', 'submit', 'reset'].includes(type)) return true;
  }
  
  // Allow Space for elements with explicit button role
  if (element.matches('[role="button"], [role="checkbox"], [role="radio"]')) return true;
  
  return false;
};
