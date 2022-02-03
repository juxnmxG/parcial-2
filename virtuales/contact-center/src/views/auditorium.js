import Header from "../components/header/header";
import Main from "../components/main/main";
import Footer from "../components/Footer/Footer";

import CamsConected from "../context/CamsConected/CamsConected";

function Auditorium() {
  return (
    <CamsConected>
      <div className="App">
        <Header></Header>
        <div className="container" style={{ margin: "auto" }}>
          <Main></Main>
        </div>
        <Footer />
      </div>
    </CamsConected>
  );
}

export default Auditorium;
