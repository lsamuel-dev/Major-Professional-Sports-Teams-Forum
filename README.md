# Lee Samuel

## Project Name:

Major-Profeesional-Sports-Teams-Forum

## Project Description:

Major Professional Sports Teams Forum** is a robust, 3-tier full-stack application built with **Node.js**, **Express**, and **React\*\*. Designed for high-stakes sports commentary and real-time fan engagement, the platform provides a centralized hub for users to discuss their favorite professional teams across various leagues.

The application features a secure architecture and a responsive user interface, allowing sports enthusiasts to create threads, post replies, and interact within dedicated community spaces.

## Project Structure

/major-sports-forum
├── /server
│ ├── /models (Database Schemas)
│ ├── /routes (API Endpoints)
│ ├── server.js (Entry point)
│ └── .env (Secret keys/DB URI)
├── /client
│ ├── /src
│ │ ├── /components (Login, Register, Sidebar)
│ │ ├── /pages (Dashboard)
│ │ └── App.js
└── package.json

### Key Features

- **Full-Stack Architecture:** A decoupled 3-tier system utilizing a React frontend, an Express/Node.js backend, and integrated database management.
- **Responsive User Interface:** A seamless, mobile-friendly design ensuring a consistent experience across all devices.
- **Dynamic Threading:** Real-time forum capabilities including thread creation, categorized discussions, and nested commenting.
- **Secure Data Handling:** Built with industry-standard practices to ensure data integrity and scalable performance for high-traffic discussions.

## User Stories

1. As a visitor, I want to browse different sports categories like NFL, NBA, MLB, and NHL, so that I can easily find discussions related to my favorite leagues.

- Acceptance Criteria: - The homepage displays clear navigation links or icons for each major league.
- Clicking a category filters and displays only the threads associated with that specific league.

2. As a visitor, I want to search for specific team names or players so that I can quickly find relevant conversations without scrolling through the entire feed.

- Acceptance Criteria: - A search bar is visible on the navigation or home screen.
- Submitting a search query returns a list of threads where the keyword matches the title or body content.

3. As a visitor, I want to create a secure account with a unique username so that I can start participating in the community.

- Acceptance Criteria: - The registration form includes inputs for username, email, and password.
- The system validates that the username is unique and hashes the password before saving it to the database.

4. As a registered user, I want to log in to my account securely so that my personal profile and posting history are protected.

- Acceptance Criteria: - A login form accepts a username/email and password.
- Successful authentication redirects the user to the dashboard, while failed attempts display a clear error message.

5. As a member, I want to start a new discussion thread within a specific league so that I can share my insights or ask questions to other fans.

- Acceptance Criteria: - An "Add Post" button is available to authenticated users within league categories.
- The post creation form requires a title and body text before the "Submit" button becomes active.

6. As a member, I want to reply to existing threads so that I can engage in real-time debates and conversations with the community.

- Acceptance Criteria: - A comment input field is visible at the bottom of every active discussion thread for logged-in users.
- Submitted replies appear instantly in the thread with the user's name and a timestamp.

7. As a user, I want to access the forum from both my phone and desktop so that I can stay engaged with sports talk while on the go.

- Acceptance Criteria: - The UI layout automatically adjusts for screen sizes below 768px (using a hamburger menu).
- Text and buttons remain legible and clickable without horizontal scrolling on mobile devices.

8. As a member, I want to update my profile details so that I can customize how I appear to other fans on the platform.

- Acceptance Criteria: - A "Settings" or "Profile" page allows the user to edit their display name or bio.
- Saving the changes updates the user's information across all their existing posts and replies.

9. As an administrator, I want to edit or delete inappropriate or off-topic posts so that the forum remains a high-quality space for sports fans.

- Acceptance Criteria: - Users with "Admin" privileges see "Edit" and "Delete" icons on every post in the forum.
- Clicking "Delete" prompts a confirmation and then permanently removes the content from public view.

## Wireframe Diagrams

- ![State 1: The Logged-Out State(Login/Register View))](Assets/wireframe-state-1.png)
- ![State 2: The Authentication Error State (Registration View)](Assets/wireframe-state-2.png)
- ![State 3: The Dashboard Empty State(After Login)](Assets/wireframe-state-3.png)
- ![State 4: The Category Active State(After Clicking a League, the forum)](Assets/wireframe-state-4.png)
