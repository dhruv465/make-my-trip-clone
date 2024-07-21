import { useEffect, useState } from 'react';
import bgImg from '.././assets/bg.jpg';
import AppDownloadWrapper from '../Mycomponents/Home/AppDownloadWrapper';
import FAQSection from '../Mycomponents/Home/FAQSection';
import Footer from '../Mycomponents/Home/Footer';
import Header from '../Mycomponents/Home/Header';
import Offers from '../Mycomponents/Home/Offers';
import Promotions from '../Mycomponents/Home/Promotions';
import SearchForm from '../Mycomponents/Home/SearchForm';
import TripIdeaSlider from '../Mycomponents/Home/TripIdeaSlider';


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

      <div className="relative lg:flex lg:justify-center lg:mb-24">
        <img src={bgImg} className="w-full" alt="Background" />
        <div className="lg:absolute lg:-top-16 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full  px-2">
          <SearchForm setFilteredFlights={setFilteredFlights} />
        </div>
      </div>
    
      <div className="mt-8  px-2">
        <Offers />
      </div>
      <div className="px-2">
        <Promotions />
      </div>
      <div className="px-2">
        <AppDownloadWrapper />
      </div>
      <div className="mt-8 lg:mt-20 px-2">
        <TripIdeaSlider />
      </div>
      <div className="px-2">
        <Footer />
      </div>
      <div className="px-2">
        <FAQSection />
      </div>
    </div>
  )
}

export default Home