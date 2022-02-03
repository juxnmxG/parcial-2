
import './Footer.css';

function Footer() {
  return (
    <div className="footer fixed-bottom float-left">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <p className="formtextfooter">
              Copyright 2021 © Virtual-Es
              <a href="https://resources.virtuales.io/eventos/html/politicas_privacidad.html" target="_blank">
                {" "}
                Política de privacidad{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
