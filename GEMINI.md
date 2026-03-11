# Project Context: Web Studio & Hosting Corporate Website

## Project Overview
This repository contains the source code and planning documentation for a corporate website representing a web development and hosting business. It is being developed as a practical project for an academic internship and thesis. 

The website is a full-stack application featuring:
- Presentation of web development services and hosting plans.
- A portfolio of completed projects.
- A contact form for capturing client leads and requests.
- An administrative panel for managing content, plans, portfolio items, and incoming requests.

**Current Stage:** Frontend setup and development. The technology stack selected is TypeScript with Next.js (App Router) and Payload CMS (Headless CMS integrated within Next.js). Payment integration uses YooKassa.

## Building and Running
The main application code resides in the `frontend` directory.

*   **Install Dependencies:** `cd frontend && npm install`
*   **Run Development Server:** `cd frontend && npm run dev`
*   **Build:** `cd frontend && npm run build`
*   **Start Production Server:** `cd frontend && npm run start`

## Development Conventions
*   **Planning & Tracking:** Project progress and architecture plans are tracked in `PLAN.md`.
*   **Documentation:** General project information is maintained in `README.md`.
*   **Database Schema:** Models for Services, Hosting Plans, Projects (Portfolio), Leads/Requests, and Users (Admins) will be managed via Payload CMS.
*   **Workflow:** Development is currently focused on Backend/Admin Development and Frontend Integration within the Next.js app.

## Directory Structure
*   `frontend/`: The Next.js + Payload CMS application containing the UI components, CMS config, and API routes.
*   `PLAN.md`: Contains the detailed development roadmap, database architecture, and technology stack considerations.
*   `README.md`: Basic project introduction and developer information.
