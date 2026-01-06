# Level 3 Electrical Installation Course Constitution

## Non-Negotiable Guidelines for All Content

### Audience
- Apprentice electricians and adult learners
- Assessor-friendly content
- Assumes Level 2 knowledge as foundation
- City & Guilds / EAL standards aligned

### Tone
- Clear and concise
- Practical and trade-realistic
- No fluff, no sales language
- Professional but accessible

### Regulatory Rules
- Do NOT invent regulation numbers
- If a specific BS 7671 requirement is referenced, flag it as "BS 7671 reference required"
- Prefer explaining principles over quoting clauses
- Reference current 18th Edition Amendment 2 where applicable

### Teaching Rules
- Explain WHY, not just what
- Use site-based examples from real electrical work
- Assume learner will be assessed (written exam + practical)
- Avoid absolutes unless technically correct
- Build on Level 2 knowledge - don't repeat basics unnecessarily

### Safety Rules
- Never imply unsafe practices
- Highlight risks where relevant
- Reference safe isolation procedures where applicable
- Include real-world consequences of unsafe work

### Formatting Rules
- Use headings with numbered sections (01, 02, 03, 04)
- Short paragraphs (3-4 sentences max)
- Bullet points where appropriate
- UK terminology only (earthing not grounding, consumer unit not breaker box)
- Mobile-first responsive design

### Content Structure (Every Page Must Include)
1. **Header**: Section number badge + title + subtitle
2. **Quick Summary**: "In 30 Seconds" + "Spot it / Use it" boxes
3. **Learning Outcomes**: 4-6 checkmarked items
4. **Numbered Content Sections** (01-04): Each with InlineCheck after
5. **Practical Guidance**: Installation tips, fault finding, common mistakes
6. **FAQs**: 4-6 common questions
7. **Quick Reference / Pocket Guide**: Condensed facts
8. **Quiz**: 10 questions minimum
9. **Navigation**: Back + Next buttons

### Quiz Question Standards
- 10 questions minimum per subsection
- Each question must have:
  - 4 options (one correct, three plausible)
  - Correct answer index
  - Explanation that teaches, not just confirms
- Questions should test understanding, not memory
- Include practical application scenarios

### InlineCheck Standards
- 3-4 checks per page, placed after each major section
- Quick knowledge verification
- Different from quiz questions (shorter, focused)

### Assessor Alignment Criteria
Content must adequately prepare learners for:
- City & Guilds 2365 Level 3 written examinations
- EAL Level 3 Electrical Installation assessments
- On-site practical assessments
- Portfolio evidence requirements

### Technical Accuracy Standards
- All electrical values must be verifiable
- All regulation references must be accurate
- All safety procedures must be current best practice
- All calculations must be mathematically correct

---

## Design Pattern Reference

See: `Level3ContentTemplate.tsx` for the exact React component structure.

Key design elements:
- Dark theme: bg-[#1a1a1a]
- Accent colour: elec-yellow
- Typography: White text with opacity variations
- Touch targets: min-h-[44px] or min-h-[48px]
- Mobile-first: Single column → 2 columns on sm breakpoint
