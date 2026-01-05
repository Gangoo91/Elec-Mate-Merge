
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from '@/components/ui/mobile-tabs';
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
  label = "Signature",
  value,
  onChange,
  placeholder = "Enter signature or draw digitally",
  required = false,
  className = ""
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
      <Card className="bg-card border-border">
        <MobileTabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <MobileTabsList className="bg-muted">
            <MobileTabsTrigger value="text" className="gap-1 text-xs px-3 py-2 min-h-[36px] min-w-[80px]">
              <Type className="h-3 w-3" />
              Text
            </MobileTabsTrigger>
            <MobileTabsTrigger value="draw" className="gap-1 text-xs px-3 py-2 min-h-[36px] min-w-[80px]">
              <PenTool className="h-3 w-3" />
              Draw
            </MobileTabsTrigger>
            <MobileTabsTrigger value="saved" className="gap-1 text-xs px-3 py-2 min-h-[36px] min-w-[80px]">
              <Upload className="h-3 w-3" />
              Saved
            </MobileTabsTrigger>
          </MobileTabsList>

          <div className="p-2 sm:p-3">
            <MobileTabsContent value="text" className="mt-0">
              <Input
                value={textSignature}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={placeholder}
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow h-8 text-sm"
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
                <SignaturePad
                  ref={signaturePadRef}
                  width={280}
                  height={100}
                  onSignatureChange={handleDigitalSignatureChange}
                />
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
                <p className="text-xs text-gray-400">
                  Manage your saved signatures and select one to use in this field.
                </p>
              </div>
            </MobileTabsContent>
          </div>
        </MobileTabs>
      </Card>

      {hasSignature && (
        <p className="text-xs text-green-400">
          ✓ Signature captured
        </p>
      )}
    </div>
  );
};

export default SignatureInput;
