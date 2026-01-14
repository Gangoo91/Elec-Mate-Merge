import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
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
  User,
  Briefcase,
  Users,
  FileCheck,
  Eye,
  Save,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  type EmploymentContractTemplate,
  type Contract,
  useAdoptContractTemplate,
  useUpdateContractContent,
} from "@/hooks/useContracts";
import { useEmployees } from "@/hooks/useEmployees";
import { downloadContractPDF } from "@/utils/contract-pdf";
import { useToast } from "@/hooks/use-toast";
import { sanitizeHtmlSafe } from "@/utils/inputSanitization";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContractViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: EmploymentContractTemplate | null;
  userContract?: Contract | null;
  isAdopted?: boolean;
}

const DRAFT_KEY_PREFIX = "contract-viewer-draft-";

export function ContractViewer({
  open,
  onOpenChange,
  template,
  userContract,
  isAdopted = false,
}: ContractViewerProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Adopt form state
  const [companyName, setCompanyName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [salary, setSalary] = useState("");

  const adoptContract = useAdoptContractTemplate();
  const updateContract = useUpdateContractContent();
  const { data: employees } = useEmployees();

  // Use either the template or user contract for display
  const contract = userContract || template;
  const isTemplate = !userContract;
  const content = userContract?.content || template?.content || "";
  const name = userContract?.title || template?.name || "";
  const category = template?.category || "Employment";
  const draftKey = userContract ? `${DRAFT_KEY_PREFIX}${userContract.id}` : "";

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: content,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      setHasChanges(true);
      if (draftKey) {
        localStorage.setItem(draftKey, editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert prose-sm max-w-none focus:outline-none",
          "prose-headings:text-white prose-headings:font-semibold",
          "prose-p:text-white/80 prose-p:leading-relaxed",
          "prose-li:text-white/80",
          "prose-strong:text-white prose-strong:font-semibold",
          "[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4",
          "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3",
          "[&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2",
          "[&_p]:mb-3 [&_ul]:mb-4 [&_li]:mb-1",
          "[&_table]:w-full [&_td]:py-1 [&_td]:pr-4",
          isEditing ? "min-h-[300px] p-4" : ""
        ),
      },
    },
  });

  // Update editor content when contract changes
  useEffect(() => {
    if (editor && content) {
      // Check for draft
      if (draftKey && isEditing) {
        const draft = localStorage.getItem(draftKey);
        if (draft && draft !== content) {
          const useDraft = window.confirm(
            "You have unsaved changes from a previous session. Restore them?"
          );
          if (useDraft) {
            editor.commands.setContent(draft);
            setHasChanges(true);
            return;
          } else {
            localStorage.removeItem(draftKey);
          }
        }
      }
      editor.commands.setContent(content);
    }
  }, [editor, content, draftKey]);

  // Update editor editable state
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [editor, isEditing]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setShowAdoptForm(false);
      setIsEditing(false);
      setHasChanges(false);
      setCompanyName("");
      setEmployeeName("");
      setSelectedEmployee("");
      setJobTitle("");
      setStartDate("");
      setSalary("");
    }
  }, [open]);

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await downloadContractPDF({ template, userContract });
      toast({
        title: "PDF Downloaded",
        description: "Your contract document has been exported.",
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

  const handleAdopt = async () => {
    if (!template) return;

    try {
      const placeholders: Record<string, string> = {};
      if (companyName) placeholders["[Company Name]"] = companyName;
      if (employeeName) placeholders["[Employee Name]"] = employeeName;
      if (employeeName) placeholders["[Subcontractor Name]"] = employeeName;
      if (employeeName) placeholders["[Candidate Name]"] = employeeName;
      if (jobTitle) placeholders["[Job Title]"] = jobTitle;
      if (startDate) {
        const formattedDate = new Date(startDate).toLocaleDateString("en-GB");
        placeholders["[Start Date]"] = formattedDate;
      }
      if (salary) placeholders["[Salary]"] = salary;

      await adoptContract.mutateAsync({
        template_id: template.id,
        party_name: employeeName || undefined,
        employee_id: selectedEmployee || undefined,
        start_date: startDate || undefined,
        placeholders,
      });

      setShowAdoptForm(false);
      setCompanyName("");
      setEmployeeName("");
      setSelectedEmployee("");
      setJobTitle("");
      setStartDate("");
      setSalary("");
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleSave = async () => {
    if (!editor || !userContract) return;

    try {
      const sanitisedContent = sanitizeHtmlSafe(editor.getHTML());
      await updateContract.mutateAsync({
        id: userContract.id,
        content: sanitisedContent,
      });

      if (draftKey) {
        localStorage.removeItem(draftKey);
      }
      setHasChanges(false);
      setIsEditing(false);

      toast({
        title: "Contract saved",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleCancelEdit = useCallback(() => {
    if (hasChanges) {
      const confirmCancel = window.confirm(
        "You have unsaved changes. Discard them?"
      );
      if (!confirmCancel) return;
    }
    if (draftKey) {
      localStorage.removeItem(draftKey);
    }
    if (editor) {
      editor.commands.setContent(content);
    }
    setHasChanges(false);
    setIsEditing(false);
  }, [hasChanges, draftKey, editor, content]);

  const handleClose = useCallback(() => {
    if (isEditing && hasChanges) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Close anyway?"
      );
      if (!confirmClose) return;
    }
    if (draftKey) {
      localStorage.removeItem(draftKey);
    }
    onOpenChange(false);
  }, [isEditing, hasChanges, draftKey, onOpenChange]);

  if (!contract) return null;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Employment":
        return "bg-elec-yellow/10 text-elec-yellow";
      case "Subcontractor":
        return "bg-info/10 text-info";
      case "HR Letters":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Employment":
        return Briefcase;
      case "Subcontractor":
        return Users;
      case "HR Letters":
        return FileCheck;
      default:
        return FileText;
    }
  };

  const CategoryIcon = getCategoryIcon(category);

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      className={cn(
        "h-8 w-8 p-0 rounded-lg touch-manipulation",
        isActive
          ? "bg-elec-yellow/20 text-elec-yellow"
          : "text-white/60 hover:text-white hover:bg-white/10"
      )}
    >
      {children}
    </Button>
  );

  return (
    <ResponsiveFormModal open={open} onOpenChange={handleClose}>
      <ResponsiveFormModalContent className={cn(isMobile ? "" : "max-w-4xl")}>
        {/* Header */}
        <ResponsiveFormModalHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <ResponsiveFormModalTitle>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/20">
                  <CategoryIcon className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <span className="text-lg font-semibold line-clamp-1">
                    {name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className={getCategoryColor(category)}>
                      {category}
                    </Badge>
                    {template?.version && (
                      <span className="text-xs text-muted-foreground">
                        v{template.version}
                      </span>
                    )}
                    {userContract && (
                      <Badge
                        variant="secondary"
                        className={
                          userContract.status === "Active"
                            ? "bg-success/10 text-success"
                            : userContract.status === "Draft"
                            ? "bg-muted"
                            : "bg-warning/10 text-warning"
                        }
                      >
                        {userContract.status}
                      </Badge>
                    )}
                    {isEditing && hasChanges && (
                      <Badge variant="outline" className="text-warning border-warning">
                        Unsaved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </ResponsiveFormModalTitle>
            {!isMobile && (
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </ResponsiveFormModalHeader>

        {/* Body */}
        <ResponsiveFormModalBody className="py-4">
          {showAdoptForm ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                <h3 className="font-medium text-foreground mb-2">
                  Use This Template
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fill in the details below to personalise this contract.
                  Placeholders like [Company Name] will be replaced with your values.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {category === "Subcontractor" ? "Subcontractor Name" : "Employee/Candidate Name"}
                  </Label>
                  <Input
                    id="employeeName"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Enter name"
                    className="h-11"
                  />
                </div>

                {category !== "Subcontractor" && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Link to Employee (Optional)
                    </Label>
                    <Select
                      value={selectedEmployee || "__none__"}
                      onValueChange={(v) => setSelectedEmployee(v === "__none__" ? "" : v)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select employee..." />
                      </SelectTrigger>
                      <SelectContent className="z-[100]">
                        <SelectItem value="__none__">None</SelectItem>
                        {employees?.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Electrician, Apprentice"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-11"
                  />
                </div>

                {category === "Employment" && (
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary (Annual)</Label>
                    <Input
                      id="salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g., 35,000"
                      className="h-11"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary if available */}
              {template?.summary && !isEditing && (
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-muted-foreground">
                    {template.summary}
                  </p>
                </div>
              )}

              {/* Inline Editor Toolbar (when editing) */}
              {isEditing && editor && (
                <div className="flex flex-wrap items-center gap-1 p-2 bg-white/5 rounded-xl border border-white/10">
                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </ToolbarButton>

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </ToolbarButton>

                  <div className="w-px h-5 bg-white/10 mx-1" />

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="Heading 2"
                  >
                    <Heading2 className="h-4 w-4" />
                  </ToolbarButton>

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive("heading", { level: 3 })}
                    title="Heading 3"
                  >
                    <Heading3 className="h-4 w-4" />
                  </ToolbarButton>

                  <div className="w-px h-5 bg-white/10 mx-1" />

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </ToolbarButton>

                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                    title="Numbered List"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </ToolbarButton>

                  <div className="flex-1" />

                  <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    title="Undo"
                  >
                    <Undo className="h-4 w-4" />
                  </ToolbarButton>

                  <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    title="Redo"
                  >
                    <Redo className="h-4 w-4" />
                  </ToolbarButton>
                </div>
              )}

              {/* Contract content - TipTap editor */}
              <div
                className={cn(
                  "rounded-xl transition-colors",
                  isEditing
                    ? "bg-white/5 border border-white/10 focus-within:border-elec-yellow/30"
                    : ""
                )}
              >
                {editor ? (
                  <EditorContent editor={editor} />
                ) : (
                  <div
                    className="prose prose-sm prose-invert max-w-none [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:mb-4 [&_li]:mb-1 [&_strong]:text-foreground [&_table]:w-full [&_td]:py-1 [&_td]:pr-4"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtmlSafe(content) }}
                  />
                )}
              </div>

              {/* User contract metadata */}
              {userContract && !isEditing && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {userContract.party_name && (
                      <div>
                        <span className="text-muted-foreground">Party:</span>
                        <p className="font-medium">{userContract.party_name}</p>
                      </div>
                    )}
                    {userContract.adopted_at && (
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <p className="font-medium">
                          {new Date(userContract.adopted_at).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    )}
                    {userContract.start_date && (
                      <div>
                        <span className="text-muted-foreground">Start Date:</span>
                        <p className="font-medium">
                          {new Date(userContract.start_date).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    )}
                    {userContract.employee?.name && (
                      <div>
                        <span className="text-muted-foreground">Employee:</span>
                        <p className="font-medium">{userContract.employee.name}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Editor styles */}
          <style>{`
            .ProseMirror {
              outline: none;
            }
            .ProseMirror.is-editor-empty:first-child::before {
              content: attr(data-placeholder);
              float: left;
              color: rgba(255, 255, 255, 0.3);
              pointer-events: none;
              height: 0;
            }
            .ProseMirror h2 {
              font-size: 1.25rem;
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
            }
            .ProseMirror h3 {
              font-size: 1.1rem;
              margin-top: 1.25rem;
              margin-bottom: 0.5rem;
            }
            .ProseMirror ul, .ProseMirror ol {
              padding-left: 1.5rem;
              margin: 0.75rem 0;
            }
            .ProseMirror li {
              margin: 0.25rem 0;
            }
            .ProseMirror p {
              margin: 0.5rem 0;
            }
          `}</style>
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
                  disabled={adoptContract.isPending}
                  className="flex-1 min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  {adoptContract.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Create Contract
                </Button>
              </>
            ) : isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex-1 sm:flex-none min-h-[48px]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={updateContract.isPending || !hasChanges}
                  className="flex-1 min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  {updateContract.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
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
                    Use This Template
                  </Button>
                )}
                {isTemplate && isAdopted && (
                  <div className="flex items-center gap-2 text-success text-sm">
                    <Check className="h-4 w-4" />
                    Already adopted
                  </div>
                )}
                {userContract && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="flex-1 sm:flex-none min-h-[48px]"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
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
    </ResponsiveFormModal>
  );
}
