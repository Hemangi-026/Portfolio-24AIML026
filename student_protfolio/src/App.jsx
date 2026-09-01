import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Projects from './pages/projects';
import Contact from './pages/contact';
import NotFound from './pages/notfound';
import './App.css';

// NOTE: wrap <App /> in <BrowserRouter> once, in main.jsx — not here.
function App() {
  // Supplementary requirement: dark/light mode toggle applied to the root element
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all 404 route must stay last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Jane Doe — built with React Router.</p>
      </footer>
    </div>
  );
}

export default App;