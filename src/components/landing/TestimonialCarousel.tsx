import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Chris M.',
    role: 'Electrician',
    company: 'Manchester',
    rating: 5,
    quote: 'Actually use this every day now. The EICR forms are dead easy and the calcs just work. Saves me messing about with spreadsheets.',
  },
  {
    name: 'Liam T.',
    role: '3rd Year Apprentice',
    company: 'Birmingham',
    rating: 5,
    quote: 'Passed my 2391 with this. The questions are proper helpful and you can do them on the bus to site. Sound app.',
  },
  {
    name: 'Kev B.',
    role: 'Sole Trader',
    company: 'Leeds',
    rating: 5,
    quote: 'The quote builder is class. Just talk into it and it does the rest. Sent one from site the other day, customer paid same day.',
  },
  {
    name: 'Dan P.',
    role: 'Electrician',
    company: 'Bristol',
    rating: 5,
    quote: 'Mental health stuff is actually really good. Nice to have something that gets the pressure of the job. Not just another cert app.',
  },
];

export const TestimonialCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 bg-gradient-to-b from-black to-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by UK Electricians
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Join thousands of electrical professionals who trust Elec-Mate for their daily work.
          </p>
        </motion.div>

        {/* Mobile: Single card with navigation */}
        <div className="sm:hidden">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="w-11 h-11 flex items-center justify-center touch-manipulation"
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-yellow-400' : 'bg-white/30'
                    }`} />
                  </button>
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Desktop: 2x2 grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
    <Quote className="w-8 h-8 text-yellow-400/30 mb-4" />

    {/* Rating */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'
          }`}
        />
      ))}
    </div>

    {/* Quote */}
    <p className="text-white/80 text-sm leading-relaxed flex-1 mb-4">
      "{testimonial.quote}"
    </p>

    {/* Author */}
    <div className="pt-4 border-t border-white/10">
      <div className="font-semibold text-white">{testimonial.name}</div>
      <div className="text-sm text-white/60">{testimonial.role}</div>
      <div className="text-sm text-white/40 mt-1">{testimonial.company}</div>
    </div>
  </div>
);
