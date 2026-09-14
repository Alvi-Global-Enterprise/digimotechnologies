# Digimo Tech Website

Static clone of the Digimo Tech Framer site, organized for local development.

## Structure

```
├── index.html                 # Home
├── about/index.html
├── services/index.html
├── projects/index.html
├── contact/index.html
├── privacy-policy/index.html
├── blogs/
│   └── <slug>/index.html
├── css/                       # Custom styles (pricing)
├── js/                        # Custom scripts (pricing / footer)
├── images/                    # Page images
├── assets/                    # Framer fonts / media
├── fonts/                     # Inter fonts
├── sites/                     # Framer app bundles (.mjs)
├── framerusercontent.com/     # Mirrored Framer CDN images
├── third-party-assets/        # Fontshare fonts
└── s/                         # Google Syne fonts
```

Clean URLs match Framer routes: `/`, `/about`, `/services`, `/contact`, etc.

## Run locally

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000).
