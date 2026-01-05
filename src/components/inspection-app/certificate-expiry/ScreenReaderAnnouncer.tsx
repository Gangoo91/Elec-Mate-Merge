import { useEffect, useRef } from 'react';

interface ScreenReaderAnnouncerProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}

export const ScreenReaderAnnouncer = ({ 
  message, 
  politeness = 'polite' 
}: ScreenReaderAnnouncerProps) => {
  const previousMessage = useRef('');

  useEffect(() => {
    // Only announce if message has changed
    if (message && message !== previousMessage.current) {
      previousMessage.current = message;
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};
