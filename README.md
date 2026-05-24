# Next Video App

A modern Next.js video platform with authentication, ImageKit-powered uploads, MongoDB persistence, and a clean shadcn/daisyUI-inspired interface.

## Overview

Next Video App lets authenticated users upload videos, publish video metadata, and browse a video feed. It uses Next.js App Router, NextAuth credentials authentication, MongoDB, and ImageKit for upload and playback handling.

## Features

- Email/password authentication with NextAuth credentials provider
- Protected video feed and upload flow
- ImageKit upload authentication endpoint
- Video upload form with title, description, file selection, progress, and publish flow
- Responsive video feed with playable cards
- Shared loading UI for page transitions and async actions
- Reusable UI primitives inspired by shadcn and daisyUI

## Tech Stack

- Next.js 16.2.6
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- daisyUI 5
- shadcn-style UI primitives
- NextAuth 4
- MongoDB with Mongoose
- ImageKit
- Axios
- Lucide React

## Project Structure

```text
src/
  app/
    api/
      auth/
      imagekit/
      video/
    auth/
      login/
      register/
    video/
      page.tsx
      upload/
    loading.tsx
    layout.tsx
    page.tsx
  components/
    ui/
    FileUpload.tsx
    Navbar.tsx
    VideoCard.tsx
  config/
  interfaces/
  models/
  provider/
  middleware.ts
```

## Main Routes

| Route            | Description       |
| ---------------- | ----------------- |
| `/`              | Landing page      |
| `/auth/login`    | Sign in page      |
| `/auth/register` | Register page     |
| `/video`         | Video feed        |
| `/video/upload`  | Video upload form |

## API Routes

| Route                              | Description                         |
| ---------------------------------- | ----------------------------------- |
| `GET /api/video`                   | Returns videos for the feed         |
| `POST /api/video/upload`           | Saves a published video             |
| `GET /api/imagekit/upload-auth`    | Returns ImageKit upload auth params |
| `POST /api/auth/register`          | Creates a new user                  |
| `GET/POST /api/auth/[...nextauth]` | NextAuth session and sign-in flow   |

## Environment Variables

Create a `.env.local` file in the project root:

```bash
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_ID=optional_github_oauth_id
GITHUB_SECRET=optional_github_oauth_secret
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Notes:

- `MONGO_URI` and `NEXTAUTH_SECRET` are required.
- GitHub OAuth values are optional in the current setup.
- ImageKit values are required for upload and playback.

## Getting Started

1. Install dependencies:

```bash
npm install
```

1. Add your environment variables in `.env.local`.

1. Run the development server:

```bash
npm run dev
```

1. Open the app:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Implementation Notes

- The video feed uses client-side fetching with background refresh behavior.
- The upload flow shows progress, blocks publishing until the upload completes, and posts metadata to MongoDB.
- The global loading screen is implemented with `src/app/loading.tsx`.
- The UI uses reusable components in `src/components/ui/` to keep the design consistent across auth and upload flows.

## Deployment

This app can be deployed on Vercel or any platform that supports Next.js. Make sure the production environment includes the same variables used in `.env.local`.

## License

No license has been defined yet.
