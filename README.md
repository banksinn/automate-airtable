# Airtable Automation with Playwright

An automated testing solution for filling Airtable forms with task data using Playwright. This project reads task data from JSON files and automatically submits them to your Airtable workspace.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Data Format](#data-format)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Task Types](#task-types)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Data-driven testing**: Read task data from JSON files
- **Automated form filling**: Automatically fills Airtable forms with task information
- **Multiple task types**: Support for different task categories (work, meeting, idle, etc.)

## 🔧 Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm)
- Airtable account with access to the target workspace

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd automate-airtable
```

2. Install dependencies:
```bash
pnpm install
```

## ⚙️ Configuration

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Update the `.env` file with your Airtable credentials:
```properties
AIRTABLE_EMAIL="your-email@domain.com"
AIRTABLE_PASSWORD="your-password"
```

### Authentication Setup

The project includes authentication setup that saves login state:
- Login credentials are stored securely
- Authentication state is reused across test runs
- No need to log in manually for each test execution

## 🚀 Usage

### Basic Usage

1. **Prepare your task data**: Update `task-data.json` with your tasks (see [Data Format](#data-format))

2. **Run the automation**:
```bash
# Run tests in headed mode (browser visible)
pnpm test

# Run tests in debug mode (step-by-step)
pnpm test:debug

# View test report
pnpm test:report
```

### Advanced Usage

```bash
# Run specific test file
npx playwright test tests/airtable.spec.ts

# Run tests in headless mode
npx playwright test

# Generate new test code
pnpm run test:codegen
```

## 📄 Data Format

### Task Data Structure (`task-data.json`)

```json
{
  "2025-08-07": [
    {
      "taskItem": "Task title or brief description",
      "taskNote": "Detailed task notes or description",
      "type": "work",
      "hours": "6"
    },
    {
      "taskItem": "Standup Meeting",
      "taskNote": "Daily team standup meeting",
      "type": "meeting", 
      "hours": "1"
    }
  ],
  "2025-08-08": [
    {
      "taskItem": "Code Review",
      "taskNote": "Review pull requests and provide feedback",
      "type": "work",
      "hours": "2"
    }
  ]
}
```

### Field Descriptions

- **Date key** (`"2025-08-07"`): Date in YYYY-MM-DD format
- **taskItem**: Brief task title/description for the "Task Item" field
- **taskNote**: Detailed description for the "Task Note" field  
- **type**: Task category (see [Task Types](#task-types))
- **hours**: Time spent on the task (as string)

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm test` | Run tests in headed mode (browser visible) |
| `pnpm run test:debug` | Run tests in debug mode with step-by-step execution |
| `pnpm run test:report` | Open the HTML test report |
| `pnpm run test:codegen` | Open Playwright codegen for the Airtable form |

## 📁 Project Structure

```
automate-airtable/
├── .env                    # Environment variables (credentials)
├── .env.example           # Environment template
├── task-data.json         # Task data for automation
├── package.json           # Dependencies and scripts
├── playwright.config.ts   # Playwright configuration
├── tests/
│   ├── airtable.spec.ts  # Main test file
│   └── auth.setup.ts     # Authentication setup
├── playwright/           # Playwright configuration files
├── test-results/        # Test execution results
└── playwright-report/   # HTML test reports
```

## 🏷️ Task Types

The following task types are supported:

| Type | Airtable Option |
|------|----------------|
| `work` | "Create / Do / Work" |
| `audit` | "Audit Work" |
| `plan` | "Plan / Think" |
| `coordinate` | "Co-Ordinate" |
| `meeting` | "Internal Meeting" |
| `idle` | "Idle" |
| `leave` | "Leave" |
| `other` | "Other" |

## 🔍 Troubleshooting

### Common Issues

**1. Authentication Errors**
- Verify credentials in `.env` file
- Check if your Airtable account has access to the workspace
- Run authentication setup: `npx playwright test auth.setup.ts`

**2. Date Selection Issues**
- Ensure dates in `task-data.json` are in YYYY-MM-DD format

**3. Element Not Found Errors**
- Airtable UI might have changed - use codegen to update selectors:
  ```bash
  pnpm test:codegen
  ```
- Check if the form URL is still valid

**4. Timeout Issues**
- Increase timeout values in the test if needed
- Check your internet connection
- Verify Airtable form is accessible

### Debug Mode

Use debug mode to step through tests:
```bash
pnpm test:debug
```

This opens the Playwright inspector where you can:
- Step through each action
- Inspect elements
- Modify selectors
- Debug failures

### Viewing Results

After test execution:
```bash
pnpm test:report
```

This opens an HTML report showing:
- Test execution results
- Screenshots and videos of failures
- Detailed execution logs
- Performance metrics

## 📝 Notes

- The automation currently supports Thai employee name "แบงค์-สินธนา"
- Project is set to "futureskill-b2b-learning-platform25"
- Company is set to "FutureSkill"
- These values can be modified in the test file if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
