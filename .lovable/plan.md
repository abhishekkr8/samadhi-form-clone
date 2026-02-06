

# Fix 400 Bad Request Registration Error

## Problem Analysis
The registration API is returning 400 Bad Request. Based on the code review:

1. **Custom fields sent as empty strings** - When "Other" isn't selected, `custom_category: ""` and `custom_sub_category: ""` are still being sent, which may violate API constraints
2. **Error message not captured** - The API returns detailed error info but our error handler only shows "Registration failed"
3. **Data type issues** - Some fields may have incorrect types (e.g., latitude/longitude as strings instead of numbers)

## Solution

### File: `src/services/api.js`

**Improve error handling to capture actual API error:**
```javascript
// registerUser function - better error capture
export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    // Better error extraction - handle different error formats
    const errorMsg = error.detail?.[0]?.msg 
      || error.detail 
      || error.message 
      || JSON.stringify(error);
    throw new Error(errorMsg);
  }
  return response.json();
};
```

### File: `src/components/MembershipStep5.jsx`

**Fix payload sanitization - remove empty strings for conditional fields:**
```javascript
// Before sending to API, properly clean the data
const registrationData = {
  // ... existing fields ...
  
  // Only include custom fields if "Other" is actually selected AND has a value
  custom_category: stakeholderFormData?.category?.includes("Other") && stakeholderFormData?.custom_category 
    ? stakeholderFormData.custom_category 
    : undefined,
  custom_sub_category: stakeholderFormData?.sub_category?.includes("Other") && stakeholderFormData?.custom_sub_category 
    ? stakeholderFormData.custom_sub_category 
    : undefined,
};

// Enhanced cleanup - remove undefined AND empty strings
Object.keys(registrationData).forEach(key => {
  if (registrationData[key] === undefined || registrationData[key] === "") {
    delete registrationData[key];
  }
});
```

**Ensure numeric fields are proper numbers:**
```javascript
latitude: parseFloat(personalInfo?.latitude) || 0,
longitude: parseFloat(personalInfo?.longitude) || 0,
```

### File: `src/components/MembershipStep4.jsx`

**Don't send empty strings for custom fields:**
```javascript
// In handleSubmit, change from:
custom_category: selectedCategories.includes("Other") ? customCategory : "",
custom_sub_category: selectedSubCategories.includes("Other") ? customSubCategory : "",

// To:
custom_category: selectedCategories.includes("Other") && customCategory ? customCategory : undefined,
custom_sub_category: selectedSubCategories.includes("Other") && customSubCategory ? customSubCategory : undefined,
```

## Summary of Changes

| File | Change |
|------|--------|
| `src/services/api.js` | Improve error message extraction to show actual API error |
| `src/components/MembershipStep5.jsx` | Remove empty strings and undefined values before API call |
| `src/components/MembershipStep4.jsx` | Pass undefined instead of empty string for custom fields |

This will ensure:
1. We see the actual error message from the API
2. Custom fields are only included when they have real values
3. Empty strings don't get sent to the API

