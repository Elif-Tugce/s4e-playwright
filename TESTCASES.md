# Forgot Password Module Test Cases

Module: Authentication  
Page: Forgot Password (Reset Link Request)  
URL: https://app.s4e.io/forgot-password  

---

## TC-FP-001
**Title:** Page loads and essential elements are visible

**Precondition:** None

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password

**Expected Result:**  
Page header ("Forgot Your Password?") is visible, email input is visible, and "Send Reset Link" button is visible.

---

## TC-FP-002
**Title:** Submit with empty email shows required validation

**Precondition:** User is on forgot password page

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Leave email field empty
3. Click "Send Reset Link"

**Expected Result:**  
A validation message is displayed indicating email is required (e.g., "Email is required").

---

## TC-FP-003
**Title:** Invalid email format shows validation message

**Precondition:** User is on forgot password page

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Enter an invalid email with a size of at least 5 (e.g., "abcde", "abcde@", "abcde.com")
3. Click "Send Reset Link"

**Expected Result:**  
Validation message is shown (e.g., "Email must be a valid email address").

---

## TC-FP-004
**Title:** Email length constraint is enforced (max 254 characters)

**Precondition:** User is on forgot password page

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Paste an email longer than 254 characters
3. Observe validation

**Expected Result:**  
Validation message is shown: "Email must be at most 254 characters".

---

## TC-FP-005
**Title:** Leading/trailing spaces should be handled (trim behavior)

**Precondition:** User is on forgot password page

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Enter email with spaces: "  user@example.com  "
3. Trigger validation (blur or click submit)

**Expected Result:**  
Preferred behavior: spaces are trimmed and email is accepted OR a clear message instructs the user to remove spaces.  
(If it fails as "invalid email", record as UX improvement.)

---

## TC-FP-006
**Title:** Case-insensitive email is accepted

**Precondition:** User is on forgot password page

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Enter "USER@EXAMPLE.com"
3. Trigger validation (blur or click submit)

**Expected Result:**  
Email is accepted as a valid format (no "invalid email address" error).

---

## TC-FP-007
**Title:** Return to Sign In navigation works

**Precondition:** User is on forgot password page

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Click "Return to Sign In"

**Expected Result:**  
User is redirected to the sign-in page (https://app.s4e.io/sign-in).

---

## TC-FP-008
**Title:** Reset link request message does not reveal account existence (security)

**Precondition:** None

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Submit a known registered email
3. Note the UI message
4. Submit an unregistered email
5. Compare messages

**Expected Result:**  
System shows a generic message that does not confirm whether the account exists (prevents account enumeration).

---

## TC-FP-009
Title: Sign Up navigation from forgot password flow

Precondition:
User is on the forgot password page.

Steps:
1. Navigate to https://app.s4e.io/forgot-password
2. Enter an email address that does not exist in the system
3. Click "Send Reset Link"
4. In the warning message, click "Sign up now"

Expected Result:
User is redirected to the Sign Up page.

---

## TC-FP-010
**Title:** Submitting the form via Enter key triggers reset request

**Precondition:** User is on forgot password page

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Enter a valid-looking email (e.g., "user@example.com")
3. Press **Enter** while focus is on the Email field

**Expected Result:**
Form submission is triggered (same behavior as clicking "Send Reset Link").
The page remains stable and shows the post-submit state/response.

---

## TC-FP-011
**Title:** Rate limiting is enforced after repeated reset attempts

**Precondition:** User is on forgot password page

**Steps:**
1. Navigate to https://app.s4e.io/forgot-password
2. Enter a non-existing email address
3. Click "Send Reset Link" repeatedly in a short period (e.g., 10+ times)

**Expected Result:**
The system enforces rate limiting and blocks excessive attempts (e.g., returns a 429 page/message).