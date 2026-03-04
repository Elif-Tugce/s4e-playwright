# UX Improvements – Forgot Password Module

During exploratory testing of the Forgot Password module, several usability observations were identified.

These are not necessarily functional bugs but represent potential improvements to user experience.

---

## UX-001 — Leading/trailing spaces in email input

### Description

If an email is entered with leading or trailing spaces, such as:

"  user@example.com  "

The system returns a generic **invalid email format** message.

### Impact

Users may not realize that whitespace is the actual cause of the error.

### Suggested Improvement

Either:

1. Automatically trim whitespace before validation, or
2. Display a clearer validation message indicating that spaces are not allowed.

---

## UX-002 — Validation message clarity

### Description

Some validation messages are generic (e.g., "Email must be a valid email address") even when the underlying issue may differ, such as whitespace or incorrect formatting.

### Impact

Users may not understand how to correct their input.

### Suggested Improvement

Provide more specific validation messages that clearly explain the problem with the input.

---

## UX-003 — Send Reset Link button remains enabled for invalid input

### Description

The **Send Reset Link** button remains enabled even when the email field contains invalid input.

### Impact

Users can repeatedly attempt to submit the form even though validation will fail.

This may lead to a confusing user experience.

### Suggested Improvement

Disable the **Send Reset Link** button until the email input passes basic validation rules.