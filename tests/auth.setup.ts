import { test as setup } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  if (fs.existsSync(authFile)) {
    return;
  }
  await page.goto(
    "https://airtable.com/login?continue=%2Fapp6PjJAAPwiRw71N%2FpagWjJnFT2ZQn7eka%2Fform"
  );
  await page.getByRole("button", { name: "Continue with Google" }).click();
  await page
    .getByRole("textbox", { name: "Email or phone" })
    .fill(process.env.AIRTABLE_EMAIL!);
  await page.getByRole("button", { name: "Next" }).click();
  await page
    .getByRole("textbox", { name: "Enter your password" })
    .fill(process.env.AIRTABLE_PASSWORD!);
  await page.getByRole("button", { name: "Next" }).click();
  await page.waitForURL(
    "https://airtable.com/app6PjJAAPwiRw71N/pagWjJnFT2ZQn7eka/form"
  );
  await page.context().storageState({ path: authFile });
});
