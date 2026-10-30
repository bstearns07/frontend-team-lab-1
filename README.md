# 🤝 Impact Hub
![React](https://img.shields.io/badge/React-19-61dafb)
![Vite](https://img.shields.io/badge/Vite-8-646cff)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![CSS](https://img.shields.io/badge/CSS-3-blue)<br>

---

## 👥 Team Members
- Ben Stearns - [@bstearns07](https://github.com/bstearns07)
- Taylor Rath
- Tyler Lucas
- Samuel Robinson

📅 Last Updated: 10/27/2026

---

## 📑 Table of Contents
- 📌 [Summary](#-summary)
- ⭐ [How It Works](#-how-it-works)
- 🛠 [Installation](#-installation)
- ✨ [Features](#-features)
- 🧰 [Tech Stack](#-tech-stack)
- 🔧 [Development Tools](#-development-tools)
- 🧩 [Core Concepts](#-core-concepts)
- 📁 [Project Structure](#-project-structure)

---

## 📌 Summary

Want to lend a hand but not sure where to start? **Impact Hub** is a community volunteer board where neighbors
can browse local requests for help, filter them to find one that fits their schedule, and post or edit requests of
their own. Built with React and Vite, the app loads its requests from a JSON file and lets you search, filter,
and page through them with a clean card-based layout.

Built as a team project for the Full Stack Development course at Wayne State College.

For additional project documents, see the [Team Lab document](./docs/ReactCodeTeamLab.pdf) and the

---

## ⭐ How It Works
Follow the steps below once the app is running.

### 🔎 Find a Request
1. Type in the **Search requests** box to filter by title, organizer, date, category, status, or location.
2. Use the **Category** and **Status** dropdowns to narrow the list further.
3. Click **Clear Filters** to reset everything.

### 📖 Browse the Results
1. Matching requests appear as cards, four per page.
2. Use **Previous**, **Next**, or the numbered buttons to move between pages.
3. Click **View Details** on a card to see the full request.

### ➕ Add or Edit a Request
1. Fill in the form in the right sidebar (below the list on smaller screens) and click **Add Event**.
2. Click **Edit** on a card to load it into the form, then click **Update Event** to save your changes.
3. Click **Delete** on a card and confirm to remove it.

> 💡 Changes are held in memory only. Refreshing the page reloads the original data from `events.json`.

---

## 🛠 Installation

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) (current LTS recommended) and npm

### 🚀 Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/bstearns07/frontend-team-lab-1.git
   cd frontend-team-lab-1
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL printed in the terminal (typically http://localhost:5173).

### 📜 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint across the project        |

---

## ✨ Features
- Volunteer request cards showing category, title, location, date, time, description, and status
- Search across title, organizer, date, category, status, and location
- Category and status filters with a one-click **Clear Filters** button
- Pagination with up to four cards per page, Previous/Next buttons that enable and disable automatically, and a highlighted active page
- Add, edit, and delete requests (with a delete confirmation prompt)
- Summary stat cards at the top of the page
- Search box focused automatically once the data loads
- Loading, error, and empty-results states
- Responsive layout: the form is a fixed sidebar on wide screens and moves below the list on smaller screens

---

## 🧰 Tech Stack

### 🖥 Frontend
- React 19 (function components and Hooks)
- Plain CSS for layout and styling
- JavaScript (ES6+)

### 📦 Data
- Static JSON file (`public/events.json`) loaded with `fetch()`

---

## 🔧 Development Tools
- Vite (dev server and build)
- ESLint with the React Hooks plugin
- Prettier
- Git & GitHub

---

## 🧩 Core Concepts
- Component composition and props
- State management with `useState`
- Side effects, refs, and memoization with `useEffect`, `useRef`, `useMemo`, and `useCallback`
- Custom Hooks (`useDbActions` for loading and updating events)
- Controlled form inputs
- Lifting state up to a shared parent component
- Conditional rendering and list rendering with keys
- Filtering and pagination logic
- Responsive CSS with flexbox, grid, and media queries

---

## 📁 Project Structure

```text
public/
  events.json          Sample volunteer events
src/
  App.jsx              App state, filtering, and pagination
  App.css              Component styles
  index.css            Global styles and theme variables
  hooks/
    appHelpers.js      useDbActions hook (load, create, update, delete events)
  components/
    Header.jsx         Site title, navigation, and tagline
    EventStats.jsx     Summary stat cards
    EventControls.jsx  Search, category, and status filters
    EventList.jsx      Renders the visible event cards
    EventCard.jsx      A single event with its action buttons
    Pagination.jsx     Page navigation buttons
    VolunteerForm.jsx  Add/edit request form
    EmptyState.jsx     Message shown when no events match
    Footer.jsx         Credits
docs/                  Team lab document and component hierarchy diagram
```

---

⬆️ [Back to Top](#-impact-hub)
