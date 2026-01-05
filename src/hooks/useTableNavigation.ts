import { useCallback } from 'react';

interface UseTableNavigationProps {
  totalRows: number;
  totalColumns: number;
}

export const useTableNavigation = ({ totalRows, totalColumns }: UseTableNavigationProps) => {
  const focusCell = useCallback((rowIndex: number, columnIndex: number) => {
    // Find the cell element
    const rows = document.querySelectorAll('[data-circuit-id]');
    if (rowIndex < 0 || rowIndex >= rows.length) return;

    const targetRow = rows[rowIndex];
    const inputs = targetRow.querySelectorAll('input, select');
    
    if (columnIndex < 0 || columnIndex >= inputs.length) return;
    
    const targetInput = inputs[columnIndex] as HTMLElement;
    targetInput?.focus();
  }, []);

  const getCurrentPosition = useCallback((element: HTMLElement) => {
    // Find the row
    const row = element.closest('[data-circuit-id]');
    if (!row) return null;

    const rows = Array.from(document.querySelectorAll('[data-circuit-id]'));
    const rowIndex = rows.indexOf(row);

    // Find the column
    const inputs = Array.from(row.querySelectorAll('input, select'));
    const columnIndex = inputs.indexOf(element);

    return { rowIndex, columnIndex };
  }, []);

  const navigate = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right', currentElement: HTMLElement) => {
      const position = getCurrentPosition(currentElement);
      if (!position) return;

      const { rowIndex, columnIndex } = position;

      switch (direction) {
        case 'up':
          focusCell(rowIndex - 1, columnIndex);
          break;
        case 'down':
          focusCell(rowIndex + 1, columnIndex);
          break;
        case 'left':
          focusCell(rowIndex, columnIndex - 1);
          break;
        case 'right':
          focusCell(rowIndex, columnIndex + 1);
          break;
      }
    },
    [focusCell, getCurrentPosition]
  );

  return { navigate, focusCell };
};
