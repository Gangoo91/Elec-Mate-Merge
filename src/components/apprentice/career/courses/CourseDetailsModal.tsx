import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import CourseEnquiryForm from './CourseEnquiryForm';
import {
  X,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
} from 'lucide-react';
import { EnhancedCareerCourse } from './enhancedCoursesData';

interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  contactPerson?: string;
  officeHours?: string;
  website?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  providerName?: string;
  description?: string;
  extractedAt?: string;
}

interface CourseDetailsModalProps {
  course: EnhancedCareerCourse;
  onClose: () => void;
}

const CourseDetailsModal = ({ course, onClose }: CourseDetailsModalProps) => {
  const { toast } = useToast();
  const [contactInfo] = useState<ContactInfo | null>(null);

  const fetchContactDetails = async () => {
    if (!course.external_url) return;
    openExternalUrl(course.external_url);
    toast({
      title: 'Opening Provider Website',
      description: 'Contact details are available on the provider\'s website.',
    });
  };

  const handleOpenCourseUrl = () => {
    if (!course.external_url) {
      toast({
        title: 'URL Not Available',
        description: 'Course provider URL is not available for this course.',
        variant: 'destructive',
      });
      return;
    }

    try {
      openExternalUrl(course.external_url);
    } catch (error) {
      toast({
        title: 'Error Opening URL',
        description: "Unable to open the course provider's website.",
        variant: 'destructive',
      });
    }
  };

  const hasValidData = (data: unknown[] | undefined) => Boolean(data && data.length > 0);
  const getDisplayValue = (value: string | undefined, fallback: string) => value || fallback;

  const generateCourseOutline = (_title: string) => [
    'Course fundamentals and overview',
    'Core principles and regulations',
    'Practical application techniques',
    'Assessment and certification',
    'Industry best practices',
  ];

  const generateCareerOutcomes = (_title: string) => [
    'Enhanced professional qualifications',
    'Improved career advancement opportunities',
    'Access to specialised project work',
    'Increased earning potential',
  ];

  const generatePrerequisites = () => [
    'Basic electrical knowledge recommended',
    'Valid electrical qualification preferred',
    'Safety awareness certification',
  ];

  const displayCourseOutline = hasValidData(course.courseOutline)
    ? course.courseOutline!
    : generateCourseOutline(course.title);

  const displayCareerOutcomes = hasValidData(course.careerOutcomes)
    ? course.careerOutcomes!
    : generateCareerOutcomes(course.title);

  const displayPrerequisites = hasValidData(course.prerequisites)
    ? course.prerequisites!
    : generatePrerequisites();

  const displayAccreditations = hasValidData(course.accreditation)
    ? course.accreditation!
    : ['Industry recognised certification'];

  const displayLocations = hasValidData(course.locations)
    ? course.locations!
    : ['Multiple UK locations', 'Online delivery available'];

  const displayNextDates = hasValidData(course.nextDates)
    ? course.nextDates!
    : ['Contact provider for available dates'];

  const isLiveCourse = course.isLive || course.source;

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
      {children}
    </span>
  );

  const Section = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {eyebrow}
      </span>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-xl border border-white/[0.06] bg-elec-gray w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 space-y-5">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                <span>{course.category}</span>
                {isLiveCourse && (
                  <>
                    <span className="text-white/25">·</span>
                    <span>Live data</span>
                  </>
                )}
                <span className="text-white/25">·</span>
                <span>Rated {course.rating}</span>
              </div>
              <h3 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
                {course.title}
              </h3>
              <p className="text-[14px] text-white/70">
                {getDisplayValue(course.provider, 'Provider TBC')}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {course.external_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
                    onClick={handleOpenCourseUrl}
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    View provider site
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
                  onClick={fetchContactDetails}
                  disabled={!course.external_url}
                >
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  Visit provider website
                </Button>
              </div>

              <p className="text-[14px] text-white/85 leading-relaxed">{course.description}</p>
              {isLiveCourse && course.source && (
                <p className="text-[11px] text-white/55 font-mono">Source: {course.source}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:text-white hover:bg-white/[0.05]"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Duration', value: course.duration },
              { label: 'Level', value: course.level },
              { label: 'Price', value: course.price },
              { label: 'Future-proof', value: `${course.futureProofing}/5` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {item.label}
                </span>
                <div className="text-[14px] text-white/85">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Industry Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Section eyebrow="Industry outlook">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-[14px]">
                  <span className="text-white/70">Industry demand</span>
                  <span className="text-white/85">{course.industryDemand}</span>
                </div>
                <div className="flex items-baseline justify-between text-[14px]">
                  <span className="text-white/70">Salary impact</span>
                  <span className="text-white/85">{course.salaryImpact}</span>
                </div>
                {course.employerSupport && (
                  <div className="text-[14px] text-white/85">Employer support available</div>
                )}
              </div>
            </Section>

            <Section eyebrow="Accreditations">
              <div className="flex flex-wrap gap-1.5">
                {displayAccreditations.map((acc, idx) => (
                  <Pill key={idx}>{acc}</Pill>
                ))}
              </div>
            </Section>
          </div>

          {/* Course Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Section eyebrow="Course outline">
              <ul className="space-y-2">
                {displayCourseOutline.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section eyebrow="Career outcomes">
              <ul className="space-y-2">
                {displayCareerOutcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Assessment & Prerequisites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Section eyebrow="Assessment">
              <div className="space-y-2 text-[14px] text-white/85 leading-relaxed">
                <div>
                  <span className="text-white/55">Method: </span>
                  {course.assessmentMethod}
                </div>
                <div>
                  <span className="text-white/55">Continuous: </span>
                  {course.continuousAssessment ? 'Yes' : 'Final exam only'}
                </div>
              </div>
            </Section>

            <Section eyebrow="Prerequisites">
              <ul className="space-y-2">
                {displayPrerequisites.map((prereq, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Locations */}
          <Section eyebrow="Available locations">
            <div className="flex flex-wrap gap-1.5">
              {displayLocations.map((location, idx) => (
                <Pill key={idx}>{location}</Pill>
              ))}
            </div>
          </Section>

          {/* Course Dates */}
          <Section eyebrow="Upcoming course dates">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-white/70">Start date</TableHead>
                    <TableHead className="text-white/70">Location</TableHead>
                    <TableHead className="text-white/70">Format</TableHead>
                    <TableHead className="text-white/70">Availability</TableHead>
                    <TableHead className="text-right text-white/70">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayNextDates.map((date, idx) => (
                    <TableRow key={idx} className="border-white/10">
                      <TableCell className="text-white/85">{date}</TableCell>
                      <TableCell className="text-white/85">
                        {displayLocations[idx % displayLocations.length]}
                      </TableCell>
                      <TableCell className="text-white/85">
                        {getDisplayValue(course.format?.split(',')[0], 'To be confirmed')}
                      </TableCell>
                      <TableCell className="text-white/85">
                        {idx % 3 === 0 ? 'Limited spaces' : 'Available'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          className="h-9 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                          onClick={handleOpenCourseUrl}
                          disabled={!course.external_url}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {course.external_url ? 'Book now' : 'Contact provider'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Section>

          {/* Contact Information */}
          {contactInfo && (
            <Section eyebrow="Provider contact details">
              <div className="space-y-3 text-[14px] text-white/85 leading-relaxed">
                {contactInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-white/55" />
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-elec-yellow">
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-white/55" />
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-elec-yellow">
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white/55" />
                    <span>{contactInfo.address}</span>
                  </div>
                )}
                {contactInfo.contactPerson && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-white/55" />
                    <span>{contactInfo.contactPerson}</span>
                  </div>
                )}
                {contactInfo.officeHours && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white/55" />
                    <span>{contactInfo.officeHours}</span>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* Hidden enquiry form */}
          <div className="hidden">
            <CourseEnquiryForm course={course} onSuccess={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
