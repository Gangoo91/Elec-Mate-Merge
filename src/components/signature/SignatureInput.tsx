import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { PenTool, Type, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignaturePad, { SignaturePadRef } from './SignaturePad';
import SignatureManagerDialog from './SignatureManagerDialog';
import { useSignatureProfiles, SignatureProfile } from '@/hooks/useSignatureProfiles';

interface SignatureInputProps {
  label?: string;
  value?: string;
  onChange?: (signature: string | null) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const SignatureInput = ({
  value,
  onChange,
  placeholder = 'Type your name',
  className = '',
}: SignatureInputProps) => {
  const { getDefaultSignature } = useSignatureProfiles();
  const isBase64Image = value?.startsWith('data:image');
  const [activeTab, setActiveTab] = useState<'text' | 'draw' | 'saved'>(isBase64Image ? 'draw' : 'text');
  const [textSignature, setTextSignature] = useState(isBase64Image ? '' : (value || ''));
  const [digitalSignature, setDigitalSignature] = useState<string | null>(isBase64Image ? value! : null);
  const signaturePadRef = useRef<SignaturePadRef>(null);

  /*
   * `value` is owned by the parent form, but the text/draw state above is local
   * and was only ever seeded by the useState initialisers — i.e. once, at mount.
   * So when a parent filled the field AFTER mount ("Load from business profile"
   * on the certs), `value` updated but this component kept rendering its stale
   * empty state, and the signature looked like it hadn't loaded. Every other
   * field on those forms is a plain controlled input, which is why the signature
   * was the only one that appeared to fail.
   *
   * We track the last value we emitted so that only *external* changes are
   * adopted — otherwise this would fight the user mid-keystroke.
   */
  const lastEmittedRef = useRef<string | null>(value ?? null);

  useEffect(() => {
    const incoming = value ?? null;
    if (incoming === lastEmittedRef.current) return;
    lastEmittedRef.current = incoming;

    const incomingIsImage = !!incoming?.startsWith('data:image');
    setDigitalSignature(incomingIsImage ? incoming : null);
    setTextSignature(incomingIsImage ? '' : (incoming ?? ''));
    // Only jump tabs when there is actually something to show, so clearing the
    // field doesn't yank the user out of the tab they were working in.
    if (incoming) setActiveTab(incomingIsImage ? 'draw' : 'text');
  }, [value]);

  const handleTextChange = (text: string) => {
    lastEmittedRef.current = text || null;
    setTextSignature(text);
    onChange?.(text || null);
  };

  const handleDigitalSignatureChange = (signature: string | null) => {
    lastEmittedRef.current = signature;
    setDigitalSignature(signature);
    onChange?.(signature);
  };

  const handleSavedSignatureSelect = (signature: SignatureProfile) => {
    lastEmittedRef.current = signature.signatureData;
    setDigitalSignature(signature.signatureData);
    onChange?.(signature.signatureData);
    setActiveTab('draw');
  };

  const hasSignature = textSignature || digitalSignature;

  const tabs = [
    { value: 'text' as const, label: 'Text', icon: Type },
    { value: 'draw' as const, label: 'Draw', icon: PenTool },
    { value: 'saved' as const, label: 'Saved', icon: Upload },
  ];

  return (
    <div className={cn('space-y-2', className)}>
      {/* Tab toggles */}
      <div className="grid grid-cols-3 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'h-9 rounded-lg font-semibold text-[11px] transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5',
              activeTab === tab.value
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            <tab.icon className="h-3 w-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'text' && (
        <Input
          value={textSignature}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          /*
           * A signature is a proper name on a legal document: capitalise each
           * word, but keep autocorrect and spell check OFF. Autocorrect happily
           * "fixes" surnames into real words, and this value is printed onto
           * the certificate — a mangled name there is a defective cert.
           */
          autoCapitalize="words"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="name"
          className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow"
        />
      )}

      {activeTab === 'draw' && (
        digitalSignature ? (
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-2 flex justify-center">
              <img src={digitalSignature} alt="Signature" className="max-h-20 max-w-full object-contain" />
            </div>
            <button
              type="button"
              onClick={() => {
                // Must clear the PARENT too, not just the local preview. Clearing
                // only local state left the form still holding the old signature
                // while the UI showed an empty pad — so a cert could be issued
                // with a signature the user believed they had removed.
                handleDigitalSignatureChange(null);
                signaturePadRef.current?.clear();
              }}
              className="w-full h-11 rounded-lg text-[11px] font-medium bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98] sm:h-8"
            >
              Redraw
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <SignaturePad
              ref={signaturePadRef}
              width={300}
              height={100}
              onSignatureChange={handleDigitalSignatureChange}
            />
          </div>
        )
      )}

      {activeTab === 'saved' && (
        <SignatureManagerDialog
          onSignatureSelect={handleSavedSignatureSelect}
          trigger={
            <button
              type="button"
              className="w-full h-11 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Upload className="h-3.5 w-3.5" />
              Select from Saved Signatures
            </button>
          }
        />
      )}

      {hasSignature && <p className="text-[10px] text-green-400">✓ Signature captured</p>}
    </div>
  );
};

export default SignatureInput;
