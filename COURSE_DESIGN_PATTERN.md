# Course Content Page Design Pattern

This document defines the standard design pattern for ALL course content pages in the Elec-Mate platform. Every section page must follow this exact pattern.

**Reference File:** `/src/pages/apprentice-courses/Module2Section1_1.tsx`

---

## CRITICAL REQUIREMENTS

### 1. Text Alignment
**ALL TEXT MUST BE LEFT-ALIGNED** - Never use `text-center` on content text. Only the page title header is centered.

### 2. Language
**UK ENGLISH ONLY** - Use British spelling throughout:
- colour (not color)
- centre (not center)
- organise (not organize)
- analyse (not analyze)
- licence (not license)
- programme (not program)
- metre (not meter)

### 3. Text Colour
**WHITE TEXT ONLY** - Use `text-white` for all body text. Never use grey/gray text like `text-white/60` or `text-gray-400`.
- Body text: `text-white`
- Accent text: `text-elec-yellow` or `text-elec-yellow/80`
- Secondary text (subtitles only): `text-white/80` or `text-white/90`

### 4. Navigation Setup
**NAVIGATION MUST WORK CORRECTLY:**
- Back button: Always returns to parent module page using `<Link to="..">`
- Previous Section: Links to the previous section using relative or absolute paths
- Next Section: Links to the next section using relative or absolute paths
- Use `<Link>` components with `asChild` pattern, NEVER use `navigate()`

---

## Required Imports

```tsx
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";
```

---

## Page Structure (In Order)

### 1. SEO Constants

```tsx
const TITLE = "Page Title - Course Module Section";
const DESCRIPTION = "SEO description for the page.";
```

### 2. Quick Check Questions (3-4 questions)

```tsx
const quickCheckQuestions = [
  {
    id: "unique-id",
    question: "Question text?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctIndex: 1,
    explanation: "Why this answer is correct."
  }
];
```

### 3. Quiz Questions (10 questions)

```tsx
const quizQuestions = [
  {
    id: 1,
    question: "Question text?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: 0,
    explanation: "Explanation text."
  }
];
```

### 4. FAQs (5-6 questions)

```tsx
const faqs = [
  {
    question: "Question text?",
    answer: "Detailed answer text."
  }
];
```

---

## Component Structure

### Root Container

```tsx
<div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
```

### 1. Sticky Header (Minimal)

```tsx
<div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
  <div className="px-4 sm:px-6 py-2">
    <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
      <Link to="..">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
    </Button>
  </div>
</div>
```

**IMPORTANT:** Always use `<Link to="..">` for the back button to return to the parent module page.

### 2. Main Content Container

```tsx
<article className="px-4 sm:px-6 py-8 sm:py-12">
```

### 3. Centered Title Header

```tsx
<header className="text-center mb-12">
  <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
    <Zap className="h-4 w-4" />
    <span>Module X Section Y</span>
  </div>
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
    Page Title
  </h1>
  <p className="text-white/80">
    Brief subtitle description
  </p>
</header>
```

### 4. Quick Summary Boxes (2-Column)

```tsx
<div className="grid sm:grid-cols-2 gap-4 mb-12">
  <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
    <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
    <ul className="text-sm text-white space-y-1">
      <li><strong>Key:</strong> Value</li>
    </ul>
  </div>
  <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
    <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
    <ul className="text-sm text-white space-y-1">
      <li><strong>Spot:</strong> How to identify</li>
      <li><strong>Use:</strong> How to apply</li>
    </ul>
  </div>
</div>
```

### 5. Learning Outcomes

```tsx
<section className="mb-12">
  <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
  <div className="grid sm:grid-cols-2 gap-2">
    {[
      "Learning outcome 1",
      "Learning outcome 2",
      "Learning outcome 3",
      "Learning outcome 4",
      "Learning outcome 5",
      "Learning outcome 6"
    ].map((item, i) => (
      <div key={i} className="flex items-start gap-2 text-sm text-white">
        <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
        <span>{item}</span>
      </div>
    ))}
  </div>
</section>
```

### 6. Divider

```tsx
<hr className="border-white/5 mb-12" />
```

### 7. Numbered Content Sections (01, 02, 03, 04...)

```tsx
<section className="mb-10">
  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
    <span className="text-elec-yellow/80 text-sm font-normal">01</span>
    Section Title
  </h2>
  <div className="text-white space-y-4 leading-relaxed">
    <p>Content paragraph...</p>

    <div className="my-6">
      <p className="text-sm font-medium text-white mb-2">Subsection heading:</p>
      <ul className="text-sm text-white space-y-1 ml-4">
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    </div>
  </div>
</section>

<InlineCheck {...quickCheckQuestions[0]} />
```

**IMPORTANT:** Place InlineCheck components between content sections.

### 8. Practical Guidance

```tsx
<section className="mb-10">
  <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
      <ul className="text-sm text-white space-y-1 ml-4">
        <li>Guidance point 1</li>
        <li>Guidance point 2</li>
      </ul>
    </div>

    <div>
      <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Fault Finding</h3>
      <ul className="text-sm text-white space-y-1 ml-4">
        <li>Guidance point 1</li>
        <li>Guidance point 2</li>
      </ul>
    </div>

    <div>
      <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
      <ul className="text-sm text-white space-y-1 ml-4">
        <li><strong>Mistake 1</strong> — explanation</li>
        <li><strong>Mistake 2</strong> — explanation</li>
      </ul>
    </div>
  </div>
</section>
```

### 9. FAQs

```tsx
<section className="mb-10">
  <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
  <div className="space-y-4">
    {faqs.map((faq, index) => (
      <div key={index} className="pb-4 border-b border-white/5 last:border-0">
        <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
        <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
      </div>
    ))}
  </div>
</section>
```

### 10. Reference Cards (Optional)

```tsx
<section className="mb-10">
  <UnitsPocketCard />

  <div className="mt-6 p-5 rounded-lg bg-transparent">
    <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
    <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
      <div>
        <p className="font-medium text-white mb-1">Category 1</p>
        <ul className="space-y-0.5">
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
      <div>
        <p className="font-medium text-white mb-1">Category 2</p>
        <ul className="space-y-0.5">
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

### 11. Quiz

```tsx
<section className="mb-10">
  <Quiz
    title="Test Your Knowledge"
    questions={quizQuestions}
  />
</section>
```

### 12. Bottom Navigation

```tsx
<nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
  <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
    <Link to="..">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Link>
  </Button>
  <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
    <Link to="../section-Y">
      Next Section
      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
    </Link>
  </Button>
</nav>
```

---

## Key Styling Classes

| Element | Classes |
|---------|---------|
| Page background | `min-h-screen overflow-x-hidden bg-[#1a1a1a]` |
| Sticky header | `border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm` |
| Touch buttons | `min-h-[44px] touch-manipulation active:scale-[0.98]` |
| Section numbers | `text-elec-yellow/80 text-sm font-normal` |
| Yellow accent boxes | `p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50` |
| Yellow accent text | `text-elec-yellow`, `text-elec-yellow/80`, `text-elec-yellow/70` |
| Next button | `bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90` |
| Back button | `variant="ghost" text-white/70 hover:text-white hover:bg-white/5` |
| Dividers | `border-white/5` |

---

## What NOT to Do

1. **NO Card components** - Use simple divs with the patterns above
2. **NO navigate()** - Always use `<Link>` with `asChild` pattern
3. **NO purple/blue/pink accents** - Always use `elec-yellow` variants
4. **NO iOS-style cards** - Use the flat design with border-l-2 accent
5. **NO hover-only interactions** - Everything must be touch-friendly
6. **NO complex nested components** - Keep the structure flat and simple
7. **NO grey text** - Use `text-white` for all body content, never `text-white/60` or `text-gray-*`
8. **NO American English** - Use UK spelling (colour, centre, organise, metre)
9. **NO centered body text** - Only the page title header is centered, all other text is left-aligned
10. **NO broken navigation** - Every page must have working back/previous/next links

---

## Navigation URL Patterns

### Upskilling Courses
```
Base: /study-centre/upskilling/{course-name}
Module: /study-centre/upskilling/{course-name}/module-X
Section: /study-centre/upskilling/{course-name}/module-X/section-Y
```

**Examples:**
- `/study-centre/upskilling/inspection-testing/module-1`
- `/study-centre/upskilling/inspection-testing/module-1/section-1`
- `/study-centre/upskilling/bms/module-2/section-3`

### Apprentice Courses
```
Base: /study-centre/apprentice/courses/level-X
Module: /study-centre/apprentice/courses/level-X/module-X
Section: /study-centre/apprentice/courses/level-X/module-X/X-Y
```

### Navigation Button Implementation

**Back Button (to module page):**
```tsx
<Button variant="ghost" size="lg" asChild>
  <Link to="..">
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back to Module
  </Link>
</Button>
```

**Previous Section Button:**
```tsx
<Button variant="ghost" size="lg" asChild>
  <Link to="/study-centre/upskilling/{course}/module-{X}/section-{Y-1}">
    <ArrowLeft className="w-4 h-4 mr-2" />
    Previous Section
  </Link>
</Button>
```

**Next Section Button:**
```tsx
<Button size="lg" className="bg-elec-yellow text-[#1a1a1a]" asChild>
  <Link to="/study-centre/upskilling/{course}/module-{X}/section-{Y+1}">
    Next Section
    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
  </Link>
</Button>
```

**First Section (no previous):**
- Hide or disable the Previous button
- Only show Back and Next

**Last Section of Module:**
- Next button should link to the next module's first section or module overview

---

## JSX Escape Characters

When using comparison symbols in content, escape them:
- `>` becomes `&gt;`
- `<` becomes `&lt;`

Example: `&gt;100 MΩ` instead of `>100 MΩ`
