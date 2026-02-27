import { useState, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, FolderPlus, Zap } from 'lucide-react';
import { usePhotoProjects, CreateProjectInput, PhotoProject } from '@/hooks/usePhotoProjects';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';

interface CreateProjectSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (project: PhotoProject) => void;
}

export default function CreateProjectSheet({
  open,
  onOpenChange,
  onCreated,
}: CreateProjectSheetProps) {
  const { createProject, isCreating, generateJobReference } = usePhotoProjects();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [jobReference, setJobReference] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setJobReference('');
    setAddress('');
    setSelectedCustomer(null);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onOpenChange(false);
  }, [resetForm, onOpenChange]);

  const handleCreate = useCallback(
    async (quickCreate = false) => {
      if (!name.trim()) return;

      const input: CreateProjectInput = {
        name: name.trim(),
      };

      if (!quickCreate) {
        if (selectedCustomer) input.customer_id = selectedCustomer.id;
        if (description.trim()) input.description = description.trim();
        if (jobReference.trim()) input.job_reference = jobReference.trim();
        if (address.trim()) input.address = address.trim();
      }

      const project = await createProject(input);
      if (project) {
        resetForm();
        onOpenChange(false);
        onCreated?.(project);
      }
    },
    [
      name,
      selectedCustomer,
      description,
      jobReference,
      address,
      createProject,
      resetForm,
      onOpenChange,
      onCreated,
    ]
  );

  const handleCustomerSelect = useCallback((customer: Customer | null) => {
    setSelectedCustomer(customer);
    // Pre-fill address from customer if not already set
    if (customer?.address) {
      setAddress((prev) => prev || customer.address || '');
    }
  }, []);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        className="h-[65vh] p-0 rounded-t-2xl overflow-hidden bg-elec-dark border-white/10"
      >
        <div className="flex flex-col h-full">
          {/* Drag handle */}
          <div className="flex-shrink-0 pt-3 px-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto" />
          </div>

          {/* Header */}
          <div className="flex-shrink-0 px-4 pt-3 pb-3">
            <h2 className="text-lg font-semibold text-white">New Project</h2>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide px-4 pb-4 space-y-4">
            {/* Project Name (required) */}
            <div>
              <label className="text-xs font-medium text-white uppercase tracking-wide">
                Project Name *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kitchen Rewire"
                className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation text-white placeholder:text-white"
                autoFocus
              />
            </div>

            {/* Customer (optional) */}
            <div>
              <label className="text-xs font-medium text-white uppercase tracking-wide">
                Customer (optional)
              </label>
              <div className="mt-1.5">
                <ClientSelector
                  onSelectCustomer={handleCustomerSelect}
                  selectedCustomerId={selectedCustomer?.id}
                />
              </div>
            </div>

            {/* Description (optional) */}
            <div>
              <label className="text-xs font-medium text-white uppercase tracking-wide">
                Job Description (optional)
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the work"
                className="mt-1.5 min-h-[80px] bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation resize-none text-white placeholder:text-white"
              />
            </div>

            {/* Job Reference + Address side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-white uppercase tracking-wide">
                  Job Reference
                </label>
                <Input
                  value={jobReference}
                  onChange={(e) => setJobReference(e.target.value)}
                  placeholder={generateJobReference()}
                  className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation text-white placeholder:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white uppercase tracking-wide">
                  Address
                </label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="42 High St"
                  className="mt-1.5 h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation text-white placeholder:text-white"
                />
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex-shrink-0 p-4 border-t border-white/[0.06] space-y-2">
            <button
              onClick={() => handleCreate(false)}
              disabled={!name.trim() || isCreating}
              className="w-full h-12 rounded-xl bg-elec-yellow text-sm font-semibold text-black flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 disabled:opacity-50 transition-all"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <FolderPlus className="h-4 w-4" />
                  <span>Create Project</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleCreate(true)}
              disabled={!name.trim() || isCreating}
              className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white flex items-center justify-center gap-2 touch-manipulation active:bg-white/10 disabled:opacity-50 transition-all"
            >
              <Zap className="h-4 w-4" />
              <span>Quick Create (name only)</span>
            </button>
          </div>

          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
