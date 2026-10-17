# 🚀 TnP Copilot

### AI-Powered Placement Intelligence for Campus Training & Placement Teams

**TnP Copilot** is a hackathon prototype built to simplify college Training and Placement (TnP) workflows through AI-assisted notice analysis, company research, student eligibility checking, and placement coordination tools.

**Built for:** AZINHACK ’26 — Open Innovation  
**Institution:** USICT, GGSIPU

---

## 🎯 Problem Statement

Training and Placement teams handle company notices, eligibility criteria, student information, company research, and coordination activities. Managing these workflows manually across separate tools can consume time and make information harder to organize and verify.

## 💡 Our Solution

TnP Copilot brings these activities together in a unified dashboard. It combines AI-assisted analysis and web investigation with structured eligibility workflows to help placement coordinators organize information and make better-informed decisions.

## ✨ Key Features

- **AI Notice Analyzer:** Uses Google Gemini to analyze placement notices and extract eligibility criteria.
- **Student Eligibility Checking:** Helps compare student information with configured company requirements.
- **Eligibility Traceability:** Supports reviewing the criteria behind eligibility decisions.
- **Company Investigator:** Integrates TinyFish to investigate company webpages and retrieve information for review.
- **Student Intelligence:** Searchable student profiles with academic information, skills, projects, and eligibility details using demonstration data.
- **Company & HR Directory:** A dedicated interface for organizing company and HR information.
- **Placement Inbox:** Demonstrates message filtering, read/unread states, and notice-sharing workflows.
- **Coordinator Dashboard:** Organizes priority actions and placement workflow activity.

> **Prototype note:** Some modules use demonstration data and local application state. The project is not yet a live institutional placement management system.

## 🧠 Innovation

TnP Copilot aims to connect placement notice understanding, eligibility review, and company investigation in one workflow.

Its core principles are:

1. **From notice to criteria:** Convert placement notice information into structured requirements for review.
2. **More transparent eligibility:** Make it easier for coordinators to inspect the criteria used in eligibility checks.
3. **Web-assisted company research:** Use TinyFish to retrieve information from company webpages.
4. **Human-in-the-loop decisions:** Keep coordinators responsible for verifying information before making official placement decisions.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and build tool |
| Node.js | Backend server |
| Google Gemini API | AI-assisted notice analysis |
| TinyFish API | Company webpage investigation |
| CSS | Interface styling |

## 🏗️ Architecture

```text
Placement Coordinator
        |
        v
React + Vite Frontend
        |
        v
Node.js Backend
        |
        +---- Google Gemini API
        |         |
        |         v
        |    Notice Analysis
        |
        +---- TinyFish API
                  |
                  v
          Company Investigation
```

Eligibility, student profiles, directory, and inbox features also use configured demonstration data or local state where applicable.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Git
- Google Gemini API key
- TinyFish API key

### 1. Clone the repository

```bash
git clone https://github.com/nagpalmilit/tnp-copilot.git
cd tnp-copilot
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. Add your API keys using the exact variable names referenced in `server.js`.

Example, if these match your code:

```env
GEMINI_API_KEY=your_gemini_api_key
TINYFISH_API_KEY=your_tinyfish_api_key
```

Never upload your `.env` file or expose your API keys publicly.

### 4. Start the backend

Open a terminal in the project root:

```bash
node server.js
```

### 5. Start the frontend

Open a second terminal in the project root:

```bash
npm run dev
```

Open the local URL printed by Vite.

**Note:** These instructions assume your `package.json` has the usual Vite `dev` script and your backend uses `server.js`. Check your actual configuration if the commands differ.

## 🔐 Security & Responsible Use

- Keep API keys in environment variables.
- Verify company information against its original webpage.
- Review AI-extracted eligibility criteria before using them.
- Do not treat demonstration student profiles as real institutional records.
- Use eligibility results as decision-support information, not as a replacement for official placement policies.

## 🔮 Future Scope

- Integration with authorized institutional student databases.
- Placement notice monitoring and deadline alerts.
- Stronger source evidence and verification for company research.
- Persistent shared data and role-based access.
- Integration with authorized institutional communication systems.
- Testing, deployment, and improved security controls.

## 👥 Team

**Project:** TnP Copilot  
**Institution:** University School of Information, Communication and Technology (USICT), GGSIPU  
**Event:** AZINHACK ’26 — Open Innovation

Milit Nagpal - Frontend
Sushant Nautiyal - Backend
Saket Kalra - Presentation\PPT

## 📌 Project Status

**Hackathon prototype in development.**

The project demonstrates AI-assisted notice analysis, company investigation, eligibility workflows, and placement coordination interfaces. Some features are prototypes and may use demonstration data or local state.

---

Made with 💙 for smarter campus placement workflows.