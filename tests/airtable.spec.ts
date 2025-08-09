import { test } from "@playwright/test";
import { format } from "date-fns";
import * as fs from "fs";
import * as path from "path";

const testDataPath = path.join(__dirname, "..", "task-data.json");
const testData = JSON.parse(fs.readFileSync(testDataPath, "utf8"));

test.describe("Airtable automation", () => {
  const TASK_TYPE_MAPPING = {
    work: "Create / Do / Work",
    audit: "Audit Work",
    plan: "Plan / Think",
    coordinate: "Co-Ordinate",
    meeting: "Internal Meeting",
    idle: "Idle",
    leave: "Leave",
    other: "Other",
  };
  Object.entries(testData).forEach(([date, tasks]) => {
    (tasks as any[]).forEach((taskData) => {
      test(`Create record for ${date} - ${taskData.taskNote}`, async ({
        page,
      }) => {
        await page.goto(
          "https://airtable.com/app6PjJAAPwiRw71N/pagWjJnFT2ZQn7eka/form"
        );

        const formattedDate = format(new Date(date), "EEE MMM dd");
        await page.getByRole("textbox", { name: "Date" }).click();
        await page.getByRole("gridcell", { name: formattedDate }).click();
        console.log(`Date selected: ${formattedDate}`);

        await page
          .getByRole("button", { name: "Add employee to Employee field" })
          .click();
        await page
          .getByRole("combobox", { name: "Search" })
          .waitFor({ state: "visible" });
        await page.waitForTimeout(1000);
        await page
          .getByRole("combobox", { name: "Search" })
          .fill("แบงค์-สินธนา");
        await page.waitForTimeout(1000);
        await page.getByRole("combobox", { name: "Search" }).press("Enter");

        await page
          .getByRole("button", { name: "Add project to Project ID" })
          .waitFor({ state: "visible" });
        await page.waitForTimeout(1000);
        await page
          .getByRole("button", { name: "Add project to Project ID" })
          .click();
        await page
          .getByRole("combobox", { name: "Search" })
          .fill("futureskill-b2b-learning-platform25");
        await page.waitForTimeout(1000);
        await page.getByRole("combobox", { name: "Search" }).press("Enter");
        await page.getByTestId("unlink-foreign-key").nth(2).click();

        await page
          .getByRole("button", { name: "Add company to Company field" })
          .waitFor({ state: "visible" });
        await page.waitForTimeout(1000);
        await page
          .getByRole("button", { name: "Add company to Company field" })
          .click();
        await page
          .getByRole("combobox", { name: "Search" })
          .fill("FutureSkill");
        await page.waitForTimeout(1000);
        await page.getByRole("combobox", { name: "Search" }).press("Enter");

        await page.getByTestId("autocomplete-button").click();

        await page
          .getByRole("option", { name: TASK_TYPE_MAPPING[taskData.type] })
          .click();

        await page.getByRole("textbox", { name: "Task Item" }).click();
        await page
          .getByRole("textbox", { name: "Task Item" })
          .fill(taskData.taskItem);
        await page.getByRole("textbox", { name: "Task Note" }).click();
        await page
          .getByRole("textbox", { name: "Task Note" })
          .fill(taskData.taskNote);

        await page.getByRole("textbox", { name: "Spent (Hours)" }).click();
        await page
          .getByRole("textbox", { name: "Spent (Hours)" })
          .fill(taskData.hours);

        await page.pause();
      });
    });
  });
});
