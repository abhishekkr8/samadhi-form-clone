

## Membership Application Form - Step 1 Clone

### Overview
Pixel-perfect clone of the "Membership Application - Step 1" form using React (Vite), JavaScript, and Tailwind CSS with only inline utility classes.

---

### What I'll Build

#### 1. Green Header Section
- Dark green background header with "Membership Application - Step 1" title
- Subtitle: "Fill your details first, then proceed to payment"

#### 2. Personal Information Section
- Section header with user icon and description text
- **3-column responsive grid:**
  - Full Name (required)
  - Email Address (required + helper text)
  - Mobile Number (required)

#### 3. Address Details Section
- **3-column responsive grid:**
  - Address (required)
  - City (required)
  - State (required)

#### 4. About Yourself Section
- Full-width textarea for self-description

#### 5. Membership Details Section (Objectives tak)
- Section header "Membership Details"
- **2-column layout:**
  - Reference Number (optional + helper text)
  - Objectives dropdown (required - with all options)

#### 6. Next Button
- Full-width green "Next" button
- On click: `console.log("Step 1 Submitted")`

---

### Files to Create:
1. **src/components/MembershipStep1.jsx** - Main form component
2. **src/App.jsx** - Converted to JSX, renders the form
3. **src/main.jsx** - Entry point converted to JSX

---

### Design Specs:
- **Container:** max-width ~1200px, centered
- **Card:** White background, rounded corners, shadow
- **Inputs:** Gray borders, green focus states
- **Required fields:** Red asterisk indicator

---

### Responsive:
- Desktop: 3-column grid
- Tablet: 2-column grid  
- Mobile: Single column

