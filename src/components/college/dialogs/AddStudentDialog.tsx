import { useState } from 'react';
import { Input } from '@/components/ui/input';

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
} from '@/components/ui/responsive-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectContentClass,
  selectTriggerClass,
} from '@/components/college/primitives';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  const { cohorts, addStudent } = useCollegeSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    uln: '',
    cohort_id: '',
    expected_end_date: '',
  });

  const activeCohorts = cohorts.filter((c) => c.status === 'Active');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addStudent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        uln: formData.uln || null,
        cohort_id: formData.cohort_id || null,
        expected_end_date: formData.expected_end_date || null,
        college_id: null,
        user_id: null,
        employer_id: null,
        course_id: null,
        start_date: new Date().toISOString().split('T')[0],
        status: 'Active',
        progress_percent: 0,
        risk_level: 'Low',
        photo_url: null,
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        uln: '',
        cohort_id: '',
        expected_end_date: '',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateULN = () => {
    const random = Math.floor(Math.random() * 9000000000) + 1000000000;
    return String(random);
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-[500px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Enrol new student</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Add a new student to the system. All fields marked with * are required.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormCard eyebrow="Learner details">
              <Field label="Full name" required>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Smith"
                  required
                  className={inputClass}
                />
              </Field>
              <FormGrid cols={2}>
                <Field label="ULN">
                  <div className="flex gap-2">
                    <Input
                      id="uln"
                      value={formData.uln}
                      onChange={(e) => handleChange('uln', e.target.value)}
                      placeholder="10 digit ULN"
                      className={`${inputClass} flex-1`}
                    />
                    <SecondaryButton
                      size="sm"
                      onClick={() => handleChange('uln', generateULN())}
                    >
                      Generate
                    </SecondaryButton>
                  </div>
                </Field>
                <Field label="Email" required>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john.smith@email.com"
                    required
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
              <FormGrid cols={2}>
                <Field label="Phone">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="07XXX XXXXXX"
                    className={inputClass}
                  />
                </Field>
                <Field label="Cohort">
                  <Select
                    value={formData.cohort_id}
                    onValueChange={(value) => handleChange('cohort_id', value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {activeCohorts.map((cohort) => (
                        <SelectItem key={cohort.id} value={cohort.id}>
                          {cohort.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>
              <Field label="Expected completion">
                <Input
                  id="expected_end_date"
                  type="date"
                  value={formData.expected_end_date}
                  onChange={(e) => handleChange('expected_end_date', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormCard>
          </form>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter>
          <SecondaryButton
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Enrolling…' : 'Enrol student'}
          </PrimaryButton>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
