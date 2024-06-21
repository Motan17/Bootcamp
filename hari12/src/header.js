import React from 'react';



function Header() {
  return (
    <div className="navbar">
        <img
          id="logo-main"
         src='logo.png'
          width="60"
          alt="Logo Thing main logo"
        />
        <div className="navbar-brand">HAIIIII</div>
        <div className="navbar-links">
          <button>Home</button>
          <button>About</button>
          <button>Contact</button>
        </div>
      </div>
  );
}

export default Header;