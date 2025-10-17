import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { QuoteClient, JobDetails } from '@/types/quote';
import { Building2, MapPin, User } from 'lucide-react';

const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobDescription: z.string().optional(),
  jobLocation: z.string().optional(),
  workStartDate: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface InvoiceClientDetailsStepProps {
  initialData?: {
    client?: QuoteClient;
    jobDetails?: JobDetails;
  };
  onUpdate: (client: QuoteClient, jobDetails: JobDetails) => void;
}

export const InvoiceClientDetailsStep = ({ initialData, onUpdate }: InvoiceClientDetailsStepProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.client?.name || '',
      email: initialData?.client?.email || '',
      phone: initialData?.client?.phone || '',
      address: initialData?.client?.address || '',
      postcode: initialData?.client?.postcode || '',
      jobTitle: initialData?.jobDetails?.title || '',
      jobDescription: initialData?.jobDetails?.description || '',
      jobLocation: initialData?.jobDetails?.location || '',
      workStartDate: initialData?.jobDetails?.workStartDate || '',
    },
  });

  // Watch all fields and update parent on changes
  const formValues = watch();
  
  // Update parent whenever form values change
  const handleFormChange = () => {
    const client: QuoteClient = {
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      address: formValues.address,
      postcode: formValues.postcode,
    };

    const jobDetails: JobDetails = {
      title: formValues.jobTitle,
      description: formValues.jobDescription,
      location: formValues.jobLocation,
      workStartDate: formValues.workStartDate,
    };

    onUpdate(client, jobDetails);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Client & Job Details</h2>
        <p className="text-muted-foreground">
          Enter the client information and job details for this invoice
        </p>
      </div>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Client Information
          </CardTitle>
          <CardDescription>
            Details of the client receiving the invoice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name *</Label>
              <Input
                id="name"
                {...register('name')}
                onBlur={handleFormChange}
                placeholder="John Smith"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                onBlur={handleFormChange}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                {...register('phone')}
                onBlur={handleFormChange}
                placeholder="07123 456789"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode *</Label>
              <Input
                id="postcode"
                {...register('postcode')}
                onBlur={handleFormChange}
                placeholder="SW1A 1AA"
              />
              {errors.postcode && (
                <p className="text-sm text-destructive">{errors.postcode.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              {...register('address')}
              onBlur={handleFormChange}
              placeholder="123 Main Street, London"
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Job Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Job Details
          </CardTitle>
          <CardDescription>
            Information about the work being invoiced
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              {...register('jobTitle')}
              onBlur={handleFormChange}
              placeholder="e.g., Consumer Unit Replacement"
            />
            {errors.jobTitle && (
              <p className="text-sm text-destructive">{errors.jobTitle.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              {...register('jobDescription')}
              onBlur={handleFormChange}
              placeholder="Describe the work completed..."
              rows={4}
            />
            {errors.jobDescription && (
              <p className="text-sm text-destructive">{errors.jobDescription.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobLocation" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Job Location
              </Label>
              <Input
                id="jobLocation"
                {...register('jobLocation')}
                onBlur={handleFormChange}
                placeholder="e.g., London"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workStartDate">Work Completion Date</Label>
              <Input
                id="workStartDate"
                type="date"
                {...register('workStartDate')}
                onBlur={handleFormChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
