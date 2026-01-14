import { useState } from "react";
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
  ResponsiveFormModalFooter,
} from "@/components/ui/responsive-form-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Download,
  Check,
  Building2,
  Calendar,
  X,
  Loader2,
  Edit3,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { PolicyTemplate, UserPolicy } from "@/hooks/usePolicies";
import { useAdoptPolicy } from "@/hooks/usePolicies";
import { downloadPolicyPDF } from "@/utils/policy-pdf";
import { useToast } from "@/hooks/use-toast";
import { PolicyEditor } from "@/components/employer/PolicyEditor";
import { sanitizeHtmlSafe } from "@/utils/inputSanitization";

interface PolicyViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: PolicyTemplate | null;
  userPolicy?: UserPolicy | null;
  isAdopted?: boolean;
}

export function PolicyViewer({
  open,
  onOpenChange,
  template,
  userPolicy,
  isAdopted = false,
}: PolicyViewerProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const adoptPolicy = useAdoptPolicy();

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await downloadPolicyPDF({ template, userPolicy });
      toast({
        title: "PDF Downloaded",
        description: "Your policy document has been exported.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not generate the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Use either the template or user policy for display
  const policy = userPolicy || template;
  if (!policy) return null;

  const isTemplate = !userPolicy;
  const content = policy.content;

  const handleAdopt = async () => {
    if (!template) return;

    try {
      await adoptPolicy.mutateAsync({
        template_id: template.id,
        company_name: companyName || undefined,
        review_date: reviewDate || undefined,
      });
      setShowAdoptForm(false);
      setCompanyName("");
      setReviewDate("");
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety":
        return "bg-success/10 text-success";
      case "HR":
        return "bg-elec-yellow/10 text-elec-yellow";
      case "Legal":
        return "bg-info/10 text-info";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <ResponsiveFormModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveFormModalContent className={cn(isMobile ? "" : "max-w-3xl")}>
        {/* Header */}
        <ResponsiveFormModalHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <ResponsiveFormModalTitle>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/20">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <span className="text-lg font-semibold line-clamp-1">
                    {policy.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className={getCategoryColor(
                      'category' in policy ? policy.category :
                      userPolicy?.template?.category || 'Other'
                    )}>
                      {'category' in policy ? policy.category :
                       userPolicy?.template?.category || 'Policy'}
                    </Badge>
                    {'version' in policy && (
                      <span className="text-xs text-muted-foreground">
                        v{policy.version}
                      </span>
                    )}
                    {userPolicy && (
                      <Badge
                        variant="secondary"
                        className={
                          userPolicy.status === "Active"
                            ? "bg-success/10 text-success"
                            : userPolicy.status === "Review Due"
                            ? "bg-warning/10 text-warning"
                            : "bg-muted"
                        }
                      >
                        {userPolicy.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </ResponsiveFormModalTitle>
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </ResponsiveFormModalHeader>

        {/* Body */}
        <ResponsiveFormModalBody className="py-6">
          {showAdoptForm ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                <h3 className="font-medium text-foreground mb-2">
                  Adopt Policy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add this policy to your company documents. Optionally enter your
                  company name to personalise the document.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Company Name (optional)
                  </Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will replace [Company Name] placeholders in the policy
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Review Date (optional)
                  </Label>
                  <Input
                    id="reviewDate"
                    type="date"
                    value={reviewDate}
                    onChange={(e) => setReviewDate(e.target.value)}
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    Set a reminder to review this policy
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary if available */}
              {'summary' in policy && policy.summary && (
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-muted-foreground">
                    {policy.summary}
                  </p>
                </div>
              )}

              {/* Policy content */}
              <div
                className="prose prose-sm prose-invert max-w-none [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:mb-4 [&_li]:mb-1 [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: sanitizeHtmlSafe(content) }}
              />

              {/* User policy metadata */}
              {userPolicy && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {userPolicy.company_name && (
                      <div>
                        <span className="text-muted-foreground">Company:</span>
                        <p className="font-medium">{userPolicy.company_name}</p>
                      </div>
                    )}
                    {userPolicy.adopted_at && (
                      <div>
                        <span className="text-muted-foreground">Adopted:</span>
                        <p className="font-medium">
                          {new Date(userPolicy.adopted_at).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    )}
                    {userPolicy.review_date && (
                      <div>
                        <span className="text-muted-foreground">Review Due:</span>
                        <p className="font-medium">
                          {new Date(userPolicy.review_date).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    )}
                    {userPolicy.approved_by && (
                      <div>
                        <span className="text-muted-foreground">Approved By:</span>
                        <p className="font-medium">{userPolicy.approved_by}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </ResponsiveFormModalBody>

        {/* Footer */}
        <ResponsiveFormModalFooter>
          <div className="flex flex-col sm:flex-row gap-3">
            {showAdoptForm ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowAdoptForm(false)}
                  className="flex-1 sm:flex-none min-h-[48px]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAdopt}
                  disabled={adoptPolicy.isPending}
                  className="flex-1 min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  {adoptPolicy.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Confirm Adoption
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleExportPdf}
                  disabled={isExporting}
                  className="flex-1 sm:flex-none min-h-[48px]"
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Export PDF
                </Button>
                {isTemplate && !isAdopted && (
                  <Button
                    onClick={() => setShowAdoptForm(true)}
                    className="flex-1 min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Adopt This Policy
                  </Button>
                )}
                {isTemplate && isAdopted && (
                  <div className="flex items-center gap-2 text-success text-sm">
                    <Check className="h-4 w-4" />
                    Already adopted
                  </div>
                )}
                {userPolicy && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShowEditor(true)}
                      className="flex-1 sm:flex-none min-h-[48px]"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Policy
                    </Button>
                    <Button
                      onClick={() => onOpenChange(false)}
                      className="flex-1 min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      Close
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </ResponsiveFormModalFooter>
      </ResponsiveFormModalContent>

      {/* Policy Editor Modal */}
      {userPolicy && (
        <PolicyEditor
          open={showEditor}
          onOpenChange={setShowEditor}
          policy={userPolicy}
          onSaved={() => {
            setShowEditor(false);
          }}
        />
      )}
    </ResponsiveFormModal>
  );
}
