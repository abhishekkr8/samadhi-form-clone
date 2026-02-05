

# Fix Payment Order Receipt Length Error

## Problem
The `receipt` field in the payment order API is exceeding the 40-character limit. The current format generates ~61 characters:
- `membership_` (11 chars)
- UUID (36 chars)
- `_` (1 char)
- timestamp (13 chars)

## Solution
Shorten the receipt string to stay under 40 characters.

## Changes

### File: `src/components/MembershipStep5.jsx`

**Current Code (Line 87):**
```javascript
receipt: `membership_${registerResponse.id}_${Date.now()}`,
```

**Updated Code:**
```javascript
receipt: `mbr_${registerResponse.id.slice(0, 8)}_${Date.now()}`,
```

This creates a receipt like: `mbr_791f8e8b_1770284116576` (~28 characters)

- `mbr_` (4 chars)
- First 8 chars of UUID (8 chars)
- `_` (1 char)
- timestamp (13 chars)
- **Total: ~26 characters** (well under 40)

