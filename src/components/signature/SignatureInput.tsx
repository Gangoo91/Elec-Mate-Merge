import React, { useState, useRef } from 'react';
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

  const handleTextChange = (text: string) => {
    setTextSignature(text);
    onChange?.(text || null);
  };

  const handleDigitalSignatureChange = (signature: string | null) => {
    setDigitalSignature(signature);
    onChange?.(signature);
  };

  const handleSavedSignatureSelect = (signature: SignatureProfile) => {
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
              onClick={() => { setDigitalSignature(null); signaturePadRef.current?.clear(); }}
              className="w-full h-8 rounded-lg text-[10px] font-medium bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98]"
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
