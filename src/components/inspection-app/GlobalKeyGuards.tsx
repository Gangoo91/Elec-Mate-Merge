import { useEffect } from 'react';
import { isTypingContext, shouldAllowSpaceDefault } from '@/utils/keyboardGuards';

/**
 * GlobalKeyGuards prevents Space from scrolling the page by default,
 * allowing Space only in typing contexts (inputs, textareas, etc.) or
 * on accessible controls (buttons, checkboxes, radios).
 * 
 * This component uses a capture-phase listener at document level to
 * intercept Space before any other handlers, ensuring it works reliably
 * everywhere in the app.
 */
export const GlobalKeyGuards = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle Space key (cover both key and code for reliability)
      if (e.key !== ' ' && e.code !== 'Space') {
        return;
      }

      const target = e.target as HTMLElement | null;

      // Allow Space in typing contexts (inputs, textareas, contenteditable, etc.)
      if (isTypingContext(target)) {
        return;
      }

      // Allow Space on accessible controls (buttons, checkboxes, radios)
      // This preserves keyboard accessibility
      if (shouldAllowSpaceDefault(target)) {
        return;
      }

      // Block Space from scrolling the page or triggering any other default behavior
      e.preventDefault();
    };

    // Use capture phase to intercept Space before any other handlers
    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  // This component renders nothing, it only sets up the event listener
  return null;
};
