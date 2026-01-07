import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Package,
  Tag,
  MapPin,
  Calendar,
  FileText,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import { cn } from "@/lib/utils";
import { EquipmentCategoryPicker, type EquipmentCategory, equipmentCategories } from "./EquipmentCategoryPicker";
import { TestFrequencySelector } from "./TestFrequencySelector";
import type { SafetyEquipment } from "@/hooks/useSafetyEquipment";

// Form schema
const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  serial_number: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  last_inspection: z.string().optional(),
  inspection_interval_days: z.number().min(1),
  condition_notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EquipmentFormWizardProps {
  initialData?: Partial<SafetyEquipment>;
  onClose: () => void;
  onSubmit: (data: Omit<FormData, "category"> & { category: string }) => Promise<void>;
  isSubmitting?: boolean;
}

const TOTAL_STEPS = 3;

export function EquipmentFormWizard({
  initialData,
  onClose,
  onSubmit,
  isSubmitting = false,
}: EquipmentFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData?.category || "",
      name: initialData?.name || "",
      serial_number: initialData?.serial_number || "",
      location: initialData?.location || "",
      last_inspection: initialData?.last_inspection || "",
      inspection_interval_days: initialData?.inspection_interval_days || 180,
      condition_notes: initialData?.condition_notes || "",
    },
  });

  const watchedValues = watch();

  // Calculate next inspection date
  const calculateNextInspection = () => {
    if (!watchedValues.last_inspection) return null;
    const lastDate = new Date(watchedValues.last_inspection);
    lastDate.setDate(lastDate.getDate() + (watchedValues.inspection_interval_days || 180));
    return lastDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const nextInspection = calculateNextInspection();

  // Step validation
  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(["category", "name", "serial_number"]);
      case 2:
        return await trigger(["location", "last_inspection", "inspection_interval_days"]);
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < TOTAL_STEPS) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  const onFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  // Get category display info
  const selectedCategory = equipmentCategories.find(c => c.id === watchedValues.category);

  // Step content variants
  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">
              {currentStep === 1 ? "Cancel" : "Back"}
            </span>
          </button>

          <h1 className="text-lg font-semibold text-white">
            {initialData?.id ? "Edit Equipment" : "Add Equipment"}
          </h1>

          <div className="w-16" /> {/* Spacer for centering */}
        </div>

        {/* Progress indicator */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={cn(
                  "flex-1 h-1 rounded-full transition-all duration-300",
                  step <= currentStep ? "bg-elec-yellow" : "bg-white/10"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-white/50 text-center mt-2">
            Step {currentStep} of {TOTAL_STEPS}:{" "}
            {currentStep === 1 && "Equipment"}
            {currentStep === 2 && "Testing Details"}
            {currentStep === 3 && "Review"}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <form onSubmit={onFormSubmit} className="p-4 pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 1: Equipment Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <EquipmentCategoryPicker
                value={watchedValues.category as EquipmentCategory}
                onChange={(cat) => setValue("category", cat)}
                error={errors.category?.message}
              />

              <IOSInput
                label="Equipment Name"
                icon={<Package className="h-5 w-5" />}
                placeholder="e.g. Megger PAT420"
                error={errors.name?.message}
                {...register("name")}
              />

              <IOSInput
                label="Serial Number (Optional)"
                icon={<Tag className="h-5 w-5" />}
                placeholder="e.g. PAT-2024-001"
                error={errors.serial_number?.message}
                {...register("serial_number")}
              />
            </motion.div>
          )}

          {/* Step 2: Testing Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <IOSInput
                label="Storage Location"
                icon={<MapPin className="h-5 w-5" />}
                placeholder="e.g. Van, Office, Site"
                error={errors.location?.message}
                {...register("location")}
              />

              <IOSInput
                label="Last Test Date"
                icon={<Calendar className="h-5 w-5" />}
                type="date"
                error={errors.last_inspection?.message}
                {...register("last_inspection")}
              />

              <TestFrequencySelector
                value={watchedValues.inspection_interval_days}
                onChange={(days) => setValue("inspection_interval_days", days)}
                error={errors.inspection_interval_days?.message}
              />

              {/* Next test preview */}
              {nextInspection && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-xs text-emerald-400/70 mb-1">Next Test Due</p>
                  <p className="text-lg font-semibold text-emerald-400">
                    {nextInspection}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Summary card */}
              <div className="p-5 rounded-2xl bg-[#1e1e1e] border border-white/10">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  {selectedCategory && (
                    <div className={cn("p-2.5 rounded-xl", selectedCategory.bgColor)}>
                      <selectedCategory.icon className={cn("h-6 w-6", selectedCategory.color)} />
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-white/50">{selectedCategory?.label || "Equipment"}</p>
                    <h3 className="font-semibold text-white">{watchedValues.name || "Unnamed"}</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {watchedValues.serial_number && (
                    <div className="flex justify-between">
                      <span className="text-sm text-white/50">Serial</span>
                      <span className="text-sm text-white">{watchedValues.serial_number}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Location</span>
                    <span className="text-sm text-white">{watchedValues.location || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Last Test</span>
                    <span className="text-sm text-white">
                      {watchedValues.last_inspection
                        ? new Date(watchedValues.last_inspection).toLocaleDateString("en-GB")
                        : "Not set"}
                    </span>
                  </div>
                  {nextInspection && (
                    <div className="flex justify-between">
                      <span className="text-sm text-white/50">Next Test</span>
                      <span className="text-sm text-emerald-400">{nextInspection}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50">Frequency</span>
                    <span className="text-sm text-white">
                      {watchedValues.inspection_interval_days <= 90 && "3 months"}
                      {watchedValues.inspection_interval_days === 180 && "6 months"}
                      {watchedValues.inspection_interval_days === 365 && "12 months"}
                      {watchedValues.inspection_interval_days === 730 && "24 months"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Add any notes about this equipment..."
                  className={cn(
                    "w-full min-h-[100px] p-4 rounded-xl",
                    "bg-white/5 border-2 border-white/10",
                    "text-white placeholder:text-white/40",
                    "focus:outline-none focus:border-elec-yellow/60",
                    "resize-none touch-manipulation"
                  )}
                  {...register("condition_notes")}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Fixed bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-elec-dark/95 backdrop-blur-sm border-t border-white/10 safe-area-bottom">
        {currentStep < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={handleNext}
            className={cn(
              "w-full h-14 text-base font-semibold",
              "bg-elec-yellow text-black hover:bg-elec-yellow/90",
              "shadow-lg shadow-elec-yellow/20",
              "active:scale-[0.98]"
            )}
          >
            Continue
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-14 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={onFormSubmit}
              disabled={isSubmitting}
              className={cn(
                "flex-1 h-14 text-base font-semibold",
                "bg-elec-yellow text-black hover:bg-elec-yellow/90",
                "shadow-lg shadow-elec-yellow/20",
                "active:scale-[0.98]",
                "disabled:opacity-50"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Save Equipment
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
