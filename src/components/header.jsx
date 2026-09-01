function Header({ name, themeColor }) {
  return (
    <header className="header">
      <p className="header__eyebrow" style={{ color: themeColor }}>
        {"// student developer"}
      </p>
      <h1 className="header__name" style={{ borderColor: themeColor }}>
        {name}
      </h1>
      <p className="header__tagline">
        Building things, breaking things, fixing things, repeat.
      </p>
    </header>
  );
}

export default Header;