import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Mail } from 'lucide-react';
import { EnhancedTrainingCenter } from './enhancedCoursesData';

interface TrainingCenterDetailsModalProps {
  center: EnhancedTrainingCenter;
  onClose: () => void;
}

const Section = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
      {eyebrow}
    </span>
    <div>{children}</div>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
    {children}
  </span>
);

const TrainingCenterDetailsModal = ({ center, onClose }: TrainingCenterDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-xl border border-white/[0.06] bg-elec-gray w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 space-y-5">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                <span>{center.location}</span>
                <span className="text-white/25">·</span>
                <span>Rated {center.rating}</span>
                <span className="text-white/25">·</span>
                <span>Est. {center.establishedYear}</span>
              </div>
              <h3 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
                {center.name}
              </h3>
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

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Success rate', value: `${center.successRate}%` },
              { label: 'Employment rate', value: `${center.employmentRate}%` },
              { label: 'Capacity', value: center.studentCapacity },
              { label: 'Established', value: center.establishedYear },
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Section eyebrow="Contact information">
              <div className="space-y-2 text-[14px] text-white/85 leading-relaxed">
                <div>{center.address}</div>
                <div>{center.contact}</div>
                <div>{center.website}</div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Opening hours
                </span>
                <div className="grid grid-cols-2 gap-1 mt-2 text-[14px] text-white/85">
                  <div>Monday - Friday</div>
                  <div>08:30 - 17:00</div>
                  <div>Saturday</div>
                  <div>09:00 - 13:00</div>
                  <div>Sunday</div>
                  <div>Closed</div>
                </div>
              </div>
            </Section>

            <Section eyebrow="Specialisations">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {center.specialisations.map((spec, idx) => (
                    <Pill key={idx}>{spec}</Pill>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Featured courses
                  </span>
                  <ul className="mt-2 space-y-1.5">
                    {center.courses.slice(0, 5).map((course, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Section eyebrow="Accreditations">
              <div className="flex flex-wrap gap-1.5">
                {center.accreditations.map((acc, idx) => (
                  <Pill key={idx}>{acc}</Pill>
                ))}
              </div>
            </Section>

            <Section eyebrow="Support services">
              <ul className="space-y-1.5">
                {center.supportServices.map((service, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <Section eyebrow="Training facilities">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {center.facilities.map((facility, idx) => (
                <div key={idx} className="text-[14px] text-white/85 leading-relaxed">
                  {facility}
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="Contact training centre">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px] text-white/70">Full name</label>
                  <Input
                    placeholder="Your full name"
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] text-white/70">Email address</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] text-white/70">Phone number</label>
                  <Input
                    placeholder="Your contact number"
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] text-white/70">Course interest</label>
                  <Select>
                    <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/10">
                      {center.courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] text-white/70">Message</label>
                <Textarea
                  placeholder="Please tell us about your training requirements, preferred dates, or any specific questions..."
                  rows={4}
                  className="touch-manipulation text-base bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
                />
              </div>
              <Button className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation">
                <Mail className="mr-2 h-4 w-4" />
                Send enquiry
              </Button>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenterDetailsModal;
