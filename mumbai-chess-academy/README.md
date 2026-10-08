# Mumbai Chess Academy — Interactive Website Concept

A responsive React + Vite website concept with a live 3D chessboard, hover-responsive pieces/squares, course cards, actual academy coach profiles, a gallery using existing academy-site photos, FAQ accordion, and a trial-class enquiry form that prepares a WhatsApp message.

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build for production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Extract this ZIP and push the `mumbai-chess-academy` folder to a new GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. No environment variables are required.

## Academy content added

- Coach profiles for Abhishek Naidu, Sarvesh Sonawane, and Aniket Thombare based on the existing academy website.
- Gallery using the academy's currently published images of chess activities and trophy presentations.
- Contact numbers and Mahim address taken from the existing academy website.
- Images are currently loaded from `mumbaichessacademy.in`. If the original host blocks external image embedding, download those image files from the original site and place them in `public/images`, then update `academyImages` in `src/main.jsx` to use local `/images/...` paths.

## Interactions

- Rotate the 3D chessboard by dragging; it rotates gently on its own.
- Hover over pieces or squares to see them highlight.
- The trial form creates a WhatsApp enquiry to the contact number used by the academy's public website.
- Mobile navigation, FAQ accordion, and responsive layouts are included.

## Before showing it as the official site

This is a redesign concept / demo and does not edit the live website. Please ask the academy owner to verify the public phone number, WhatsApp link, programs, claims, and any wording before using it in production. The Google rating is labelled as information shown on the existing website, not independently verified. The form opens WhatsApp; it does not store submissions or send anything automatically.
