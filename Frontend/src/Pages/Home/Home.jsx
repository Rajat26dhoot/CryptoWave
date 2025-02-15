import React from "react";
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Homepbody from '../../components/Homepbody/Homepbody.jsx';


function Home() {
    return (
        <div>
            <Navbar />
            <div className="content">
            <Homepbody/>
             <Footer/>
            </div>
        </div>
    );
}

export default Home;
