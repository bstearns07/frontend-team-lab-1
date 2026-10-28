function Header() {
  return (
    <header className="site-header">
      <div className="site-header-content">
        <img
          src="src/assets/ImpactHubLogo.png"
          alt="Impact Hub Logo"
          width="150"
          height="150"
        />
        <div className="site-header-text">
          <h1>Impact Hub</h1>
          <h2>A little Help. A Stronger Community.</h2>
          <p id="header-p">
            Ask for support, find a local request, and give your time where it
            matters.
          </p>
        </div>
      </div>
    </header>
  );
}
// Community Requests = "Home"
export default Header;
