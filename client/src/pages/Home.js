import React from 'react'
import Header from '../Mycomponents/Header';
import SearchForm from '../Mycomponents/SearchForm';
import bgImg from '../assets/bg.jpg'
import Explore from '../Mycomponents/Explore';
import Promotions from '../Mycomponents/Promotions';
import Offers from '../Mycomponents/Offers';
import Footer from '../Mycomponents/Footer';
import FAQSection from '../Mycomponents/FAQSection';
import AppDownloadWrapper from '../Mycomponents/AppDownloadWrapper';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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