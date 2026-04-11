# Booking System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add /book (public scheduling) and /admin/bookings to guycohen-ai.co.il, integrated with Google Calendar and Gmail.

**Architecture:** Vite SPA frontend (existing) + Vercel serverless functions for API. Google Calendar API via service account for availability/events. Nodemailer + Gmail SMTP for confirmations. No database needed - Calendar IS the source of truth.

**Tech Stack:** React + Vite (existing), Vercel Functions (TypeScript), googleapis, nodemailer, react-day-picker (existing shadcn Calendar)

---

## Overview

The existing site is a Vite + React SPA at `ai-consulting-wizard/` deployed on Vercel.

### New files to create:

**Frontend (src/):**
- `src/pages/BookingPage.tsx` - Public booking wizard
- `src/pages/AdminBookings.tsx` - Admin booking management

**Backend (api/):**
- `api/slots.ts` - GET available time slots for a date
- `api/book.ts` - POST create booking
- `api/bookings.ts` - GET upcoming bookings (admin)
- `api/cancel.ts` - POST cancel booking (admin)
- `api/auth.ts` - POST admin login

**Modify:**
- `src/App.tsx` - Add routes
- `vercel.json` - Ensure /api routes work
- `package.json` - Add googleapis, nodemailer deps

### Environment variables (Vercel):
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=booking@project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY=base64-encoded-private-key
GOOGLE_CALENDAR_ID=info@guycohen-ai.co.il
GMAIL_USER=info@guycohen-ai.co.il
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
ADMIN_PASSWORD=chosen-password
ADMIN_SECRET=random-jwt-secret
```

---

### Task 1: Install dependencies + update configs

**Files:**
- Modify: `package.json`
- Modify: `vercel.json`
- Create: `api/tsconfig.json`

**Step 1:** Add googleapis and nodemailer:
```bash
cd ai-consulting-wizard && npm install googleapis nodemailer jsonwebtoken
npm install -D @types/nodemailer @types/jsonwebtoken
```

**Step 2:** Update vercel.json to handle /api:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Step 3:** Create api/tsconfig.json for serverless functions

---

### Task 2: API - Google Calendar integration

**Files:**
- Create: `api/_lib/calendar.ts`

Functions:
- `getAvailableSlots(date: string)` - Query freebusy, return 30-min slots
- `createBookingEvent(date, time, name, email)` - Create calendar event
- `getUpcomingBookings()` - List future events tagged [BOOKING]
- `cancelBooking(eventId)` - Delete calendar event

Working hours: Sun-Thu 09:00-18:00, no Fri/Sat (Shabbat)

---

### Task 3: API - Email integration

**Files:**
- Create: `api/_lib/email.ts`

Functions:
- `sendBookingConfirmation(to, name, date, time)` - To the booker
- `sendOwnerNotification(name, email, date, time)` - To Guy
- `sendCancellationNotice(to, name, date, time)` - Cancellation

Templates in Hebrew, branded.

---

### Task 4: API routes

**Files:**
- Create: `api/slots.ts`
- Create: `api/book.ts`
- Create: `api/bookings.ts`
- Create: `api/cancel.ts`
- Create: `api/auth.ts`

---

### Task 5: Frontend - BookingPage

**Files:**
- Create: `src/pages/BookingPage.tsx`
- Modify: `src/App.tsx`

3-step wizard:
1. Select date (shadcn Calendar, disable Fri/Sat/past)
2. Pick time slot (grid of available 30-min slots)
3. Enter name + email + confirm

Dark navy theme matching existing site. Hebrew RTL.

---

### Task 6: Frontend - AdminBookings

**Files:**
- Create: `src/pages/AdminBookings.tsx`
- Modify: `src/App.tsx`

Login with password, list upcoming bookings, cancel button per booking.

---

### Task 7: Deploy + setup guide

Setup Google service account, env vars, test, deploy.
