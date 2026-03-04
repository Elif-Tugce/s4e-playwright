import { test, expect } from '@playwright/test';

const URL = 'https://app.s4e.io/forgot-password';

/**
 * Some validations on the page are only triggered
 * after the first form submission attempt.
 * This helper simulates that initial submit to activate validation state.
 */
async function triggerFirstValidation(page: any) {
  await page.getByRole('button', { name: /send reset link/i }).click();
}

test.describe('Forgot Password - validation & UX', () => {

  /**
   * Page element locators
   */
  const emailInput = (page: any) =>
    page.getByRole('textbox', { name: /^email$/i });

  const sendButton = (page: any) =>
    page.getByRole('button', { name: /send reset link/i });

  const returnToSignIn = (page: any) =>
    page.getByText(/return to sign in/i);


  /**
   * Navigate to the page before every test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await expect(sendButton(page)).toBeVisible();
  });


  test('TC-FP-001: Page loads and essential elements are visible', async ({ page }) => {

    // Verify that core UI elements are present
    await expect(emailInput(page)).toBeVisible();
    await expect(sendButton(page)).toBeVisible();
    await expect(returnToSignIn(page)).toBeVisible();

  });

  test('TC-FP-002: Submit with empty email shows required validation', async ({ page }) => {
    
    // Click submit with empty input
    await sendButton(page).click();

    // Expect a required/mandatory message (text may vary)
    await expect(page.getByText(/email.*required/i)).toBeVisible();

  });


  test('TC-FP-003: Invalid email format shows validation message', async ({ page }) => {

    // Activate validation state
    await triggerFirstValidation(page);

    const email = emailInput(page);

    // Enter an invalid email format (length >= 5 but missing domain structure)
    await email.fill('abcde');

    // Move focus away from the field to trigger validation
    await email.press('Tab');

    // Expect validation error message to appear
    await expect(page.getByText(/valid email address/i)).toBeVisible();

  });


  test('TC-FP-004: Email length constraint is enforced (max 254 chars)', async ({ page }) => {

    await triggerFirstValidation(page);

    const email = emailInput(page);

    /**
     * Create an email longer than 254 characters.
     * The system should block this input and display
     * the max length validation error.
     */
    const longEmail =
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com';

    await email.fill(longEmail);

    // Trigger validation by removing focus
    await email.blur();

    await expect(page.getByText(/at most 254 characters/i)).toBeVisible();

  });


  test('TC-FP-005: Leading/trailing spaces behavior (UX check)', async ({ page }) => {

    await triggerFirstValidation(page);

    const email = emailInput(page);

    /**
     * Check how the system handles leading/trailing spaces.
     * Current observed behavior: spaces are not trimmed and
     * cause a format validation error.
     */
    await email.fill('  user@example.com  ');

    await email.blur();

    await expect(page.getByText(/valid email address/i)).toBeVisible();

  });


  test('TC-FP-007: Return to Sign In navigation works', async ({ page }) => {

    // Click the navigation link
    await returnToSignIn(page).click();

    // Verify navigation back to login page
    await expect(page).toHaveURL(/\/sign-in/);

  });


  test('TC-FP-SMOKE: Submit reset request with a valid-looking email (no inbox assertion)', async ({ page }) => {

    const email = emailInput(page);
    const send = sendButton(page);

    // Use a syntactically valid email
    await email.fill('user@example.com');

    /**
     * Ensure no client-side validation errors appear
     * before submitting the form.
     */
    await expect(page.getByText(/valid email address/i)).toHaveCount(0);
    await expect(page.getByText(/at most 254 characters/i)).toHaveCount(0);

    await send.click();

    /**
     * Smoke assertion:
     * Verify the UI remains stable after submission.
     * (We are not asserting inbox/email delivery here.)
     */
    await expect(send).toBeVisible();

  });


  test.skip('TC-FP-008: Enumeration protection (requires known existing vs non-existing accounts)', async ({ page }) => {

    /**
     * This scenario requires:
     * - one confirmed existing account
     * - one confirmed non-existing account
     *
     * The system should return a generic response
     * that does not reveal whether the email exists
     * in order to prevent user enumeration attacks.
     */

  });


  test('TC-FP-009: Sign up navigation from forgot password flow', async ({ page }) => {

    await page.goto('https://app.s4e.io/forgot-password');

    const email = page.getByRole('textbox', { name: /^email$/i });

    // Use a non-existing email to trigger the sign-up suggestion message
    await email.fill('nonexistinguser@gmail.com');

    await page.getByRole('button', { name: /send reset link/i }).click();

    // Verify the warning message appears
    await expect(page.getByText(/you aren't a part of s4e yet/i)).toBeVisible();

    // Locate the sign-up link within the message
    const signupLink = page.locator('a:has-text("Sign up")');

    await expect(signupLink).toBeVisible();

    // Click the sign-up link
    await signupLink.click();

    // Verify navigation to the sign-up page
    await expect(page).toHaveURL(/sign-up/i);

  });

  test('TC-FP-010: Pressing Enter in Email field submits the form (smoke)', async ({ page }) => {
    await page.goto(URL);

    const email = emailInput(page);
    await email.fill('user@example.com');

    // Press Enter to submit
    await email.press('Enter');

    // Smoke assertion: UI should remain stable and still show the submit button/page
    await expect(sendButton(page)).toBeVisible();
  });

  test.skip('TC-FP-011: Rate limiting (429) is enforced after repeated reset attempts', async ({ page }) => {
    // Intentionally triggering rate limits is not suitable for stable automated runs.
    // Verified manually: repeated submissions can lead to a 429 Too Many Requests response page.
  });

});