import "./EventDetail.css";

import BannerNextEvent from "../main/bannerNextEvents/marquee";
import Button from "../button/button";
import Loading from "../Loading/Loading";
import useFectGet from "../../utils/useFectGet";

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import InfoEvent from "../main/BannerLogo/infoEvent";

function EventDetail() {
  const { site } = useParams();
  const data2 = useFectGet(`https://api.virtuales.io/event/sites/${site}`);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data2));
  });

  const ingresar = () => {
    window.location = `/event/${data2.event.site}/agenda`;
  };

  return (
    <main className="container main-bg">
      {!data2 ? (
        <Loading />
      ) : (
        <>
          {console.log(data2)}
          <InfoEvent data={data2} />
          <div className="grid margin25">
            <div>
              <picture className="picture">
                <img src={data2.event.images[0].entrada} className="picture" />
              </picture>
              <BannerNextEvent marquee={data2.event.marquee} />
            </div>
            <div className="box">
              <div className="date-box">
                <h2>{data2.event.dates}</h2>
                <p>
                  <img
                    src="https://resources.virtuales.io/eventos/img/reloj-contorno-circular.svg"
                    className="watch-circle"
                  />
                  {data2.event.hours} Col – Perú
                </p>
              </div>
              <Button
                variant={"get-into"}
                icon="https://resources.virtuales.io/eventos/img/ingresar.svg"
                name={"ingresar"}
                onClick={ingresar}
              >
                <FormattedMessage id="event.button" />
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default EventDetail;
