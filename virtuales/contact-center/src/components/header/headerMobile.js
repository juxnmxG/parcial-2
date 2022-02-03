import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { langContext } from "../../context/lang/langContext";


function HeaderMobile() {

  const { establecerLenguaje, locale } = useContext(langContext);
  const [isOpen, setOpen] = useState(false);
 
  const isToggled = (toggled) => {
    const navbar = document.getElementById("nav");
    if (toggled) {
      navbar.className = "nav";
    } else {
      navbar.className = "nav hidden";
    }
  };

  return (
    <>
      <header className="header">
        <div className="wrapper">
          <img
            src="https://resources.virtuales.io/eventos/img/logo-virtual-es.svg"
            className="logo-nav"
            alt="logo"
          />
          <Hamburger
            rounded
            toggled={isOpen}
            toggle={setOpen}
            onToggle={isToggled}
            color="#fff"
          />
        </div>
        <ul className="nav hidden" id="nav">
          <li className="nav-item">
            <Link className="nav-link bold" to="/">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/agenda">
              Agenda
            </Link>
          </li>
          <li className="nav-item menum">
            <Link className="nav-link" to="/">
              Preguntas frecuentes
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default HeaderMobile;
