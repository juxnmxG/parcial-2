import Footer from "../components/Footer/Footer";
import Header from "../components/header/header";

function Error404() {
  return (
    <div>
      <Header />
      <div className="flex" style={{color: '#fff', width: '400px', margin: 'auto'}}>
        <h1>404 not found</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Error404;
