import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export type VerificationTier = "basic" | "verified" | "premium";
export type VerificationStatus = "pending" | "verified" | "rejected" | "expired";
export type DocumentType = "ecs_card" | "qualification" | "training" | "cscs" | "driving_licence" | "insurance";

export interface ElecIdDocument {
  id: string;
  profile_id: string;
  document_type: DocumentType;
  document_name: string;
  issuing_body?: string;
  document_number?: string;
  issue_date?: string;
  expiry_date?: string;
  file_url?: string;
  verification_status: VerificationStatus;
  verification_method?: string;
  verification_confidence?: number;
  verified_at?: string;
  verified_by?: string;
  rejection_reason?: string;
  extracted_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ElecIdProfile {
  id: string;
  employee_id: string;
  elec_id_number?: string;
  ecs_card_type?: string;
  ecs_card_number?: string;
  ecs_expiry_date?: string;
  bio?: string;
  specialisations?: string[];
  profile_views?: number;
  shareable_link?: string;
  is_verified?: boolean;
  verified_at?: string;
  verified_by?: string;
  verification_tier: VerificationTier;
  tier_updated_at?: string;
  opt_out: boolean;
  available_for_hire: boolean;
  profile_visibility: "public" | "employers_only" | "private";
  created_at: string;
  updated_at: string;
}

export interface TierProgress {
  current: VerificationTier;
  verifiedDocuments: number;
  totalRequired: {
    basic: number;
    verified: number;
    premium: number;
  };
  missingForNextTier: string[];
  percentToNextTier: number;
}

// Tier requirements configuration
const TIER_REQUIREMENTS = {
  basic: {
    label: "Basic",
    requirements: ["Profile created", "Email verified"],
  },
  verified: {
    label: "Verified",
    requirements: ["ECS Card verified", "1+ qualification verified"],
  },
  premium: {
    label: "Premium",
    requirements: [
      "ECS Card verified",
      "2+ qualifications verified",
      "Insurance verified",
      "Driving licence verified",
    ],
  },
};

export function useDocumentVerification() {
  const { user } = useAuth();
  const [elecIdProfile, setElecIdProfile] = useState<ElecIdProfile | null>(null);
  const [documents, setDocuments] = useState<ElecIdDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Elec-ID profile
  const fetchProfile = useCallback(async () => {
    if (!user?.id) return null;

    try {
      const { data, error } = await supabase
        .from("employer_elec_id_profiles")
        .select("*")
        .eq("employee_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      return data as ElecIdProfile | null;
    } catch (err: any) {
      console.error("Error fetching Elec-ID profile:", err);
      return null;
    }
  }, [user?.id]);

  // Fetch documents for profile
  const fetchDocuments = useCallback(async (profileId: string) => {
    try {
      const { data, error } = await supabase
        .from("elec_id_documents")
        .select("*")
        .eq("profile_id", profileId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data as ElecIdDocument[]) || [];
    } catch (err: any) {
      console.error("Error fetching documents:", err);
      return [];
    }
  }, []);

  // Calculate verification tier based on documents
  const calculateTier = useCallback((docs: ElecIdDocument[]): VerificationTier => {
    const verifiedDocs = docs.filter((d) => d.verification_status === "verified");

    const hasECS = verifiedDocs.some((d) => d.document_type === "ecs_card");
    const qualCount = verifiedDocs.filter((d) => d.document_type === "qualification").length;
    const hasInsurance = verifiedDocs.some((d) => d.document_type === "insurance");
    const hasDrivingLicence = verifiedDocs.some((d) => d.document_type === "driving_licence");

    if (hasECS && qualCount >= 2 && hasInsurance && hasDrivingLicence) {
      return "premium";
    }
    if (hasECS && qualCount >= 1) {
      return "verified";
    }
    return "basic";
  }, []);

  // Calculate tier progress
  const calculateTierProgress = useCallback(
    (docs: ElecIdDocument[], currentTier: VerificationTier): TierProgress => {
      const verifiedDocs = docs.filter((d) => d.verification_status === "verified");

      const hasECS = verifiedDocs.some((d) => d.document_type === "ecs_card");
      const qualCount = verifiedDocs.filter((d) => d.document_type === "qualification").length;
      const hasInsurance = verifiedDocs.some((d) => d.document_type === "insurance");
      const hasDrivingLicence = verifiedDocs.some((d) => d.document_type === "driving_licence");

      const missingForNextTier: string[] = [];
      let percentToNextTier = 0;

      if (currentTier === "basic") {
        // To get to verified: need ECS + 1 qual
        if (!hasECS) missingForNextTier.push("ECS Card");
        if (qualCount < 1) missingForNextTier.push("1 qualification");
        percentToNextTier = ((hasECS ? 1 : 0) + Math.min(qualCount, 1)) / 2 * 100;
      } else if (currentTier === "verified") {
        // To get to premium: need ECS + 2 quals + insurance + driving licence
        if (qualCount < 2) missingForNextTier.push(`${2 - qualCount} more qualification(s)`);
        if (!hasInsurance) missingForNextTier.push("Insurance");
        if (!hasDrivingLicence) missingForNextTier.push("Driving licence");
        const progress = (hasECS ? 1 : 0) + Math.min(qualCount, 2) + (hasInsurance ? 1 : 0) + (hasDrivingLicence ? 1 : 0);
        percentToNextTier = (progress / 5) * 100;
      } else {
        percentToNextTier = 100;
      }

      return {
        current: currentTier,
        verifiedDocuments: verifiedDocs.length,
        totalRequired: {
          basic: 0,
          verified: 2, // ECS + 1 qual
          premium: 5, // ECS + 2 quals + insurance + driving licence
        },
        missingForNextTier,
        percentToNextTier,
      };
    },
    []
  );

  // Load profile and documents
  const loadData = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const profile = await fetchProfile();
      setElecIdProfile(profile);

      if (profile) {
        const docs = await fetchDocuments(profile.id);
        setDocuments(docs);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, fetchProfile, fetchDocuments]);

  // Create Elec-ID profile if it doesn't exist
  const createProfile = useCallback(async () => {
    if (!user?.id) return null;

    try {
      // Generate unique Elec-ID number
      const elecIdNumber = `EM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const { data, error } = await supabase
        .from("employer_elec_id_profiles")
        .insert({
          employee_id: user.id,
          elec_id_number: elecIdNumber,
          verification_tier: "basic",
          opt_out: false,
          available_for_hire: true,
          profile_visibility: "public",
        })
        .select()
        .single();

      if (error) throw error;

      setElecIdProfile(data as ElecIdProfile);
      toast({
        title: "Elec-ID Created",
        description: `Your Elec-ID number is ${elecIdNumber}`,
      });

      return data as ElecIdProfile;
    } catch (err: any) {
      console.error("Error creating Elec-ID profile:", err);
      toast({
        title: "Error",
        description: "Failed to create Elec-ID profile",
        variant: "destructive",
      });
      return null;
    }
  }, [user?.id]);

  // Update profile settings
  const updateProfile = useCallback(
    async (updates: Partial<Pick<ElecIdProfile, "opt_out" | "available_for_hire" | "profile_visibility" | "bio">>) => {
      if (!elecIdProfile?.id) return false;

      try {
        const { error } = await supabase
          .from("employer_elec_id_profiles")
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq("id", elecIdProfile.id);

        if (error) throw error;

        setElecIdProfile((prev) => (prev ? { ...prev, ...updates } : null));
        return true;
      } catch (err: any) {
        console.error("Error updating profile:", err);
        toast({
          title: "Error",
          description: "Failed to update profile settings",
          variant: "destructive",
        });
        return false;
      }
    },
    [elecIdProfile?.id]
  );

  // Upload and verify document
  const uploadDocument = useCallback(
    async (
      file: File,
      documentType: DocumentType,
      metadata: {
        documentName?: string;
        issuingBody?: string;
        documentNumber?: string;
        issueDate?: string;
        expiryDate?: string;
      }
    ) => {
      if (!elecIdProfile?.id) {
        toast({
          title: "Error",
          description: "Please create an Elec-ID profile first",
          variant: "destructive",
        });
        return null;
      }

      try {
        // Upload file to Supabase Storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${elecIdProfile.id}/${documentType}_${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("elec-id-documents")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("elec-id-documents")
          .getPublicUrl(fileName);

        // Call verification function
        const { data: verifyResult, error: verifyError } = await supabase.functions.invoke(
          "verify-document",
          {
            body: {
              fileUrl: urlData.publicUrl,
              documentType,
              profileId: elecIdProfile.id,
              ...metadata,
            },
          }
        );

        if (verifyError) throw verifyError;

        // Reload documents
        const newDocs = await fetchDocuments(elecIdProfile.id);
        setDocuments(newDocs);

        // Recalculate tier
        const newTier = calculateTier(newDocs);
        if (newTier !== elecIdProfile.verification_tier) {
          setElecIdProfile((prev) =>
            prev
              ? {
                  ...prev,
                  verification_tier: newTier,
                  tier_updated_at: new Date().toISOString(),
                }
              : null
          );
        }

        toast({
          title: verifyResult?.status === "verified" ? "Document Verified" : "Document Uploaded",
          description:
            verifyResult?.status === "verified"
              ? "Your document has been verified successfully!"
              : "Your document is being reviewed.",
        });

        return verifyResult;
      } catch (err: any) {
        console.error("Error uploading document:", err);
        toast({
          title: "Upload Failed",
          description: err.message || "Failed to upload document",
          variant: "destructive",
        });
        return null;
      }
    },
    [elecIdProfile, fetchDocuments, calculateTier]
  );

  // Delete document
  const deleteDocument = useCallback(
    async (documentId: string) => {
      try {
        const { error } = await supabase
          .from("elec_id_documents")
          .delete()
          .eq("id", documentId);

        if (error) throw error;

        setDocuments((prev) => prev.filter((d) => d.id !== documentId));

        // Recalculate tier
        const remainingDocs = documents.filter((d) => d.id !== documentId);
        const newTier = calculateTier(remainingDocs);
        if (elecIdProfile && newTier !== elecIdProfile.verification_tier) {
          await supabase
            .from("employer_elec_id_profiles")
            .update({
              verification_tier: newTier,
              tier_updated_at: new Date().toISOString(),
            })
            .eq("id", elecIdProfile.id);

          setElecIdProfile((prev) =>
            prev
              ? {
                  ...prev,
                  verification_tier: newTier,
                  tier_updated_at: new Date().toISOString(),
                }
              : null
          );
        }

        toast({
          title: "Document Removed",
          description: "The document has been removed from your profile.",
        });

        return true;
      } catch (err: any) {
        console.error("Error deleting document:", err);
        toast({
          title: "Error",
          description: "Failed to delete document",
          variant: "destructive",
        });
        return false;
      }
    },
    [documents, elecIdProfile, calculateTier]
  );

  // Get documents by type
  const getDocumentsByType = useCallback(
    (type: DocumentType) => {
      return documents.filter((d) => d.document_type === type);
    },
    [documents]
  );

  // Get verified documents count
  const getVerifiedCount = useCallback(() => {
    return documents.filter((d) => d.verification_status === "verified").length;
  }, [documents]);

  // Get expiring documents (within 30 days)
  const getExpiringDocuments = useCallback(() => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    return documents.filter((d) => {
      if (!d.expiry_date) return false;
      const expiryDate = new Date(d.expiry_date);
      return expiryDate <= thirtyDaysFromNow && expiryDate > new Date();
    });
  }, [documents]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to document changes
  useEffect(() => {
    if (!elecIdProfile?.id) return;

    const subscription = supabase
      .channel("elec_id_documents_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "elec_id_documents",
          filter: `profile_id=eq.${elecIdProfile.id}`,
        },
        () => {
          fetchDocuments(elecIdProfile.id).then(setDocuments);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [elecIdProfile?.id, fetchDocuments]);

  return {
    // State
    elecIdProfile,
    documents,
    isLoading,
    error,

    // Computed
    verificationTier: elecIdProfile?.verification_tier || "basic",
    tierProgress: calculateTierProgress(documents, elecIdProfile?.verification_tier || "basic"),
    verifiedCount: getVerifiedCount(),
    expiringDocuments: getExpiringDocuments(),

    // Actions
    createProfile,
    updateProfile,
    uploadDocument,
    deleteDocument,
    getDocumentsByType,
    refresh: loadData,
  };
}
