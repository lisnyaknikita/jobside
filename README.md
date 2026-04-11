# Jobside - AI-Powered Job Application Tracker

Jobside is a high-performance Kanban-based platform designed to streamline the job search process. It combines workspace management with AI integration to help developers and professionals track vacancies and generate personalized cover letters.

![Project Preview](https://cdn.jumpshare.com/preview/2OxsZNGNDi81bVk4vM6sezxZ5c4kHB-Jd4y2wVhPzZWGbhXVMKAC5r2tvzVyqsXiby6rTwHVRaUpmPdu4mq1ZGRsROjgk0NprqWEuxvSOJ0)

## 💡 Motivation

Jobside was built to solve a real problem: managing job applications across multiple platforms while generating tailored cover letters efficiently.

Most existing tools either lack customization or do not integrate AI in a practical way. This project focuses on combining structured job tracking with AI assistance in a single workflow.

## 🚀 Key Features

- **Multi-Space Management**: Organize different job search tracks (e.g., "Frontend", "Backend", "Freelance") with custom icons and settings.
- **Smart Kanban Board**: Fully interactive board with drag-and-drop sorting (powered by `@dnd-kit`) and status updates.
- **AI Cover Letter Generator**: Integrated Google Gemini AI that analyzes your stored experience and job descriptions to craft tailored cover letters.
- **Advanced Task Management**: Detailed vacancy cards with tags, salary tracking, location status, and persistent notes.
- **Secure Authentication**: Robust auth flow using Supabase (PKCE flow), including password reset and protected middleware routes.
- **Responsive & Accessible UI**: Mobile-first design built with Tailwind CSS and Radix UI primitives for maximum accessibility.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescript.org/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Drag-and-Drop**: [@dnd-kit](https://dnd-kit.com/)
- **AI Integration**: [Google Gemini SDK](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏗️ Technical Highlights

- **Server Actions & Optimistic UI**: Used Next.js Server Actions for data mutations with optimistic updates to ensure a zero-latency feel for the user.
- **Type-Safe Forms**: Implemented centralized validation schemas with Zod to maintain strict data integrity across client and server.
- **Complex DnD Logic**: Engineered a vertical sorting strategy within columns that synchronizes the `order` field in the database, preventing "jumpy" UI during reorders.
- **Custom Middleware**: Built a sophisticated auth-guard proxy to handle session persistence and smart redirects (e.g., handling the `next` parameter for password resets).
