# Team 8 - Amdahl's Law
# 2024 Opportunity Hack @ASU Winners

## MOST UPDATED REPO(S)
- [Backend repo](https://github.com/newrr-ohack/Animal-Rescue-OSS/Backend)
- [Frontend repo](https://github.com/newrr-ohack/Animal-Rescue-OSS/Frontend)

## Quick Links
- [Hackathon Details](https://www.ohack.dev/hack/2024_fall)
- [Team Slack Channel](https://opportunity-hack.slack.com/app_redirect?channel=amdahls-law)
- [Nonprofit Partner](https://ohack.dev/nonprofit/BQkux9KMxEXksUK7ec7h)
- [Problem Statement](https://ohack.dev/project/nsxPhAtgiL8MMiX0rKj7)

## Team "Amdahl's Law"
- [Ronald McInnes](https://github.com/ronaldmcinnes)
- [Andrew Le](https://github.com/pandrewle)
- [Jonathan Amdahl](https://github.com/JonathanAmdahl)
- [Dhruv Jain](https://github.com/materwelondhruv)
- [Dario D'Addamio](https://github.com/dariodaddamio)

## Project Overview
**Problem Statement:**
Problem: NEWRR struggles with a manual processes for donation tracking, thank-you cards, and animal intake/adoption forms, leading to inefficiencies and missed engagement opportunities.
Goal: Develop a cloud-based system to streamline donation management, automate donor communications, and digitize animal-related forms and processes.
Key Features: Implement digital forms with unique URLs, donation tracking with automated thank-you notes, role-based access controls, and potential for task management and multimedia file integration.
**About our approach:**
In order to properly solve the issues of Nature's Edge Wildlife and Reptile Rescue, we decided to build them a fully functioning website to replace their current website, which lacks high quality UX (see here: https://www.newrr.org/), and is unable to support their needed tools like an animal database, additional forms, and centralized donation tracking.
We chose to decrease complexity for administrative users at the nonprofit by using forms from JotForm and facilitating donation and donation tracking with GiveButter. We centralize animal database editing and links to relevant form submissions and donating tracking all in one Admin Dashboard, which is accessible by logging in with Oauth. 

## Tech Stack
- Frontend: Vite + React + Typescript + Tailwind
- Backend: Typescript, Express.js
- Database: MongoDB
- Cloud Services: Railway and Vercel, a little AWS S3
- Authorization: Google Oauth
<!-- Add/modify as needed -->


## Getting Started
Instructions on how to set up and run our project locally.

```bash
git clone https://https://github.com/newrr-ohack/Animal-Rescue-OSS
cd Frontend
pnpm install
pnpm run dev
```
and
```bash
cd Backend
pnpm install
pnpm run start:watch
```

## [DevPost Link](https://devpost.com/software/nature-s-edge-wildlife-and-reptile-rescue)
## [Demo Video](https://youtu.be/7L3qIlJbZ7U)
