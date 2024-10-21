import React from 'react'

function Submenu(visible) {
  return (
    <div
      className={visible ? "submenu show-submenu" : "submenu"}
    >
      <h5>{'hello'}</h5>
      <div
        className="submenu-links"
        style={{
          gridTemplateColumns:
            "1fr",
        }}
      >
            <a>
              <div className="submenu-icon">{'thing'}</div>
              <p className="sublink-text">{'thing2'}</p>
            </a>
      </div>
    </div>
  );
}

export default Submenu
