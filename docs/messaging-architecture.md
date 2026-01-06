# Unified Messaging Architecture

## Overview

This document outlines the expanded messaging system supporting all user types and communication channels.

---

## User Types & Relationships

| User Type | Auth Link | Can Chat With |
|-----------|-----------|---------------|
| **Electrician (Spark)** | `employer_elec_id_profiles.employee_id = auth.uid()` | Employers, Other Sparks (peer support), College tutors |
| **Employer** | `employer_conversations.employer_id = auth.uid()` | Electricians, Team members, College staff |
| **College Staff** | `college.staff.user_id = auth.uid()` | Students, Employers, Other staff |
| **College Student** | `college.students.user_id = auth.uid()` | Tutors, Employer contacts |
| **Employer Portal User** | `college.employers.portal_user_id = auth.uid()` | College staff, Apprentices |

---

## Chat Channels

### 1. Job Messaging (EXISTS)
- **Employer → Electrician**: Via Talent Pool
- **Electrician → Employer**: After applying to vacancy

### 2. Peer Support (EXISTS)
- **Spark ↔ Mental Health Mate**: Anonymous peer support

### 3. Team Chat (NEW)
- **Employer ↔ Team Members**: Internal company communication
- Requires: `employer_employees.user_id` column

### 4. Education Chat (NEW)
- **College Staff ↔ Student**: Progress reviews, support
- **College Staff ↔ Employer**: Apprentice updates, workplace visits
- **Student ↔ Employer Contact**: Work queries (via college)

---

## Database Changes Required

### 1. Add user_id to employer_employees
```sql
ALTER TABLE employer_employees ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE employer_employees ADD COLUMN employer_id UUID; -- Link to company
CREATE INDEX idx_employer_employees_user_id ON employer_employees(user_id);
```

### 2. Create unified_conversations table
```sql
CREATE TABLE unified_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Channel type
  channel_type TEXT NOT NULL, -- 'job', 'team', 'education', 'peer'

  -- Participants (flexible - stores user IDs)
  participant_1_id UUID NOT NULL REFERENCES auth.users(id),
  participant_1_type TEXT NOT NULL, -- 'employer', 'electrician', 'staff', 'student'
  participant_2_id UUID NOT NULL REFERENCES auth.users(id),
  participant_2_type TEXT NOT NULL,

  -- Context references (optional, depends on channel)
  context_type TEXT, -- 'vacancy', 'student', 'team'
  context_id UUID,

  -- State
  status TEXT DEFAULT 'active',

  -- Denormalized counters
  unread_1 INTEGER DEFAULT 0,
  unread_2 INTEGER DEFAULT 0,
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(channel_type, participant_1_id, participant_2_id, context_id)
);

CREATE TABLE unified_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES unified_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'file', 'system', 'voice_note'
  metadata JSONB DEFAULT '{}',

  sent_at TIMESTAMPTZ DEFAULT now(),
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3. Create team_channels for group chat
```sql
CREATE TABLE team_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL, -- The company
  name TEXT NOT NULL,
  description TEXT,
  channel_type TEXT DEFAULT 'general', -- 'general', 'project', 'announcements'
  is_private BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE team_channel_members (
  channel_id UUID REFERENCES team_channels(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  role TEXT DEFAULT 'member', -- 'admin', 'member'
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (channel_id, user_id)
);

CREATE TABLE team_channel_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES team_channels(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  metadata JSONB DEFAULT '{}',
  sent_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Spark (Electrician) Chat Initiation Points

### Current
1. ❌ Cannot initiate - only receive and reply (after applying)

### Proposed Additions
1. **Job Vacancies Page** → "Message Employer" button on vacancy cards
2. **Employer Profile View** → "Start Conversation"
3. **After Applying** → Direct chat opens
4. **From Notifications** → Reply to employer messages

### UI Changes Needed
- Add internal vacancy browser (not just external job boards)
- Add "Message" button to employer/vacancy cards
- Add conversation starter in application flow

---

## Team Chat Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  EMPLOYER DASHBOARD                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Team Chat                                     [+ New Channel]   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ # general           All team members                    3  ││
│  │ # site-updates      Project announcements               1  ││
│  │ # manchester-job    Project: Manchester Office          •  ││
│  │                                                             ││
│  │ Direct Messages                                             ││
│  │ 👤 John Smith (Site Supervisor)                         2  ││
│  │ 👤 Sarah Jones (Apprentice)                             •  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Education Chat Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  RELATIONSHIPS                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Student ◄─────────► Tutor (1:1 support)                        │
│     │                    │                                        │
│     │                    │                                        │
│     ▼                    ▼                                        │
│  Employer ◄──────────► College                                   │
│  (workplace)           (progress updates)                        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

Chat Channels:
1. Student → Assigned Tutor: Progress, support, questions
2. Tutor → Employer: Workplace visit scheduling, progress reports
3. Student → Employer (monitored): Work queries, sick day notices
```

---

## Implementation Priority

### Phase 1: Spark Chat Initiation (Quick Win)
1. Add internal vacancy listing for electricians
2. Add "Message Employer" to vacancy cards
3. Auto-open chat after successful application

### Phase 2: Team Chat
1. Add `user_id` to `employer_employees`
2. Create team channels infrastructure
3. Build Team Chat UI in employer dashboard

### Phase 3: Education Chat
1. Create education conversations table
2. Build college messaging UI
3. Add employer portal messaging

---

## MessagesDropdown Enhancement

Current tabs: Jobs | Mates

Proposed tabs based on user type:

**For Electricians:**
- Jobs (employer conversations)
- Team (if employed - chat with employer team)
- Mates (peer support)

**For Employers:**
- Candidates (talent pool conversations)
- Team (internal team chat)
- College (apprentice-related)

**For College Staff:**
- Students (student support)
- Employers (workplace coordination)
- Staff (internal)

**For Students:**
- Tutor (assigned tutor chat)
- Work (employer contact via college)
