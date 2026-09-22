# Milan Sunuwar — Digital Marketing

A React + Tailwind CSS website for Milan Sunuwar's digital marketing services: social media marketing and SEO.

## Tech stack

- **React 19** with **Vite 8**
- **Tailwind CSS 4**, via `@tailwindcss/vite`
- **React Router 7** for client-side routing
- **Resend** for sending contact emails from the serverless `/api/contact` endpoint
- **ESLint 10** with the React Hooks and React Refresh plugins

Animations use the browser's Web Animations API and `IntersectionObserver`. There is no animation library.

## Features

- **Five pages:** Home, Services, Projects, About and Contact.
- **Services accordion:** one item opens at a time, with a two-stage animation where the old state leaves before the new one enters. Links such as `/services#seo` open and scroll to the matching service.
- **Page transitions:** a two-stage transition plays between pages; links to the current page don't animate.
- **Scroll reveals:** headings, text, cards and list items fade in as they scroll into view, once each, staggered within a group.
- **Projects filter:** filter the sample projects by service.
- **Contact form:** sends enquiries by email through `/api/contact` (Resend), with validation shared between browser and server, a spam trap, and success and error messages.
- **Responsive layout:** mobile-first, with a hamburger menu below 1024px.
- **Reduced motion:** animations are skipped when the visitor's system requests reduced motion.

## Getting started

Requires Node.js `^20.19.0` or `>=22.12.0` (Vite 8's requirement).

```bash
npm install
npm run dev
```

The dev server prints the local URL, usually <http://localhost:5173>. It also serves `/api/contact` through the same handler the deployed function uses, so the endpoint works locally once `.env` is filled in.

## Scripts

| Command           | What it does                           |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload   |
| `npm run build`   | Build for production into `dist/`      |
| `npm run preview` | Serve the production build locally     |
| `npm run lint`    | Run ESLint over the project            |

## Environment variables

The contact endpoint needs these. Copy `.env.example` to `.env` and fill it in. `.env` is gitignored.

| Variable            | Purpose                                                                          |
| ------------------- | -------------------------------------------------------------------------------- |
| `RESEND_API_KEY`    | Resend API key                                                                   |
| `CONTACT_FROM`      | Sender address; `onboarding@resend.dev` until the domain is verified in Resend   |
| `CONTACT_TO`        | Where enquiries are delivered                                                    |
| `CONTACT_AUTOREPLY` | `true` to also email the visitor a confirmation; keep `false` with the test sender |

These are read only on the server (`api/` and `vite.config.js`) and never reach the browser bundle. `.env.example` has more detail on each variable.

## Project structure

```
api/
  contact.js          Vercel serverless function: POST /api/contact
  _lib/               Shared handler and email templates
public/               Static files served as-is
src/
  main.jsx            Entry point: router setup
  App.jsx             Routes and page transitions
  index.css           Tailwind theme: colours, fonts, spacing, breakpoints
  pages/              One component per route
  sections/           Page sections, grouped by page (home, services, …)
  components/         Header, footer, layout, logo, icons
    ui/               Shared building blocks: Button, Heading, Card, …
  data/               Site content: services, projects, nav and contact details
  lib/                Hooks and helpers: page transitions, scroll reveals,
                      contact validation
  assets/img/         Images
vercel.json           Routes everything except /api to the React app
vite.config.js        Vite plugins, plus the local /api/contact middleware
```

Breakpoints use custom mobile-first tokens (`gt640:`, `gt900:`, `gt1023:`, …) defined in `src/index.css`, not Tailwind's `sm`/`md`/`lg`.

## Build and deploy

```bash
npm run build
```

The build goes to `dist/`. The project is set up for Vercel: `vercel.json` routes every non-`/api` path to the React app, and `api/contact.js` deploys as a serverless function. Set the four environment variables in Vercel's project settings as well.
