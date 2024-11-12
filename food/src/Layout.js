import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <Navbar />

      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
