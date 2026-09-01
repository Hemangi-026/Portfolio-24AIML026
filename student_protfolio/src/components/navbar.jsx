import { Link, NavLink } from 'react-router-dom';

// NavBar receives dark mode state + setter as props from App.jsx
// so the toggle button lives here but the state lives in App.
function NavBar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Portfolio
      </Link>

      <div className="navbar-links">
        {/* Using <Link> / <NavLink> instead of <a> avoids full page reloads */}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Contact
        </NavLink>
      </div>

      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark and light mode"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  );
}

export default NavBar;