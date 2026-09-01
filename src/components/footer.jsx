function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="footer">
      <p className="footer__contact">
        Reach me at{" "}
        <a href="mailto:student@charusat.edu.in">student@charusat.edu.in</a>
      </p>
      <p className="footer__copyright">
        &copy; {year} &middot; built with React + Vite
      </p>
    </footer>
  );
}

export default Footer;