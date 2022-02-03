import "./Marquee.css";

function BannerNextEvent({ marquee }) {
  return (
    <div className={`marquee`}>
      <marquee>{marquee}</marquee>
    </div>
  );
}

export default BannerNextEvent;
