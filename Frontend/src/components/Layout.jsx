import { Outlet } from 'react-router-dom';
import SecondNavbar from './Navbar/SecondNavbar';
import Footer from './Footer/Footer';

const Layout = () => {
  return (
    <div>
      <SecondNavbar />
      <div className="min-h-screen">
        <Outlet /> {/* This will render the child route components */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
