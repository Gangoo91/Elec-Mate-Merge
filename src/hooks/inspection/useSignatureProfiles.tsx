
import { useState, useEffect } from 'react';
import { offlineStorage } from '@/utils/offlineStorage';

export interface SignatureProfile {
  id: string;
  name: string;
  signatureData: string;
  createdAt: string;
  isDefault: boolean;
}

export const useSignatureProfiles = () => {
  const [signatures, setSignatures] = useState<SignatureProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSignatures();
  }, []);

  const loadSignatures = async () => {
    try {
      const stored = await offlineStorage.getSignatureProfiles();
      setSignatures(stored);
    } catch (error) {
      console.error('Failed to load signature profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSignatures = async (newSignatures: SignatureProfile[]) => {
    try {
      // Save each profile to IndexedDB
      for (const profile of newSignatures) {
        await offlineStorage.saveSignatureProfile(profile);
      }
      setSignatures(newSignatures);
    } catch (error) {
      console.error('Failed to save signature profiles:', error);
    }
  };

  const addSignature = (signature: Omit<SignatureProfile, 'id' | 'createdAt'>) => {
    const newSignature: SignatureProfile = {
      ...signature,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const updatedSignatures = [...signatures, newSignature];
    
    // If this is set as default, remove default from others
    if (newSignature.isDefault) {
      updatedSignatures.forEach(s => {
        if (s.id !== newSignature.id) s.isDefault = false;
      });
    }

    saveSignatures(updatedSignatures);
    return newSignature;
  };

  const updateSignature = (id: string, updates: Partial<SignatureProfile>) => {
    const updatedSignatures = signatures.map(signature => 
      signature.id === id ? { ...signature, ...updates } : signature
    );

    // Handle default setting
    if (updates.isDefault) {
      updatedSignatures.forEach(s => {
        if (s.id !== id) s.isDefault = false;
      });
    }

    saveSignatures(updatedSignatures);
  };

  const deleteSignature = (id: string) => {
    const updatedSignatures = signatures.filter(signature => signature.id !== id);
    saveSignatures(updatedSignatures);
  };

  const getDefaultSignature = (): SignatureProfile | null => {
    return signatures.find(signature => signature.isDefault) || null;
  };

  const setDefaultSignature = (id: string) => {
    const updatedSignatures = signatures.map(signature => ({
      ...signature,
      isDefault: signature.id === id
    }));
    saveSignatures(updatedSignatures);
  };

  return {
    signatures,
    isLoading,
    addSignature,
    updateSignature,
    deleteSignature,
    getDefaultSignature,
    setDefaultSignature,
  };
};
