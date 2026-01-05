import { useEffect, useCallback } from "react";

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutHandler[], enabled = true) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      // Exception for Escape and Cmd/Ctrl+K
      if (event.key !== "Escape" && !(event.key === "k" && (event.metaKey || event.ctrlKey))) {
        return;
      }
    }

    for (const shortcut of shortcuts) {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : (!event.ctrlKey && !event.metaKey);
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;
      const metaMatch = shortcut.meta ? event.metaKey : true; // meta is optional

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault();
        shortcut.handler();
        break;
      }
    }
  }, [shortcuts, enabled]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

// Predefined shortcuts for College Dashboard
export const defaultCollegeShortcuts = {
  // Navigation shortcuts (g + key for "go to")
  goToOverview: { key: "o", description: "Go to Overview" },
  goToPeople: { key: "p", description: "Go to People Hub" },
  goToCurriculum: { key: "c", description: "Go to Curriculum Hub" },
  goToAssessment: { key: "a", description: "Go to Assessment Hub" },
  goToResources: { key: "r", description: "Go to Resources Hub" },

  // Action shortcuts
  search: { key: "k", ctrl: true, description: "Open search" },
  newItem: { key: "n", ctrl: true, description: "New item" },
  escape: { key: "Escape", description: "Close dialog / Go back" },

  // Quick actions
  quickGrade: { key: "g", shift: true, description: "Quick grade" },
  quickAttendance: { key: "t", shift: true, description: "Take attendance" },
};
