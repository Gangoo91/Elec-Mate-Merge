
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileTabs, MobileTabsContent, MobileTabsList, MobileTabsTrigger } from '@/components/ui/mobile-tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { PenTool, Trash2, Star, Plus, Eye } from 'lucide-react';
import SignaturePad, { SignaturePadRef } from './SignaturePad';
import { useSignatureProfiles, SignatureProfile } from '@/hooks/useSignatureProfiles';
import { useToast } from '@/hooks/use-toast';

interface SignatureManagerDialogProps {
  onSignatureSelect?: (signature: SignatureProfile) => void;
  trigger?: React.ReactNode;
}

const SignatureManagerDialog = ({ onSignatureSelect, trigger }: SignatureManagerDialogProps) => {
  const { signatures, addSignature, updateSignature, deleteSignature, setDefaultSignature } = useSignatureProfiles();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newSignatureName, setNewSignatureName] = useState('');
  const [activeTab, setActiveTab] = useState('manage');
  const signaturePadRef = useRef<SignaturePadRef>(null);

  const handleSaveSignature = () => {
    const signatureData = signaturePadRef.current?.getSignature();
    
    if (!signatureData) {
      toast({
        title: "No signature",
        description: "Please draw a signature before saving.",
        variant: "destructive",
      });
      return;
    }

    if (!newSignatureName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for the signature.",
        variant: "destructive",
      });
      return;
    }

    const newSignature = addSignature({
      name: newSignatureName.trim(),
      signatureData,
      isDefault: signatures.length === 0, // First signature becomes default
    });

    toast({
      title: "Signature saved",
      description: `Signature "${newSignature.name}" has been saved.`,
    });

    setNewSignatureName('');
    signaturePadRef.current?.clear();
    setActiveTab('manage');
  };

  const handleSetDefault = (id: string) => {
    setDefaultSignature(id);
    toast({
      title: "Default signature updated",
      description: "The selected signature is now your default.",
    });
  };

  const handleDeleteSignature = (id: string, name: string) => {
    deleteSignature(id);
    toast({
      title: "Signature deleted",
      description: `Signature "${name}" has been deleted.`,
    });
  };

  const handleSelectSignature = (signature: SignatureProfile) => {
    onSignatureSelect?.(signature);
    setIsOpen(false);
    toast({
      title: "Signature selected",
      description: `Using signature: ${signature.name}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <PenTool className="h-4 w-4" />
            Manage Signatures
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-elec-yellow" />
            Digital Signature Manager
          </DialogTitle>
          <DialogDescription>
            Create, manage, and organise your digital signatures for EICR documents.
          </DialogDescription>
        </DialogHeader>

        <MobileTabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <MobileTabsList className="grid w-full grid-cols-2">
            <MobileTabsTrigger value="manage">Manage Signatures</MobileTabsTrigger>
            <MobileTabsTrigger value="create">Create New</MobileTabsTrigger>
          </MobileTabsList>

          <MobileTabsContent value="manage" className="space-y-4">
            {signatures.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <PenTool className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No signatures saved</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first digital signature to use in EICR documents.
                  </p>
                  <Button onClick={() => setActiveTab('create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Signature
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {signatures.map((signature) => (
                  <Card key={signature.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          {signature.name}
                          {signature.isDefault && (
                            <Badge variant="default" className="gap-1">
                              <Star className="h-3 w-3" />
                              Default
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSelectSignature(signature)}
                            className="gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            Use
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetDefault(signature.id)}
                            disabled={signature.isDefault}
                          >
                            <Star className={`h-4 w-4 ${signature.isDefault ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSignature(signature.id, signature.name)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white/5 rounded-lg p-4 flex justify-center">
                        <img
                          src={signature.signatureData}
                          alt={`Signature: ${signature.name}`}
                          className="max-h-24 max-w-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Created: {new Date(signature.createdAt).toLocaleDateString('en-GB')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </MobileTabsContent>

          <MobileTabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Signature</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signatureName">Signature Name</Label>
                  <Input
                    id="signatureName"
                    value={newSignatureName}
                    onChange={(e) => setNewSignatureName(e.target.value)}
                    placeholder="e.g., John Smith - Main Signature"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Draw Your Signature</Label>
                  <SignaturePad
                    ref={signaturePadRef}
                    width={500}
                    height={200}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => signaturePadRef.current?.clear()}
                  >
                    Clear
                  </Button>
                  <Button onClick={handleSaveSignature}>
                    Save Signature
                  </Button>
                </div>
              </CardContent>
            </Card>
          </MobileTabsContent>
        </MobileTabs>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureManagerDialog;
