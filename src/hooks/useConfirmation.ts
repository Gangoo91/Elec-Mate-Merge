import { useState, useCallback } from 'react';

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  variant: 'default' | 'destructive' | 'warning';
  affectedItem?: string;
  onConfirm: () => void | Promise<void>;
}

const defaultState: ConfirmationState = {
  isOpen: false,
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  onConfirm: () => {},
};

interface ConfirmOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive' | 'warning';
  affectedItem?: string;
}

/**
 * Hook to manage confirmation dialogs easily.
 *
 * Usage:
 * ```tsx
 * const { confirm, ConfirmationDialogProps } = useConfirmation();
 *
 * const handleDelete = async () => {
 *   const confirmed = await confirm({
 *     title: 'Delete Item',
 *     description: 'Are you sure you want to delete this item?',
 *     variant: 'destructive',
 *     confirmText: 'Delete',
 *   });
 *
 *   if (confirmed) {
 *     // Perform delete action
 *   }
 * };
 *
 * return (
 *   <>
 *     <Button onClick={handleDelete}>Delete</Button>
 *     <ConfirmationDialog {...ConfirmationDialogProps} />
 *   </>
 * );
 * ```
 */
export function useConfirmation() {
  const [state, setState] = useState<ConfirmationState>(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setResolveRef(() => resolve);
      setState({
        isOpen: true,
        title: options.title,
        description: options.description,
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        variant: options.variant || 'default',
        affectedItem: options.affectedItem,
        onConfirm: () => {},
      });
    });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open && resolveRef) {
      resolveRef(false);
      setResolveRef(null);
    }
    setState((prev) => ({ ...prev, isOpen: open }));
  }, [resolveRef]);

  const handleConfirm = useCallback(async () => {
    if (resolveRef) {
      setIsLoading(true);
      try {
        resolveRef(true);
      } finally {
        setIsLoading(false);
        setResolveRef(null);
        setState((prev) => ({ ...prev, isOpen: false }));
      }
    }
  }, [resolveRef]);

  const ConfirmationDialogProps = {
    open: state.isOpen,
    onOpenChange: handleOpenChange,
    title: state.title,
    description: state.description,
    confirmText: state.confirmText,
    cancelText: state.cancelText,
    variant: state.variant,
    affectedItem: state.affectedItem,
    onConfirm: handleConfirm,
    loading: isLoading,
  };

  return {
    confirm,
    ConfirmationDialogProps,
    isOpen: state.isOpen,
  };
}

export default useConfirmation;
