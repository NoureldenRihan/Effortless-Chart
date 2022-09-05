import React from "react";

function Nav() {
  return (
    <nav>
      <div className="logo">
        <img
          className="logoImage"
          src={
            window.location.origin + "/images/Effortless Chart Logo Cropped.png"
          }
          alt="Logo"
        />
      </div>
    </nav>
  );
}

export default Nav;
