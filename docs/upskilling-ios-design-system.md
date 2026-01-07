# Electrical Upskilling - iOS-Native Design System

## Overview

This document outlines the iOS-native design system used for the Inspection & Testing course, which should be applied consistently across all upskilling courses.

---

## Courses Requiring iOS Redesign

| Course | Landing Page | Modules | Current State | Priority |
|--------|--------------|---------|---------------|----------|
| **Fire Alarm Systems** | FireAlarmCourse.tsx | 7 + Exam | Old design, partial modules | High |
| **PAT Testing** | PATTestingCourse.tsx | 5 + Exam | Old design, partial sections | High |
| **Smart Home Technology** | SmartHomeCourse.tsx | 8 | Old design, partial sections | Medium |
| **Renewable Energy** | RenewableEnergyCourse.tsx | 10 | Old design, partial sections | Medium |
| **BMS (Building Management)** | BMSCourse.tsx | TBD | Old design | Medium |
| **Industrial Electrical** | IndustrialElectricalCourse.tsx | 5 | Old design, partial modules | Medium |
| **Data Cabling** | DataCablingCourse.tsx | TBD | Old design | Low |
| **Fibre Optics** | FiberOpticsCourse.tsx | TBD | Old design | Low |
| **Instrumentation** | InstrumentationCourse.tsx | TBD | Old design | Low |
| **EV Charging** | EVChargingCourse.tsx | TBD | Old design | Low |
| **Emergency Lighting** | EmergencyLightingCourse.tsx | TBD | Old design | Low |
| **Energy Efficiency** | EnergyEfficiencyCourse.tsx | TBD | Old design | Low |
| **BS 7671** | BS7671Course.tsx | TBD | Old design | Low |

**Completed:** Inspection & Testing (8 modules, 44 sections)

---

## Design System Reference

### Page Background
```tsx
<div className="min-h-screen bg-[#0a0a0a]">
```

### iOS Sticky Header
```tsx
<header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
  <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
    <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
      <Link to="../module1">
        <ArrowLeft className="h-5 w-5" />
        <span className="hidden sm:inline">Module 1</span>
      </Link>
    </Button>
    <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
    <div className="w-[60px]" />
  </div>
</header>
```

### Hero Section (Section Pages)
```tsx
<section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
  <div className="flex items-center gap-3 mb-4">
    <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
      <Icon className="h-7 w-7 text-elec-yellow" />
    </div>
    <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
      Module 1 • Section 1
    </span>
  </div>
  <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
    Section Title Here
  </h1>
  <p className="text-[17px] text-white/70 leading-relaxed">
    Section description text here.
  </p>
</section>
```

### Button Variants
```tsx
// Primary CTA (yellow)
<Button variant="ios-primary" size="ios" className="w-full gap-2">
  Continue to Next Section
  <ChevronRight className="h-5 w-5" />
</Button>

// Secondary (outline)
<Button variant="ios-secondary" size="ios" className="w-full gap-2">
  <ChevronLeft className="h-5 w-5" />
  Previous Section
</Button>

// Ghost (minimal)
<Button variant="ios-ghost" size="ios-small">
  Back
</Button>
```

### Card Variants
```tsx
// Standard iOS card
<Card variant="ios" className="p-4">
  Content here
</Card>

// Elevated iOS card (featured content)
<Card variant="ios-elevated" className="border-elec-yellow/20">
  <CardHeader className="pb-2">
    <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
      <Icon className="h-5 w-5 text-elec-yellow" />
      Card Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### iOS Typography Scale
```tsx
// Large Title (page headers)
text-[34px] leading-[41px] font-bold text-white tracking-tight

// Title 2 (section headers)
text-[22px] leading-[28px] font-bold text-white

// Headline (card titles)
text-[17px] font-semibold text-white

// Body
text-[17px] text-white/70 leading-relaxed

// Subheadline
text-[15px] text-white/80

// Caption
text-[13px] text-white/60

// Footnote
text-[11px] font-medium text-elec-yellow uppercase tracking-wide
```

### Module Colour Coding
Each module should have a consistent accent colour:

| Module | Colour | Tailwind Classes |
|--------|--------|------------------|
| Module 1 | Blue | `bg-blue-500/10 border-blue-500/30 text-blue-400` |
| Module 2 | Green | `bg-green-500/10 border-green-500/30 text-green-400` |
| Module 3 | Amber | `bg-amber-500/10 border-amber-500/30 text-amber-400` |
| Module 4 | Purple | `bg-purple-500/10 border-purple-500/30 text-purple-400` |
| Module 5 | Orange | `bg-orange-500/10 border-orange-500/30 text-orange-400` |
| Module 6 | Cyan | `bg-cyan-500/10 border-cyan-500/30 text-cyan-400` |
| Module 7 | Rose | `bg-rose-500/10 border-rose-500/30 text-rose-400` |
| Module 8 | Sky | `bg-sky-500/10 border-sky-500/30 text-sky-400` |

---

## Section Page Structure

Every section page must include these elements in order:

### 1. Imports
```tsx
import { ArrowLeft, ChevronRight, ChevronLeft, Clock, /* other icons */ } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';
```

### 2. SEO Constants
```tsx
const TITLE = "Section Title - Course Name";
const DESCRIPTION = "Meta description for SEO (150-160 chars)";
```

### 3. Data Definitions
```tsx
// InlineCheck questions (3 minimum)
const quickCheckQuestions = [
  {
    question: "Question text?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 1, // 0-indexed
    explanation: "Explanation text"
  },
  // ... 2 more
];

// Quiz questions (10 recommended)
const quizQuestions = [
  {
    question: "Question text?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 1,
    explanation: "Explanation text"
  },
  // ... 9 more
];

// FAQs (6 minimum)
const faqs = [
  { question: "FAQ question?", answer: "Answer text" },
  // ... 5 more
];

// Reference items for UnitsPocketCard
const referenceItems = [
  { label: "Label", value: "Value" },
  // ...
];
```

### 4. Page Sections (in order)

1. **iOS Header** - Sticky with back button, backdrop blur
2. **Hero Section** - Module badge, large title, description
3. **"In 30 Seconds" Card** - 3 key bullet points (ios-elevated)
4. **Learning Outcomes** - 6 outcomes in ios cards grid (2 cols)
5. **Content Sections** - 6 numbered sections (01-06)
6. **InlineCheck Questions** - 3 questions placed between content sections
7. **Practical Tips** - Common mistakes, pro tips, fault finding
8. **FAQs** - 6+ collapsible questions in ios cards
9. **UnitsPocketCard** - Quick reference card
10. **Quiz** - 10-question assessment
11. **Navigation Footer** - Previous/Next buttons with pb-safe

### 5. Navigation Footer
```tsx
<section className="px-4 pt-6 pb-safe max-w-4xl mx-auto">
  <div className="flex gap-3">
    <Button variant="ios-secondary" size="ios" asChild className="flex-1 gap-2">
      <Link to="../module1/section1">
        <ChevronLeft className="h-5 w-5" />
        Previous
      </Link>
    </Button>
    <Button variant="ios-primary" size="ios" asChild className="flex-1 gap-2">
      <Link to="../module1/section3">
        Next
        <ChevronRight className="h-5 w-5" />
      </Link>
    </Button>
  </div>
</section>
```

### 6. Final Section Module Completion Card
On the last section of each module, add:
```tsx
<Card variant="ios-elevated" className="border-green-500/20">
  <CardContent className="p-6 text-center">
    <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
    <h3 className="text-[22px] font-bold text-white mb-2">Module Complete!</h3>
    <p className="text-white/70 mb-6">You've finished Module X: Title</p>
    <Button variant="ios-primary" size="ios" asChild className="gap-2">
      <Link to="../moduleX+1">
        Continue to Module X+1
        <ChevronRight className="h-5 w-5" />
      </Link>
    </Button>
  </CardContent>
</Card>
```

---

## Module Page Structure

Module pages show a grid of section cards:

```tsx
<div className="min-h-screen bg-[#0a0a0a]">
  {/* iOS Header */}
  <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
    {/* ... */}
  </header>

  {/* Hero */}
  <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
    {/* Icon badge, title, description, progress stats */}
  </section>

  {/* Sections Grid */}
  <section className="px-4 pb-8 max-w-4xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {sections.map((section) => (
        <Link key={section.id} to={section.link}>
          <Card variant="ios" className="h-full active:scale-[0.98] transition-transform">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <section.icon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white/50 mb-1">Section {section.id}</p>
                  <h3 className="text-[15px] font-semibold text-white mb-1">{section.title}</h3>
                  <p className="text-[13px] text-white/60 line-clamp-2">{section.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0 mt-1" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </section>
</div>
```

---

## Course Landing Page Structure

```tsx
<div className="min-h-screen bg-[#0a0a0a]">
  {/* iOS Header */}

  {/* Hero with course icon, title, description */}

  {/* Quick Stats (3-col grid) */}
  <div className="grid grid-cols-3 gap-3">
    <Card variant="ios" className="p-3 text-center">
      <div className="text-2xl font-bold text-elec-yellow">8</div>
      <div className="text-[13px] text-white/60">Modules</div>
    </Card>
    {/* ... */}
  </div>

  {/* "What You'll Learn" elevated card */}

  {/* Modules Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Module cards with icons, titles, section counts */}
  </div>
</div>
```

---

## File Naming Convention

```
src/pages/upskilling/
├── [CourseName]Course.tsx           # Landing page
├── [CourseName]Module1.tsx          # Module 1 page
├── [CourseName]Module1Section1.tsx  # Section pages
├── [CourseName]Module1Section2.tsx
└── ...
```

## Route Naming Convention

```
/electrician/upskilling/[course-name]
/electrician/upskilling/[course-name]/module-1
/electrician/upskilling/[course-name]/module-1/section-1
```

---

## Checklist Per Section

- [ ] iOS header with `backdrop-blur-xl`
- [ ] Hero with module badge and large title
- [ ] "In 30 Seconds" ios-elevated card (3 points)
- [ ] Learning Outcomes (6 items in 2-col grid)
- [ ] 6 numbered content sections (01-06)
- [ ] 3 InlineCheck questions between content
- [ ] Practical Tips section
- [ ] 6+ FAQs in collapsible cards
- [ ] UnitsPocketCard reference
- [ ] 10-question Quiz
- [ ] iOS navigation buttons with `pb-safe`
- [ ] 48px minimum touch targets
- [ ] Module completion card (final section only)

---

## Components Used

| Component | Import Path | Type |
|-----------|-------------|------|
| Button | `@/components/ui/button` | Named |
| Card, CardContent, CardHeader, CardTitle | `@/components/ui/card` | Named |
| Quiz | `@/components/apprentice-courses/Quiz` | Named |
| InlineCheck | `@/components/apprentice-courses/InlineCheck` | Named |
| UnitsPocketCard | `@/components/apprentice-courses/UnitsPocketCard` | Default |
| useSEO | `@/hooks/useSEO` | Default |

---

## Estimated Work Per Course

| Course Size | Modules | Sections | Est. Files |
|-------------|---------|----------|------------|
| Small | 5 | ~25 | ~30 |
| Medium | 7 | ~35 | ~42 |
| Large | 8+ | ~44+ | ~52+ |

Each section file is approximately 60-80KB of content.
