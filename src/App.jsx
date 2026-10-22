import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
// ---------- Eagerly-loaded routes ----------
import Home from './pages/home';
import NotFound from './pages/notfound';

// ---------- Lazy-loaded routes (downloaded only when visited) ----------
const Projects = lazy(() => import('./pages/projects'));
const Contact  = lazy(() => import('./pages/contact'));

import './App.css';

/**
 * PageFallback — shown by <Suspense> while a lazy chunk is loading.
 * Re-uses the existing .spinner-wrapper / .spinner CSS from App.css.
 */
function PageFallback() {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Loading page…</p>
    </div>
  );
}

// NOTE: wrap <App /> in <BrowserRouter> once, in main.jsx — not here.
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="app-content">
        {/*
         * Suspense boundary: React shows <PageFallback /> whenever
         * a lazy chunk hasn't finished downloading yet.
         */}
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact"  element={<Contact />} />
            {/* Catch-all 404 route must stay last */}
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Hemangi Parmar — built with React Router.</p>
      </footer>
    </div>
  );
}

export default App;
