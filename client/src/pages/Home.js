import { useState, useEffect } from 'react';
import Header from '../Mycomponents/Home/Header';
import SearchForm from '../Mycomponents/Home/SearchForm';
import bgImg from '.././assets/bg.jpg';
import Explore from '../Mycomponents/Home/Explore';
import Promotions from '../Mycomponents/Home/Promotions';
import Offers from '../Mycomponents/Home/Offers';
import Footer from '../Mycomponents/Home/Footer';
import FAQSection from '../Mycomponents/Home/FAQSection';
import AppDownloadWrapper from '../Mycomponents/Home/AppDownloadWrapper';


const Home = () => {
  const [filteredFlights, setFilteredFlights] = useState([]);
  // State to manage whether the header should be sticky
  const [isSticky, setIsSticky] = useState(false);

  // Function to handle scrolling and toggle sticky header
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Effect to add scroll event listener on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <div className={`sticky top-0 z-50 ${isSticky ? 'bg-white shadow-md' : ''}`}>
        <Header />
      </div>
      <div className="relative lg:flex lg:justify-center">
        <img src={bgImg} className="w-100" alt="Background" />
        <div className="lg:absolute -top-16 sm:start-auto  w-75 ">
          <SearchForm setFilteredFlights={setFilteredFlights}/>
        </div>
      </div>
      <div>
        <Explore />
      </div>
      <div>
        <Offers />
      </div>
      <div>
        <Promotions />
      </div>
      <div>
        <AppDownloadWrapper />
      </div>
      <div>
        <Footer />
      </div>
      <div>
        <FAQSection />
      </div>
    </div>
  )
}

export default Home