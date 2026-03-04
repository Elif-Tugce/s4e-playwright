# 🛡️ S4E Playwright QA Assignment

This repository contains exploratory testing, test case design, and Playwright automation for the **S4E web application**.

The goal of this assignment is to demonstrate a structured test engineering approach by identifying edge cases, implementing automated tests, and documenting important security and usability observations.

---

# 🔍 Selected Module

**Authentication – Forgot Password**

URL:  
https://app.s4e.io/forgot-password

**Why this module?**

Authentication flows are critical components of web applications.  
They involve complex validation logic, sensitive user data, and potential security risks such as **account enumeration attacks**.

The Forgot Password flow provides a good opportunity to test:

- Input validation behavior
- Edge case handling
- Navigation logic
- Security considerations

---

# 🛠️ Tools Used

- Playwright
- TypeScript
- Node.js
- Visual Studio Code

---

# 🎯 Scope of Testing

Testing focused on **edge cases and input validation** within the Forgot Password flow.

Main areas covered:

**Validation**
- Real-time vs submission-based validation
- Email format validation
- Email length limits

**UX Edge Cases**
- Leading and trailing whitespace handling
- Case-insensitive email handling
- Button state behavior

**Security**
- Investigation of potential **Account Enumeration** vulnerability

**Navigation**
- "Return to Sign In" navigation
- "Sign Up" redirection from error message

---

# 📋 Documentation & Automation

**Test Design**

Detailed edge case scenarios are documented in:

TESTCASES.md

Examples include:

- Empty email submission
- Invalid email formats
- Email length validation
- Whitespace handling
- Case-insensitive email behavior
- Enter key submission
- Rate limiting behavior

---

**Automated Test Suite**

Playwright automation tests are located in:

tests/forgot-password.spec.ts

The automation suite verifies:

- Validation logic
- UI behavior
- Navigation flows
- Basic form submission functionality

---

# 🐞 Findings

Issues and observations identified during testing are documented separately:

BUGREPORT.md  
Contains functional and security-related findings.

UX_IMPROVEMENTS.md  
Contains usability observations and potential product improvements.

---

# 🚀 How to Run the Tests

Install dependencies:

npm install

Run Playwright tests:

npx playwright test

Open the HTML test report:

npx playwright show-report

---

# 📝 Technical Notes

**Validation State**

Validation messages on the page are only triggered **after the first form submission attempt**.

**Automation Strategy**

To handle this behavior, the automated test suite includes a helper function called:

triggerFirstValidation()

This function simulates the initial submission required to activate the validation state before running assertions.

**Manual vs Automated Testing**

Certain scenarios (such as **rate limiting**) are intentionally skipped in automation to prevent excessive requests or potential IP blocking during repeated test runs.

These scenarios are instead documented in the test case documentation.

---

# Author

QA Assignment Submission