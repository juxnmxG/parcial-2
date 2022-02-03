import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { langContext } from "../../context/lang/langContext";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function HeaderDesktop({ data }) {

  const { id, room } = useParams()

  const { establecerLenguaje, locale } = useContext(langContext);

  return (
    <>
      <header className="header">
        <div className="container flex">
          <img
            src="https://resources.virtuales.io/eventos/img/logo-virtual-es.svg"
            className="logo-header"
            alt="logo"
          />
          <ul className="nav">
            <li>
              <FormattedMessage
                id="header.welcome"
                defaultMessage="Bienvenido(a) "
              />
              {"username"}

            </li>
            <li className="nav-item">|</li>
            <li className="nav-item">
              <a className="nav-link bold" href="/" >
                <FormattedMessage id="header.home" defaultMessage="Inicio" />
              </a>
            </li>
            <li className="nav-item">|</li>
            <li className="">
              <Link to="/">
                <img
                  className="imgfaq"
                  src="https://resources.virtuales.io/eventos/img/faq.svg"
                  alt="faq"
                  width="55"
                  height="55"
                />
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/">
                <img
                  className="image-user"
                  src={"https://resources.virtuales.io/eventos/img/user.svg"}
                  alt="user profile"
                  width="40"
                  height="40"
                />
              </Link>

            </li>
            <li>
              <div>
                {locale === "es-MX" ? (
                  <img
                    className="imgfaq"
                    src="https://resources.virtuales.io/eventos/img/reino-unido.png"
                    alt="faq"
                    width="40"
                    height="40"
                    onClick={() => establecerLenguaje("en-US")}
                  />
                ) : (
                  <img
                    className="imgfaq"
                    src="https://resources.virtuales.io/eventos/img/colombia.png"
                    alt="faq"
                    width="40"
                    height="40"
                    onClick={() => establecerLenguaje("es-MX")}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default HeaderDesktop;
