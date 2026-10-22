# Student Portfolio — React + Vite

A React Router single-page application built with Vite, featuring authentication,
task management, GitHub project listing, and a contact form.

---

## Practical 8 — Performance Optimisation: Lazy Loading

### What was changed

`src/App.jsx` was updated to replace all static `import` statements for route-level
page components with **`React.lazy()`** dynamic imports, and the entire `<Routes>`
block was wrapped in **`<Suspense>`** with a spinner fallback component.

```jsx
// BEFORE — every page loaded in one bundle
import Projects from './pages/projects';
import Contact  from './pages/contact';

// AFTER — each page becomes its own chunk, downloaded on first visit
const Projects = lazy(() => import('./pages/projects'));
const Contact  = lazy(() => import('./pages/contact'));
```

The `<Suspense>` wrapper shows a spinner while the requested chunk is in flight:

```jsx
<Suspense fallback={<PageFallback />}>
  <Routes>
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact"  element={<Contact />} />
    {/* … */}
  </Routes>
</Suspense>
```

`Home` and `NotFound` were kept as eager imports because they are either the
first route a user sees or needed immediately for error handling.

---

### Before / After Bundle Comparison

| Metric | Before | After |
|---|---|---|
| **Number of JS output files** | 1 | 11 (1 main + 10 chunks) |
| **Main bundle (raw)** | 253.88 kB | 239.50 kB |
| **Main bundle (gzip)** | 79.91 kB | 76.78 kB |
| **Initial JS transferred on first load** | 253.88 kB | ~239.50 kB (main only) |
| **Projects chunk** | — | 1.54 kB |
| **Contact chunk** | — | 1.62 kB |
| **Tasks chunk** | — | 4.67 kB |
| **Login chunk** | — | 1.45 kB |
| **Register chunk** | — | 2.09 kB |
| **Profile chunk** | — | 1.44 kB |
| **ForgotPassword chunk** | — | 1.40 kB |
| **ResetPassword chunk** | — | 1.58 kB |
| **Build time** | 17.91 s | 0.83 s |

> **How to reproduce:** run `npm run build` and inspect the `dist/assets/` folder.
> Open the Network tab in DevTools, reload the app, and switch to Slow 3G throttling
> to observe the spinner fallback before each chunk loads.

---

### Key Observations

**Why does perceived performance improve?**
The total amount of JavaScript that will ever be executed stays roughly the same.
However, on the initial page load the browser only needs to download and parse the
main chunk (~239 kB instead of ~254 kB). Route chunks are downloaded in parallel
in the background (or on demand), so the user sees a working Home page faster.
The spinner provides instant feedback while the next chunk loads, which feels much
faster than a blank screen.

**When is lazy loading not worth the complexity?**
- Very small apps where all pages combined are under ~30 kB (the network overhead
  of a second request outweighs the saving).
- Apps served over HTTP/2 where many small files are already streamed efficiently.
- SSR frameworks that handle splitting differently (e.g., Next.js App Router).

---

### Post-lab Tasks

- [x] Lazy load 2+ route-based components with Suspense fallback
- [ ] Lazy load one additional heavy component (chart / large list)
- [ ] Use React DevTools Profiler to identify one unnecessary re-render

---

## Running Locally

```bash
npm install
npm run dev       # development server (Vite HMR)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

---

## Tech Stack

- **React 19** with React Router v7
- **Vite 8** (build tool)
- **Firebase** (authentication)
- **Axios** (HTTP client)
