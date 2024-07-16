import React from 'react'
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
  return (
    <>

      <Header />
      <div className="relative">
        <img src={bgImg} className="w-100" alt="Background" />
        <div className="lg:absolute -top-16 sm:start-auto lg:start-80 translate-middle w-75">
          <SearchForm />
        </div>
      </div>
      <Explore />
      <Offers />
      <Promotions />
      <AppDownloadWrapper />
      <Footer />
      <FAQSection />

    </>
  )
}

export default Home