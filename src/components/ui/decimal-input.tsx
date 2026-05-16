import React from 'react';

/**
 * DecimalInput — keeps a local string draft so trailing dots survive
 * re-renders, normalises comma → period (iOS UK keyboards surface a
 * comma as the decimal key), and live-commits parseable values to the
 * parent so dependent UI (totals, Add buttons) updates without
 * requiring a blur. ELE-14 / ELE-974.
 */
interface DecimalInputProps {
  value: number;
  onChange: (val: number) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  /** Optional: clamp committed values to >= 0 (default true) */
  nonNegative?: boolean;
}

export function DecimalInput({
  value,
  onChange,
  className,
  style,
  placeholder,
  nonNegative = true,
}: DecimalInputProps) {
  const [draft, setDraft] = React.useState(value === 0 ? '' : String(value));

  React.useEffect(() => {
    // Sync from parent only when the parsed draft no longer represents
    // `value` (e.g. external reset). Skipping the sync when they
    // already agree preserves a trailing dot the user is mid-typing.
    const parsedDraft = parseFloat(draft);
    const draftValue = isNaN(parsedDraft) ? 0 : parsedDraft;
    if (draftValue !== value) {
      setDraft(value === 0 ? '' : String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="text"
      inputMode="decimal"
      style={style}
      value={draft}
      placeholder={placeholder}
      onChange={(e) => {
        const val = e.target.value.replace(',', '.');
        if (val === '' || /^\d*\.?\d*$/.test(val)) {
          setDraft(val);
          if (val === '') {
            onChange(0);
          } else {
            const parsed = parseFloat(val);
            if (!isNaN(parsed) && (!nonNegative || parsed >= 0)) onChange(parsed);
          }
        }
      }}
      onBlur={() => {
        const parsed = parseFloat(draft);
        const final = isNaN(parsed) ? 0 : parsed;
        setDraft(final === 0 ? '' : String(final));
      }}
      className={className}
    />
  );
}
