import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  MobileTabs,
  MobileTabsList,
  MobileTabsTrigger,
  MobileTabsContent,
} from '@/components/ui/mobile-tabs';
import { PenTool, Type, Upload, X } from 'lucide-react';
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
  label = 'Signature',
  value,
  onChange,
  placeholder = 'Enter signature or draw digitally',
  required = false,
  className = '',
}: SignatureInputProps) => {
  const { getDefaultSignature } = useSignatureProfiles();
  const [activeTab, setActiveTab] = useState<'text' | 'draw' | 'saved'>('text');
  const [textSignature, setTextSignature] = useState(value || '');
  const [digitalSignature, setDigitalSignature] = useState<string | null>(null);
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

  const handleUseDefault = () => {
    const defaultSig = getDefaultSignature();
    if (defaultSig) {
      handleSavedSignatureSelect(defaultSig);
    }
  };

  const handleClearSignature = () => {
    setTextSignature('');
    setDigitalSignature(null);
    signaturePadRef.current?.clear();
    onChange?.(null);
  };

  const hasSignature = textSignature || digitalSignature;
  const defaultSignature = getDefaultSignature();

  return (
    <div className={`space-y-2 ${className}`}>
      <Card className="bg-white/[0.03] border-white/[0.08]">
        <MobileTabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <MobileTabsList className="bg-white/[0.06] w-full justify-center">
            <MobileTabsTrigger
              value="text"
              className="gap-1.5 text-sm px-4 py-2.5 min-h-[40px] flex-1 touch-manipulation"
            >
              <Type className="h-4 w-4" />
              Text
            </MobileTabsTrigger>
            <MobileTabsTrigger
              value="draw"
              className="gap-1.5 text-sm px-4 py-2.5 min-h-[40px] flex-1 touch-manipulation"
            >
              <PenTool className="h-4 w-4" />
              Draw
            </MobileTabsTrigger>
            <MobileTabsTrigger
              value="saved"
              className="gap-1.5 text-sm px-4 py-2.5 min-h-[40px] flex-1 touch-manipulation"
            >
              <Upload className="h-4 w-4" />
              Saved
            </MobileTabsTrigger>
          </MobileTabsList>

          <div className="p-3 sm:p-4">
            <MobileTabsContent value="text" className="mt-0">
              <Input
                value={textSignature}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={placeholder}
                className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/40 focus:border-elec-yellow h-11 text-base touch-manipulation"
              />
            </MobileTabsContent>

            <MobileTabsContent value="draw" className="mt-0">
              {digitalSignature ? (
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-2 flex justify-center">
                    <img
                      src={digitalSignature}
                      alt="Digital signature"
                      className="max-h-24 max-w-full object-contain"
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDigitalSignature(null);
                        signaturePadRef.current?.clear();
                      }}
                      className="text-xs h-6 px-2"
                    >
                      Redraw
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                <SignaturePad
                  ref={signaturePadRef}
                  width={300}
                  height={120}
                  onSignatureChange={handleDigitalSignatureChange}
                />
              </div>
              )}
            </MobileTabsContent>

            <MobileTabsContent value="saved" className="mt-0">
              <div className="text-center space-y-3">
                <SignatureManagerDialog
                  onSignatureSelect={handleSavedSignatureSelect}
                  trigger={
                    <Button variant="outline" className="w-full text-xs h-8">
                      <Upload className="h-3 w-3 mr-1" />
                      Select from Saved Signatures
                    </Button>
                  }
                />
                <p className="text-xs text-white/40">
                  Manage your saved signatures and select one to use in this field.
                </p>
              </div>
            </MobileTabsContent>
          </div>
        </MobileTabs>
      </Card>

      {hasSignature && <p className="text-xs text-green-400">✓ Signature captured</p>}
    </div>
  );
};

export default SignatureInput;
