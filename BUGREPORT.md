# Bug Report

## Bug 1

### Bug ID
AUTH-FP-001

### Title
Potential Account Enumeration via Forgot Password Response

### Module
Authentication – Forgot Password

### URL
https://app.s4e.io/forgot-password

### Environment
Browser: Chromium (Playwright)
OS: Windows
Date Observed: 2026-03-04

---

### Description

The Forgot Password flow reveals whether an email address is registered in the system.

When submitting a non-existent email address, the system displays the following message:

"Unfortunately, it looks like you aren't a part of S4E yet. Sign up now."

This behavior may allow attackers to determine whether an email address exists in the system, enabling potential **account enumeration attacks**.

---

### Steps to Reproduce

1. Navigate to: https://app.s4e.io/forgot-password
2. Enter an email address that is **not registered** in the system
3. Click **Send Reset Link**

---

### Actual Result

The system displays a message indicating that the email is not part of the platform and suggests signing up.

---

### Expected Result

The system should return a **generic response** regardless of whether the email exists.

Example:

"If an account with this email exists, a password reset link has been sent."

This prevents attackers from identifying valid accounts.

---

### Severity
Medium

### Type
Security / Information Disclosure

---

---

## Bug 2

### Bug ID
AUTH-FP-002

### Title
Email validation is only triggered after form submission

### Module
Authentication – Forgot Password

### URL
https://app.s4e.io/forgot-password

### Environment
Browser: Chromium (Playwright)
OS: Windows
Date Observed: 2026-03-04

---

### Description

Email validation messages are not displayed while the user is typing or when the input field loses focus.

Validation is only triggered after the user clicks the **Send Reset Link** button.

This behavior may lead users to attempt to submit a form before realizing their input is invalid.

---

### Steps to Reproduce

1. Navigate to: https://app.s4e.io/forgot-password
2. Enter an invalid email, such as "abcde"
3. Click outside the input field or move focus away

---

### Actual Result

No validation message appears.

Validation is only triggered after clicking **Send Reset Link**.

---

### Expected Result

Validation feedback should appear earlier, for example:

- when the field loses focus (onBlur)
- or through real-time validation while typing

This would improve usability and reduce unnecessary form submissions.

---

### Severity
Low

### Type
Usability / Validation behavior