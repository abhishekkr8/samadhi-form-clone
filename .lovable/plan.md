
# Backend API Integration Plan

## Overview
This plan integrates the backend APIs to make the membership form dynamic. All form fields will be fetched from the backend schema APIs, and the final submission will use the register and payment APIs.

---

## API Endpoints Summary

| Endpoint | Purpose | Used In |
|----------|---------|---------|
| `GET /api/schema/common` | Common fields (order 1-17) | Step 1, Step 4 |
| `GET /api/schema/user-types` | Available user types | Step 2 |
| `GET /api/schema/user-type/{user_type}` | User-type specific fields | Step 3 |
| `POST /api/register` | Register user | Step 5 |
| `POST /api/payment/order` | Create payment order | Step 5 |

---

## Step-by-Step Implementation

### Step 1: Create API Service Layer
Create a new file `src/services/api.js` to centralize all API calls:
- Base URL: `http://46.202.166.179:8000`
- Functions for each endpoint
- Error handling

### Step 2: Update MembershipStep1.jsx
**Fetch schema from:** `GET /api/schema/common`

**Fields to render (order 1-12):**
- full_name (text, required)
- email (email, required)
- password (password, required) - **NEW FIELD**
- phone_number (string, required)
- address (string, required)
- city (string, required)
- state (string, required)
- latitude (number, required) - **NEW FIELD**
- longitude (number, required) - **NEW FIELD**
- about_yourself (textarea, required)
- reference_number (string, optional)
- objective (select, required) - options from API

**Changes:**
- Add loading state while fetching schema
- Dynamically render fields based on API response
- Add Password field with proper validation
- Add Latitude/Longitude fields

### Step 3: Update MembershipStep2.jsx
**Fetch stakeholders from:** `GET /api/schema/user-types`

**API Response format:**
```json
{
  "user_types": [
    {"value": "student", "label": "Student"},
    {"value": "freelancer", "label": "Freelancer"},
    ...
  ]
}
```

**Changes:**
- Remove hardcoded stakeholders array
- Fetch user types dynamically
- Map prices to each user type (prices can be stored locally or fetched if backend provides)
- Keep existing card UI design

### Step 4: Update MembershipStep3.jsx
**Fetch fields from:** `GET /api/schema/user-type/{user_type}`

**Example for student:**
```json
{
  "user_type": "student",
  "fields": {
    "college_name": {...},
    "degree": {...},
    "specialization": {...},
    "key_skills": {...},
    "preferred_mode": {...},
    "experience_projects": {...}
  }
}
```

**Changes:**
- Remove hardcoded `stakeholderForms` object
- Fetch form fields dynamically based on selected user type
- Render fields based on type (text, textarea, select)
- Handle required/optional fields

### Step 5: Update MembershipStep4.jsx
**Fetch schema from:** `GET /api/schema/common`

**Fields to render (order 13-17):**
- category (multi-select, required) - options from API
- custom_category (string, conditional - shown when "Other" selected)
- sub_category (multi-select, required) - options from API
- custom_sub_category (string, conditional - shown when "Other" selected)
- describe_your_need (textarea, required)

**Changes:**
- Remove hardcoded category/subcategory options
- Fetch options from API schema
- Add custom_category field (shown when "Other" is selected in category)
- Add custom_sub_category field (shown when "Other" is selected in sub_category)
- Remove subscription preferences section (not in API schema)

### Step 6: Update MembershipStep5.jsx
**API calls:**
1. `POST /api/register` - Register user with all collected data
2. `POST /api/payment/order` - Create payment order after successful registration

**Register Payload:**
```json
{
  "full_name": "string",
  "email": "user@example.com",
  "phone_number": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "latitude": 0,
  "longitude": 0,
  "about_yourself": "string",
  "user_type": "student",
  "password": "string",
  "reference_number": "string",
  "objective": "Personal networking",
  "category": ["string"],
  "custom_category": "string",
  "sub_category": ["string"],
  "custom_sub_category": "string",
  "describe_your_need": "string",
  "college_name": "string",
  ...user_type_specific_fields
}
```

**Payment Order Payload:**
```json
{
  "user_id": "uuid-from-register-response",
  "user_type": "student",
  "payment_type": "subscription",
  "amount_inr": 1000,
  "currency": "INR",
  "receipt": "string"
}
```

**Changes:**
- Call register API first
- On success, call payment order API
- Handle API errors with user-friendly messages
- Show loading states during API calls

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/services/api.js` | CREATE |
| `src/components/MembershipStep1.jsx` | MODIFY |
| `src/components/MembershipStep2.jsx` | MODIFY |
| `src/components/MembershipStep3.jsx` | MODIFY |
| `src/components/MembershipStep4.jsx` | MODIFY |
| `src/components/MembershipStep5.jsx` | MODIFY |

---

## Technical Details

### API Service Structure
```javascript
const BASE_URL = "http://46.202.166.179:8000";

export const getCommonSchema = async () => { ... }
export const getUserTypes = async () => { ... }
export const getUserTypeSchema = async (userType) => { ... }
export const registerUser = async (data) => { ... }
export const createPaymentOrder = async (data) => { ... }
```

### User Type to Price Mapping
Since the API doesn't provide prices, we'll maintain a local mapping:
```javascript
const priceMapping = {
  student: 1000,
  freelancer: 5000,
  educational_institute: 10000,
  startup_msme: 10000,
  incubation_centre: 10000,
  service_product_provider: 25000,
  industry: 25000,
  investor: 25000
};
```

### Dynamic Field Renderer
Create a reusable component to render fields based on schema:
- text -> input type="text"
- email -> input type="email"
- password -> input type="password"
- textarea -> textarea element
- select -> select with options
- multi-select -> multi-select dropdown with chips
- number -> input type="number"

### Error Handling
- Show toast notifications for API errors
- Validate required fields before submission
- Handle network errors gracefully

---

## Data Flow

```text
Step 1: Fetch common schema -> Render fields (order 1-12) -> Collect personalInfo
    |
    v
Step 2: Fetch user-types -> Show cards -> Select user_type + price
    |
    v
Step 3: Fetch user-type schema -> Render dynamic fields -> Collect stakeholderFormData
    |
    v
Step 4: Use common schema -> Render fields (order 13-17) -> Collect category/needs
    |
    v
Step 5: POST /api/register -> Get user_id -> POST /api/payment/order -> Process payment
```
