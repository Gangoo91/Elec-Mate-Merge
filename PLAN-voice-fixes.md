# Plan: Fix Voice Agent Dropdown Updates and Stop Command

## Problem Summary

1. **Dropdown fields not updating**: Voice commands like "set wiring type to A" or "set reference method to C" aren't changing the dropdown values
2. **Stop command not working**: User says "stop" and agent says "I'll stop" but session continues

---

## Root Cause Analysis

### Issue 1: Stop Command

**Current flow (BROKEN):**
```
User says "stop"
  → ElevenLabs agent calls stop_session tool
  → useInlineVoice.ts clientTools.stop_session()
  → Returns string "Stopping voice session"
  → NOTHING ACTUALLY STOPS
```

**Problem:** The `stop_session` client tool in `useInlineVoice.ts` (line 102-105) just returns a string. It doesn't:
- Call `handleToolCall()` to route to component
- Call `conversation.endSession()`

### Issue 2: Dropdown Fields

**Potential causes:**
1. Voice command might not be calling the tool at all (agent might be responding without using tools)
2. Field name resolution might be wrong
3. Dropdown value resolution might be wrong
4. Circuit might not be selected when update happens

---

## Files to Modify

### 1. `src/hooks/useInlineVoice.ts`

**Fix stop_session to actually end the session:**

```typescript
// Line 100-105 - BEFORE:
clientTools: {
  stop_session: async () => {
    console.log('[InlineVoice] stop_session called');
    return 'Stopping voice session';
  },

// AFTER:
clientTools: {
  stop_session: async () => {
    console.log('[InlineVoice] stop_session called - ending session');
    // End the session directly from within the client tool
    await conversation.endSession();
    return 'Session ended';
  },
```

**Problem:** The `conversation` variable isn't accessible inside clientTools because of how useConversation works.

**Alternative approach - pass stop to component:**

```typescript
stop_session: async () => {
  console.log('[InlineVoice] stop_session called');
  // Call the component's handler which has access to stopVoiceRef
  return handleToolCall('stop_session', {});
},
```

This routes stop_session through handleToolCall to the component, which already has the stopVoiceRef wired up.

### 2. `src/components/EICRScheduleOfTests.tsx`

**Ensure stop_session is handled BEFORE the fill_schedule_of_tests check:**

The current code at line 143-147 looks correct:
```typescript
if (toolName === 'stop_session') {
  setTimeout(() => stopVoiceRef.current?.(), 500);
  return 'Stopping voice session. Goodbye!';
}
```

But the issue is it's never reached because useInlineVoice handles it internally.

### 3. Debug Dropdown Updates

**Add logging to trace dropdown updates:**

In `handleVoiceToolCall`, add more detailed logging:
```typescript
case 'update_field': {
  const field = params.field as string;
  let value = params.value as string;
  const circuitNum = params.circuit_number as number | undefined;

  console.log('[Voice] update_field - field:', field, 'value:', value, 'circuit:', circuitNum);

  const resolvedField = resolveFieldName(field) || field;
  console.log('[Voice] resolvedField:', resolvedField);

  value = resolveDropdownValue(resolvedField, value);
  console.log('[Voice] resolvedValue:', value);

  // ... rest of handler
}
```

### 4. Circuit Defaults Issue

**Check if circuitDefaults is applying correctly:**

The `createCircuitWithDefaults` should set:
- `typeOfWiring: 'A'`
- `referenceMethod: 'C'`

But if the circuit was created before the fix, it might have empty values.

---

## Implementation Steps

### Step 1: Fix stop_session in useInlineVoice.ts

Change the stop_session client tool to route through handleToolCall:

```typescript
stop_session: async () => {
  console.log('[InlineVoice] stop_session called');
  return handleToolCall('stop_session', {});
},
```

### Step 2: Verify component handles stop_session

Already implemented correctly at line 143-147.

### Step 3: Test dropdown field updates

1. Add console logs to trace:
   - What field name comes from ElevenLabs
   - What it resolves to
   - What value is set

2. Check if the issue is that voice isn't calling the tool at all (just responding conversationally)

### Step 4: Update ElevenLabs system prompt

Make sure the prompt is explicit about using tools:
- "ALWAYS use the fill_schedule_of_tests tool for ANY field update"
- "NEVER respond to field update requests without calling the tool"
- "When user says stop/finish/done, ALWAYS call stop_session tool - do not just respond verbally"

---

## Verification

1. Say "stop" - session should end immediately
2. Say "set wiring type to A" - Type column should show "A"
3. Say "set reference method to C" - Ref column should show "C"
4. Say "set live size to 2.5mm" - Live column should show "2.5mm"
5. Say "set all polarity to correct" - all polarity should update

---

## Console Log Checklist

When testing, verify these logs appear:
1. `[InlineVoice] stop_session called` - when saying stop
2. `[Voice] Tool call: stop_session` - in component
3. `[Voice] Tool call: fill_schedule_of_tests` - for field updates
4. `[Voice] update_field - field: typeOfWiring value: A` - showing correct resolution
