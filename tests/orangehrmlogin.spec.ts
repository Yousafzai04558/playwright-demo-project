import { test, expect } from '@playwright/test';

test('OrangeHRM successful login', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByPlaceholder('Username').fill('Admin');

    await page.getByPlaceholder('Password').fill('admin123');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/dashboard/);

});

test('Invalid login', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByPlaceholder('Username').fill('TestUser');

    await page.getByPlaceholder('Password').fill('wrong123');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();

});

test('Login with empty fields', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required').first()).toBeVisible();

});



test('Password should be masked', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    const password = page.getByPlaceholder('Password');

    await password.fill('admin123');

    await expect(password).toHaveAttribute('type', 'password');

});


test('Verify login page UI', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await expect(page.getByText('Login')).toBeVisible();

    await expect(page.getByPlaceholder('Username')).toBeVisible();

    await expect(page.getByPlaceholder('Password')).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Login' })
    ).toBeVisible();

    await expect(
        page.getByText('Forgot your password?')
    ).toBeVisible();

});


test('Verify Forgot Password link', async ({ page }) => {

    await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    await page.getByText('Forgot your password?').click();

    await expect(page).toHaveURL(/requestPasswordResetCode/);

});

test('Verify password reset page', async ({ page }) => {

    await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    await page.getByText('Forgot your password?').click();

    await expect(
        page.getByPlaceholder('Username')
    ).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Reset Password' })
    ).toBeVisible();

});


test('Verify social media links', async ({ page }) => {

    await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    const links = page.locator('a');

    const count = await links.count();

    console.log('Total links:', count);

    for (let i = 0; i < count; i++) {

        const href = await links.nth(i).getAttribute('href');

        console.log(href);
    }

});
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    timeout: 10 * 1000,

    use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});