import { useState, useCallback, useRef } from "react";

type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
  custom?: (value: string) => string | null;
};

type FieldState = {
  value: string;
  error: string | null;
  touched: boolean;
  valid: boolean;
};

type FieldConfig = Record<string, ValidationRule>;

/**
 * useFieldValidation — Inline field validation for safety tool forms.
 *
 * Validates on blur (touched) and on change (if already touched).
 * Provides `validateAll()` for submit-time check + auto-scroll to first error.
 *
 * @example
 * const v = useFieldValidation({
 *   site_name: { required: true, message: 'Site name is required' },
 *   email: { pattern: /^.+@.+\..+$/, message: 'Valid email required' },
 * });
 *
 * <input
 *   value={v.fields.site_name.value}
 *   onChange={e => v.setValue('site_name', e.target.value)}
 *   onBlur={() => v.setTouched('site_name')}
 *   ref={v.registerRef('site_name')}
 * />
 * {v.fields.site_name.error && <p>{v.fields.site_name.error}</p>}
 *
 * const handleSubmit = () => {
 *   if (!v.validateAll()) return;
 * };
 */
export function useFieldValidation(config: FieldConfig) {
  const [fields, setFields] = useState<Record<string, FieldState>>(() => {
    const initial: Record<string, FieldState> = {};
    for (const key of Object.keys(config)) {
      initial[key] = { value: "", error: null, touched: false, valid: false };
    }
    return initial;
  });

  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const validateSingleField = useCallback(
    (name: string, value: string): string | null => {
      const rule = config[name];
      if (!rule) return null;

      if (rule.required && !value.trim()) {
        return rule.message ?? "This field is required";
      }
      if (rule.minLength && value.trim().length < rule.minLength) {
        return `Minimum ${rule.minLength} characters`;
      }
      if (rule.maxLength && value.trim().length > rule.maxLength) {
        return `Maximum ${rule.maxLength} characters`;
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message ?? "Invalid format";
      }
      if (rule.custom) {
        return rule.custom(value);
      }
      return null;
    },
    [config]
  );

  const setValue = useCallback(
    (name: string, value: string) => {
      setFields((prev) => {
        const error = prev[name]?.touched
          ? validateSingleField(name, value)
          : null;
        return {
          ...prev,
          [name]: {
            value,
            error,
            touched: prev[name]?.touched ?? false,
            valid: !validateSingleField(name, value),
          },
        };
      });
    },
    [validateSingleField]
  );

  const setTouched = useCallback(
    (name: string) => {
      setFields((prev) => {
        const value = prev[name]?.value ?? "";
        const error = validateSingleField(name, value);
        return {
          ...prev,
          [name]: {
            ...prev[name],
            touched: true,
            error,
            valid: !error,
          },
        };
      });
    },
    [validateSingleField]
  );

  const registerRef = useCallback(
    (name: string) => (el: HTMLElement | null) => {
      fieldRefs.current[name] = el;
    },
    []
  );

  const validateAll = useCallback((): boolean => {
    let firstErrorName: string | null = null;

    setFields((prev) => {
      const next = { ...prev };
      for (const name of Object.keys(config)) {
        const value = next[name]?.value ?? "";
        const error = validateSingleField(name, value);
        next[name] = { value, error, touched: true, valid: !error };
        if (error && !firstErrorName) {
          firstErrorName = name;
        }
      }
      return next;
    });

    // Scroll to first error field
    if (firstErrorName) {
      const el = fieldRefs.current[firstErrorName];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    return true;
  }, [config, validateSingleField]);

  const reset = useCallback(() => {
    const initial: Record<string, FieldState> = {};
    for (const key of Object.keys(config)) {
      initial[key] = { value: "", error: null, touched: false, valid: false };
    }
    setFields(initial);
  }, [config]);

  const isValid = Object.keys(config).every(
    (k) => !validateSingleField(k, fields[k]?.value ?? "")
  );

  return {
    fields,
    setValue,
    setTouched,
    validateAll,
    reset,
    registerRef,
    isValid,
  };
}

export type FieldValidation = ReturnType<typeof useFieldValidation>;
